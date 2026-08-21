import { Star, Quote } from "lucide-react";
import { Reveal, ChapterTag } from "./Reveal";
import { SITE } from "../constants/site";
import { useLang } from "../i18n/LangContext";

export const Reviews = () => {
  const { t } = useLang();
  return (
    <section id="reviews" className="bg-brand-paper py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ChapterTag number="05" label={t.reviews.chapterLabel} />
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              {t.reviews.headingA}<span className="text-brand-blue">{t.reviews.headingB}</span>
            </h2>
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3" data-testid="reviews-score">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-blue text-brand-blue" />
                  ))}
                </div>
                <span className="font-outfit font-bold text-brand-ink">4.9/5</span>
                <span className="font-manrope text-sm text-zinc-500">{t.reviews.scoreSuffix}</span>
              </div>
              <a
                href={SITE.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="reviews-google-button"
                className="inline-flex items-center gap-2 border border-brand-ink px-5 py-3 font-outfit text-xs font-bold tracking-[0.15em] uppercase text-brand-ink hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#0038FF] transition-transform duration-200"
              >
                <Star className="w-4 h-4 fill-brand-blue text-brand-blue" />
                {t.reviews.googleBtn}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
          {t.reviews.items.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1} className="bg-brand-mist">
              <blockquote
                className="h-full p-8 lg:p-10 flex flex-col justify-between hover:bg-white transition-colors duration-300"
                data-testid={`review-card-${i}`}
              >
                <div>
                  <Quote className="w-8 h-8 text-brand-blue mb-6" strokeWidth={1.5} />
                  <p className="font-manrope text-base lg:text-lg text-brand-ink leading-relaxed">
                    “{r.quote}”
                  </p>
                </div>
                <footer className="mt-10 pt-6 border-t border-zinc-200 flex items-center justify-between">
                  <div>
                    <p className="font-outfit font-bold text-brand-ink">{r.name}</p>
                    <p className="font-manrope text-xs text-zinc-500 uppercase tracking-widest mt-1">
                      {r.place}
                    </p>
                  </div>
                  <span className="font-manrope text-[10px] font-bold tracking-[0.15em] uppercase text-brand-blue border border-brand-blue/30 px-3 py-1">
                    {r.service}
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
