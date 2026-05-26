import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Contact />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
