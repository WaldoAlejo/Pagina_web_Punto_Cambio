import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const locations = [
  {
    id: 1,
    name: "Valle de los Chillos - Plaza del Valle",
    address: "Centro Comercial Plaza del Valle, Local 45",
    city: "San Rafael, Quito",
    phone: "+593 2 234 5678",
    hours: "Lun-Vie: 9:00-18:00 | Sáb: 9:00-14:00",
    coordinates: { lat: -0.2785, lng: -78.4545 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.8!2d-78.4545!3d-0.2785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTYnNDIuNiJTIDc4wrAyNycxNi4yIlc!5e0!3m2!1ses!2sec!4v1234567890",
  },
  {
    id: 2,
    name: "Quito Norte - El Condado",
    address: "C.C. El Condado Shopping, Local 201",
    city: "Quito Norte",
    phone: "+593 2 345 6789",
    hours: "Lun-Vie: 9:00-18:00 | Sáb: 9:00-14:00",
    coordinates: { lat: -0.1145, lng: -78.4865 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.8!2d-78.4865!3d-0.1145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDYnNTIuMiJTIDc4wrAyOScxMS40Ilc!5e0!3m2!1ses!2sec!4v1234567890",
  },
  {
    id: 3,
    name: "Guayaquil - Mall del Sol",
    address: "Mall del Sol, Planta Baja, Local 15",
    city: "Guayaquil",
    phone: "+593 4 456 7890",
    hours: "Lun-Vie: 9:00-18:00 | Sáb: 9:00-14:00",
    coordinates: { lat: -2.1536, lng: -79.8964 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.8!2d-79.8964!3d-2.1536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMDknMTMuMCJTIDc5wrA1Myc0Ny4wIlc!5e0!3m2!1ses!2sec!4v1234567890",
  },
  {
    id: 4,
    name: "Cuenca - Mall del Río",
    address: "Mall del Río, Local 78",
    city: "Cuenca",
    phone: "+593 7 567 8901",
    hours: "Lun-Vie: 9:00-18:00 | Sáb: 9:00-14:00",
    coordinates: { lat: -2.9001, lng: -79.0059 },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.8!2d-79.0059!3d-2.9001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNTQnMDAuNCJTIDc5wrAwMCcyMS4yIlc!5e0!3m2!1ses!2sec!4v1234567890",
  },
];

export const LocationsMap = () => {
  return (
    <section className="bg-secondary/30 py-8 md:py-12 lg:py-16">
      <div className="container px-4 sm:px-6">
        {/* Section header */}
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
          {/* Map */}
          <motion.div
            className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-elevated bg-card h-[400px] lg:h-[600px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255280.8196831806!2d-78.63123259375!3d-0.22985329999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a4002427c9f%3A0x44b991e158ef5572!2sQuito%2C%20Ecuador!5e0!3m2!1ses!2sec!4v1704067200000!5m2!1ses!2sec"
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

          {/* Locations list */}
          <motion.div
            className="order-1 lg:order-2 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  className="bg-card rounded-xl p-4 sm:p-6 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                      <MapPin className="w-6 h-6 text-dark" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground text-base sm:text-lg mb-2">
                        {location.name}
                      </h3>
                      
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground flex items-start gap-2">
                          <Navigation className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                          <span className="break-words">{location.address}, {location.city}</span>
                        </p>
                        
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                          <a href={`tel:${location.phone}`} className="hover:text-primary transition-colors">
                            {location.phone}
                          </a>
                        </p>
                        
                        <p className="text-muted-foreground flex items-start gap-2">
                          <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                          <span className="text-xs sm:text-sm">{location.hours}</span>
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="self-start sm:self-center flex-shrink-0 mt-2 sm:mt-0"
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`, '_blank')}
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">Cómo llegar</span>
                      <span className="sm:hidden">Ir</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <p className="text-muted-foreground text-sm mb-3">
                ¿No encuentra una sucursal cerca? Contáctenos para conocer más opciones.
              </p>
              <Button variant="gold" className="w-full sm:w-auto">
                Ver Todas las Sucursales
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};