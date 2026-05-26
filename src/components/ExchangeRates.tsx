import { motion } from "framer-motion";
import { TrendingUp, RefreshCw, ArrowRight, AlertCircle, MapPin, Loader2, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useExchangeRates } from "@/hooks/useExchangeRates";

const formatRate = (rate: number, code: string): string => {
  if (["COP", "ARS"].includes(code)) return rate.toFixed(2);
  if (rate < 0.01) return rate.toFixed(5);
  return rate.toFixed(4);
};

function timeAgo(ms: number): string {
  const mins = Math.floor((Date.now() - ms) / 60000);
  if (mins < 1) return "ahora mismo";
  if (mins === 1) return "hace 1 min";
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  return hrs === 1 ? "hace 1 hora" : `hace ${hrs} horas`;
}

export const ExchangeRates = () => {
  const { data: rates, isLoading, isError, isFetching, dataUpdatedAt, refetch } =
    useExchangeRates();

  const updatedAgo = dataUpdatedAt ? timeAgo(dataUpdatedAt) : null;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-primary/10 to-gold-light/10 text-primary font-semibold text-sm mb-4 border border-primary/20">
            <TrendingUp className="w-4 h-4" />
            Cambio de Divisas
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Tasas de Cambio
            <span className="block text-gradient-gold mt-1">en Tiempo Real</span>
          </h2>

          {/* Estado en vivo */}
          <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <Wifi className="w-3 h-3" />
              <span className="font-medium">Actualización automática cada 30 min</span>
            </div>
            {updatedAgo && (
              <span className="text-xs text-muted-foreground">
                Última actualización: <strong>{updatedAgo}</strong>
              </span>
            )}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="max-w-3xl mx-auto mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 text-sm font-semibold">
                Tasas referenciales del mercado internacional
              </p>
              <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
                Las tasas reales de Punto Cambio pueden variar. Visítenos en el{" "}
                <Link to="/ubicaciones" className="underline font-medium hover:text-amber-900">
                  punto de atención más cercano
                </Link>{" "}
                para obtener la cotización exacta del día.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tabla */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-border/30 overflow-hidden max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Cabecera de tabla */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-dark to-dark-lighter text-white text-xs font-semibold px-4 sm:px-6 py-3">
            <div className="col-span-2">Moneda</div>
            <div className="text-center">Compra (ref.)</div>
            <div className="text-center">Venta (ref.)</div>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center gap-3 py-12 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm">Obteniendo tasas en tiempo real…</span>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span className="text-sm">No se pudo cargar. Verifica tu conexión.</span>
              <button
                onClick={() => refetch()}
                className="text-xs text-primary underline hover:no-underline"
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {rates && (
            <div className="divide-y divide-border/30">
              {rates.map((rate, i) => (
                <motion.div
                  key={rate.code}
                  className="grid grid-cols-4 px-4 sm:px-6 py-3 hover:bg-secondary/30 transition-colors items-center"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                >
                  <div className="col-span-2 flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl leading-none">{rate.flag}</span>
                    <div>
                      <p className="font-semibold text-foreground text-xs sm:text-sm leading-tight">
                        {rate.name}
                      </p>
                      <p className="text-muted-foreground text-[10px] font-mono">{rate.code}/USD</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-mono font-semibold text-sm text-foreground">
                      {formatRate(rate.buyRate, rate.code)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-mono font-bold text-sm text-primary">
                      {formatRate(rate.sellRate, rate.code)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="bg-secondary/30 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border/30">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isFetching ? "animate-spin text-primary" : ""}`} />
              {isFetching ? "Actualizando…" : "Actualizar tasas"}
            </button>
            <div className="flex gap-2 flex-wrap justify-center">
              <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                <Link to="/ubicaciones" className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  Punto más cercano
                </Link>
              </Button>
              <Button variant="gold" size="sm" asChild className="h-8 text-xs">
                <Link to="/calculadora" className="flex items-center gap-1.5">
                  Calcular <ArrowRight className="w-3 h-3" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Nota técnica debajo */}
        <p className="text-center text-[10px] text-muted-foreground mt-4">
          Fuente: mercado internacional (open.er-api.com) · Los márgenes de compra/venta son configurables desde la base de datos
        </p>
      </div>
    </section>
  );
};
