import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle, ArrowDown, Clock, ShieldCheck, MapPin } from "lucide-react";
import { MaskLine } from "./Reveal";
import { SITE, IMAGES } from "../constants/site";

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="relative pt-[70px] overflow-hidden bg-brand-paper">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-32 w-[560px] h-[560px] rounded-full bg-brand-volt/15 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full bg-brand-blue/10 blur-3xl" />
      </motion.div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-6 pt-14 lg:pt-24 pb-20 lg:pb-28">
        <div className="lg:col-span-7 flex flex-col justify-center">
          <MaskLine delay={0.1}>
            <span className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-4 py-2 font-manrope text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-600 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-danger animate-pulse" />
              Nu beschikbaar — 24/7 spoeddienst
            </span>
          </MaskLine>

          <h1 className="font-outfit font-black uppercase tracking-tighter leading-[0.92] text-brand-ink text-[13vw] sm:text-6xl lg:text-7xl xl:text-[86px]">
            <MaskLine delay={0.2}>Spoedklussen.</MaskLine>
            <MaskLine delay={0.35}>
              <span className="text-brand-blue">Loodgieter</span> &
            </MaskLine>
            <MaskLine delay={0.5}>Elektricien.</MaskLine>
          </h1>

          <MaskLine delay={0.7}>
            <p className="mt-8 max-w-xl font-manrope text-base md:text-lg leading-relaxed text-zinc-500">
              Lekkage, verstopping, kortsluiting of stroompanne? Sanivolt staat{" "}
              <strong className="text-brand-ink font-semibold">binnen 60 minuten</strong> bij u voor
              de deur — in Zaventem, Diegem, Haren, Zuid, Schaarbeek en omstreken.
            </p>
          </MaskLine>

          <MaskLine delay={0.85}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={SITE.phoneHref}
                data-testid="hero-call-button"
                className="flex items-center gap-3 bg-brand-ink text-white px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#0038FF] transition-transform duration-200"
              >
                <Phone className="w-4 h-4" />
                Bel {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-button"
                className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#09090B] transition-transform duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.__lenis?.scrollTo("#contact", { offset: -70, duration: 1.4 });
                }}
                data-testid="hero-quote-link"
                className="font-manrope text-sm font-semibold text-brand-blue underline underline-offset-8 decoration-2 hover:decoration-brand-volt transition-colors"
              >
                of vraag een offerte
              </a>
            </div>
          </MaskLine>

          <MaskLine delay={1}>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { icon: Clock, text: "Binnen 60 min ter plaatse" },
                { icon: ShieldCheck, text: "2 jaar garantie" },
                { icon: MapPin, text: "Zaventem & omstreken" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 font-manrope text-xs font-semibold tracking-wide uppercase text-zinc-500">
                  <Icon className="w-4 h-4 text-brand-blue" />
                  {text}
                </span>
              ))}
            </div>
          </MaskLine>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-3 border border-brand-blue/30 translate-x-4 translate-y-4 pointer-events-none" />
            <div className="relative overflow-hidden h-[380px] lg:h-[560px]">
              <motion.img
                style={{ y: imgY, scale: 1.25 }}
                src={IMAGES.hero}
                alt="Water en elektriciteit — Sanivolt spoeddienst loodgieter elektricien"
                className="w-full h-full object-cover grayscale-[35%] contrast-110"
                data-testid="hero-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -bottom-6 -left-4 lg:-left-10 bg-white border border-zinc-200 px-6 py-5 shadow-[8px_8px_0px_#0038FF]"
              data-testid="hero-badge"
            >
              <p className="font-outfit font-black text-3xl text-brand-ink leading-none">
                60<span className="text-brand-blue">min</span>
              </p>
              <p className="font-manrope text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500 mt-1">
                gem. responstijd spoed
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-zinc-200 py-5 flex justify-center">
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-zinc-400"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.span>
      </div>
    </section>
  );
};
