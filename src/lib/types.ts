export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp?: string;
  hours: string;
  hours_saturday?: string;
  is_active: boolean;
  image_url?: string | null;
  map_embed_url?: string | null;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "cambio" | "servicios" | "horarios" | "pedidos" | "general";
  order_index: number;
  is_active: boolean;
}

export interface SiteConfig {
  key: string;
  value: string;
  description?: string;
}

export interface ExchangeRateOverride {
  currency_code: string;
  buy_spread: number;  // % below mid-market (e.g., 0.01 = 1%)
  sell_spread: number; // % above mid-market
  is_active: boolean;
}

export interface CurrencyRate {
  code: string;
  name: string;
  flag: string;
  midRate: number;   // from API (how many units per 1 USD)
  buyRate: number;   // PC buys from customer (worse for customer)
  sellRate: number;  // PC sells to customer (worse for customer)
  trend?: "up" | "down" | "stable";
}
