import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Clock,
  BadgeCheck,
  ChevronRight,
  ArrowUpRight,
  Droplets,
  Zap,
  Wrench,
  Flame,
  ShowerHead,
  Wind,
  BatteryCharging,
} from "lucide-react";
import { Header } from "./Header";
import { LeadForm } from "./LeadForm";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { MaskLine, Reveal, ChapterTag } from "./Reveal";
import { AREAS } from "../constants/areas";
import { SITE } from "../constants/site";
import { useLang, areaPagePath, servicePagePath } from "../i18n/LangContext";

const SERVICES = [
  { icon: Droplets, slug: "spoedloodgieter" },
  { icon: Zap, slug: "elektricien" },
  { icon: Wrench, slug: "ontstopping" },
  { icon: Flame, slug: "verwarming" },
  { icon: ShowerHead, slug: "sanitair-renovatie" },
  { icon: Wind, slug: "airco" },
  { icon: BatteryCharging, slug: "laadpalen" },
];

export const AreaPage = () => {
  const { slug } = useParams();
  const { t, lang } = useLang();
  const area = AREAS.find((a) => a.slug === slug);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [slug, lang]);

  if (!area) return <Navigate to="/" replace />;

  const ap = t.areaPage;
  const data = t.areaData[area.slug];
  const fill = (s) => s.replaceAll("{area}", area.name).replaceAll("{time}", area.time).replaceAll("{phone}", SITE.phoneDisplay);
  const others = AREAS.filter((a) => a.slug !== area.slug).slice(0, 8);
  const pageUrl = `${SITE.domain}${areaPagePath(lang, area.slug)}`;
  const altUrl = `${SITE.domain}${areaPagePath(lang === "fr" ? "nl" : "fr", area.slug)}`;
  const metaDesc = fill(ap.metaDesc);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Plumber", "Electrician"],
    name: "Sanivolt",
    url: pageUrl,
    telephone: "+32470000000",
    email: SITE.email,
    description: metaDesc,
    areaServed: { "@type": "City", name: area.name },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <main>
      <Helmet>
        <html lang={lang} />
        <title>{fill(ap.metaTitle)}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hreflang={lang} href={pageUrl} />
        <link rel="alternate" hreflang={lang === "fr" ? "nl" : "fr"} href={altUrl} />
        <meta property="og:title" content={fill(ap.metaTitle)} />
        <meta property="og:description" content={fill(ap.ogDesc)} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <section className="relative pt-[70px] bg-brand-paper overflow-hidden">
        <div className="absolute -top-20 -right-32 w-[480px] h-[480px] rounded-full bg-brand-volt/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-20">
          <nav className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-10" data-testid="area-breadcrumb">
            <Link to={lang === "fr" ? "/fr" : "/"} className="hover:text-brand-blue transition-colors" data-testid="area-breadcrumb-home">
              {ap.breadcrumbHome}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{ap.breadcrumbRegion}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-blue">{area.name}</span>
          </nav>

          <h1 className="font-outfit font-black uppercase tracking-tighter leading-[0.95] text-brand-ink text-[11vw] sm:text-6xl lg:text-7xl">
            <MaskLine delay={0.15}>{ap.h1l1}</MaskLine>
            <MaskLine delay={0.3}>{ap.h1l2}</MaskLine>
            <MaskLine delay={0.45}>
              <span className="text-brand-blue">{ap.h1pre}{area.name}.</span>
            </MaskLine>
          </h1>

          <MaskLine delay={0.65}>
            <p className="mt-8 max-w-2xl font-manrope text-base md:text-lg leading-relaxed text-zinc-500">
              {data.intro}
            </p>
          </MaskLine>

          <MaskLine delay={0.8}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={SITE.phoneHref}
                data-testid="area-call-button"
                className="flex items-center gap-3 bg-brand-ink text-white px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0038FF] transition-transform duration-200"
              >
                <Phone className="w-4 h-4" />
                {ap.call} {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="area-whatsapp-button"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#09090B] transition-transform duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </MaskLine>

          <MaskLine delay={0.95}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <span className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-wide uppercase text-zinc-500">
                <Clock className="w-4 h-4 text-brand-blue" /> {fill(ap.chipTime)}
              </span>
              <span className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-wide uppercase text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-brand-blue" /> {ap.chipGuarantee}
              </span>
              <span className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-wide uppercase text-zinc-500">
                <BadgeCheck className="w-4 h-4 text-brand-blue" /> {ap.chipCertified}
              </span>
            </div>
          </MaskLine>
        </div>
      </section>

      <section className="bg-brand-ink text-white py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <Reveal>
            <h2 className="font-outfit font-black uppercase tracking-tighter text-2xl sm:text-3xl lg:text-4xl">
              {ap.servicesTitleA}<span className="text-brand-volt">{area.name}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10" data-testid="area-services-strip">
            {SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                to={servicePagePath(lang, s.slug, area.slug)}
                data-testid={`area-service-${i}`}
                className="group flex items-center justify-between gap-3 bg-brand-ink px-6 py-6 hover:bg-white/[0.05] transition-colors duration-300"
              >
                <span className="flex items-center gap-3">
                  <s.icon className="w-5 h-5 text-brand-volt" strokeWidth={1.8} />
                  <span className="font-outfit font-bold text-base tracking-tight">{t.serviceData[s.slug].name}</span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-brand-volt opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ChapterTag number="02" label={fill(ap.localChapter)} />
          <div className="grid lg:grid-cols-12 gap-12">
            <Reveal className="lg:col-span-7">
              <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-3xl sm:text-4xl lg:text-5xl leading-[0.95]">
                {ap.localHeadingA}<span className="text-brand-blue">{area.name}</span>
              </h2>
              <p className="mt-6 font-manrope text-base md:text-lg text-zinc-500 leading-relaxed">{data.extra}</p>
              <p className="mt-4 font-manrope text-base text-zinc-500 leading-relaxed">
                {fill(ap.pricePara)}
              </p>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-5">
              <div className="border border-zinc-200 bg-brand-paper p-8">
                <p className="font-manrope text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-blue" /> {ap.nearbyLabel}
                </p>
                <div className="flex flex-wrap gap-2" data-testid="area-interlinks">
                  {others.map((o) => (
                    <Link
                      key={o.slug}
                      to={areaPagePath(lang, o.slug)}
                      data-testid={`area-interlink-${o.slug}`}
                      className="border border-zinc-200 bg-white px-4 py-2 font-outfit font-bold text-xs tracking-tight text-brand-ink hover:border-brand-blue hover:text-brand-blue transition-colors duration-200"
                    >
                      {o.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <LeadForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};
