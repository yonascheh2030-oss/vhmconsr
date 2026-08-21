import { Reveal, ChapterTag } from "./Reveal";
import { useLang } from "../i18n/LangContext";
import { TEAM, TEAM_PHOTOS } from "../i18n/team";

export const Team = () => {
  const { lang } = useLang();
  const team = TEAM[lang];
  return (
    <section id="team" className="bg-white py-24 lg:py-32 border-t border-zinc-200" data-testid="team-section">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ChapterTag number="06" label={team.chapterLabel} />
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              {team.headingA}<span className="text-brand-blue">{team.headingB}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="font-manrope text-base text-zinc-500 leading-relaxed">{team.desc}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
          {team.members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08} className="bg-white">
              <article
                className="group h-full flex flex-col hover:bg-brand-paper transition-colors duration-300"
                data-testid={`team-card-${i}`}
              >
                <div className="relative overflow-hidden h-72">
                  <img
                    src={TEAM_PHOTOS[i]}
                    alt={`${m.name} — ${m.role}, Sanivolt`}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-white font-outfit font-black text-xs tracking-[0.2em] text-brand-blue px-3 py-1.5">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-1.5 border-t border-zinc-200">
                  <h3 className="font-outfit font-bold text-lg tracking-tight text-brand-ink">{m.name}</h3>
                  <p className="font-manrope text-xs font-bold tracking-[0.15em] uppercase text-brand-blue">{m.role}</p>
                  <p className="font-manrope text-xs text-zinc-500 mt-1">{m.specialty}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
