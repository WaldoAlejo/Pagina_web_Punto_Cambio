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
import { Link } from "react-router-dom";

const services = [
  {
    icon: Banknote,
    title: "Cambio de Divisas",
    description: "Las mejores tasas del mercado para compra y venta de divisas internacionales.",
    color: "from-primary to-gold-dark",
    link: "/cambio-divisas",
  },
  {
    icon: Send,
    title: "Envío de Dinero",
    description: "Transferencias internacionales rápidas y seguras con Western Union.",
    color: "from-gold-dark to-primary",
    link: "/western-union",
  },
  {
    icon: CircleDollarSign,
    title: "Compra y Venta de Oro",
    description: "Máxima tasación según cotización fixing. Pagamos en efectivo al instante. Seguridad y transparencia garantizadas con los mejores precios del mercado.",
    color: "from-primary to-gold-light",
    link: "/oro",
  },
  {
    icon: Briefcase,
    title: "Franquicias",
    description: "Únase a nuestra red de agencias Punto Cambio en Ecuador.",
    color: "from-gold-light to-primary",
    link: "/franquicias",
  },
  {
    icon: Package,
    title: "Courier",
    description: "Servicio de envío nacional e internacional con DHL. Documentos, carga liviana, carga masiva, fletes y valija empresarial con entrega garantizada.",
    color: "from-primary to-gold-dark",
    link: "/courier",
  },
  {
    icon: Receipt,
    title: "Recaudaciones",
    description: "Red inter-bancaria para depósitos, pagos de tarjetas, transferencias y cobros. Evite congestión bancaria realizando sus transacciones cerca de su hogar.",
    color: "from-gold-dark to-primary",
    link: "/recaudaciones",
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
    <section className="bg-gradient-to-b from-secondary/30 to-white py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-gold-light/10 text-primary font-semibold text-sm mb-5 border border-primary/20">
            <Briefcase className="w-4 h-4 text-primary" />
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5">
            Soluciones Financieras
            <span className="block text-gradient-gold mt-2">Integrales</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
            Ofrecemos una amplia gama de servicios diseñados para satisfacer 
            todas sus necesidades de cambio y transacciones.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-7 md:p-9 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/30 hover:border-primary/30 relative overflow-hidden"
            >
              {/* Decorative gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <service.icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm sm:text-base mb-5 leading-relaxed">
                  {service.description}
                </p>
                
                <Link
                  to={service.link}
                  className="inline-flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all text-sm sm:text-base hover:translate-x-1"
                >
                  Más información
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};