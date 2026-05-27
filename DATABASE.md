# Base de Datos — Punto Cambio

## Arquitectura

- **Motor:** PostgreSQL 15 en Google Cloud SQL (GCP)
- **IP pública:** `35.255.164.15:5432`
- **API REST:** PostgREST corriendo en Cloud Run
  - URL: `https://postgrest-punto-cambio-72tnrtplza-uc.a.run.app`
- **Cliente web:** `src/lib/api.ts` (consume la API REST vía fetch)

> PostgREST expone las tablas de PostgreSQL como endpoints REST automáticamente. No hay backend propio.

---

## Tablas principales

| Tabla | Endpoint | Descripción |
|-------|----------|-------------|
| `branches` | `GET /branches` | Sucursales / puntos de atención |
| `faqs` | `GET /faqs` | Preguntas frecuentes del chatbot |
| `site_config` | `GET /site_config` | Configuración clave-valor del sitio |
| `exchange_rate_overrides` | `GET /exchange_rate_overrides` | Spreads personalizados por moneda |

### Estructura completa
Ver `database/001_schema.sql`.

---

## Actualizar sucursales

### Opción A — Script Node.js (recomendado)

```bash
node scripts/update-branches.cjs
```

Este script:
1. Se conecta directamente a PostgreSQL en GCP
2. Limpia la tabla `branches`
3. Inserta las 12 sucursales definidas en el propio script
4. Actualiza `site_config` (email, horarios, dirección, mensaje del chatbot)

**Para modificar sucursales:** edita el array `BRANCHES` dentro de `scripts/update-branches.cjs` y vuelve a ejecutar.

### Opción B — SQL directo (psql / Cloud SQL)

```bash
# Requiere Cloud SQL Proxy o IP pública habilitada
psql -h 35.255.164.15 -p 5432 -U postgres -d postgres -f database/seed.sql
```

Credenciales:
- **Usuario:** `postgres`
- **Contraseña:** `Esh2ew8p.`
- **SSL:** requerido (`rejectUnauthorized: false`)

---

## Actualizar FAQs

Las FAQs se leen desde la tabla `faqs`. Para modificarlas:

1. Edita `database/seed.sql` (sección `-- ── FAQs`)
2. Ejecuta el SQL, **o** haz INSERTs directos:

```sql
INSERT INTO faqs (question, answer, category, order_index)
VALUES ('¿Nueva pregunta?', 'Respuesta aquí', 'general', 9)
ON CONFLICT DO NOTHING;
```

Categorías válidas: `cambio`, `servicios`, `horarios`, `pedidos`, `general`.

---

## Actualizar configuración del sitio

La tabla `site_config` almacena pares `key → value`:

| Key | Ejemplo de valor | Uso |
|-----|------------------|-----|
| `phone_1` | `+593 99 571 0648` | Teléfono principal |
| `phone_2` | `+593 2 286 7144` | Teléfono secundario |
| `whatsapp` | `593995710648` | WhatsApp (sin +) |
| `email` | `info@puntocambio.ec` | Email de contacto |
| `hours_weekday` | `Lun – Sáb: 8:30 – 18:30` | Horario general |
| `hours_saturday` | `Cerrado` | Horario sábado |
| `address_main` | `C.C. Plaza del Valle...` | Dirección matriz |
| `exchange_spread_buy` | `0.015` | Spread compra |
| `exchange_spread_sell` | `0.015` | Spread venta |
| `chatbot_welcome` | `¡Hola! 👋 ...` | Mensaje de bienvenida del bot |

Para cambiar cualquier valor:

```sql
INSERT INTO site_config (key, value, description)
VALUES ('email', 'nuevo@email.com', 'Email de contacto')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
```

---

## Flujo de datos en la app

```
PostgreSQL (GCP) → PostgREST (Cloud Run) → API REST → src/lib/api.ts → Hooks → Componentes React
```

### Hooks que consumen la API

| Hook | Función | Datos |
|------|---------|-------|
| `useBranches()` | `fetchBranches()` | Sucursales |
| `useFAQs()` | `fetchFAQs()` | FAQs |
| `useSiteConfig()` | `fetchSiteConfig()` | Configuración |
| `useExchangeRates()` | `fetchExchangeOverrides()` + API externa | Tasas |

---

## Variables de entorno

En `.env` (no versionado):

```
VITE_API_URL=https://postgrest-punto-cambio-72tnrtplza-uc.a.run.app
```

> `VITE_API_URL` es la única variable requerida para que la app lea desde la base de datos.

---

## Notas importantes

- **No uses Supabase.** Este proyecto usa PostgreSQL puro en GCP + PostgREST. No hay relación con Supabase.
- El rol `web_anon` en PostgreSQL solo tiene permisos `SELECT`. Para escritura se usa el usuario `postgres` directamente (scripts) o se debe configurar autenticación JWT en PostgREST.
- Las tasas de cambio en vivo se obtienen de `open.er-api.com` y se combinan con los spreads de `exchange_rate_overrides`.
