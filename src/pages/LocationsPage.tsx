import { Navbar } from "@/components/Navbar";
import { LocationsMap } from "@/components/LocationsMap";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
const LocationsPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <LocationsMap />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default LocationsPage;
