import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBranches, getNearestBranch } from "@/hooks/useBranches";
import type { Branch } from "@/lib/types";

type Status = "idle" | "loading" | "found" | "denied" | "error";

export const NearestBranchBanner = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [nearest, setNearest] = useState<(Branch & { distanceKm: number }) | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const { data: branches = [] } = useBranches();

  // Intentar geolocalización automática al montar (silencioso)
  useEffect(() => {
    if (!navigator.geolocation || !branches.length) return;
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const result = getNearestBranch(branches, coords.latitude, coords.longitude);
        setNearest(result);
        setStatus("found");
      },
      () => setStatus("denied"),
      { timeout: 8000, enableHighAccuracy: false },
    );
  }, [branches]);

  const handleLocate = () => {
    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const result = getNearestBranch(branches, coords.latitude, coords.longitude);
        setNearest(result);
        setStatus("found");
      },
      () => setStatus("denied"),
      { timeout: 10000, enableHighAccuracy: true },
    );
  };

  if (dismissed) return null;

  return (
    <section className="py-8 md:py-10 bg-gradient-to-r from-dark via-dark-lighter to-dark relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -left-16 top-0 w-64 h-full bg-primary rounded-full blur-3xl" />
        <div className="absolute -right-16 bottom-0 w-64 h-full bg-gold-light rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 relative z-10">
        <AnimatePresence mode="wait">

          {/* ── Idle: invitación a localizar ── */}
          {status === "idle" && (
            <motion.div
              key="idle"
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white font-semibold text-base sm:text-lg">
                  Encuentra el punto de atención más cercano
                </p>
                <p className="text-white/60 text-sm mt-0.5">
                  Te mostramos la sucursal Punto Cambio más próxima a ti.
                </p>
              </div>
              <Button onClick={handleLocate} variant="gold" className="shrink-0 w-full sm:w-auto">
                <Navigation className="w-4 h-4 mr-2" />
                Usar mi ubicación
              </Button>
            </motion.div>
          )}

          {/* ── Cargando ── */}
          {status === "loading" && (
            <motion.div
              key="loading"
              className="flex items-center justify-center gap-3 py-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
              <p className="text-white/80 text-sm">Detectando tu ubicación…</p>
            </motion.div>
          )}

          {/* ── Encontrado ── */}
          {status === "found" && nearest && (
            <motion.div
              key="found"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="w-5 h-5 text-dark" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold text-sm sm:text-base truncate">
                      {nearest.name}
                    </p>
                    <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                      {nearest.distanceKm < 1
                        ? `${(nearest.distanceKm * 1000).toFixed(0)} m`
                        : `${nearest.distanceKm.toFixed(1)} km`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {nearest.address}
                    </span>
                    <span className="text-white/60 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {nearest.hours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 sm:flex-none border-white/20 text-white hover:bg-white/10 hover:text-white"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${nearest.lat},${nearest.lng}`,
                      "_blank",
                    )
                  }
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5" />
                  Cómo llegar
                </Button>
                {nearest.phone && (
                  <Button
                    size="sm"
                    variant="gold"
                    className="flex-1 sm:flex-none"
                    onClick={() => (window.location.href = `tel:${nearest.phone}`)}
                  >
                    <Phone className="w-3.5 h-3.5 mr-1.5" />
                    Llamar
                  </Button>
                )}
              </div>

              <button
                onClick={() => setDismissed(true)}
                className="absolute top-2 right-2 sm:static p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* ── Permiso denegado ── */}
          {(status === "denied" || status === "error") && (
            <motion.div
              key="denied"
              className="flex flex-col sm:flex-row items-center gap-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white/80 text-sm">
                  No se pudo acceder a tu ubicación.{" "}
                  <a href="/ubicaciones" className="text-primary underline">
                    Ver todos los puntos de atención →
                  </a>
                </p>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/40 hover:text-white text-xs transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
};
