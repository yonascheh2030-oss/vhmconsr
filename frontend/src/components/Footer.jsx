import { Zap, Phone, Mail, MapPin } from "lucide-react";
import { SITE } from "../constants/site";

export const Footer = () => (
  <footer className="bg-brand-ink text-white border-t border-white/10">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.__lenis?.scrollTo(0, { duration: 1.6 });
        }}
        data-testid="footer-logo"
        className="block font-outfit font-black uppercase tracking-tighter leading-none text-[16.5vw] lg:text-[180px] text-white hover:text-brand-volt transition-colors duration-500 select-none"
      >
        Sani<span className="text-brand-blue">volt</span>
      </a>

      <div className="mt-16 grid md:grid-cols-3 gap-10 border-t border-white/10 pt-12">
        <div>
          <p className="font-manrope text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-5">Contact</p>
          <a href={SITE.phoneHref} data-testid="footer-phone" className="flex items-center gap-3 font-outfit font-bold text-lg hover:text-brand-volt transition-colors">
            <Phone className="w-4 h-4 text-brand-volt" /> {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`} data-testid="footer-email" className="mt-3 flex items-center gap-3 font-outfit font-bold text-lg hover:text-brand-volt transition-colors">
            <Mail className="w-4 h-4 text-brand-volt" /> {SITE.email}
          </a>
          <p className="mt-3 flex items-center gap-3 font-manrope text-sm text-zinc-400">
            <MapPin className="w-4 h-4 text-brand-volt" /> Regio Zaventem — België
          </p>
        </div>
        <div>
          <p className="font-manrope text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-5">Diensten</p>
          <ul className="space-y-2 font-manrope text-sm text-zinc-400">
            {["Spoedloodgieterij", "Elektriciteit", "Ontstopping", "Verwarming", "Sanitaire renovatie", "Airco & laadpalen"].map((d) => (
              <li key={d} className="hover:text-white transition-colors">{d}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-manrope text-[11px] font-bold tracking-[0.25em] uppercase text-zinc-500 mb-5">Werkgebied</p>
          <p className="font-manrope text-sm text-zinc-400 leading-relaxed">
            Zaventem · Diegem · Haren · Schaarbeek (Schaerbeek) · Brussel-Zuid · Machelen ·
            Vilvoorde · Evere · Kraainem · Steenokkerzeel · Kortenberg · Grimbergen ·
            Wezembeek-Oppem en omstreken.
          </p>
        </div>
      </div>

      <div className="mt-14 border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-manrope text-xs text-zinc-500 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-brand-blue" />
          © 2026 Sanivolt — Spoedloodgieter & elektricien, 24/7. BTW BE 0000.000.000
        </p>
        <p className="font-manrope text-xs text-zinc-500">
          Erkende techniekers · 2 jaar garantie · Transparante prijzen ·{" "}
          <a
            href={SITE.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-review-link"
            className="underline underline-offset-4 hover:text-brand-volt transition-colors"
          >
            Beoordeel ons op Google
          </a>
        </p>
      </div>
    </div>
  </footer>
);
