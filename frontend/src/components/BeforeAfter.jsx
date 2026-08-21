import { Reveal, ChapterTag } from "./Reveal";
import { IMAGES } from "../constants/site";
import { useLang } from "../i18n/LangContext";

const FRAME_IMAGES = [IMAGES.plumbing, IMAGES.renovation];

export const BeforeAfter = () => {
  const { t } = useLang();
  return (
    <section id="realisaties" className="bg-brand-mist py-24 lg:py-32 border-y border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ChapterTag number="03" label={t.beforeAfter.chapterLabel} />
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              {t.beforeAfter.headingA}<span className="text-brand-blue">{t.beforeAfter.headingB}</span>{t.beforeAfter.headingC}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="font-manrope text-base text-zinc-500 leading-relaxed">
              {t.beforeAfter.desc}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {t.beforeAfter.frames.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.12}>
              <figure
                className="group relative overflow-hidden border border-zinc-200 bg-white"
                data-testid={`before-after-${i}`}
              >
                <div className="overflow-hidden h-[320px] lg:h-[440px]">
                  <img
                    src={FRAME_IMAGES[i]}
                    alt={`${f.label}: ${f.sub} — Sanivolt`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <span className="absolute top-5 left-5 bg-brand-ink text-white font-outfit font-black text-sm tracking-[0.2em] uppercase px-4 py-2">
                  {f.label}
                </span>
                <figcaption className="flex items-center justify-between px-6 py-5 border-t border-zinc-200">
                  <span className="font-manrope text-sm font-semibold text-brand-ink">{f.sub}</span>
                  <span className="font-outfit font-black text-brand-blue text-lg">0{i + 1}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
