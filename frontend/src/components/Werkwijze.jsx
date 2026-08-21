import { PhoneCall, Search, FileText, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "../i18n/LangContext";

const ICONS = [PhoneCall, Search, FileText, CheckCircle2];
const NUMS = ["01", "02", "03", "04"];

export const Werkwijze = () => {
  const { t } = useLang();
  return (
    <section id="werkwijze" className="bg-brand-ink text-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-outfit font-black text-sm tracking-[0.3em] text-brand-volt">02</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-manrope text-xs font-semibold tracking-[0.3em] uppercase text-zinc-400">
            {t.werkwijze.chapterLabel}
          </span>
        </div>

        <Reveal>
          <h2 className="font-outfit font-black uppercase tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95] max-w-4xl">
            {t.werkwijze.headingA}<span className="text-brand-volt">{t.werkwijze.headingB}</span>{t.werkwijze.headingC}
          </h2>
        </Reveal>

        <div className="mt-20">
          {t.werkwijze.steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={NUMS[i]} delay={i * 0.08}>
                <div
                  className="group grid md:grid-cols-12 gap-6 items-center border-t border-white/15 py-10 lg:py-14 hover:bg-white/[0.03] transition-colors duration-300"
                  data-testid={`werkwijze-step-${NUMS[i]}`}
                >
                  <div className="md:col-span-3">
                    <span className="font-outfit font-black text-6xl lg:text-8xl text-white/10 group-hover:text-brand-volt/40 transition-colors duration-500 leading-none">
                      {NUMS[i]}
                    </span>
                  </div>
                  <div className="md:col-span-4 flex items-center gap-4">
                    <Icon className="w-7 h-7 text-brand-volt shrink-0" strokeWidth={1.8} />
                    <h3 className="font-outfit font-bold text-2xl lg:text-3xl tracking-tight uppercase">
                      {step.title}
                    </h3>
                  </div>
                  <p className="md:col-span-5 font-manrope text-sm lg:text-base text-zinc-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-white/15" />
        </div>
      </div>
    </section>
  );
};
