import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    details: ["Valle de los Chillos, San Rafael", "Centro Comercial Plaza del Valle"],
  },
  {
    icon: Phone,
    title: "Teléfono",
    details: ["+593 99 571 0648", "+593 2 286 7144"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@casasdecambios.com", "franquicias@casasdecambios.com"],
  },
  {
    icon: Clock,
    title: "Horario",
    details: ["Lunes a Viernes: 9:00 - 18:00", "Sábados: 9:00 - 14:00"],
  },
];

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="bg-background py-8 md:py-12 lg:py-16">
      <div className="container px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Contáctenos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Estamos Aquí Para
            <span className="text-gradient-gold"> Ayudarle</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg px-4">
            ¿Tiene alguna pregunta o desea más información? Contáctenos y le 
            responderemos a la brevedad posible.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=80" 
              alt="Contact us"
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/30 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xl font-semibold">¿Necesitas ayuda?</p>
              <p className="text-white/80">Nuestro equipo está listo para atenderte</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <motion.div
            className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 bg-card rounded-xl shadow-card border border-border/50"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-gold flex items-center justify-center flex-shrink-0 shadow-gold">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-dark" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                    {item.title}
                  </h4>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-muted-foreground text-xs sm:text-sm truncate">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/50"
            >
              <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                Envíenos un Mensaje
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
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
                    className="h-11 sm:h-12"
                  />
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
                    className="h-11 sm:h-12"
                  />
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teléfono
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+593 99 571 0648"
                  className="h-11 sm:h-12"
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mensaje
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="¿En qué podemos ayudarle?"
                  required
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full">
                Enviar Mensaje
                <Send className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};