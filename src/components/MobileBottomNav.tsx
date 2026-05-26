import { Link, useLocation } from "react-router-dom";
import { Home, LayoutGrid, Calculator, MapPin, Phone } from "lucide-react";

const navItems = [
  { icon: Home,       label: "Inicio",     href: "/" },
  { icon: LayoutGrid, label: "Servicios",  href: "/servicios" },
  { icon: Calculator, label: "Cotizar",    href: "/calculadora", primary: true },
  { icon: MapPin,     label: "Ubicación",  href: "/ubicaciones" },
  { icon: Phone,      label: "Contacto",   href: "/contacto" },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/50 shadow-2xl" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          if (item.primary) {
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex flex-col items-center justify-center relative"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/40 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-gold scale-110"
                    : "bg-gradient-gold"
                }`}>
                  <Icon className="w-5 h-5 text-dark" />
                </div>
                <span className="text-[10px] font-semibold text-primary mt-0.5 leading-none">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                isActive ? "bg-primary/10" : ""
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-medium leading-none ${
                isActive ? "font-semibold" : ""
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
