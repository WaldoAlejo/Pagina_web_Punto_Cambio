import { motion } from "framer-motion";
import { Shield, Users, Award, TrendingUp, Globe, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Clientes Satisfechos" },
  { icon: Award, value: "25+", label: "Años de Experiencia" },
  { icon: Globe, value: "15+", label: "Países Alcanzados" },
  { icon: TrendingUp, value: "98%", label: "Tasa de Satisfacción" },
];

const features = [
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Operaciones reguladas y autorizadas por entidades financieras ecuatorianas.",
  },
  {
    icon: Clock,
    title: "Servicio Rápido",
    description: "Transacciones procesadas en minutos. Su tiempo es valioso.",
  },
  {
    icon: Award,
    title: "Mejores Tasas",
    description: "Tasas competitivas actualizadas diariamente según el mercado.",
  },
];

export const TrustSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-gold-light/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-light rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 relative z-10">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                <stat.icon className="w-8 h-8 text-dark" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center mb-5 shadow-gold group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-dark" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
