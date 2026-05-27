import { useState, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, MessageCircle, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBranches } from "@/hooks/useBranches";
import type { Branch } from "@/lib/types";

/* Leaflet imports (lazy to avoid SSR issues if any) */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

/* ── Custom gold marker ───────────────────────────────────────── */
const goldIconHtml = `
  <div style="
    width:32px;height:32px;
    background:linear-gradient(135deg,#D4AF37 0%,#B8960C 100%);
    border:3px solid #fff;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    box-shadow:0 3px 8px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;
  ">
    <span style="transform:rotate(45deg);font-size:14px;color:#1a1a1a;font-weight:700;">P</span>
  </div>
  <div style="
    width:0;height:0;
    border-left:6px solid transparent;
    border-right:6px solid transparent;
    border-top:8px solid #B8960C;
    margin:-3px auto 0;
    filter:drop-shadow(0 2px 2px rgba(0,0,0,0.2));
  "></div>
`;

const goldIcon = L.divIcon({
  className: "custom-gold-marker",
  html: goldIconHtml,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -36],
});

/* ── Map fly-to helper ────────────────────────────────────────── */
function FlyToBranch({ target }: { target: [number, number] | null }) {
  const map = useMap();
  if (target) {
    map.flyTo(target, 16, { duration: 1.5 });
  }
  return null;
}

function ResetViewButton({ onReset }: { onReset: () => void }) {
  const map = useMap();
  return (
    <button
      onClick={() => {
        map.flyTo([-1.2, -78.5], 7, { duration: 1.5 });
        onReset();
      }}
      className="absolute top-3 right-3 z-[400] bg-white rounded-lg px-3 py-2 shadow-lg text-xs font-medium text-foreground hover:bg-primary hover:text-dark transition-colors flex items-center gap-1.5 border border-border/40"
      title="Ver todo Ecuador"
    >
      <Crosshair className="w-3.5 h-3.5" />
      Ver todo
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export const LocationsMap = () => {
  const { data: locations = [], isLoading } = useBranches();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const activeLocations = useMemo(
    () => locations.filter((l) => l.is_active),
    [locations],
  );

  const handleSelectBranch = useCallback((branch: Branch) => {
    setActiveId(branch.id);
    setFlyTarget([branch.lat, branch.lng]);
    // Also open popup after fly animation
    setTimeout(() => {
      const m = markersRef.current[branch.id];
      if (m) m.openPopup();
    }, 1600);
  }, []);

  const handleReset = useCallback(() => {
    setActiveId(null);
    setFlyTarget(null);
  }, []);

  return (
    <section className="bg-secondary/30 py-8 md:py-12 lg:py-16">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Encuéntranos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Nuestros Puntos de
            <span className="text-gradient-gold"> Atención</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Visítenos en cualquiera de nuestras {activeLocations.length} sucursales a nivel nacional.
            Estamos cerca de usted para servirle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mapa Leaflet */}
          <motion.div
            className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-elevated bg-card h-[320px] sm:h-[400px] lg:h-[600px] relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MapContainer
              center={[-1.2, -78.5]}
              zoom={7}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {activeLocations.map((branch) => (
                <Marker
                  key={branch.id}
                  position={[branch.lat, branch.lng]}
                  icon={goldIcon}
                  ref={(ref) => {
                    if (ref) markersRef.current[branch.id] = ref;
                  }}
                  eventHandlers={{
                    click: () => setActiveId(branch.id),
                  }}
                >
                  <Popup>
                    <div className="p-3">
                      <h4 className="font-display font-bold text-sm text-foreground mb-1 pr-5 leading-tight">
                        {branch.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-0.5 leading-snug">
                        {branch.address}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3 leading-snug">
                        {branch.city}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${branch.lat},${branch.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] bg-primary/10 text-primary px-2.5 py-1.5 rounded-md hover:bg-primary hover:text-dark transition-colors font-medium"
                        >
                          <Navigation className="w-3 h-3" />
                          Cómo llegar
                        </a>
                        {branch.whatsapp && (
                          <a
                            href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}?text=Hola%2C%20quiero%20informaci%C3%B3n`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] bg-green-50 text-green-700 px-2.5 py-1.5 rounded-md hover:bg-green-500 hover:text-white transition-colors font-medium"
                          >
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              <FlyToBranch target={flyTarget} />
              <ResetViewButton onReset={handleReset} />
            </MapContainer>
          </motion.div>

          {/* Lista de sucursales */}
          <motion.div
            className="order-1 lg:order-2 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {isLoading && (
              <div className="py-8 text-center text-muted-foreground text-sm">
                Cargando sucursales…
              </div>
            )}

            <div className="max-h-[560px] overflow-y-auto pr-1 space-y-3 custom-scrollbar">
              {activeLocations.map((location, index) => (
                <motion.button
                  key={location.id}
                  className={`w-full text-left rounded-xl p-4 sm:p-5 shadow-card border transition-all duration-300 hover:-translate-y-0.5 ${
                    activeId === location.id
                      ? "bg-primary/5 border-primary shadow-elevated"
                      : "bg-card border-border/50 hover:shadow-elevated hover:border-primary/30"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  onClick={() => handleSelectBranch(location)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-gold ${
                      activeId === location.id
                        ? "bg-gradient-gold"
                        : "bg-gradient-gold/80"
                    }`}>
                      <MapPin className="w-5 h-5 text-dark" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-sm sm:text-base mb-1.5 leading-tight">
                        {location.name}
                      </h3>

                      <div className="space-y-1.5 text-xs sm:text-sm">
                        <p className="text-muted-foreground flex items-start gap-1.5">
                          <Navigation className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                          <span>{location.address}, {location.city}</span>
                        </p>
                        <p className="text-muted-foreground flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
                          <a
                            href={`tel:${location.phone}`}
                            className="hover:text-primary transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {location.phone}
                          </a>
                        </p>
                        <p className="text-muted-foreground flex items-start gap-1.5">
                          <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-primary" />
                          <span>
                            {location.hours}
                            {location.hours_saturday && ` · ${location.hours_saturday}`}
                          </span>
                        </p>
                      </div>

                      {/* Acciones */}
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <button
                          className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`,
                              "_blank",
                            );
                          }}
                        >
                          <Navigation className="w-3 h-3" />
                          Cómo llegar
                        </button>
                        {location.whatsapp && (
                          <a
                            href={`https://wa.me/${location.whatsapp.replace(/\D/g, "")}?text=Hola%2C%20quiero%20informaci%C3%B3n`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-green-600 font-medium hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MessageCircle className="w-3 h-3" />
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                Haga clic en una sucursal para verla en el mapa.
              </p>
              <Button variant="gold" className="w-full sm:w-auto" asChild>
                <Link to="/contacto">Contáctenos</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
