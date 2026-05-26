import { Navbar } from "@/components/Navbar";
import { Franchise } from "@/components/Franchise";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
const FranchisePage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <Franchise />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default FranchisePage;
