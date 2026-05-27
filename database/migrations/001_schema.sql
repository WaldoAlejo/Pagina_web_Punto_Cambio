-- ═══════════════════════════════════════════════════════════════
--  Punto Cambio — Schema PostgreSQL (GCP)
--  Ejecutar como superusuario o el usuario owner de la BD
-- ═══════════════════════════════════════════════════════════════

-- Extensión para UUIDs (disponible en GCP Cloud SQL por defecto)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── Rol de solo lectura para PostgREST ────────────────────────
-- Cambia 'tu_password' por una contraseña segura
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'web_anon') THEN
    CREATE ROLE web_anon NOLOGIN;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'postgrest_user') THEN
    CREATE ROLE postgrest_user LOGIN PASSWORD 'PuntoApi@2025!';  -- ← cambia si quieres
    GRANT web_anon TO postgrest_user;
  END IF;
END
$$;

-- ── Sucursales / Puntos de atención ────────────────────────────
CREATE TABLE IF NOT EXISTS branches (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT        NOT NULL,
  address        TEXT        NOT NULL,
  city           TEXT        NOT NULL,
  lat            FLOAT       NOT NULL,
  lng            FLOAT       NOT NULL,
  phone          TEXT,
  whatsapp       TEXT,
  hours          TEXT,
  hours_saturday TEXT,
  is_active      BOOLEAN     DEFAULT true,
  image_url      TEXT,
  map_embed_url  TEXT,
  created_at     TIMESTAMPTZ DEFAULT now(),
  updated_at     TIMESTAMPTZ DEFAULT now()
);

-- ── Configuración del sitio (clave-valor) ──────────────────────
CREATE TABLE IF NOT EXISTS site_config (
  key         TEXT        PRIMARY KEY,
  value       TEXT        NOT NULL,
  description TEXT,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Preguntas frecuentes ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  question    TEXT        NOT NULL,
  answer      TEXT        NOT NULL,
  category    TEXT        DEFAULT 'general'
              CHECK (category IN ('cambio','servicios','horarios','pedidos','general')),
  order_index INTEGER     DEFAULT 0,
  is_active   BOOLEAN     DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Monedas disponibles ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS currencies (
  code      TEXT        PRIMARY KEY,
  name      TEXT        NOT NULL,
  flag      TEXT        NOT NULL,
  is_active BOOLEAN     DEFAULT true,
  order_index INTEGER   DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── Overrides de spreads por moneda ───────────────────────────
CREATE TABLE IF NOT EXISTS exchange_rate_overrides (
  currency_code TEXT  PRIMARY KEY,
  buy_spread    FLOAT DEFAULT 0.015,
  sell_spread   FLOAT DEFAULT 0.015,
  is_active     BOOLEAN DEFAULT true,
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ── Permisos de lectura para el rol web_anon ──────────────────
GRANT USAGE ON SCHEMA public TO web_anon;
GRANT SELECT ON branches                TO web_anon;
GRANT SELECT ON site_config             TO web_anon;
GRANT SELECT ON faqs                    TO web_anon;
GRANT SELECT ON currencies              TO web_anon;
GRANT SELECT ON exchange_rate_overrides TO web_anon;

-- ── Trigger: auto-update de updated_at ────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS branches_updated_at ON branches;
CREATE TRIGGER branches_updated_at
  BEFORE UPDATE ON branches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS site_config_updated_at ON site_config;
CREATE TRIGGER site_config_updated_at
  BEFORE UPDATE ON site_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS currencies_updated_at ON currencies;
CREATE TRIGGER currencies_updated_at
  BEFORE UPDATE ON currencies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS exchange_rate_overrides_updated_at ON exchange_rate_overrides;
CREATE TRIGGER exchange_rate_overrides_updated_at
  BEFORE UPDATE ON exchange_rate_overrides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
