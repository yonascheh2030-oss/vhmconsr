import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";
import { altLangPath, useLang, LANGS } from "@/i18n/LangContext";

export const LangSwitch = ({ dark = false }) => {
  const { lang } = useLang();
  const loc = useLocation();
  return (
    <div className="flex items-center gap-0.5" data-testid="lang-switcher">
      <Globe className={`w-4 h-4 mr-1.5 ${dark ? "text-white/50" : "text-beto-muted"}`} />
      {LANGS.map((code) => (
        <Link
          key={code}
          to={altLangPath(loc.pathname, code)}
          data-testid={`lang-${code}`}
          className={`px-2 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-md transition-colors ${
            lang === code
              ? "bg-beto-primary text-white"
              : dark
              ? "text-white/60 hover:text-white"
              : "text-beto-muted hover:text-beto-ink"
          }`}
        >
          {code}
        </Link>
      ))}
    </div>
  );
};
