import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
      <main className="container px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8">
            Aviso <span className="text-gradient-gold">Legal</span>
          </h1>

          <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground">
            <p className="text-lg mb-6">
              El presente aviso legal regula el acceso y uso del sitio web de Punto Cambio.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Datos de la Empresa</h2>
            <p>
              <strong>Razón Social:</strong> Punto Cambio<br />
              <strong>Actividad:</strong> Casa de Cambios Autorizada<br />
              <strong>Dirección Matriz:</strong> Valle de los Chillos, San Rafael, Centro Comercial Plaza del Valle, Isla 2<br />
              <strong>Teléfono:</strong> +593 99 571 0648 / +593 2 286 7144<br />
              <strong>Email:</strong> info@puntocambio.ec
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Autorización y Regulación</h2>
            <p>
              Punto Cambio opera como casa de cambios autorizada en Ecuador, sujeta a la normativa del Banco Central del Ecuador y la Superintendencia de Bancos. Cumplimos con todas las regulaciones aplicables en materia de prevención de lavado de activos y financiamiento del terrorismo.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Exactitud de la Información</h2>
            <p>
              Nos esforzamos por mantener la información de este sitio web actualizada y precisa. Sin embargo, no garantizamos la exactitud, integridad o actualidad de todo el contenido. Las tasas de cambio mostradas son referenciales.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Enlaces Externos</h2>
            <p>
              Este sitio puede contener enlaces a sitios web de terceros. Punto Cambio no se hace responsable del contenido, políticas de privacidad o prácticas de estos sitios externos.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Legislación Aplicable</h2>
            <p>
              Este aviso legal se rige por las leyes de la República del Ecuador. Cualquier controversia será sometida a la jurisdicción de los tribunales competentes de la ciudad de Quito.
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

export default LegalPage;
