import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, TrendingUp, Clock, BadgeCheck, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CurrencySelect } from "@/components/CurrencySelect";
import { useExchangeRates } from "@/hooks/useExchangeRates";

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 1.09,
  COP: 0.00025,
  PEN: 0.27,
  BRL: 0.20,
  MXN: 0.059,
  ARS: 0.0010,
  GBP: 1.27,
  BOB: 0.14,
  AUD: 0.64,
  CAD: 0.74,
  CHF: 1.15,
  JPY: 0.0067,
  CNY: 0.14,
};

const CURRENCY_META: Record<string, { name: string; flag: string }> = {
  USD: { name: "Dólar Americano", flag: "🇺🇸" },
  EUR: { name: "Euro", flag: "🇪🇺" },
  COP: { name: "Peso Colombiano", flag: "🇨🇴" },
  PEN: { name: "Sol Peruano", flag: "🇵🇪" },
  BRL: { name: "Real Brasileño", flag: "🇧🇷" },
  MXN: { name: "Peso Mexicano", flag: "🇲🇽" },
  ARS: { name: "Peso Argentino", flag: "🇦🇷" },
  GBP: { name: "Libra Esterlina", flag: "🇬🇧" },
  BOB: { name: "Boliviano", flag: "🇧🇴" },
  AUD: { name: "Dólar Australiano", flag: "🇦🇺" },
  CAD: { name: "Dólar Canadiense", flag: "🇨🇦" },
  CHF: { name: "Franco Suizo", flag: "🇨🇭" },
  JPY: { name: "Yen Japonés", flag: "🇯🇵" },
  CNY: { name: "Yuan Chino", flag: "🇨🇳" },
};

export const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const { data: rates, isLoading, isError } = useExchangeRates();

  /* Construir catálogo de monedas desde tasas reales + fallback */
  const currencies = useMemo(() => {
    const codes = rates && rates.length > 0
      ? rates.map((r) => r.code)
      : Object.keys(FALLBACK_RATES);

    return codes
      .map((code) => ({
        code,
        name: CURRENCY_META[code]?.name ?? code,
        flag: CURRENCY_META[code]?.flag ?? "🏳️",
        rate: rates?.find((r) => r.code === code)?.midRate ?? FALLBACK_RATES[code] ?? 1,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [rates]);

  const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1;
  const toRate   = currencies.find((c) => c.code === toCurrency)?.rate || 1;
  const convertedAmount = (parseFloat(amount || "0") * toRate) / fromRate;

  return (
    <section className="bg-gradient-to-br from-dark via-dark-lighter to-dark relative overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-gold-light rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-gold-light/20 text-white font-semibold text-sm mb-5 border border-primary/30">
              <ArrowRightLeft className="w-4 h-4 text-primary" />
              Calculadora de Cambio
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-5">
              Conozca Nuestras
              <span className="text-gradient-gold block mt-2">Tasas de Cambio</span>
            </h2>

            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Utilice nuestra calculadora para obtener una estimación rápida con tasas reales del mercado.
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

            {isError && (
              <div className="mb-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>No se pudieron cargar las tasas en vivo. Mostrando valores aproximados.</span>
              </div>
            )}

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
                  disabled={isLoading}
                />
                <CurrencySelect
                  currencies={currencies}
                  value={fromCurrency}
                  onChange={setFromCurrency}
                  disabled={isLoading}
                  placeholder="Buscar moneda que envía…"
                />
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
                aria-label="Intercambiar monedas"
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
                    {convertedAmount.toLocaleString("es-EC", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <CurrencySelect
                  currencies={currencies}
                  value={toCurrency}
                  onChange={setToCurrency}
                  disabled={isLoading}
                  placeholder="Buscar moneda que recibe…"
                />
              </div>
            </div>

            {/* Rate info */}
            <div className="bg-secondary/50 rounded-lg p-3 mb-3 sm:mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm gap-1">
                <span className="text-muted-foreground">Tasa de cambio (referencial)</span>
                <span className="font-medium text-foreground">
                  1 {fromCurrency} = {(toRate / fromRate).toFixed(4)} {toCurrency}
                </span>
              </div>
            </div>

            <Button variant="gold" className="w-full" size="lg" asChild>
              <a href="/calculadora">Obtener Cotización Exacta</a>
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-3">
              * Las tasas son referenciales del mercado internacional. Consulte en nuestras oficinas para tasas exactas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
