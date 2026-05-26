-- ═══════════════════════════════════════════════════════════════
--  Punto Cambio — Datos iniciales (seed)
--  Ejecutar DESPUÉS de 001_schema.sql
-- ═══════════════════════════════════════════════════════════════

-- ── Sucursales ─────────────────────────────────────────────────
INSERT INTO branches (name, address, city, lat, lng, phone, whatsapp, hours, hours_saturday, map_embed_url) VALUES
(
  'Valle de los Chillos – Plaza del Valle',
  'C.C. Plaza del Valle, Local 45',
  'San Rafael, Quito',
  -0.2950, -78.4397,
  '+593 2 286 7144',
  '+593995710648',
  'Lun – Vie: 9:00 – 18:00',
  'Sáb: 9:00 – 14:00',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3991.0!2d-78.4397!3d-0.2950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sPlaza%20del%20Valle!5e0!3m2!1ses!2sec!4v1704067200000'
),
(
  'Quito Norte – El Condado',
  'C.C. El Condado Shopping, Local 201',
  'Quito Norte',
  -0.1145, -78.4865,
  '+593 2 345 6789',
  '+593995710648',
  'Lun – Vie: 9:00 – 18:00',
  'Sáb: 9:00 – 14:00',
  NULL
),
(
  'Guayaquil – Mall del Sol',
  'Mall del Sol, Planta Baja, Local 15',
  'Guayaquil',
  -2.1536, -79.8964,
  '+593 4 456 7890',
  '+593995710648',
  'Lun – Vie: 9:00 – 18:00',
  'Sáb: 9:00 – 14:00',
  NULL
),
(
  'Cuenca – Mall del Río',
  'Mall del Río, Local 78',
  'Cuenca',
  -2.9001, -79.0059,
  '+593 7 567 8901',
  '+593995710648',
  'Lun – Vie: 9:00 – 18:00',
  'Sáb: 9:00 – 14:00',
  NULL
)
ON CONFLICT DO NOTHING;

-- ── Configuración del sitio ────────────────────────────────────
INSERT INTO site_config (key, value, description) VALUES
  ('phone_1',             '+593 99 571 0648',                         'Teléfono celular principal'),
  ('phone_2',             '+593 2 286 7144',                          'Teléfono fijo principal'),
  ('whatsapp',            '593995710648',                             'Número WhatsApp (sin +)'),
  ('email',               'info@casasdecambios.com',                  'Email de contacto'),
  ('hours_weekday',       'Lun – Vie: 9:00 – 18:00',                 'Horario días de semana'),
  ('hours_saturday',      'Sáb: 9:00 – 14:00',                       'Horario sábados'),
  ('address_main',        'C.C. Plaza del Valle, San Rafael, Quito',  'Dirección principal'),
  ('exchange_spread_buy', '0.015',                                    'Spread compra (% bajo mid-market)'),
  ('exchange_spread_sell','0.015',                                    'Spread venta (% sobre mid-market)'),
  ('facebook_url',        'https://www.facebook.com/Western-Union-Franquicia-597056390700280/', 'Facebook'),
  ('instagram_url',       'https://www.instagram.com/',               'Instagram'),
  ('youtube_url',         'https://www.youtube.com/channel/UCqmCzNr5IgtpxExm5Jbprig', 'YouTube')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- ── FAQs ───────────────────────────────────────────────────────
INSERT INTO faqs (question, answer, category, order_index) VALUES
  ('¿Qué divisas manejan?',
   'Manejamos las principales divisas internacionales: USD, EUR, GBP, COP, BRL, ARS, BOB, MXN, AUD, PEN y más. Consulte disponibilidad en su sucursal.',
   'cambio', 1),
  ('¿Cuál es el monto mínimo para cambiar?',
   'No tenemos monto mínimo fijo. Para divisas menos comunes puede requerir un pedido previo. Contáctenos para coordinar.',
   'cambio', 2),
  ('¿Qué documentos necesito?',
   'Para cambios hasta $1,000: cédula de identidad o pasaporte vigente. Para montos mayores se requiere información adicional según regulaciones del SRI.',
   'cambio', 3),
  ('¿Cuáles son sus horarios de atención?',
   'Lunes a Viernes de 9:00 a 18:00. Sábados de 9:00 a 14:00. Domingos y feriados cerrado. Horarios pueden variar según sucursal.',
   'horarios', 4),
  ('¿Puedo hacer un pedido anticipado de divisas?',
   '¡Sí! Puede reservar las divisas que necesita con anticipación a través de nuestra sección de Pedidos o llamándonos directamente. Le confirmamos disponibilidad y coordinamos el retiro.',
   'pedidos', 5),
  ('¿Cómo funciona la compra de oro?',
   'Compramos oro en monedas, joyas y lingotes. Tasamos según el fixing internacional del día. El pago es en efectivo inmediato. Traiga su documento de identidad.',
   'servicios', 6),
  ('¿Tienen servicio Western Union?',
   'Sí, somos agentes autorizados de Western Union. Puede enviar y recibir dinero a más de 200 países. Las comisiones dependen del destino y monto.',
   'servicios', 7),
  ('¿Puedo hacer el cambio en línea?',
   'Puede cotizar y hacer su pedido en línea, pero el cambio físico de divisas se realiza en nuestros puntos de atención. Le garantizamos la tasa al momento del pedido.',
   'general', 8)
ON CONFLICT DO NOTHING;

-- ── Spreads por defecto ────────────────────────────────────────
INSERT INTO exchange_rate_overrides (currency_code, buy_spread, sell_spread) VALUES
  ('EUR', 0.012, 0.012),
  ('GBP', 0.012, 0.012),
  ('COP', 0.020, 0.020),
  ('BRL', 0.018, 0.018),
  ('ARS', 0.025, 0.025),
  ('BOB', 0.018, 0.018),
  ('MXN', 0.015, 0.015),
  ('AUD', 0.015, 0.015),
  ('PEN', 0.015, 0.015),
  ('CAD', 0.012, 0.012)
ON CONFLICT (currency_code) DO NOTHING;
