import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuickActions } from "@/components/QuickActions";
import { NearestBranchBanner } from "@/components/NearestBranchBanner";
import { ExchangeRates } from "@/components/ExchangeRates";
import { Services } from "@/components/Services";
import { CurrencyCalculator } from "@/components/CurrencyCalculator";
import { TrustSection } from "@/components/TrustSection";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden pb-safe-bottom">
      <Navbar />
      <main>
        <Hero />
        <QuickActions />
        <NearestBranchBanner />
        <ExchangeRates />
        <Services />
        <CurrencyCalculator />
        <TrustSection />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
