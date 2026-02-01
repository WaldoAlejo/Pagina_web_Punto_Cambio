import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Send, Globe, Clock, Shield, DollarSign, MapPin, CheckCircle2, ArrowRight, Users } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Envíos a Todo el Mundo",
    description: "Transferencias internacionales a más de 200 países y territorios con Western Union."
  },
  {
    icon: Clock,
    title: "Rapidez Garantizada",
    description: "Tu dinero llega en minutos. Servicio express para que tus seres queridos reciban el dinero al instante."
  },
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Agente autorizado Western Union. Todas las transacciones están protegidas y respaldadas."
  },
  {
    icon: DollarSign,
    title: "Mejores Tarifas",
    description: "Comisiones competitivas y tasas de cambio favorables para tu beneficio."
  }
];

const howItWorks = [
  {
    step: "1",
    title: "Visita Nuestra Sucursal",
    description: "Acércate a cualquiera de nuestras ubicaciones con tu documento de identidad."
  },
  {
    step: "2",
    title: "Proporciona los Datos",
    description: "Indica el nombre completo del beneficiario, país destino y monto a enviar."
  },
  {
    step: "3",
    title: "Realiza el Pago",
    description: "Paga el monto a enviar más la comisión. Recibe tu código de seguimiento (MTCN)."
  },
  {
    step: "4",
    title: "Comparte el Código",
    description: "Envía el MTCN a tu beneficiario para que cobre en cualquier agente Western Union."
  }
];

const benefits = [
  "Envíos a más de 200 países",
  "Dinero disponible en minutos",
  "Red de más de 500,000 agentes",
  "Sin necesidad de cuenta bancaria",
  "Seguimiento en tiempo real",
  "Múltiples formas de pago",
  "Atención en español",
  "Servicio 7 días a la semana"
];

const popularDestinations = [
  { country: "Estados Unidos", flag: "🇺🇸" },
  { country: "España", flag: "🇪🇸" },
  { country: "Colombia", flag: "🇨🇴" },
  { country: "Perú", flag: "🇵🇪" },
  { country: "Venezuela", flag: "🇻🇪" },
  { country: "México", flag: "🇲🇽" },
  { country: "Chile", flag: "🇨🇱" },
  { country: "Argentina", flag: "🇦🇷" }
];

const WesternUnionPage = () => {
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
                📤 Western Union Autorizado
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Envío de Dinero
                <span className="block text-gradient-gold mt-2">al Extranjero</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Agente autorizado Western Union. Envía dinero a tus seres queridos en todo el mundo 
                de forma rápida, segura y confiable. Más de 200 países disponibles.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/30">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ventajas de <span className="text-gradient-gold">Western Union</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                El líder mundial en transferencias de dinero
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/30 hover:border-primary/30 group hover:-translate-y-2 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center mb-5 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              className="bg-gradient-to-br from-primary/5 to-gold-light/5 rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  <span className="text-gradient-gold">Beneficios</span> del Servicio
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gradient-to-br from-secondary/20 to-white">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                ¿Cómo <span className="text-gradient-gold">Funciona?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Proceso simple en 4 pasos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-dark text-2xl font-bold mx-auto mb-6 shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16 bg-white">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Destinos <span className="text-gradient-gold">Populares</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Envía dinero a los países más solicitados
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
              {popularDestinations.map((dest, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-secondary/20 to-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-center border border-border/30 hover:border-primary/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="text-3xl mb-2">{dest.flag}</div>
                  <p className="text-xs font-semibold text-foreground">{dest.country}</p>
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
                <Users className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  ¿Necesitas Enviar Dinero?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Visita cualquiera de nuestras sucursales con tu documento de identidad y realiza tu envío en minutos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/ubicaciones"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-gold text-dark font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Ver Ubicaciones
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href="/contacto"
                    className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    Más Información
                  </a>
                </div>
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

export default WesternUnionPage;
