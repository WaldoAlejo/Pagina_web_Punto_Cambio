import { motion } from "framer-motion";
import { Calculator, Send, Coins, Building2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: Calculator,
    title: "Cotizar",
    description: "Calcula el tipo de cambio",
    href: "/calculadora",
    color: "from-primary to-gold-dark",
  },
  {
    icon: ShoppingCart,
    title: "Pedidos",
    description: "Reserve sus divisas ahora",
    href: "/pedidos",
    color: "from-gold-dark to-primary",
  },
  {
    icon: Send,
    title: "Enviar Dinero",
    description: "Western Union disponible",
    href: "/servicios",
    color: "from-gold-dark to-primary",
  },
  {
    icon: Coins,
    title: "Comprar Oro",
    description: "Mejores precios del mercado",
    href: "/servicios",
    color: "from-primary to-gold-light",
  },
  {
    icon: Building2,
    title: "Franquicia",
    description: "Únete a nuestra red",
    href: "/franquicias",
    color: "from-gold-light to-primary",
  },
];

export const QuickActions = () => {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-white to-secondary/30">
      <div className="container px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {actions.map((action, index) => (
            <Link
              key={index}
              to={action.href}
            >
              <motion.div
                className="group bg-white rounded-2xl p-5 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-border/30 hover:border-primary/30 text-center relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Decorative background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <action.icon className="w-7 h-7 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-sm md:text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {action.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
