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
    const apiBranches = await pgFetch<Branch>("/branches", {
      is_active: "eq.true",
      order: "name.asc",
    });

    /* Merge con fallback: las de la API tienen prioridad,
       pero si faltan sucursales del fallback las incluimos. */
    const byName = new Map<string, Branch>();
    STATIC_BRANCHES.forEach((b) => byName.set(b.name, b));
    apiBranches.forEach((b) => byName.set(b.name, b));

    return Array.from(byName.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
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
    name: "Matriz – Plaza del Valle",
    address: "C.C. Plaza del Valle, Isla 2",
    city: "Valle de los Chillos, San Rafael, Quito",
    lat: -0.300351,
    lng: -78.459652,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d-78.459652!3d-0.300351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sPlaza%20del%20Valle!5e0!3m2!1ses!2sec!4v1704067200000",
  },
  {
    id: "2",
    name: "Sucursal II – Sangolquí",
    address: "Av. Luis Cordero y Bobonaza",
    city: "Sangolquí, Quito",
    lat: -0.324401,
    lng: -78.449234,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "3",
    name: "Sucursal III – El Condado",
    address: "Plaza Santa María",
    city: "El Condado, Quito",
    lat: -0.105829,
    lng: -78.497081,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "4",
    name: "Sucursal IV – Lago Agrio",
    address: "Colombia y Jorge Añazco",
    city: "Lago Agrio, Sucumbíos",
    lat: -0.083653,
    lng: -76.880196,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "5",
    name: "Sucursal V – Guaranda",
    address: "Convención de 1884 entre Olmedo y Rocafuerte",
    city: "Guaranda, Bolívar",
    lat: -1.593400,
    lng: -79.000915,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "6",
    name: "Sucursal VI – Guayaquil",
    address: "Víctor E. Estrada 1218 y Laureles",
    city: "Guayaquil, Guayas",
    lat: -2.161259,
    lng: -79.916412,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "7",
    name: "Sucursal VII – Guayaquil San Vicente",
    address: "José de Antepara, Edificio San Vicente Paúl",
    city: "Guayaquil, Guayas",
    lat: -2.1844305,
    lng: -79.8892448,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "8",
    name: "Sucursal VIII – Samborondón",
    address: "Vía a Salitre y vía a Samborondón km. 12 ½, Plaza Milann",
    city: "Samborondón, Guayas",
    lat: -1.9712014,
    lng: -79.7476866,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "9",
    name: "Sucursal IX – Puyo",
    address: "Ceslao Marín y Javier Vargas",
    city: "Puyo, Pastaza",
    lat: -1.4854777,
    lng: -77.9969666,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "10",
    name: "Sucursal X – Lago Agrio El Condado",
    address: "El Condado, Plaza Santa María",
    city: "Lago Agrio, Sucumbíos",
    lat: 0.1266266,
    lng: -76.7575913,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "11",
    name: "Sucursal XI – Guaranda Centro",
    address: "Convención de 1884 entre Olmedo y Rocafuerte",
    city: "Guaranda, Bolívar",
    lat: -1.4398571,
    lng: -79.0576662,
    phone: "+593 99 571 0648",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
    is_active: true,
    map_embed_url: null,
  },
  {
    id: "12",
    name: "Oficina Quito – Plaza 10 Carolina",
    address: "Av. 10 de Agosto, Edificio Plaza 10 Carolina",
    city: "Quito",
    lat: -0.180511,
    lng: -78.489004,
    phone: "+593 2 286 7144",
    whatsapp: "+593995710648",
    hours: "Lun – Sáb: 8:30 – 18:30",
    hours_saturday: null,
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
  email: "info@puntocambio.ec",
  hours_weekday: "Lun – Sáb: 8:30 – 18:30",
  hours_saturday: "Cerrado",
  address_main: "C.C. Plaza del Valle, Isla 2, San Rafael, Valle de los Chillos",
  exchange_spread_buy: "0.015",
  exchange_spread_sell: "0.015",
  exchange_active_currencies: "EUR,GBP,COP,BRL,ARS,BOB,MXN,AUD,PEN,CAD",
  exchange_refresh_minutes: "30",
  chatbot_welcome: "¡Hola! 👋 Soy el asistente de **Punto Cambio**. ¿En qué puedo ayudarte hoy?",
};
