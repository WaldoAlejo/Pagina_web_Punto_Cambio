-- ═══════════════════════════════════════════════════════════════
--  Punto Cambio — Datos iniciales (seed)
--  Ejecutar DESPUÉS de 001_schema.sql
-- ═══════════════════════════════════════════════════════════════

-- ── Sucursales ─────────────────────────────────────────────────
INSERT INTO branches (name, address, city, lat, lng, phone, whatsapp, hours, hours_saturday, map_embed_url) VALUES
(
  'Matriz – Plaza del Valle',
  'C.C. Plaza del Valle, Isla 2',
  'Valle de los Chillos, San Rafael, Quito',
  -0.300351, -78.459652,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8!2d-78.459652!3d-0.300351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sPlaza%20del%20Valle!5e0!3m2!1ses!2sec!4v1704067200000'
),
(
  'Sucursal II – Sangolquí',
  'Av. Luis Cordero y Bobonaza',
  'Sangolquí, Quito',
  -0.324401, -78.449234,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal III – El Condado',
  'Plaza Santa María',
  'El Condado, Quito',
  -0.105829, -78.497081,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal IV – Lago Agrio',
  'Colombia y Jorge Añazco',
  'Lago Agrio, Sucumbíos',
  -0.083653, -76.880196,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal V – Guaranda',
  'Convención de 1884 entre Olmedo y Rocafuerte',
  'Guaranda, Bolívar',
  -1.593400, -79.000915,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal VI – Guayaquil',
  'Víctor E. Estrada 1218 y Laureles',
  'Guayaquil, Guayas',
  -2.161259, -79.916412,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal VII – Guayaquil San Vicente',
  'José de Antepara, Edificio San Vicente Paúl',
  'Guayaquil, Guayas',
  -2.1844305, -79.8892448,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal VIII – Samborondón',
  'Vía a Salitre y vía a Samborondón km. 12 ½, Plaza Milann',
  'Samborondón, Guayas',
  -1.9712014, -79.7476866,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal IX – Puyo',
  'Ceslao Marín y Javier Vargas',
  'Puyo, Pastaza',
  -1.4854777, -77.9969666,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal X – Lago Agrio El Condado',
  'El Condado, Plaza Santa María',
  'Lago Agrio, Sucumbíos',
  0.1266266, -76.7575913,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Sucursal XI – Guaranda Centro',
  'Convención de 1884 entre Olmedo y Rocafuerte',
  'Guaranda, Bolívar',
  -1.4398571, -79.0576662,
  '+593 99 571 0648',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
),
(
  'Oficina Quito – Plaza 10 Carolina',
  'Av. 10 de Agosto, Edificio Plaza 10 Carolina',
  'Quito',
  -0.180511, -78.489004,
  '+593 2 286 7144',
  '+593995710648',
  'Lun – Sáb: 8:30 – 18:30',
  NULL,
  NULL
)
ON CONFLICT DO NOTHING;

-- ── Monedas ────────────────────────────────────────────────────
INSERT INTO currencies (code, name, flag, is_active, order_index) VALUES
  ('USD', 'Dólar Americano',   '🇺🇸', true, 1),
  ('EUR', 'Euro',               '🇪🇺', true, 2),
  ('GBP', 'Libra Esterlina',   '🇬🇧', true, 3),
  ('COP', 'Peso Colombiano',   '🇨🇴', true, 4),
  ('BRL', 'Real Brasileño',    '🇧🇷', true, 5),
  ('ARS', 'Peso Argentino',    '🇦🇷', true, 6),
  ('BOB', 'Boliviano',         '🇧🇴', true, 7),
  ('MXN', 'Peso Mexicano',     '🇲🇽', true, 8),
  ('AUD', 'Dólar Australiano', '🇦🇺', true, 9),
  ('PEN', 'Sol Peruano',       '🇵🇪', true, 10),
  ('CAD', 'Dólar Canadiense',  '🇨🇦', true, 11),
  ('CHF', 'Franco Suizo',      '🇨🇭', true, 12),
  ('JPY', 'Yen Japonés',       '🇯🇵', true, 13),
  ('CNY', 'Yuan Chino',        '🇨🇳', true, 14)
ON CONFLICT (code) DO NOTHING;

-- ── Configuración del sitio ────────────────────────────────────
INSERT INTO site_config (key, value, description) VALUES
  ('phone_1',             '+593 99 571 0648',                         'Teléfono celular principal'),
  ('phone_2',             '+593 2 286 7144',                          'Teléfono fijo principal'),
  ('whatsapp',            '593995710648',                             'Número WhatsApp (sin +)'),
  ('email',               'info@puntocambio.ec',                      'Email de contacto'),
  ('hours_weekday',       'Lun – Sáb: 8:30 – 18:30',                 'Horario días de semana'),
  ('hours_saturday',      'Cerrado',                                  'Horario sábados (usar hours_weekday)'),
  ('address_main',        'C.C. Plaza del Valle, Isla 2, San Rafael, Valle de los Chillos',  'Dirección principal'),
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
   'Lunes a Sábado de 8:30 a 18:30. Domingos y feriados cerrado. Horarios pueden variar según sucursal.',
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
