import { PhoneCall, Search, FileText, CheckCircle2 } from "lucide-react";
import { Reveal, ChapterTag } from "./Reveal";

const STEPS = [
  {
    num: "01",
    icon: PhoneCall,
    title: "Bel of WhatsApp ons",
    desc: "Dag en nacht bereikbaar. Beschrijf het probleem — wij schatten meteen de urgentie in en sturen een technieker.",
  },
  {
    num: "02",
    icon: Search,
    title: "Diagnose ter plaatse",
    desc: "Onze technieker komt binnen 60 minuten langs, lokaliseert het probleem en legt helder uit wat er nodig is.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Transparante offerte",
    desc: "U krijgt vooraf een duidelijke prijs. Geen verrassingen achteraf — u keurt goed vóór we starten.",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Herstelling & garantie",
    desc: "We herstellen ter plaatse met professioneel materiaal. Op elke klus krijgt u 2 jaar garantie.",
  },
];

export const Werkwijze = () => (
  <section id="werkwijze" className="bg-brand-ink text-white py-24 lg:py-32">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="flex items-center gap-4 mb-10">
        <span className="font-outfit font-black text-sm tracking-[0.3em] text-brand-volt">02</span>
        <span className="h-px flex-1 bg-white/15" />
        <span className="font-manrope text-xs font-semibold tracking-[0.3em] uppercase text-zinc-400">
          Werkwijze
        </span>
      </div>

      <Reveal>
        <h2 className="font-outfit font-black uppercase tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-4xl">
          Van paniek naar <span className="text-brand-volt">opgelost.</span> In vier stappen.
        </h2>
      </Reveal>

      <div className="mt-20">
        {STEPS.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.08}>
            <div
              className="group grid md:grid-cols-12 gap-6 items-center border-t border-white/15 py-10 lg:py-14 hover:bg-white/[0.03] transition-colors duration-300"
              data-testid={`werkwijze-step-${step.num}`}
            >
              <div className="md:col-span-3">
                <span className="font-outfit font-black text-6xl lg:text-8xl text-white/10 group-hover:text-brand-volt/40 transition-colors duration-500 leading-none">
                  {step.num}
                </span>
              </div>
              <div className="md:col-span-4 flex items-center gap-4">
                <step.icon className="w-7 h-7 text-brand-volt shrink-0" strokeWidth={1.8} />
                <h3 className="font-outfit font-bold text-2xl lg:text-3xl tracking-tight uppercase">
                  {step.title}
                </h3>
              </div>
              <p className="md:col-span-5 font-manrope text-sm lg:text-base text-zinc-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-white/15" />
      </div>
    </div>
  </section>
);
