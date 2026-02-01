import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo_transparent_4x.png";

const footerLinks = {
  servicios: [
    { name: "Cambio de Divisas", href: "/cambio-divisas" },
    { name: "Envío de Dinero", href: "/western-union" },
    { name: "Compra de Oro", href: "/oro" },
    { name: "Courier", href: "/courier" },
    { name: "Recaudaciones", href: "/recaudaciones" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "/nosotros" },
    { name: "Franquicias", href: "/franquicias" },
    { name: "Trabaja con Nosotros", href: "/contacto" },
    { name: "Contacto", href: "/contacto" },
  ],
  legal: [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Aviso Legal", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/Western-Union-Franquicia-597056390700280/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/WFranquicia", label: "Twitter" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCqmCzNr5IgtpxExm5Jbprig", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      {/* Main footer */}
      <div className="container px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <img 
                src={logo} 
                alt="Punto Cambio" 
                className="h-12 sm:h-14 w-auto" 
              />
            </div>
            <p className="text-white/60 mb-4 sm:mb-6 max-w-sm text-sm sm:text-base">
              Más de 25 años brindando servicios transaccionales y cambio de divisas 
              con la confianza y seguridad que usted merece.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4">Servicios</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4">Empresa</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contacto</h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-xs sm:text-sm">
                  Valle de los Chillos, San Rafael<br />
                  Centro Comercial Plaza del Valle
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+593995710648"
                    className="text-white/60 hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    +593 99 571 0648
                  </a>
                  <a
                    href="tel:+59322867144"
                    className="text-white/60 hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    +593 2 286 7144
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@casasdecambios.com"
                  className="text-white/60 hover:text-primary transition-colors text-xs sm:text-sm break-all"
                >
                  info@casasdecambios.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Punto Cambio. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {footerLinks.legal.map((link, index) => (
              <button
                key={index}
                onClick={(e) => e.preventDefault()}
                className="text-white/40 hover:text-white/50 text-xs sm:text-sm transition-colors cursor-not-allowed"
                title="Próximamente disponible"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};