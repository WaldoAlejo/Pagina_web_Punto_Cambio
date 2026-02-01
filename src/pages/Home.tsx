import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { QuickActions } from "@/components/QuickActions";
import { TrustSection } from "@/components/TrustSection";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <QuickActions />
        <TrustSection />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
