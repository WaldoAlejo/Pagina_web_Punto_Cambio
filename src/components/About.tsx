import { motion } from "framer-motion";
import { Target, Heart, Eye } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Nuestra Misión",
    description:
      "Proveer soluciones de cobros y cambios de calidad, inspirando y trabajando con la juventud ecuatoriana, desarrollando capacidades comerciales en el joven de hoy.",
  },
  {
    icon: Eye,
    title: "Nuestra Visión",
    description:
      "Ser la red de casas de cambio más confiable y accesible de Ecuador, llevando servicios financieros de calidad a todas las comunidades.",
  },
  {
    icon: Heart,
    title: "Nuestros Valores",
    description:
      "Integridad, compromiso social, excelencia en el servicio y desarrollo del talento joven ecuatoriano como pilares fundamentales.",
  },
];

export const About = () => {
  return (
    <section id="nosotros" className="py-24 bg-secondary/30">
      <div className="container">
        {/* Section header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Sobre Nosotros
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Experiencia y Confianza
            <span className="text-gradient-gold"> Desde 1998</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Punto Cambio es una empresa de servicios transaccionales y cambios de divisas 
            con más de 25 años de experiencia en el mercado ecuatoriano.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="relative bg-card rounded-xl p-8 shadow-card border border-border/50 overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 shadow-gold">
                  <value.icon className="w-7 h-7 text-dark" />
                </div>

                <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                  {value.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social commitment */}
        <motion.div
          className="mt-16 bg-dark rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm mb-4">
                Vinculación Social
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Orientamos a los Más Jóvenes
                <span className="text-gradient-gold"> un Objetivo de Vida</span>
              </h3>
              <p className="text-white/70">
                Creemos en el poder de la juventud ecuatoriana. Por eso, brindamos 
                oportunidades de desarrollo profesional y comercial a jóvenes emprendedores 
                que desean construir un futuro próspero.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <span className="block text-3xl font-display font-bold text-primary mb-1">
                    200+
                  </span>
                  <span className="text-white/60 text-sm">Jóvenes Capacitados</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <span className="block text-3xl font-display font-bold text-primary mb-1">
                    15+
                  </span>
                  <span className="text-white/60 text-sm">Ciudades</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};