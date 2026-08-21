import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  MapPin,
} from "lucide-react";
import { Header } from "./Header";
import { LeadForm } from "./LeadForm";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { MaskLine, Reveal, ChapterTag } from "./Reveal";
import { AREAS } from "../constants/areas";
import { SERVICE_INFO } from "../constants/services";
import { SITE } from "../constants/site";
import { useLang, areaPagePath, servicePagePath, NL2FR_SERVICE } from "../i18n/LangContext";

export const ServiceAreaPage = () => {
  const { serviceSlug, areaSlug } = useParams();
  const { t, lang } = useLang();
  const service = SERVICE_INFO.find(
    (s) => (lang === "fr" ? NL2FR_SERVICE[s.slug] : s.slug) === serviceSlug
  );
  const area = AREAS.find((a) => a.slug === areaSlug);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [serviceSlug, areaSlug, lang]);

  if (!service || !area) return <Navigate to="/" replace />;

  const sp = t.servicePage;
  const ap = t.areaPage;
  const SD = t.serviceData[service.slug];
  const AD = t.areaData[area.slug];
  const fill = (s) =>
    s.replaceAll("{service}", SD.name).replaceAll("{area}", area.name).replaceAll("{time}", area.time).replaceAll("{phone}", SITE.phoneDisplay).replaceAll("{price}", SD.price).replaceAll("{desc}", SD.desc);
  const pageUrl = `${SITE.domain}${servicePagePath(lang, service.slug, area.slug)}`;
  const altUrl = `${SITE.domain}${servicePagePath(lang === "fr" ? "nl" : "fr", service.slug, area.slug)}`;
  const otherServices = SERVICE_INFO.filter((s) => s.slug !== service.slug);
  const otherAreas = AREAS.filter((a) => a.slug !== area.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${SD.name} ${area.name}`,
    serviceType: SD.name,
    url: pageUrl,
    provider: {
      "@type": ["Plumber", "Electrician"],
      name: "Sanivolt",
      telephone: "+32470000000",
      url: SITE.domain,
    },
    areaServed: { "@type": "City", name: area.name },
  };

  return (
    <main>
      <Helmet>
        <html lang={lang} />
        <title>{fill(sp.metaTitle)}</title>
        <meta name="description" content={fill(sp.metaDesc)} />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hreflang={lang} href={pageUrl} />
        <link rel="alternate" hreflang={lang === "fr" ? "nl" : "fr"} href={altUrl} />
        <meta property="og:title" content={fill(sp.metaTitle)} />
        <meta property="og:description" content={fill(sp.ogDesc)} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <section className="relative pt-[70px] bg-brand-paper overflow-hidden">
        <div className="absolute -top-20 -right-32 w-[480px] h-[480px] rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-14 lg:pt-20 pb-20">
          <nav
            className="flex flex-wrap items-center gap-2 font-manrope text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-10"
            data-testid="sa-breadcrumb"
          >
            <Link to={lang === "fr" ? "/fr" : "/"} className="hover:text-brand-blue transition-colors" data-testid="sa-breadcrumb-home">
              {ap.breadcrumbHome}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={areaPagePath(lang, area.slug)}
              className="hover:text-brand-blue transition-colors"
              data-testid="sa-breadcrumb-area"
            >
              {area.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-blue">{SD.name}</span>
          </nav>

          <h1 className="font-outfit font-black uppercase tracking-tighter leading-[0.95] text-brand-ink text-[10vw] sm:text-6xl lg:text-7xl">
            <MaskLine delay={0.15}>{SD.name}</MaskLine>
            <MaskLine delay={0.3}>
              {sp.h1in} <span className="text-brand-blue">{area.name}.</span>
            </MaskLine>
          </h1>

          <MaskLine delay={0.5}>
            <p className="mt-8 max-w-2xl font-manrope text-base md:text-lg leading-relaxed text-zinc-500">
              {SD.desc} {AD.intro}
            </p>
          </MaskLine>

          <MaskLine delay={0.65}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={SITE.phoneHref}
                data-testid="sa-call-button"
                className="flex items-center gap-3 bg-brand-ink text-white px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0038FF] transition-transform duration-200"
              >
                <Phone className="w-4 h-4" />
                {sp.call} {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="sa-whatsapp-button"
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
                <Clock className="w-4 h-4 text-brand-blue" /> {fill(ap.chipTime)}
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
      </section>

      <section className="bg-brand-ink text-white py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-outfit font-black text-sm tracking-[0.3em] text-brand-volt">01</span>
            <span className="h-px flex-1 bg-white/15" />
            <span className="font-manrope text-xs font-semibold tracking-[0.3em] uppercase text-zinc-400">
              {sp.whatLabel}
            </span>
          </div>
          <Reveal>
            <h2 className="font-outfit font-black uppercase tracking-tighter text-2xl sm:text-3xl lg:text-4xl max-w-3xl">
              {SD.name} {sp.h1in} {area.name}:{" "}
              <span className="text-brand-volt">{lang === "fr" ? "ce que nous offrons" : "dit leveren wij"}</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10" data-testid="sa-bullets">
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
            <p className="mt-8 max-w-2xl font-manrope text-sm text-zinc-400 leading-relaxed">
              {fill(sp.pricePara)}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <ChapterTag number="02" label={sp.moreChapter} />
          <div className="grid lg:grid-cols-2 gap-12">
            <Reveal>
              <p className="font-manrope text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-6 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-brand-blue" /> {fill(sp.otherServicesLabel)}
              </p>
              <div className="flex flex-wrap gap-2" data-testid="sa-other-services">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    to={servicePagePath(lang, s.slug, area.slug)}
                    data-testid={`sa-link-service-${s.slug}`}
                    className="border border-zinc-200 bg-brand-paper px-4 py-2 font-outfit font-bold text-xs tracking-tight text-brand-ink hover:border-brand-blue hover:text-brand-blue transition-colors duration-200"
                  >
                    {t.serviceData[s.slug].name} {area.name}
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-manrope text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-blue" /> {fill(sp.otherAreasLabel)}
              </p>
              <div className="flex flex-wrap gap-2" data-testid="sa-other-areas">
                {otherAreas.map((a) => (
                  <Link
                    key={a.slug}
                    to={servicePagePath(lang, service.slug, a.slug)}
                    data-testid={`sa-link-area-${a.slug}`}
                    className="border border-zinc-200 bg-brand-paper px-4 py-2 font-outfit font-bold text-xs tracking-tight text-brand-ink hover:border-brand-blue hover:text-brand-blue transition-colors duration-200"
                  >
                    {a.name}
                  </Link>
                ))}
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
