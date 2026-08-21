import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Reveal, ChapterTag } from "./Reveal";
import { useLang } from "../i18n/LangContext";

export const FAQ = () => {
  const { t } = useLang();
  return (
    <section id="faq" className="bg-brand-paper py-24 lg:py-32 border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <ChapterTag number="08" label={t.faq.chapterLabel} />
        <div className="grid lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-4">
            <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl leading-[0.95]">
              {t.faq.headingA}<span className="text-brand-blue">{t.faq.headingB}</span>
            </h2>
            <p className="mt-6 font-manrope text-base text-zinc-500 leading-relaxed">
              {t.faq.desc}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {t.faq.items.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-zinc-200">
                  <AccordionTrigger
                    data-testid={`faq-question-${i}`}
                    className="font-outfit font-bold text-lg lg:text-xl tracking-tight text-brand-ink hover:text-brand-blue py-6 text-left hover:no-underline"
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-manrope text-base text-zinc-500 leading-relaxed pb-6 max-w-3xl">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
