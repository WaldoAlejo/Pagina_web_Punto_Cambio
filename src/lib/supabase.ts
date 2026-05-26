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
  try {
    return await pgFetch<Branch>("/branches", {
      is_active: "eq.true",
      order: "name.asc",
    });
  } catch {
    return STATIC_BRANCHES;
  }
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

export async function fetchFAQs(): Promise<FAQ[]> {
  try {
    return await pgFetch<FAQ>("/faqs", {
      is_active: "eq.true",
      order: "order_index.asc",
    });
  } catch {
    return STATIC_FAQS;
  }
}

// ── Site config ───────────────────────────────────────────────────────────────

export async function fetchSiteConfig(): Promise<Record<string, string>> {
  try {
    const rows = await pgFetch<SiteConfig>("/site_config");
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch {
    return STATIC_CONFIG;
  }
}

// ── Exchange rate overrides ───────────────────────────────────────────────────

export async function fetchExchangeOverrides(): Promise<ExchangeRateOverride[]> {
  try {
    return await pgFetch<ExchangeRateOverride>("/exchange_rate_overrides", {
      is_active: "eq.true",
    });
  } catch {
    return [];
  }
}

// ── Datos estáticos de respaldo ───────────────────────────────────────────────

export const STATIC_BRANCHES: Branch[] = [
  {
    id: "1",
    name: "Valle de los Chillos – Plaza del Valle",
    address: "C.C. Plaza del Valle, Local 45",
    city: "San Rafael, Quito",
    lat: -0.2950,
    lng: -78.4397,
    phone: "+593 2 286 7144",
    whatsapp: "+593995710648",
    hours: "Lun – Vie: 9:00 – 18:00",
    hours_saturday: "Sáb: 9:00 – 14:00",
    is_active: true,
    map_embed_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3991.0!2d-78.4397!3d-0.2950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sPlaza%20del%20Valle!5e0!3m2!1ses!2sec!4v1704067200000",
  },
  {
    id: "2",
    name: "Quito Norte – El Condado",
    address: "C.C. El Condado Shopping, Local 201",
    city: "Quito Norte",
    lat: -0.1145,
    lng: -78.4865,
    phone: "+593 2 345 6789",
    whatsapp: "+593995710648",
    hours: "Lun – Vie: 9:00 – 18:00",
    hours_saturday: "Sáb: 9:00 – 14:00",
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "3",
    name: "Guayaquil – Mall del Sol",
    address: "Mall del Sol, Planta Baja, Local 15",
    city: "Guayaquil",
    lat: -2.1536,
    lng: -79.8964,
    phone: "+593 4 456 7890",
    whatsapp: "+593995710648",
    hours: "Lun – Vie: 9:00 – 18:00",
    hours_saturday: "Sáb: 9:00 – 14:00",
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "4",
    name: "Cuenca – Mall del Río",
    address: "Mall del Río, Local 78",
    city: "Cuenca",
    lat: -2.9001,
    lng: -79.0059,
    phone: "+593 7 567 8901",
    whatsapp: "+593995710648",
    hours: "Lun – Vie: 9:00 – 18:00",
    hours_saturday: "Sáb: 9:00 – 14:00",
    is_active: true,
    map_embed_url: null,
  },
];

export const STATIC_FAQS: FAQ[] = [
  { id: "1", question: "¿Qué divisas manejan?",
    answer: "Manejamos las principales divisas internacionales: USD, EUR, GBP, COP, BRL, ARS, BOB, MXN, AUD, PEN y más. Consulte disponibilidad en su sucursal.",
    category: "cambio", order_index: 1, is_active: true },
  { id: "2", question: "¿Cuál es el monto mínimo para cambiar?",
    answer: "No tenemos monto mínimo fijo. Para divisas menos comunes puede requerir un pedido previo. Contáctenos para coordinar.",
    category: "cambio", order_index: 2, is_active: true },
  { id: "3", question: "¿Qué documentos necesito?",
    answer: "Para cambios hasta $1,000: cédula de identidad o pasaporte vigente. Para montos mayores se requiere información adicional según regulaciones del SRI.",
    category: "cambio", order_index: 3, is_active: true },
  { id: "4", question: "¿Cuáles son sus horarios de atención?",
    answer: "Lunes a Viernes de 9:00 a 18:00. Sábados de 9:00 a 14:00. Domingos y feriados cerrado.",
    category: "horarios", order_index: 4, is_active: true },
  { id: "5", question: "¿Puedo hacer un pedido anticipado de divisas?",
    answer: "¡Sí! Puede reservar las divisas que necesita con anticipación a través de nuestra sección de Pedidos o llamándonos directamente.",
    category: "pedidos", order_index: 5, is_active: true },
  { id: "6", question: "¿Cómo funciona la compra de oro?",
    answer: "Compramos oro en monedas, joyas y lingotes. Tasamos según el fixing internacional del día. El pago es en efectivo inmediato.",
    category: "servicios", order_index: 6, is_active: true },
  { id: "7", question: "¿Tienen servicio Western Union?",
    answer: "Sí, somos agentes autorizados de Western Union. Puede enviar y recibir dinero a más de 200 países.",
    category: "servicios", order_index: 7, is_active: true },
  { id: "8", question: "¿Puedo hacer el cambio en línea?",
    answer: "Puede cotizar y hacer su pedido en línea, pero el cambio físico de divisas se realiza en nuestros puntos de atención.",
    category: "general", order_index: 8, is_active: true },
];

export const STATIC_CONFIG: Record<string, string> = {
  phone_1: "+593 99 571 0648",
  phone_2: "+593 2 286 7144",
  whatsapp: "593995710648",
  email: "info@casasdecambios.com",
  hours_weekday: "Lun – Vie: 9:00 – 18:00",
  hours_saturday: "Sáb: 9:00 – 14:00",
  address_main: "C.C. Plaza del Valle, San Rafael, Valle de los Chillos",
  exchange_spread_buy: "0.015",
  exchange_spread_sell: "0.015",
  exchange_active_currencies: "EUR,GBP,COP,BRL,ARS,BOB,MXN,AUD,PEN,CAD",
  exchange_refresh_minutes: "30",
  chatbot_welcome: "¡Hola! 👋 Soy el asistente de **Punto Cambio**. ¿En qué puedo ayudarte?",
};
