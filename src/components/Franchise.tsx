import { motion } from "framer-motion";
import { CheckCircle2, Users, TrendingUp, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Modelo de negocio probado con más de 25 años de experiencia",
  "Capacitación integral y soporte continuo",
  "Acceso a sistemas tecnológicos de última generación",
  "Red de agencias Western Union autorizada",
  "Marca reconocida y confiable en el mercado",
  "Inversión accesible con alto retorno",
];

const stats = [
  { icon: Users, value: "50+", label: "Agencias" },
  { icon: TrendingUp, value: "25+", label: "Años" },
  { icon: Shield, value: "100%", label: "Confianza" },
];

export const Franchise = () => {
  return (
    <section className="bg-background py-8 md:py-12 lg:py-16">
      <div className="container px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-dark to-dark-lighter">
              {/* Stats overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8 p-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center">
                        <stat.icon className="w-8 h-8 text-primary" />
                      </div>
                      <span className="block text-4xl font-display font-bold text-white mb-1">
                        {stat.value}
                      </span>
                      <span className="text-white/60 text-sm">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary rounded-xl rotate-12 opacity-20" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-light rounded-full opacity-10" />
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-elevated max-w-xs hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <span className="block font-display font-bold text-foreground">
                    Crecimiento Sostenido
                  </span>
                  <span className="text-sm text-muted-foreground">
                    +20% anual promedio
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              Oportunidad de Negocio
            </span>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Conviértase en una
              <span className="text-gradient-gold block">Agencia Punto Cambio</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8">
              Únase a nuestra red de franquiciados y forme parte de una empresa líder 
              en servicios transaccionales en Ecuador. Ofrecemos un modelo de negocio 
              rentable con soporte integral.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/80">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="gold" 
                size="lg"
                asChild
              >
                <a href="#contacto">
                  Solicitar Información
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <a href="mailto:franquicias@casasdecambios.com?subject=Solicitud de Información - Franquicia Punto Cambio">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Contactar por Email
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};