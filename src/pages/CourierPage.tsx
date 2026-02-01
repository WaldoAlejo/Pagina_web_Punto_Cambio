import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Package, Truck, Globe, Clock, Shield, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "DHL - Courier Internacional",
    description: "Entrega express puerta a puerta para el día siguiente. Líder global en logística con total visibilidad de su envío.",
    features: [
      "Servicio rápido para sus clientes",
      "Tiempos prudenciales más cortos",
      "Procesos más eficientes",
      "Transporte puerta a puerta",
      "Mayor flexibilidad y control"
    ]
  },
  {
    icon: Package,
    title: "Courier Nacional",
    description: "Servicio de entrega especializada y directa con proceso planificado de recepción, zonificación y coordinación.",
    features: [
      "Documentos hasta 2kg",
      "Entrega en 24, 48 y 72 horas",
      "Rastreo en tiempo real",
      "Entrega adecuada y oportuna"
    ]
  },
  {
    icon: Truck,
    title: "Carga Liviana",
    description: "Envío vía terrestre de cajas o paquetes desde 2 hasta 50 kilogramos por unidad de empaque.",
    features: [
      "Garantía de entrega adecuada",
      "Entrega oportuna a nivel nacional",
      "Embalaje seguro"
    ]
  },
  {
    icon: Truck,
    title: "Carga Masiva",
    description: "Envío de cajas, paquetes y bultos en volúmenes grandes de punto a punto o con distribución.",
    features: [
      "Volúmenes grandes",
      "Punto a punto o distribución",
      "Entrega garantizada"
    ]
  },
  {
    icon: Truck,
    title: "Fletes",
    description: "Vehículos totalmente equipados con medidas de seguridad y rastreo satelital exclusivo para cada cliente.",
    features: [
      "Rastreo satelital",
      "Medidas de seguridad",
      "Tonelajes personalizados",
      "Servicio exclusivo"
    ]
  },
  {
    icon: Package,
    title: "Valija Empresarial",
    description: "Movilización de tulas o fundas de correspondencia con máximo de 5 kilogramos por ruta.",
    features: [
      "Entrega urgente hasta las 9:30 a.m.",
      "Servicio a nivel nacional",
      "Ciudades principales"
    ]
  }
];

const CourierPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-dark via-dark-lighter to-dark py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-light rounded-full blur-3xl" />
          </div>

          <div className="container px-4 sm:px-6 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-gold-light/20 text-white font-semibold text-sm mb-6 border border-primary/30">
                📦 Servicio de Courier
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Servicios de Envío
                <span className="block text-gradient-gold mt-2">Nacional e Internacional</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Soluciones completas de logística y envíos con DHL Internacional y servicio nacional especializado.
                Documentos, carga liviana, masiva, fletes y valija empresarial.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/30">
          <div className="container px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/30 hover:border-primary/30 group hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center mb-6 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-gold-light/5">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="bg-gradient-to-br from-dark to-dark-lighter rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-light rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  ¿Necesita un servicio de Courier?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Contáctenos para obtener más información sobre nuestros servicios de envío y logística.
                </p>
                <a
                  href="/contacto"
                  className="inline-block px-8 py-4 bg-gradient-gold text-dark font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Contáctenos Ahora
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CourierPage;
