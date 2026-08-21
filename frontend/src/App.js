import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
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
import { ServiceAreaPage } from "@/components/ServiceAreaPage";
import { LangProvider } from "@/i18n/LangContext";
import { SITE } from "@/constants/site";

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

const HomeFrMeta = () => (
  <Helmet>
    <html lang="fr" />
    <title>Sanivolt | Plombier & Électricien d'urgence 24/7 — Zaventem, Diegem, Haren, Schaerbeek</title>
    <meta
      name="description"
      content="Sanivolt : plombier & électricien d'urgence, joignable 24/7 à Zaventem, Diegem, Haren, Bruxelles-Midi, Schaerbeek et environs. Fuite, bouchon, panne de courant ? Sur place dans l'heure. Appelez le +32 470 00 00 00."
    />
    <link rel="canonical" href={`${SITE.domain}/fr`} />
    <link rel="alternate" hreflang="nl" href={`${SITE.domain}/`} />
    <link rel="alternate" hreflang="fr" href={`${SITE.domain}/fr`} />
    <link rel="alternate" hreflang="x-default" href={`${SITE.domain}/`} />
    <meta property="og:title" content="Sanivolt | Plombier & Électricien d'urgence 24/7" />
    <meta property="og:description" content="Fuite, bouchon ou panne de courant ? Sanivolt est là 24/7 à Zaventem, Diegem, Haren, Bruxelles-Midi, Schaerbeek et environs. Sur place dans l'heure." />
    <meta property="og:url" content={`${SITE.domain}/fr`} />
    <meta property="og:locale" content="fr_BE" />
  </Helmet>
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
            <Route path="/" element={<LangProvider lang="nl"><Home /></LangProvider>} />
            <Route path="/fr" element={<LangProvider lang="fr"><HomeFrMeta /><Home /></LangProvider>} />
            <Route path="/spoedloodgieter/:slug" element={<LangProvider lang="nl"><AreaPage /></LangProvider>} />
            <Route path="/fr/plombier-electricien/:slug" element={<LangProvider lang="fr"><AreaPage /></LangProvider>} />
            <Route path="/fr/:serviceSlug/:areaSlug" element={<LangProvider lang="fr"><ServiceAreaPage /></LangProvider>} />
            <Route path="/:serviceSlug/:areaSlug" element={<LangProvider lang="nl"><ServiceAreaPage /></LangProvider>} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
