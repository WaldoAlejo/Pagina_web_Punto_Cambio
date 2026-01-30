import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { CurrencyCalculator } from "@/components/CurrencyCalculator";
import { LocationsMap } from "@/components/LocationsMap";
import { Franchise } from "@/components/Franchise";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <CurrencyCalculator />
        <LocationsMap />
        <Franchise />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;