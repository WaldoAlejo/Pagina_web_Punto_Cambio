import { useQuery } from "@tanstack/react-query";
import type { CurrencyRate } from "@/lib/types";

const CURRENCY_META: Record<string, { name: string; flag: string }> = {
  EUR: { name: "Euro",              flag: "🇪🇺" },
  GBP: { name: "Libra Esterlina",  flag: "🇬🇧" },
  COP: { name: "Peso Colombiano",  flag: "🇨🇴" },
  BRL: { name: "Real Brasileño",   flag: "🇧🇷" },
  ARS: { name: "Peso Argentino",   flag: "🇦🇷" },
  BOB: { name: "Boliviano",        flag: "🇧🇴" },
  MXN: { name: "Peso Mexicano",    flag: "🇲🇽" },
  AUD: { name: "Dólar Australiano",flag: "🇦🇺" },
  PEN: { name: "Sol Peruano",      flag: "🇵🇪" },
  CAD: { name: "Dólar Canadiense", flag: "🇨🇦" },
};

const TARGETS = Object.keys(CURRENCY_META).join(",");

// Spread aplicado sobre la tasa mid-market (configurable desde Supabase en el futuro)
const BUY_SPREAD  = 0.015; // PC compra del cliente 1.5% bajo mid
const SELL_SPREAD = 0.015; // PC vende al cliente 1.5% sobre mid

interface ApiResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
}

async function fetchRates(): Promise<CurrencyRate[]> {
  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/latest/USD`, // usar open.er-api fallback
  ).catch(() => null);

  // Intentar con open.er-api (sin API key, gratuito)
  const fallbackRes = !res || !res.ok
    ? await fetch("https://open.er-api.com/v6/latest/USD")
    : res;

  if (!fallbackRes.ok) throw new Error("No se pudo obtener tasas");

  const json: ApiResponse = await fallbackRes.json();
  if (json.result !== "success") throw new Error("API error");

  return Object.entries(CURRENCY_META).map(([code, meta]) => {
    const mid = json.rates[code] ?? 0;
    return {
      code,
      name: meta.name,
      flag: meta.flag,
      midRate: mid,
      // buyRate:  cliente vende divisa a PC → PC paga menos USD por unidad
      // sellRate: cliente compra divisa a PC → PC cobra más USD por unidad
      // Como la tasa es "cuántas unidades por 1 USD", invertimos la lógica:
      // compra (PC compra divisa) → cliente recibe MENOS USD: mid * (1 - spread)
      // venta (PC vende divisa)  → cliente paga MÁS USD: mid * (1 + spread)
      // Pero mostramos en unidades de divisa por USD:
      buyRate:  mid * (1 + BUY_SPREAD),   // PC compra divisa: más unidades por USD (peor para cliente)
      sellRate: mid * (1 - SELL_SPREAD),  // PC vende divisa: menos unidades por USD (peor para cliente)
      trend: "stable" as const,
    };
  });
}

export function useExchangeRates() {
  return useQuery<CurrencyRate[]>({
    queryKey: ["exchange-rates"],
    queryFn: fetchRates,
    staleTime: 1000 * 60 * 30, // 30 min cache
    retry: 2,
  });
}
