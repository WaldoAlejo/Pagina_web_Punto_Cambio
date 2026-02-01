import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: Shield, text: "100% Seguro" },
  { icon: Clock, text: "Servicio Rápido" },
  { icon: Award, text: "+25 Años" },
];

export const Hero = () => {
  return (
    <section
      className="relative flex items-center overflow-hidden min-h-[calc(100vh-64px)] lg:min-h-screen"
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
            <span className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-primary/20 to-gold-light/20 text-white font-semibold text-xs sm:text-sm mb-6 sm:mb-8 backdrop-blur-sm border border-primary/40 shadow-lg">
              <Award className="w-4 h-4 text-primary" />
              Casa de Cambios Autorizada en Ecuador
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experiencia y Confianza
            <span className="block text-gradient-gold mt-2">a Su Servicio</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-2xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Somos líderes en servicios transaccionales y cambio de divisas. 
            Ofrecemos las mejores tasas del mercado con la seguridad que usted merece.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button 
              variant="gold" 
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-6 shadow-xl shadow-primary/50 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-300"
              asChild
            >
              <Link to="/calculadora">
                Cotizar Ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline-light" 
              size="lg" 
              className="w-full sm:w-auto text-base px-8 py-6 border-2 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link to="/servicios">Nuestros Servicios</Link>
            </Button>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            className="flex flex-wrap gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/20 shadow-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center shadow-md">
                  <feature.icon className="w-5 h-5 text-dark" />
                </div>
                <span className="text-white font-semibold text-sm sm:text-base">{feature.text}</span>
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