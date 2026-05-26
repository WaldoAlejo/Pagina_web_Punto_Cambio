import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ChatBot } from "@/components/ChatBot";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import CalculatorPage from "./pages/CalculatorPage";
import LocationsPage from "./pages/LocationsPage";
import FranchisePage from "./pages/FranchisePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CourierPage from "./pages/CourierPage";
import OroPage from "./pages/OroPage";
import RecaudacionesPage from "./pages/RecaudacionesPage";
import CambioDivisasPage from "./pages/CambioDivisasPage";
import WesternUnionPage from "./pages/WesternUnionPage";
import PedidosPage from "./pages/PedidosPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <MobileBottomNav />
        <ChatBot />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/calculadora" element={<CalculatorPage />} />
          <Route path="/ubicaciones" element={<LocationsPage />} />
          <Route path="/franquicias" element={<FranchisePage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/courier" element={<CourierPage />} />
          <Route path="/oro" element={<OroPage />} />
          <Route path="/recaudaciones" element={<RecaudacionesPage />} />
          <Route path="/cambio-divisas" element={<CambioDivisasPage />} />
          <Route path="/western-union" element={<WesternUnionPage />} />
          <Route path="/pedidos" element={<PedidosPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
