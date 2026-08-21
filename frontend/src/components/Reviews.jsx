import { Star, Quote } from "lucide-react";
import { Reveal, ChapterTag } from "./Reveal";

const REVIEWS = [
  {
    quote:
      "Waterlek op zondagavond. Om 22u gebeld, om 22u50 stond de loodgieter al in de garage. Correct geprijsd en alles netjes achtergelaten.",
    name: "Katrien V.",
    place: "Zaventem",
    service: "Spoedloodgieterij",
  },
  {
    quote:
      "Kortsluiting in de zekeringkast, overal stroom uitgevallen. Sanivolt loste het dezelfde nacht op en legde helder uit wat er mis was.",
    name: "Mehmet D.",
    place: "Schaarbeek",
    service: "Elektriciteit",
  },
  {
    quote:
      "Complete badkamer gerenoveerd na een lekkage. Van offerte tot oplevering: professioneel, stipt en met fotoverslag. Absolute aanrader.",
    name: "Familie Janssens",
    place: "Diegem",
    service: "Sanitaire renovatie",
  },
];

export const Reviews = () => (
  <section id="reviews" className="bg-brand-paper py-24 lg:py-32">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <ChapterTag number="05" label="Reviews" />
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            Buren die ons <span className="text-brand-blue">belden.</span>
          </h2>
          <div className="flex items-center gap-3" data-testid="reviews-score">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-blue text-brand-blue" />
              ))}
            </div>
            <span className="font-outfit font-bold text-brand-ink">4.9/5</span>
            <span className="font-manrope text-sm text-zinc-500">op basis van 120+ interventies</span>
          </div>
        </div>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
        {REVIEWS.map((r, i) => (
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
