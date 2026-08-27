import { MapPin } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

export const Region = () => {
  const { t } = useLang();
  return (
    <section id="region" className="bg-beto-paper py-20 lg:py-28">
      <div className="max-w-[1300px] mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-beto-primary" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-beto-primary">{t.region.label}</span>
          </div>
          <h2 className="font-heading font-extrabold tracking-tight text-beto-ink text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {t.region.title}
          </h2>
          <p className="mt-5 font-body text-base md:text-lg text-beto-muted leading-relaxed">{t.region.body}</p>
          <p className="mt-3 font-body text-sm text-beto-muted/80">{t.region.note}</p>
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            {t.region.cities.map((city) => (
              <div
                key={city}
                data-testid={`region-city-${city}`}
                className="flex items-center gap-3 rounded-xl border border-beto-border bg-beto-surface px-5 py-4 hover:border-beto-primary transition-colors"
              >
                <MapPin className="w-4 h-4 text-beto-primary shrink-0" />
                <span className="font-body font-medium text-beto-ink">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
