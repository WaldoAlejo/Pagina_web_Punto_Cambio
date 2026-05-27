import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-190x70.png";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Pedidos", href: "/pedidos" },
  { name: "Ubicaciones", href: "/ubicaciones" },
  { name: "Franquicias", href: "/franquicias" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Contacto", href: "/contacto" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* Top bar - desktop only */}
      <div className="hidden lg:block bg-gradient-to-r from-dark via-dark-lighter to-dark text-white/90 text-sm py-3 border-b border-primary/20">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="tel:+593995710648" className="flex items-center gap-2 hover:text-primary transition-all duration-300 group">
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">+593 99 571 0648</span>
            </a>
            <a href="tel:+59322867144" className="flex items-center gap-2 hover:text-primary transition-all duration-300 group">
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">+593 2 286 7144</span>
            </a>
            <span className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Valle de los Chillos - Plaza del Valle</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gradient-gold font-semibold tracking-wide">Lun - Sáb: 8:30 - 18:30</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b pt-safe-top ${
          scrolled
            ? "bg-white shadow-xl border-border/50"
            : "bg-white/98 backdrop-blur-md border-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="Punto Cambio" 
              className="h-10 sm:h-12 md:h-14 w-auto transition-all duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-primary/5 font-medium transition-all duration-300 relative group ${
                  location.pathname === item.href ? 'text-primary bg-primary/10' : ''
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-gold transition-all duration-300 ${
                  location.pathname === item.href ? 'w-6' : 'w-0 group-hover:w-6'
                }`} />
              </Link>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="gold" 
              size="lg"
              asChild
            >
              <Link to="/calculadora">Cotizar Ahora</Link>
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
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`text-foreground/80 hover:text-primary font-medium py-3 px-4 rounded-lg hover:bg-secondary/50 transition-all ${
                      location.pathname === item.href ? 'bg-secondary/50 text-primary' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button 
                  variant="gold" 
                  className="mt-4 w-full"
                  asChild
                >
                  <Link to="/calculadora">Cotizar Ahora</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};