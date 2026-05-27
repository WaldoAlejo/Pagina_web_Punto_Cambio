import { useQuery } from "@tanstack/react-query";
import { fetchCurrencies } from "@/lib/api";
import type { CurrencyMeta } from "@/lib/types";

/* Fallback local — se usa solo si la API no responde */
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

export function useCurrencies() {
  return useQuery<CurrencyMeta[]>({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
    staleTime: 1000 * 60 * 60, // 1 hora — las monedas no cambian seguido
    retry: 2,
  });
}

/** Devuelve un Record<code, CurrencyMeta> con fallback local */
export function useCurrenciesMap(): Record<string, CurrencyMeta> {
  const { data } = useCurrencies();
  if (data && data.length > 0) {
    return Object.fromEntries(data.map((c) => [c.code, c]));
  }
  return Object.fromEntries(
    Object.entries(CURRENCY_META_FALLBACK).map(([code, meta]) => [
      code,
      { code, name: meta.name, flag: meta.flag, is_active: true, order_index: 0 },
    ])
  );
}
