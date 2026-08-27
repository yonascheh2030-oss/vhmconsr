import { Reveal } from "@/components/Reveal";
import { useLang } from "@/i18n/LangContext";

export const Process = () => {
  const { t } = useLang();
  return (
    <section id="process" className="bg-beto-secondary text-white py-20 lg:py-28">
      <div className="max-w-[1300px] mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-beto-primary" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-beto-primary">{t.process.label}</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {t.process.title}
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-white/60 leading-relaxed">{t.process.intro}</p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {t.process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div data-testid={`process-step-${i}`} className="relative">
                <p className="font-heading font-extrabold text-5xl text-white/15">0{i + 1}</p>
                <div className="mt-4 h-px w-full bg-white/15" />
                <h3 className="mt-5 font-heading font-bold text-xl text-white">{step.title}</h3>
                <p className="mt-2 font-body text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
