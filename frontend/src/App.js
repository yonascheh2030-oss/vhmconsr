import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LocationMarquee } from "@/components/LocationMarquee";
import { Services } from "@/components/Services";
import { Werkwijze } from "@/components/Werkwijze";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Pricing } from "@/components/Pricing";
import { Reviews } from "@/components/Reviews";
import { Werkgebied } from "@/components/Werkgebied";
import { LeadForm } from "@/components/LeadForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { AreaPage } from "@/components/AreaPage";

const Home = () => (
  <main>
    <Header />
    <Hero />
    <LocationMarquee />
    <Services />
    <Werkwijze />
    <BeforeAfter />
    <Pricing />
    <Reviews />
    <Werkgebied />
    <LeadForm />
    <FAQ />
    <Footer />
    <FloatingWhatsApp />
  </main>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, anchors: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App">
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/spoedloodgieter/:slug" element={<AreaPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
