import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <main className="container px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8">
            Política de <span className="text-gradient-gold">Privacidad</span>
          </h1>

          <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground">
            <p className="text-lg mb-6">
              En Punto Cambio valoramos su privacidad y nos comprometemos a proteger sus datos personales. Esta política explica cómo recopilamos, usamos y protegemos su información.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Información que Recopilamos</h2>
            <p>
              Podemos recopilar información personal como su nombre, número de identificación, dirección, número de teléfono y dirección de correo electrónico cuando utiliza nuestros servicios o se comunica con nosotros.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Uso de la Información</h2>
            <p>
              Utilizamos su información para: proporcionar nuestros servicios, cumplir con obligaciones legales y regulatorias, mejorar nuestros servicios, y comunicarnos con usted sobre transacciones o promociones.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra acceso no autorizado, pérdida o alteración. Solo el personal autorizado tiene acceso a sus datos personales.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Compartir Información</h2>
            <p>
              No vendemos ni alquilamos su información personal a terceros. Solo compartimos información cuando es necesario para prestar nuestros servicios o cuando la ley lo requiere.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Cookies y Tecnologías Similares</h2>
            <p>
              Nuestro sitio web puede utilizar cookies para mejorar la experiencia del usuario. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Sus Derechos</h2>
            <p>
              Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos a info@puntocambio.ec.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política de privacidad periódicamente. Le notificaremos sobre cambios significativos a través de nuestro sitio web.
            </p>

            <p className="mt-8 text-sm">
              Última actualización: {new Date().toLocaleDateString("es-EC", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
