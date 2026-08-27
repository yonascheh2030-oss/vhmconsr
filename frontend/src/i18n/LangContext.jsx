import { createContext, useContext } from "react";
import { CONTENT } from "./content";

export const LANGS = ["nl", "fr", "en", "es"];

const PAGE_PATHS = {
  home: { nl: "/", fr: "/fr", en: "/en", es: "/es" },
  wizard: { nl: "/aanvraag", fr: "/fr/demande", en: "/en/request", es: "/es/solicitud" },
  confirm: { nl: "/bedankt", fr: "/fr/merci", en: "/en/thank-you", es: "/es/gracias" },
};

export const homePath = (l) => PAGE_PATHS.home[l];
export const wizardPath = (l) => PAGE_PATHS.wizard[l];
export const confirmPath = (l) => PAGE_PATHS.confirm[l];

const pageOf = (pathname) => {
  for (const [page, map] of Object.entries(PAGE_PATHS)) {
    if (Object.values(map).includes(pathname)) return page;
  }
  return "home";
};

export const altLangPath = (pathname, target) => PAGE_PATHS[pageOf(pathname)][target];

const LangCtx = createContext({ lang: "nl", t: CONTENT.nl });

export const LangProvider = ({ lang = "nl", children }) => (
  <LangCtx.Provider value={{ lang, t: CONTENT[lang] }}>{children}</LangCtx.Provider>
);

export const useLang = () => useContext(LangCtx);
