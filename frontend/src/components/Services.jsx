import { Droplets, Zap, Wrench, Flame, ShowerHead, Wind, BatteryCharging, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, ChapterTag } from "./Reveal";
import { IMAGES } from "../constants/site";
import { useLang, serviceHubPath } from "../i18n/LangContext";

const META = [
  { icon: Droplets, num: "01", span: "md:col-span-3", image: IMAGES.plumbing },
  { icon: Zap, num: "02", span: "md:col-span-3", image: IMAGES.electric },
  { icon: Wrench, num: "03", span: "md:col-span-2" },
  { icon: Flame, num: "04", span: "md:col-span-2" },
  { icon: ShowerHead, num: "05", span: "md:col-span-2" },
  { icon: Wind, num: "06", span: "md:col-span-3" },
  { icon: BatteryCharging, num: "07", span: "md:col-span-3" },
];

export const Services = () => {
  const { t, lang } = useLang();
  return (
    <section id="diensten" className="bg-brand-paper py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ChapterTag number="01" label={t.services.chapterLabel} />
        <Reveal>
          <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-4xl">
            {t.services.headingA} <span className="text-brand-blue">{t.services.headingB}</span>
          </h2>
          <p className="mt-6 max-w-2xl font-manrope text-base md:text-lg text-zinc-500 leading-relaxed">
            {t.services.intro}
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-6 gap-px bg-zinc-200 border border-zinc-200">
          {META.map((m, i) => {
            const s = t.services.items[i];
            return (
              <Reveal key={m.num} delay={i * 0.06} className={`${m.span} bg-white`}>
                <Link
                  to={serviceHubPath(lang, s.slug)}
                  data-testid={`service-card-${m.num}`}
                  className="group relative flex flex-col justify-between h-full min-h-[260px] p-8 hover:bg-brand-paper transition-colors duration-300 overflow-hidden"
                >
                  {m.image && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <img src={m.image} alt={s.name} className="w-full h-full object-cover grayscale-[40%]" loading="lazy" />
                      <div className="absolute inset-0 bg-white/85" />
                    </div>
                  )}
                  <div className="relative flex items-start justify-between">
                    <m.icon className="w-8 h-8 text-brand-blue" strokeWidth={1.8} />
                    <span className="font-outfit font-black text-4xl text-zinc-100 group-hover:text-brand-blue/20 transition-colors duration-300">
                      {m.num}
                    </span>
                  </div>
                  <div className="relative mt-10">
                    {s.tag && (
                      <span className="inline-block mb-3 bg-brand-blue text-white font-manrope text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1">
                        {s.tag}
                      </span>
                    )}
                    <h3 className="font-outfit font-bold text-xl lg:text-2xl tracking-tight text-brand-ink flex items-center gap-2">
                      {s.name}
                      <ArrowUpRight className="w-5 h-5 text-brand-blue opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                    </h3>
                    <p className="mt-2 font-manrope text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
