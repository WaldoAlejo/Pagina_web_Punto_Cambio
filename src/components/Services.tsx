import { motion } from "framer-motion";
import { 
  Banknote, 
  Send, 
  CircleDollarSign, 
  Briefcase, 
  Package, 
  Receipt,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Banknote,
    title: "Cambio de Divisas",
    description: "Las mejores tasas del mercado para compra y venta de divisas internacionales.",
    color: "from-primary to-gold-dark",
  },
  {
    icon: Send,
    title: "Envío de Dinero",
    description: "Transferencias internacionales rápidas y seguras con Western Union.",
    color: "from-gold-dark to-primary",
  },
  {
    icon: CircleDollarSign,
    title: "Compra y Venta de Oro",
    description: "Transacciones seguras de oro, monedas y joyas al mejor precio.",
    color: "from-primary to-gold-light",
  },
  {
    icon: Briefcase,
    title: "Franquicias",
    description: "Únase a nuestra red de agencias Punto Cambio en Ecuador.",
    color: "from-gold-light to-primary",
  },
  {
    icon: Package,
    title: "Courier",
    description: "Servicio de envío de paquetes nacional e internacional.",
    color: "from-primary to-gold-dark",
  },
  {
    icon: Receipt,
    title: "Recaudaciones",
    description: "Sistema integral de cobros y recaudaciones empresariales.",
    color: "from-gold-dark to-primary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-secondary/50">
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
            Nuestros Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Soluciones Financieras
            <span className="text-gradient-gold"> Integrales</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ofrecemos una amplia gama de servicios diseñados para satisfacer 
            todas sus necesidades de cambio y transacciones.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-card rounded-xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border/50"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className="w-7 h-7 text-dark" />
              </div>
              
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-4">
                {service.description}
              </p>
              
              <a
                href="#contacto"
                className="inline-flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all"
              >
                Más información
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};