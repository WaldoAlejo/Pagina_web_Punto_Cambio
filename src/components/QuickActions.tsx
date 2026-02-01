import { motion } from "framer-motion";
import { Calculator, Send, Coins, Building2 } from "lucide-react";

const actions = [
  {
    icon: Calculator,
    title: "Cotizar",
    description: "Calcula el tipo de cambio",
    href: "#calculadora",
    color: "from-primary to-gold-dark",
  },
  {
    icon: Send,
    title: "Enviar Dinero",
    description: "Western Union disponible",
    href: "#servicios",
    color: "from-gold-dark to-primary",
  },
  {
    icon: Coins,
    title: "Comprar Oro",
    description: "Mejores precios del mercado",
    href: "#servicios",
    color: "from-primary to-gold-light",
  },
  {
    icon: Building2,
    title: "Franquicia",
    description: "Únete a nuestra red",
    href: "#franquicias",
    color: "from-gold-light to-primary",
  },
];

export const QuickActions = () => {
  return (
    <section className="py-6 md:py-8 bg-secondary/30">
      <div className="container px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {actions.map((action, index) => (
            <motion.a
              key={index}
              href={action.href}
              className="group bg-card rounded-xl p-4 md:p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border border-border/50 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-gold group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-6 h-6 md:w-8 md:h-8 text-dark" />
              </div>
              <h3 className="text-sm md:text-base font-display font-semibold text-foreground mb-1">
                {action.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {action.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
