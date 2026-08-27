import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { useLang, wizardPath } from "@/i18n/LangContext";
import { SITE } from "@/constants/betodecor";

export const CTASection = () => {
  const { t, lang } = useLang();
  return (
    <section id="contact" className="bg-beto-primary text-white py-20 lg:py-28">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 text-center">
        <h2 className="font-heading font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl mx-auto">
          {t.ctaBand.title}
        </h2>
        <p className="mt-5 font-body text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          {t.ctaBand.body}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={wizardPath(lang)}
            data-testid="cta-quote"
            className="group inline-flex items-center gap-2 rounded-full bg-white text-beto-primary px-8 py-4 font-semibold hover:bg-beto-paper transition-colors"
          >
            {t.ctaBand.button}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="font-body text-sm text-white/70">{t.ctaBand.or}</span>
          <a
            href={SITE.phoneHref}
            data-testid="cta-call"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-4 font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <Phone className="w-4 h-4" />
            {SITE.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
};
