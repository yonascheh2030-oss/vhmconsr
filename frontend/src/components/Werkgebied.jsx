import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, ChapterTag } from "./Reveal";
import { AREAS } from "../constants/areas";
import { useLang, areaPagePath } from "../i18n/LangContext";

export const Werkgebied = () => {
  const { t, lang } = useLang();
  return (
    <section id="werkgebied" className="bg-white py-24 lg:py-32 border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ChapterTag number="06" label={t.werkgebied.chapterLabel} />
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              {t.werkgebied.headingA}<span className="text-brand-blue">{t.werkgebied.headingB}</span>
            </h2>
            <p className="mt-6 font-manrope text-base md:text-lg text-zinc-500 leading-relaxed">
              {t.werkgebied.p1a}
              <strong className="text-brand-ink font-semibold">{t.werkgebied.p1b}</strong>
              {t.werkgebied.p1c}
            </p>
            <p className="mt-4 font-manrope text-sm text-zinc-400 leading-relaxed">
              {t.werkgebied.p2}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="flex flex-wrap gap-3" data-testid="werkgebied-areas">
              {AREAS.map((area) => (
                <Link
                  key={area.slug}
                  to={areaPagePath(lang, area.slug)}
                  data-testid={`werkgebied-link-${area.slug}`}
                  className="inline-flex items-center gap-2 border border-zinc-200 bg-brand-paper px-5 py-3 font-outfit font-bold text-sm tracking-tight text-brand-ink hover:border-brand-blue hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-200"
                >
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  {area.name}
                </Link>
              ))}
              <span className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-3 font-outfit font-bold text-sm tracking-tight">
                {t.werkgebied.moreLabel}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
