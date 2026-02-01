import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, TrendingUp, Clock, BadgeCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const currencies = [
  { code: "USD", name: "Dólar Americano", flag: "🇺🇸", rate: 1 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 1.09 },
  { code: "COP", name: "Peso Colombiano", flag: "🇨🇴", rate: 0.00025 },
  { code: "PEN", name: "Sol Peruano", flag: "🇵🇪", rate: 0.27 },
  { code: "BRL", name: "Real Brasileño", flag: "🇧🇷", rate: 0.20 },
  { code: "MXN", name: "Peso Mexicano", flag: "🇲🇽", rate: 0.059 },
  { code: "ARS", name: "Peso Argentino", flag: "🇦🇷", rate: 0.0010 },
  { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧", rate: 1.27 },
  { code: "BOB", name: "Boliviano", flag: "🇧🇴", rate: 0.14 },
  { code: "AUD", name: "Dólar Australiano", flag: "🇦🇺", rate: 0.64 },
];

export const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1;
  const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1;
  const convertedAmount = (parseFloat(amount || "0") * toRate) / fromRate;

  return (
    <section id="calculadora" className="bg-dark relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gold-light rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm mb-3 sm:mb-4">
              Calculadora de Cambio
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 sm:mb-4">
              Conozca Nuestras
              <span className="text-gradient-gold block">Tasas de Cambio</span>
            </h2>
            
            <p className="text-white/70 text-base md:text-lg mb-4 sm:mb-6 max-w-lg mx-auto lg:mx-0">
              Utilice nuestra calculadora para obtener una estimación rápida. 
              Visítenos para obtener las tasas más competitivas del mercado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: TrendingUp, text: "Mejores Tasas" },
                { icon: Clock, text: "Actualización Diaria" },
                { icon: BadgeCheck, text: "Sin Comisiones Ocultas" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calculator card */}
          <motion.div
            className="bg-white rounded-2xl p-5 md:p-6 shadow-elevated"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-3 sm:mb-4">
              Calculadora Rápida
            </h3>

            {/* From currency */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Usted envía
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 text-lg font-semibold h-11 sm:h-12"
                  placeholder="0.00"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full sm:w-32 h-11 sm:h-12 rounded-lg border border-input bg-background px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap button */}
            <div className="flex justify-center my-3">
              <button
                onClick={() => {
                  setFromCurrency(toCurrency);
                  setToCurrency(fromCurrency);
                }}
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-dark transition-colors group"
              >
                <ArrowRightLeft className="w-5 h-5 rotate-90 group-hover:rotate-[270deg] transition-transform duration-300" />
              </button>
            </div>

            {/* To currency */}
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Usted recibe
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <div className="flex-1 h-11 sm:h-12 rounded-lg bg-secondary flex items-center px-4">
                  <span className="text-lg font-semibold text-foreground">
                    {convertedAmount.toFixed(2)}
                  </span>
                </div>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full sm:w-32 h-11 sm:h-12 rounded-lg border border-input bg-background px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.flag} {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate info */}
            <div className="bg-secondary/50 rounded-lg p-3 mb-3 sm:mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                <span className="text-muted-foreground">Tasa de cambio</span>
                <span className="font-medium text-foreground">
                  1 {fromCurrency} = {(toRate / fromRate).toFixed(4)} {toCurrency}
                </span>
              </div>
            </div>

            <Button variant="gold" className="w-full" size="lg" asChild>
              <a href="#contacto">Obtener Cotización Exacta</a>
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              * Las tasas son referenciales. Consulte en nuestras oficinas para tasas exactas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};