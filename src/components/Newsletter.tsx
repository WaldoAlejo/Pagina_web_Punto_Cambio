import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "¡Suscripción exitosa!",
        description: "Recibirá información sobre nuestros servicios y tasas de cambio.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-dark via-dark-lighter to-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-light rounded-full blur-3xl" />
      </div>

      <div className="container px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6 shadow-gold">
            <Mail className="w-8 h-8 text-dark" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Manténgase Informado de
            <span className="text-gradient-gold"> Nuestras Tasas</span>
          </h2>

          <p className="text-white/70 text-base md:text-lg mb-8">
            Suscríbase a nuestro boletín y reciba información actualizada sobre 
            tasas de cambio, promociones y servicios especiales.
          </p>

          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Su correo electrónico"
              required
              className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15"
            />
            <Button 
              type="submit" 
              variant="gold" 
              size="lg" 
              className="h-12 px-8 whitespace-nowrap"
            >
              Suscribirse
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-white/40 text-xs mt-4">
            * No compartimos su información. Puede cancelar su suscripción en cualquier momento.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
