import { BadgePercent, ArrowRight } from "lucide-react";
import { Reveal, ChapterTag } from "./Reveal";
import { SITE } from "../constants/site";
import { useLang } from "../i18n/LangContext";

export const Pricing = () => {
  const { t } = useLang();
  return (
    <section id="prijzen" className="bg-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ChapterTag number="04" label={t.pricing.chapterLabel} />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
                {t.pricing.headingA}<span className="text-brand-blue">{t.pricing.headingB}</span>
              </h2>
              <p className="mt-6 max-w-xl font-manrope text-base md:text-lg text-zinc-500 leading-relaxed">
                {t.pricing.desc}
              </p>
            </Reveal>
            <div className="mt-12 border-t border-zinc-200">
              {t.pricing.rows.map((row, i) => (
                <Reveal key={row.label} delay={i * 0.06}>
                  <div
                    className="grid grid-cols-12 gap-4 items-baseline border-b border-zinc-200 py-6 group hover:bg-brand-paper transition-colors duration-300 px-2"
                    data-testid={`pricing-row-${i}`}
                  >
                    <span className="col-span-12 md:col-span-6 font-manrope text-sm md:text-base font-semibold text-brand-ink">
                      {row.label}
                    </span>
                    <span className="col-span-6 md:col-span-3 font-outfit font-black text-xl md:text-2xl text-brand-blue tracking-tight">
                      {row.price}
                    </span>
                    <span className="col-span-6 md:col-span-3 font-manrope text-xs text-zinc-400 md:text-right">
                      {row.note}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 font-manrope text-xs text-zinc-400">
              {t.pricing.disclaimer}
            </p>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div
              className="relative bg-brand-ink text-white p-10 lg:p-12 h-full flex flex-col justify-between overflow-hidden"
              data-testid="pricing-offer-card"
            >
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-brand-blue/30 blur-3xl" />
              <div>
                <span className="inline-flex items-center gap-2 bg-brand-volt text-brand-ink font-manrope text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2">
                  <BadgePercent className="w-4 h-4" />
                  {t.pricing.offerTag}
                </span>
                <p className="mt-8 font-outfit font-black text-6xl lg:text-7xl tracking-tighter leading-none">
                  −15<span className="text-brand-volt">%</span>
                </p>
                <p className="mt-4 font-manrope text-base text-zinc-300 leading-relaxed">
                  {t.pricing.offerA}
                  <strong className="text-white">{t.pricing.offerCode}</strong>
                  {t.pricing.offerB}
                </p>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.__lenis?.scrollTo("#contact", { offset: -70, duration: 1.4 });
                }}
                data-testid="pricing-offer-cta"
                className="mt-10 inline-flex items-center justify-center gap-3 bg-white text-brand-ink px-8 py-4 font-outfit text-sm font-bold tracking-[0.15em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#00D4FF] transition-transform duration-200"
              >
                {t.pricing.offerCta}
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="sr-only">{SITE.phoneDisplay}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
