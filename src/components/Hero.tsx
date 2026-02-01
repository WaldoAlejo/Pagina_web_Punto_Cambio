import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Shield, text: "100% Seguro" },
  { icon: Clock, text: "Servicio Rápido" },
  { icon: Award, text: "+25 Años" },
];

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container px-4 sm:px-6 relative z-10 py-16 sm:py-20 md:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/20 text-primary font-medium text-xs sm:text-sm mb-4 sm:mb-6 backdrop-blur-sm border border-primary/30">
              Casa de Cambios Autorizada en Ecuador
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experiencia y Confianza
            <span className="block text-gradient-gold">a Su Servicio</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Somos líderes en servicios transaccionales y cambio de divisas. 
            Ofrecemos las mejores tasas del mercado con la seguridad que usted merece.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              variant="gold" 
              size="lg"
              className="w-full sm:w-auto"
              asChild
            >
              <a href="#calculadora">
                Cotizar Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button 
              variant="outline-light" 
              size="lg" 
              className="w-full sm:w-auto"
              asChild
            >
              <a href="#servicios">Nuestros Servicios</a>
            </Button>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3 text-white/90"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <span className="font-medium text-sm sm:text-base">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};