import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";
import { Header } from "./Header";
import { LeadForm } from "./LeadForm";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { MaskLine, Reveal, ChapterTag } from "./Reveal";
import { AREAS } from "../constants/areas";
import { SERVICE_INFO } from "../constants/services";
import { SITE, IMAGES } from "../constants/site";
import {
  useLang,
  homePath,
  areaPagePath,
  servicePagePath,
  serviceHubPath,
  SERVICE_SLUGS,
} from "../i18n/LangContext";
import { HUB } from "../i18n/hub";

const HUB_IMAGES = {
  "spoedloodgieter": IMAGES.plumbing,
  "elektricien": IMAGES.electric,
  "ontstopping": IMAGES.plumbing,
  "verwarming": IMAGES.hero,
  "sanitair-renovatie": IMAGES.renovation,
  "airco": IMAGES.hero,
  "laadpalen": IMAGES.electric,
};

export const ServicePage = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const hub = HUB[lang];
  const service = SERVICE_INFO.find(
    (s) => (lang === "nl" ? s.slug : SERVICE_SLUGS[lang][s.slug]) === slug
  );

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [slug, lang]);

  if (!service) return <Navigate to={homePath(lang)} replace />;

  const SD = t.serviceData[service.slug];
  const ap = t.areaPage;
  const fill = (s) =>
    s.replaceAll("{service}", SD.name).replaceAll("{price}", SD.price).replaceAll("{desc}", SD.desc).replaceAll("{phone}", SITE.phoneDisplay);
  const pageUrl = `${SITE.domain}${serviceHubPath(lang, service.slug)}`;

  return (
    <main>
      <Helmet>
        <html lang={lang} />
        <title>{fill(hub.metaTitle)}</title>
        <meta name="description" content={fill(hub.metaDesc)} />
        <link rel="canonical" href={pageUrl} />
        {["nl", "fr", "en", "es"].map((l) => (
          <link key={l} rel="alternate" hreflang={l} href={`${SITE.domain}${serviceHubPath(l, service.slug)}`} />
        ))}
        <meta property="og:title" content={fill(hub.metaTitle)} />
        <meta property="og:description" content={fill(hub.ogDesc)} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      <Header />

      <section className="relative pt-[70px] bg-brand-paper overflow-hidden">
        <div className="absolute -top-20 -right-32 w-[480px] h-[480px] rounded-full bg-brand-volt/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-20">
          <nav className="flex flex-wrap items-center gap-2 font-manrope text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-10" data-testid="hub-breadcrumb">
            <Link to={homePath(lang)} className="hover:text-brand-blue transition-colors" data-testid="hub-breadcrumb-home">
              {ap.breadcrumbHome}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{hub.breadcrumbServices}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-blue">{SD.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h1 className="font-outfit font-black uppercase tracking-tighter leading-[0.95] text-brand-ink text-[10vw] sm:text-6xl lg:text-7xl">
                <MaskLine delay={0.15}>
                  <span className="text-brand-blue">{SD.name}</span>
                </MaskLine>
                <MaskLine delay={0.3}>
                  <span className="text-3xl sm:text-4xl lg:text-5xl text-zinc-400">{hub.h1b}</span>
                </MaskLine>
              </h1>
              <MaskLine delay={0.5}>
                <p className="mt-8 max-w-2xl font-manrope text-base md:text-lg leading-relaxed text-zinc-500">
                  {SD.desc}
                  {hub.introSuffix}
                </p>
              </MaskLine>
              <MaskLine delay={0.65}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a
                    href={SITE.phoneHref}
                    data-testid="hub-call-button"
                    className="flex items-center gap-3 bg-brand-ink text-white px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0038FF] transition-transform duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    {hub.call} {SITE.phoneDisplay}
                  </a>
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="hub-whatsapp-button"
                    className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#09090B] transition-transform duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </MaskLine>
              <MaskLine delay={0.8}>
                <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                  <span className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-wide uppercase text-zinc-500">
                    <Clock className="w-4 h-4 text-brand-blue" /> 24/7
                  </span>
                  <span className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-wide uppercase text-zinc-500">
                    <ShieldCheck className="w-4 h-4 text-brand-blue" /> {ap.chipGuarantee}
                  </span>
                  <span className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-wide uppercase text-zinc-500">
                    <BadgeCheck className="w-4 h-4 text-brand-blue" /> {SD.price}
                  </span>
                </div>
              </MaskLine>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative">
                  <div className="absolute -inset-3 border border-brand-blue/30 translate-x-4 translate-y-4 pointer-events-none" />
                  <div className="relative overflow-hidden h-[300px] lg:h-[420px]">
                    <img
                      src={HUB_IMAGES[service.slug]}
                      alt={`${SD.name} — Sanivolt`}
                      className="w-full h-full object-cover grayscale-[35%] contrast-110"
                      data-testid="hub-image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-ink text-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-outfit font-black text-sm tracking-[0.3em] text-brand-volt">01</span>
            <span className="h-px flex-1 bg-white/15" />
            <span className="font-manrope text-xs font-semibold tracking-[0.3em] uppercase text-zinc-400">
              {hub.whatLabel}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10" data-testid="hub-bullets">
            {SD.bullets.map((b, i) => (
              <Reveal key={b} delay={i * 0.06} className="bg-brand-ink">
                <div className="flex items-center gap-4 px-6 py-6">
                  <CheckCircle2 className="w-5 h-5 text-brand-volt shrink-0" />
                  <span className="font-outfit font-bold text-base tracking-tight">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 border border-white/15 p-6 lg:p-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-10" data-testid="hub-price">
              <span className="font-manrope text-[11px] font-bold tracking-[0.25em] uppercase text-brand-volt shrink-0">
                {hub.priceLabel}
              </span>
              <span className="font-outfit font-black text-2xl lg:text-3xl tracking-tight shrink-0">{SD.price}</span>
              <p className="font-manrope text-sm text-zinc-400 leading-relaxed">{fill(hub.pricePara)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ChapterTag number="02" label={t.werkgebied.chapterLabel} />
          <Reveal>
            <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-3xl sm:text-4xl lg:text-5xl leading-[0.95]">
              {hub.areasTitle}
            </h2>
            <p className="mt-4 font-manrope text-base text-zinc-500">{hub.areasIntro}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-3" data-testid="hub-areas">
              {AREAS.map((a) => (
                <Link
                  key={a.slug}
                  to={servicePagePath(lang, service.slug, a.slug)}
                  data-testid={`hub-area-${a.slug}`}
                  className="inline-flex items-center gap-2 border border-zinc-200 bg-brand-paper px-5 py-3 font-outfit font-bold text-sm tracking-tight text-brand-ink hover:border-brand-blue hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  {SD.name} {a.name}
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 font-manrope text-sm text-zinc-400">
              <Link to={areaPagePath(lang, "zaventem")} className="text-brand-blue underline underline-offset-4" data-testid="hub-area-overview">
                {ap.breadcrumbRegion}
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <LeadForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};
