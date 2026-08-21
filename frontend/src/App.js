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
import { ServicePage } from "@/components/ServicePage";
import { Team } from "@/components/Team";
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
    <Team />
    <Werkgebied />
    <LeadForm />
    <FAQ />
    <Footer />
    <FloatingWhatsApp />
  </main>
);

const HOME_META = {
  fr: {
    title: "Sanivolt | Plombier & Électricien d'urgence 24/7 — Zaventem, Diegem, Haren, Schaerbeek",
    desc: "Sanivolt : plombier & électricien d'urgence, joignable 24/7 à Zaventem, Diegem, Haren, Bruxelles-Midi, Schaerbeek et environs. Fuite, bouchon, panne de courant ? Sur place dans l'heure. Appelez le +32 470 00 00 00.",
  },
  en: {
    title: "Sanivolt | Emergency Plumber & Electrician 24/7 — Zaventem, Diegem, Haren, Schaerbeek",
    desc: "Sanivolt: emergency plumber & electrician, available 24/7 in Zaventem, Diegem, Haren, Brussels-South, Schaerbeek and surroundings. Leak, blockage or power cut? On site within the hour. Call +32 470 00 00 00.",
  },
  es: {
    title: "Sanivolt | Fontanero y Electricista de urgencia 24/7 — Zaventem, Diegem, Haren, Schaerbeek",
    desc: "Sanivolt: fontanero y electricista de urgencia, disponibles 24/7 en Zaventem, Diegem, Haren, Bruselas-Sur, Schaerbeek y alrededores. ¿Fuga, atasco o apagón? In situ en una hora. Llame al +32 470 00 00 00.",
  },
};

const HomeMeta = ({ lang }) => {
  const m = HOME_META[lang];
  if (!m) return null;
  return (
    <Helmet>
      <html lang={lang} />
      <title>{m.title}</title>
      <meta name="description" content={m.desc} />
      <link rel="canonical" href={`${SITE.domain}/${lang}`} />
      <link rel="alternate" hreflang="nl" href={`${SITE.domain}/`} />
      <link rel="alternate" hreflang="fr" href={`${SITE.domain}/fr`} />
      <link rel="alternate" hreflang="en" href={`${SITE.domain}/en`} />
      <link rel="alternate" hreflang="es" href={`${SITE.domain}/es`} />
      <link rel="alternate" hreflang="x-default" href={`${SITE.domain}/`} />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.desc} />
      <meta property="og:url" content={`${SITE.domain}/${lang}`} />
    </Helmet>
  );
};

const LANGS = ["nl", "fr", "en", "es"];
const AREA_PREFIX = { nl: "spoedloodgieter", fr: "plombier-electricien", en: "plumber-electrician", es: "fontanero-electricista" };
const HUB_PREFIX = { nl: "diensten", fr: "services", en: "services", es: "servicios" };

const langRoutes = (lang) => {
  const base = lang === "nl" ? "" : `/${lang}`;
  return [
    <Route key={`${lang}-home`} path={base === "" ? "/" : base} element={<LangProvider lang={lang}><HomeMeta lang={lang} /><Home /></LangProvider>} />,
    <Route key={`${lang}-area`} path={`${base}/${AREA_PREFIX[lang]}/:slug`} element={<LangProvider lang={lang}><AreaPage /></LangProvider>} />,
    <Route key={`${lang}-hub`} path={`${base}/${HUB_PREFIX[lang]}/:slug`} element={<LangProvider lang={lang}><ServicePage /></LangProvider>} />,
    <Route key={`${lang}-sa`} path={`${base}/:serviceSlug/:areaSlug`} element={<LangProvider lang={lang}><ServiceAreaPage /></LangProvider>} />,
  ];
};

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
            {LANGS.map((lang) => langRoutes(lang))}
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
