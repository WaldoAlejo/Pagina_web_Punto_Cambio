import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Ubicaciones", href: "#ubicaciones" },
  { name: "Franquicias", href: "#franquicias" },
  { name: "Nosotros", href: "#nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-dark text-white/80 text-sm py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+593995710648" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+593 99 571 0648</span>
            </a>
            <a href="tel:+59322867144" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+593 2 286 7144</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Valle de los Chillos - Plaza del Valle</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary font-semibold">Lun - Vie: 9:00 - 18:00 | Sáb: 9:00 - 14:00</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-lg"
            : "bg-white/95 backdrop-blur-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 sm:px-6 flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="text-dark font-display font-bold text-lg md:text-xl">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base md:text-xl font-bold text-foreground">
                Punto Cambio
              </span>
              <span className="text-[9px] md:text-xs text-muted-foreground tracking-wider uppercase hidden sm:block">
                Pagos & Cambios
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    const navbarHeight = 104; // Top bar (40px) + navbar (64px)
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                  }
                }}
                className="text-foreground/80 hover:text-primary font-medium transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="gold" 
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#calculadora');
                if (target) {
                  const navbarHeight = 104;
                  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
              }}
            >
              <a href="#calculadora">Cotizar Ahora</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t shadow-lg"
            >
              <div className="container py-6 flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      setTimeout(() => {
                        const target = document.querySelector(item.href);
                        if (target) {
                          const offset = 56; // Navbar mobile height
                          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                        }
                      }, 300);
                    }}
                    className="text-foreground/80 hover:text-primary font-medium py-3 px-4 rounded-lg hover:bg-secondary/50 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
                <Button 
                  variant="gold" 
                  className="mt-4 w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => {
                      const target = document.querySelector('#calculadora');
                      if (target) {
                        const offset = 56;
                        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                      }
                    }, 300);
                  }}
                >
                  <a href="#calculadora">Cotizar Ahora</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};