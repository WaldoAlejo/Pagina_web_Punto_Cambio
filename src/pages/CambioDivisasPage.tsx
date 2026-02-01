import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CurrencyCalculator } from "@/components/CurrencyCalculator";
import { motion } from "framer-motion";
import { Banknote, TrendingUp, Shield, Globe, Clock, CheckCircle2, ArrowRight } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Mejores Tasas",
    description: "Ofrecemos las tasas más competitivas del mercado, actualizadas diariamente según las cotizaciones internacionales."
  },
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Casa de cambios autorizada y regulada. Todas nuestras operaciones están respaldadas y son totalmente seguras."
  },
  {
    icon: Clock,
    title: "Servicio Rápido",
    description: "Cambio de divisas al instante. No pierdas tiempo, obtén tus divisas de manera inmediata."
  },
  {
    icon: Globe,
    title: "Múltiples Divisas",
    description: "Compramos y vendemos las principales divisas internacionales: Dólares, Euros, Pesos y más."
  }
];

const currencies = [
  { code: "USD", name: "Dólar Americano", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "COP", name: "Peso Colombiano", flag: "🇨🇴" },
  { code: "PEN", name: "Sol Peruano", flag: "🇵🇪" },
  { code: "BRL", name: "Real Brasileño", flag: "🇧🇷" },
  { code: "MXN", name: "Peso Mexicano", flag: "🇲🇽" },
  { code: "ARS", name: "Peso Argentino", flag: "🇦🇷" },
  { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
  { code: "BOB", name: "Boliviano", flag: "🇧🇴" },
  { code: "AUD", name: "Dólar Australiano", flag: "🇦🇺" },
  { code: "CAD", name: "Dólar Canadiense", flag: "🇨🇦" },
  { code: "CHF", name: "Franco Suizo", flag: "🇨🇭" }
];

const benefits = [
  "Tasas actualizadas en tiempo real",
  "Sin comisiones ocultas",
  "Transacciones seguras y confiables",
  "Atención personalizada",
  "Múltiples sucursales disponibles",
  "Horarios extendidos",
  "Personal capacitado y certificado",
  "Más de 25 años de experiencia"
];

const CambioDivisasPage = () => {
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
                💱 Casa de Cambios Autorizada
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Cambio de Divisas
                <span className="block text-gradient-gold mt-2">Al Mejor Precio</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Más de 25 años ofreciendo las mejores tasas del mercado. Compra y venta de divisas internacionales 
                con seguridad, rapidez y transparencia.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <CurrencyCalculator />

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
                ¿Por Qué <span className="text-gradient-gold">Elegirnos?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Ventajas de realizar tu cambio de divisas con nosotros
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
                  Beneficios de <span className="text-gradient-gold">Nuestro Servicio</span>
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

        {/* Currencies Section */}
        <section className="py-16 bg-gradient-to-br from-secondary/20 to-white">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Banknote className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Divisas <span className="text-gradient-gold">Disponibles</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Compramos y vendemos las principales monedas internacionales
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {currencies.map((currency, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all text-center border border-border/30 hover:border-primary/30 group hover:-translate-y-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <div className="text-4xl mb-2">{currency.flag}</div>
                  <p className="font-bold text-foreground text-sm mb-1">{currency.code}</p>
                  <p className="text-xs text-muted-foreground">{currency.name}</p>
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
                  ¿Listo para Cambiar tus Divisas?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Visita cualquiera de nuestras sucursales y obtén las mejores tasas del mercado.
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
                    Contáctenos
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

export default CambioDivisasPage;
