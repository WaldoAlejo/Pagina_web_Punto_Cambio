import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Banknote, Send, Info, ShoppingCart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import heroBg from "@/assets/hero-bg.jpg";

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

const PedidosPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currency: "",
    amount: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pedido Recibido",
      description: "Hemos recibido su solicitud. Nos pondremos en contacto pronto para coordinar en el punto de atención.",
    });
    setFormData({ name: "", email: "", phone: "", currency: "", amount: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative flex items-center overflow-hidden min-h-[40vh] sm:min-h-[50vh]">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>

          <div className="container px-4 sm:px-6 relative z-10 py-12">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-gold-light/20 text-white font-semibold text-sm mb-6 border border-primary/30">
                <ShoppingCart className="w-4 h-4 text-primary" />
                Reserva de Divisas
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6">
                Realiza tu <span className="text-gradient-gold">Pedido</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                Solicita la divisa que necesites de forma anticipada y coordina tu atención personalizada.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              {/* Information Column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
                  <h2 className="text-3xl font-display font-bold mb-6">
                    Información <span className="text-gradient-gold">Importante</span>
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                      <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                        <Info className="w-6 h-6 text-dark" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Tasas de Cambio</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Las tasas de cambio se negocian directamente en nuestro punto de atención. Este formulario es solo para solicitar la disponibilidad de la divisa.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                      <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-dark" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Atención Personalizada</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Una vez enviado el pedido, nuestro equipo se pondrá en contacto para confirmar stock y coordinar su visita.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-border/50">
                      <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0">
                        <Banknote className="w-6 h-6 text-dark" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">Seguridad y Confianza</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          Todas nuestras transacciones son seguras y se realizan bajo estrictos estándares de transparencia.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-dark rounded-2xl text-white">
                    <p className="text-sm italic opacity-80">
                      "En Punto Cambio, valoramos su tiempo. Al realizar un pedido previo, podemos asegurar que la divisa que necesita esté lista para su retiro."
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Form Column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-card rounded-3xl p-8 shadow-card border border-border/50"
                >
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-8">
                    Detalles del Pedido
                  </h3>

                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nombre Completo
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Su nombre"
                          required
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Teléfono de Contacto
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+593 ..."
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Correo Electrónico
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="correo@ejemplo.com"
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Divisa Requerida
                        </label>
                        <Select
                          onValueChange={(value) => setFormData({ ...formData, currency: value })}
                          value={formData.currency}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Seleccione divisa" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((c) => (
                              <SelectItem key={c.code} value={c.code}>
                                <span className="flex items-center gap-2">
                                  <span>{c.flag}</span>
                                  <span>{c.code} - {c.name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Monto Aproximado
                        </label>
                        <Input
                          type="number"
                          value={formData.amount}
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          placeholder="0.00"
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Notas Adicionales
                      </label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Cualquier detalle adicional que desee mencionar..."
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button type="submit" variant="gold" size="lg" className="w-full h-14 text-lg">
                      Realizar Pedido
                      <Send className="w-5 h-5 ml-2" />
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-4">
                      * Al hacer clic en "Realizar Pedido", usted acepta que un asesor se ponga en contacto con usted para coordinar su solicitud.
                    </p>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PedidosPage;
