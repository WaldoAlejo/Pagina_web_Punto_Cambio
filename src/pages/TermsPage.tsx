import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <main className="container px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8">
            Términos y <span className="text-gradient-gold">Condiciones</span>
          </h1>

          <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground">
            <p className="text-lg mb-6">
              Bienvenido a Punto Cambio. Al utilizar nuestros servicios, usted acepta los siguientes términos y condiciones. Le recomendamos leerlos detenidamente.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Servicios Ofrecidos</h2>
            <p>
              Punto Cambio es una casa de cambios autorizada en Ecuador que ofrece servicios de compra y venta de divisas, envío de dinero a través de Western Union, compra y venta de oro, servicios de courier, recaudaciones y franquicias.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Tasas de Cambio</h2>
            <p>
              Las tasas de cambio publicadas en nuestro sitio web son referenciales y pueden variar sin previo aviso. La tasa final se confirmará en el momento de la transacción en cualquiera de nuestros puntos de atención.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Documentación Requerida</h2>
            <p>
              Para realizar transacciones de cambio de divisas, el cliente debe presentar su cédula de identidad o pasaporte vigente. Para montos superiores a los establecidos por la normativa vigente, se requerirá documentación adicional según las regulaciones del SRI y la UIF.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Limitaciones de Responsabilidad</h2>
            <p>
              Punto Cambio no se hace responsable por fluctuaciones del mercado cambiario que puedan afectar las tasas entre el momento de la cotización y la ejecución de la transacción. Las transacciones son finales una vez confirmadas y pagadas.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseño, es propiedad de Punto Cambio y está protegido por las leyes de propiedad intelectual.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Modificaciones</h2>
            <p>
              Punto Cambio se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor desde su publicación en el sitio web.
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

export default TermsPage;
