import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Coins, TrendingUp, Shield, DollarSign, Clock, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: DollarSign,
    title: "Compro Oro",
    description: "El mejor momento para vender tu oro. Pagamos en efectivo, al instante y sin esperas. Siempre con la mayor seriedad y transparencia."
  },
  {
    icon: TrendingUp,
    title: "Máxima Tasación",
    description: "Nos diferenciamos por nuestras altas tasaciones, ofreciendo siempre los mayores precios de mercado según cotización fixing, mejorando así cualquier oferta."
  },
  {
    icon: Shield,
    title: "Máxima Seguridad",
    description: "La seguridad es un punto muy importante, trabajamos únicamente con las mayores medidas de seguridad, por nuestra propia integridad y la de nuestros clientes."
  }
];

const benefits = [
  "Pago en efectivo inmediato",
  "Tasación según cotización fixing internacional",
  "Sin esperas ni trámites largos",
  "Máxima transparencia en el proceso",
  "Personal capacitado y certificado",
  "Medidas de seguridad garantizadas",
  "Mejoramos cualquier oferta del mercado",
  "Compra de oro en cualquier estado"
];

const OroPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative flex items-center overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container px-4 sm:px-6 relative z-10 py-16 md:py-20">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-gold-light/20 text-white font-semibold text-sm mb-6 border border-primary/30">
                <Award className="w-4 h-4 text-primary" />
                Compra y Venta de Oro
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Tu Oro al
                <span className="block text-gradient-gold mt-2">Mejor Precio</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Compramos oro, monedas y joyas con la máxima tasación del mercado. 
                Pago inmediato en efectivo con total seguridad y transparencia.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Intro Section with Image */}
        <section className="py-16 bg-white">
          <div className="container px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1564330877-6ea4d5d84ba7?w=800&q=80" 
                    alt="Gold investment"
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Coins className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  El Mejor Precio por <span className="text-gradient-gold">Tu Oro</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Con más de 25 años en el mercado, nos especializamos en la compra de oro, monedas y joyas, ofreciendo siempre la máxima tasación del mercado.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Nuestras tasaciones se basan en la cotización fixing internacional, garantizando que recibas el mejor precio por tu oro. Pago inmediato en efectivo sin esperas.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/10 to-gold-light/10 p-4 rounded-xl border border-primary/20">
                    <DollarSign className="w-8 h-8 text-primary mb-2" />
                    <p className="font-bold text-lg text-foreground">Pago</p>
                    <p className="text-sm text-muted-foreground">Inmediato</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-gold-light/10 p-4 rounded-xl border border-primary/20">
                    <Shield className="w-8 h-8 text-primary mb-2" />
                    <p className="font-bold text-lg text-foreground">100%</p>
                    <p className="text-sm text-muted-foreground">Seguro</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-secondary/30 to-white">
          <div className="container px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/30 hover:border-primary/30 group hover:-translate-y-2 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center mb-6 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Benefits Grid */}
            <motion.div
              className="bg-gradient-to-br from-primary/5 to-gold-light/5 rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">
                Beneficios de <span className="text-gradient-gold">Nuestro Servicio</span>
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Award className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gradient-to-br from-secondary/20 to-white">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Proceso <span className="text-gradient-gold">Simple y Rápido</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Vendemos su oro en tres pasos sencillos
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Traiga su Oro", desc: "Acérquese a cualquiera de nuestras sucursales con su oro, joyas o monedas" },
                { step: "2", title: "Tasación Inmediata", desc: "Realizamos la tasación según cotización fixing internacional del día" },
                { step: "3", title: "Pago en Efectivo", desc: "Reciba su pago en efectivo al instante, sin esperas ni trámites" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-dark text-2xl font-bold mx-auto mb-6 shadow-lg">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
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
                <Coins className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  ¿Tiene Oro para Vender?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Obtenga la mejor tasación del mercado. Visítenos o contáctenos para más información.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/ubicaciones"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-gold text-dark font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Ver Ubicaciones
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/contacto"
                    className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    Contáctenos
                  </Link>
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

export default OroPage;
