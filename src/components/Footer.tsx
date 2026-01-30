import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  servicios: [
    { name: "Cambio de Divisas", href: "#servicios" },
    { name: "Envío de Dinero", href: "#servicios" },
    { name: "Compra de Oro", href: "#servicios" },
    { name: "Courier", href: "#servicios" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "#nosotros" },
    { name: "Franquicias", href: "#franquicias" },
    { name: "Trabaja con Nosotros", href: "#contacto" },
    { name: "Contacto", href: "#contacto" },
  ],
  legal: [
    { name: "Términos y Condiciones", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "Aviso Legal", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      {/* Main footer */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-dark font-display font-bold text-xl">P</span>
              </div>
              <div>
                <span className="font-display text-xl font-bold">Punto Cambio</span>
                <span className="block text-xs text-white/60 tracking-wider uppercase">
                  Pagos & Cambios
                </span>
              </div>
            </div>
            <p className="text-white/60 mb-6 max-w-sm">
              Más de 25 años brindando servicios transaccionales y cambio de divisas 
              con la confianza y seguridad que usted merece.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-dark transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  Valle de los Chillos, San Rafael, Ecuador
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+593999999999"
                  className="text-white/60 hover:text-primary transition-colors text-sm"
                >
                  +593 99 999 9999
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@puntocambio.ec"
                  className="text-white/60 hover:text-primary transition-colors text-sm"
                >
                  info@puntocambio.ec
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Punto Cambio. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white/40 hover:text-primary text-sm transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};