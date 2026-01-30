import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, TrendingUp, Clock, BadgeCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const currencies = [
  { code: "USD", name: "Dólar Americano", flag: "🇺🇸", rate: 1 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", rate: 1.08 },
  { code: "COP", name: "Peso Colombiano", flag: "🇨🇴", rate: 0.00024 },
  { code: "PEN", name: "Sol Peruano", flag: "🇵🇪", rate: 0.27 },
];

export const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1;
  const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1;
  const convertedAmount = (parseFloat(amount || "0") * toRate) / fromRate;

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-light rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-medium text-sm mb-6">
              Calculadora de Cambio
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Conozca Nuestras
              <span className="text-gradient-gold block">Tasas de Cambio</span>
            </h2>
            
            <p className="text-white/70 text-lg mb-8">
              Utilice nuestra calculadora para obtener una estimación rápida. 
              Visítenos para obtener las tasas más competitivas del mercado.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: TrendingUp, text: "Mejores Tasas" },
                { icon: Clock, text: "Actualización Diaria" },
                { icon: BadgeCheck, text: "Sin Comisiones Ocultas" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Calculator card */}
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-elevated"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-display font-semibold text-foreground mb-6">
              Calculadora Rápida
            </h3>

            {/* From currency */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Usted envía
              </label>
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 text-lg font-semibold h-14"
                  placeholder="0.00"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-32 h-14 rounded-lg border border-input bg-background px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
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
            <div className="flex justify-center my-4">
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Usted recibe
              </label>
              <div className="flex gap-3">
                <div className="flex-1 h-14 rounded-lg bg-secondary flex items-center px-4">
                  <span className="text-lg font-semibold text-foreground">
                    {convertedAmount.toFixed(2)}
                  </span>
                </div>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-32 h-14 rounded-lg border border-input bg-background px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
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
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tasa de cambio</span>
                <span className="font-medium text-foreground">
                  1 {fromCurrency} = {(toRate / fromRate).toFixed(4)} {toCurrency}
                </span>
              </div>
            </div>

            <Button variant="gold" className="w-full" size="lg">
              Obtener Cotización Exacta
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              * Las tasas son referenciales. Consulte en nuestras oficinas para tasas exactas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};