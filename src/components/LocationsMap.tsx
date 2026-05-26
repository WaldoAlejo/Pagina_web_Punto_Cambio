import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBranches } from "@/hooks/useBranches";
import type { Branch } from "@/lib/types";

const QUITO_MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255280.8!2d-78.6312!3d-0.2299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sQuito%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1704067200000";

export const LocationsMap = () => {
  const { data: locations = [], isLoading } = useBranches();
  const [activeMapUrl, setActiveMapUrl] = useState<string>(QUITO_MAP);

  const handleSelectBranch = (branch: Branch) => {
    if (branch.map_embed_url) setActiveMapUrl(branch.map_embed_url);
  };

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
            Visítenos en cualquiera de nuestras sucursales a nivel nacional.
            Estamos cerca de usted para servirle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Mapa */}
          <motion.div
            className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-elevated bg-card h-[320px] sm:h-[400px] lg:h-[600px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src={activeMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicaciones Punto Cambio"
              className="w-full h-full"
            />
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
              {locations.filter((l) => l.is_active).map((location, index) => (
                <motion.button
                  key={location.id}
                  className="w-full text-left bg-card rounded-xl p-4 sm:p-5 shadow-card border border-border/50 hover:shadow-elevated hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  onClick={() => handleSelectBranch(location)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
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
