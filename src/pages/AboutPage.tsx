import { Navbar } from "@/components/Navbar";
import { About } from "@/components/About";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
