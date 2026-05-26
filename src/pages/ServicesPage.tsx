import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Services />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
