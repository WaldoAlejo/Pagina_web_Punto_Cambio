import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Receipt, Building2, CreditCard, ArrowRightLeft, CheckCircle2, Wallet } from "lucide-react";

const services = [
  {
    title: "Depósitos Bancarios",
    description: "Depósitos a cuentas de ahorro y corrientes de múltiples entidades financieras.",
    icon: Wallet
  },
  {
    title: "Pago de Tarjetas",
    description: "Recepción de pagos de tarjetas de crédito de principales instituciones financieras.",
    icon: CreditCard
  },
  {
    title: "Transferencias",
    description: "Transferencias en línea rápidas y seguras entre diferentes entidades.",
    icon: ArrowRightLeft
  },
  {
    title: "Recaudación de Cuotas",
    description: "Sistema integral de recaudación de cuotas y microcréditos empresariales.",
    icon: Receipt
  }
];

const banks = [
  "Banco Pichincha",
  "Banco del Pacífico",
  "Banco Guayaquil",
  "Produbanco",
  "Banco Internacional",
  "Banco Bolivariano",
  "Banco Austro",
  "Cooperativas de Ahorro y Crédito",
  "Mutualistas",
  "Instituciones Financieras"
];

const RecaudacionesPage = () => {
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
                🏦 Servicios Financieros
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Recaudaciones y
                <span className="block text-gradient-gold mt-2">Servicios Bancarios</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                Red inter-bancaria para realizar transacciones financieras sin necesidad de acudir a los establecimientos bancarios. 
                Evite congestión y realice sus operaciones cerca de su hogar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-white to-secondary/30">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Servicios <span className="text-gradient-gold">Disponibles</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Amplia gama de servicios financieros para su comodidad
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/30 hover:border-primary/30 group hover:-translate-y-2 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center mb-5 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Benefits Section */}
            <motion.div
              className="bg-gradient-to-br from-primary/5 to-gold-light/5 rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Ventajas de Nuestro <span className="text-gradient-gold">Servicio</span>
                </h3>
                <p className="text-muted-foreground text-lg">
                  Apoyo integral para nuestros clientes
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Sin necesidad de acudir a bancos",
                  "Evite congestión bancaria",
                  "Cerca de su hogar o trabajo",
                  "Atención personalizada",
                  "Horarios extendidos",
                  "Múltiples entidades disponibles",
                  "Proceso rápido y seguro",
                  "Sin filas de espera",
                  "Personal capacitado"
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 bg-white p-5 rounded-xl shadow-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Banks Section */}
        <section className="py-16 bg-gradient-to-br from-secondary/20 to-white">
          <div className="container px-4 sm:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Building2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Entidades Financieras <span className="text-gradient-gold">Asociadas</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Red inter-bancaria con las principales instituciones del país
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {banks.map((bank, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all text-center border border-border/30"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <p className="font-semibold text-foreground">{bank}</p>
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
                  ¿Necesita Realizar una Transacción?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Visite cualquiera de nuestras sucursales y realice sus operaciones bancarias de forma rápida y segura.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/ubicaciones"
                    className="inline-block px-8 py-4 bg-gradient-gold text-dark font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    Ver Ubicaciones
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

export default RecaudacionesPage;
