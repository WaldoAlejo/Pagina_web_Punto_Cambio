import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuickActions } from "@/components/QuickActions";
import { Services } from "@/components/Services";
import { CurrencyCalculator } from "@/components/CurrencyCalculator";
import { TrustSection } from "@/components/TrustSection";
import { LocationsMap } from "@/components/LocationsMap";
import { Franchise } from "@/components/Franchise";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CurrencyCalculator />
        <QuickActions />
        <TrustSection />
        <LocationsMap />
        <Franchise />
        <About />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;