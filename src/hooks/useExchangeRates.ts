import { useQuery } from "@tanstack/react-query";
import { fetchSiteConfig, fetchExchangeOverrides, fetchCurrencies } from "@/lib/api";
import type { CurrencyRate } from "@/lib/types";

/* Fallback local — se usa solo si la API de monedas no responde */
const CURRENCY_META_FALLBACK: Record<string, { name: string; flag: string }> = {
  USD: { name: "Dólar Americano",   flag: "🇺🇸" },
  EUR: { name: "Euro",               flag: "🇪🇺" },
  GBP: { name: "Libra Esterlina",   flag: "🇬🇧" },
  COP: { name: "Peso Colombiano",   flag: "🇨🇴" },
  BRL: { name: "Real Brasileño",    flag: "🇧🇷" },
  ARS: { name: "Peso Argentino",    flag: "🇦🇷" },
  BOB: { name: "Boliviano",         flag: "🇧🇴" },
  MXN: { name: "Peso Mexicano",     flag: "🇲🇽" },
  AUD: { name: "Dólar Australiano", flag: "🇦🇺" },
  PEN: { name: "Sol Peruano",       flag: "🇵🇪" },
  CAD: { name: "Dólar Canadiense",  flag: "🇨🇦" },
  CHF: { name: "Franco Suizo",      flag: "🇨🇭" },
  JPY: { name: "Yen Japonés",       flag: "🇯🇵" },
  CNY: { name: "Yuan Chino",        flag: "🇨🇳" },
};

const DEFAULT_CURRENCIES = "USD,EUR,GBP,COP,BRL,ARS,BOB,MXN,AUD,PEN,CAD";
const DEFAULT_BUY_SPREAD  = 0.015;
const DEFAULT_SELL_SPREAD = 0.015;

interface LiveRatesResponse {
  result: string;
  rates: Record<string, number>;
}

async function fetchRatesComplete(): Promise<CurrencyRate[]> {
  // Fetch en paralelo: tasas en vivo + config de BD + overrides + catálogo de monedas
  const [liveResult, configResult, overridesResult, currenciesResult] = await Promise.allSettled([
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .catch(() => fetch("https://v6.exchangerate-api.com/v6/latest/USD").then((r) => r.json())),
    fetchSiteConfig(),
    fetchExchangeOverrides(),
    fetchCurrencies(),
  ]);

  // Tasas en vivo — si falla todo, lanzar error para que React Query maneje el retry
  const live: LiveRatesResponse | null =
    liveResult.status === "fulfilled" ? liveResult.value : null;
  if (!live || live.result !== "success") {
    throw new Error("No se pudo obtener tasas del mercado");
  }

  // Configuración desde BD
  const config =
    configResult.status === "fulfilled" ? configResult.value : {};

  const activeCurrencies = (config["exchange_active_currencies"] ?? DEFAULT_CURRENCIES)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const globalBuySpread  = parseFloat(config["exchange_spread_buy"]  ?? String(DEFAULT_BUY_SPREAD));
  const globalSellSpread = parseFloat(config["exchange_spread_sell"] ?? String(DEFAULT_SELL_SPREAD));

  // Overrides por moneda desde BD
  const overrides = overridesResult.status === "fulfilled" ? overridesResult.value : [];
  const overrideMap = Object.fromEntries(
    overrides.filter((o) => o.is_active).map((o) => [o.currency_code, o]),
  );

  // Catálogo de monedas desde BD (con fallback local)
  const currenciesFromApi =
    currenciesResult.status === "fulfilled" ? currenciesResult.value : [];
  const metaMap: Record<string, { name: string; flag: string }> =
    currenciesFromApi.length > 0
      ? Object.fromEntries(currenciesFromApi.map((c) => [c.code, { name: c.name, flag: c.flag }]))
      : CURRENCY_META_FALLBACK;

  // Construir array de tasas
  return activeCurrencies
    .filter((code) => metaMap[code] && live.rates[code])
    .map((code) => {
      const meta     = metaMap[code];
      const mid      = live.rates[code];
      const override = overrideMap[code];

      const buySpread  = override ? override.buy_spread  : globalBuySpread;
      const sellSpread = override ? override.sell_spread : globalSellSpread;

      return {
        code,
        name:     meta.name,
        flag:     meta.flag,
        midRate:  mid,
        buyRate:  mid * (1 + buySpread),
        sellRate: mid * (1 - sellSpread),
        trend:    "stable" as const,
      };
    });
}

export function useExchangeRates() {
  return useQuery<CurrencyRate[]>({
    queryKey: ["exchange-rates"],
    queryFn:  fetchRatesComplete,
    staleTime: 1000 * 60 * 30,       // considera datos frescos 30 min
    refetchInterval: 1000 * 60 * 30, // auto-refresh en background cada 30 min
    refetchOnWindowFocus: true,       // refresca cuando el usuario vuelve a la pestaña
    retry: 2,
  });
}
