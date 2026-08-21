import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal, ChapterTag } from "./Reveal";
import { AREAS } from "../constants/areas";

export const Werkgebied = () => (
  <section id="werkgebied" className="bg-white py-24 lg:py-32 border-t border-zinc-200">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <ChapterTag number="06" label="Werkgebied" />
      <div className="grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5">
          <h2 className="font-outfit font-black uppercase tracking-tighter text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            Lokaal. <span className="text-brand-blue">Dus snel.</span>
          </h2>
          <p className="mt-6 font-manrope text-base md:text-lg text-zinc-500 leading-relaxed">
            Onze techniekers vertrekken vanuit de regio Zaventem. Daardoor zijn we bij spoed in{" "}
            <strong className="text-brand-ink font-semibold">Zaventem, Diegem, Haren,
            Brussel-Zuid en Schaarbeek</strong> gemiddeld binnen het uur ter plaatse — ook 's
            nachts, in het weekend en op feestdagen.
          </p>
          <p className="mt-4 font-manrope text-sm text-zinc-400 leading-relaxed">
            Woont u net buiten deze kernregio? Bel gerust: we rijden ook naar Machelen, Vilvoorde,
            Evere, Kraainem, Steenokkerzeel, Kortenberg, Grimbergen, Wezembeek-Oppem en het
            Brussels Hoofdstedelijk Gewest. Klik op uw gemeente voor meer info.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="flex flex-wrap gap-3" data-testid="werkgebied-areas">
            {AREAS.map((area) => (
              <Link
                key={area.slug}
                to={`/spoedloodgieter/${area.slug}`}
                data-testid={`werkgebied-link-${area.slug}`}
                className="inline-flex items-center gap-2 border border-zinc-200 bg-brand-paper px-5 py-3 font-outfit font-bold text-sm tracking-tight text-brand-ink hover:border-brand-blue hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-200"
              >
                <MapPin className="w-4 h-4 text-brand-blue" />
                {area.name}
              </Link>
            ))}
            <span className="inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-3 font-outfit font-bold text-sm tracking-tight">
              + heel de omgeving
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
