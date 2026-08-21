import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Zap, Phone, Menu, X, Globe } from "lucide-react";
import { SITE } from "../constants/site";
import { useLang, altLangPath } from "../i18n/LangContext";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { t, lang } = useLang();
  const location = useLocation();
  const alt = altLangPath(location.pathname);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (window.__lenis) {
      window.__lenis.scrollTo(href, { offset: -70, duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const langSwitch = (
    <div className="flex items-center gap-1 border border-zinc-200 px-1 py-1" data-testid="lang-switcher">
      <Globe className="w-3.5 h-3.5 text-zinc-400 mx-1" />
      <Link
        to={lang === "nl" ? location.pathname : alt}
        data-testid="lang-nl"
        className={`px-2.5 py-1 font-outfit text-[11px] font-bold tracking-widest transition-colors ${lang === "nl" ? "bg-brand-blue text-white" : "text-zinc-500 hover:text-brand-blue"}`}
      >
        NL
      </Link>
      <Link
        to={lang === "fr" ? location.pathname : alt}
        data-testid="lang-fr"
        className={`px-2.5 py-1 font-outfit text-[11px] font-bold tracking-widest transition-colors ${lang === "fr" ? "bg-brand-blue text-white" : "text-zinc-500 hover:text-brand-blue"}`}
      >
        FR
      </Link>
    </div>
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[70px] flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => go(e, "#top")}
          data-testid="header-logo"
          className="flex items-center gap-2 group"
        >
          <span className="w-9 h-9 bg-brand-blue flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="font-outfit font-black text-xl tracking-tighter text-brand-ink">
            SANI<span className="text-brand-blue">VOLT</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" data-testid="header-nav">
          {t.header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              data-testid={`nav-${item.href.slice(1)}`}
              className="font-manrope text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 hover:text-brand-blue transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">{langSwitch}</div>
          <a
            href={SITE.phoneHref}
            data-testid="header-call-button"
            className="hidden sm:flex items-center gap-2 bg-brand-danger text-white px-5 py-3 font-outfit text-xs font-bold tracking-[0.15em] uppercase hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#09090B] transition-transform duration-200"
          >
            <Phone className="w-4 h-4 animate-pulse" />
            <span className="hidden md:inline">24/7</span> {SITE.phoneDisplay}
          </a>
          <button
            onClick={() => setOpen(!open)}
            data-testid="header-menu-toggle"
            className="lg:hidden w-11 h-11 flex items-center justify-center border border-zinc-200"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-zinc-200 bg-white" data-testid="header-mobile-menu">
          {t.header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              data-testid={`nav-mobile-${item.href.slice(1)}`}
              className="block px-6 py-4 font-outfit font-bold text-lg tracking-tight border-b border-zinc-100 text-brand-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={SITE.phoneHref}
            data-testid="header-mobile-call"
            className="flex items-center gap-2 px-6 py-4 font-outfit font-bold text-brand-danger"
          >
            <Phone className="w-4 h-4" /> {t.header.mobileCall}{SITE.phoneDisplay}
          </a>
          <div className="px-6 py-4 border-t border-zinc-100">{langSwitch}</div>
        </div>
      )}
    </header>
  );
};
