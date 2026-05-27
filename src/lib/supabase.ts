/**
 * Cliente PostgREST para GCP PostgreSQL.
 * PostgREST expone tu base de datos PostgreSQL como una API REST automática.
 * Apunta VITE_API_URL a tu instancia PostgREST: http://<GCP_IP>:3000
 */

import type { Branch, FAQ, SiteConfig, ExchangeRateOverride } from "./types";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

// Devuelve true si la variable de entorno está configurada
export const isApiConfigured = !!API_URL;

// ── Fetch helper ──────────────────────────────────────────────────────────────

async function pgFetch<T>(path: string, params?: Record<string, string>): Promise<T[]> {
  if (!API_URL) throw new Error("API_URL not configured");
  const url = new URL(`${API_URL}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: {
      "Accept": "application/json",
      // Si usas JWT en PostgREST, añade: "Authorization": `Bearer ${import.meta.env.VITE_API_ANON_KEY}`
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ── Branches ──────────────────────────────────────────────────────────────────

export async function fetchBranches(): Promise<Branch[]> {
  return await pgFetch<Branch>("/branches", {
    is_active: "eq.true",
    order: "name.asc",
  });
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

export async function fetchFAQs(): Promise<FAQ[]> {
  return await pgFetch<FAQ>("/faqs", {
    is_active: "eq.true",
    order: "order_index.asc",
  });
}

// ── Site config ───────────────────────────────────────────────────────────────

export async function fetchSiteConfig(): Promise<Record<string, string>> {
  const rows = await pgFetch<SiteConfig>("/site_config");
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

// ── Exchange rate overrides ───────────────────────────────────────────────────

export async function fetchExchangeOverrides(): Promise<ExchangeRateOverride[]> {
  return await pgFetch<ExchangeRateOverride>("/exchange_rate_overrides", {
    is_active: "eq.true",
  });
}

// ── Nota: los datos estáticos de respaldo fueron eliminados.
// Toda la información ahora se lee directamente desde PostgreSQL vía PostgREST.
