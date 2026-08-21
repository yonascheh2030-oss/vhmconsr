import { createContext, useContext } from "react";
import { STR, NL2FR_SERVICE, FR2NL_SERVICE } from "./translations";

export { NL2FR_SERVICE, FR2NL_SERVICE };

const LangCtx = createContext({ lang: "nl", t: STR.nl, prefix: "" });

export const LangProvider = ({ lang = "nl", children }) => (
  <LangCtx.Provider value={{ lang, t: STR[lang], prefix: lang === "fr" ? "/fr" : "" }}>
    {children}
  </LangCtx.Provider>
);

export const useLang = () => useContext(LangCtx);

export const altLangPath = (pathname) => {
  if (pathname === "/" || pathname === "") return "/fr";
  if (pathname === "/fr" || pathname === "/fr/") return "/";
  if (pathname.startsWith("/fr/plombier-electricien/"))
    return pathname.replace("/fr/plombier-electricien/", "/spoedloodgieter/");
  if (pathname.startsWith("/spoedloodgieter/"))
    return pathname.replace("/spoedloodgieter/", "/fr/plombier-electricien/");
  if (pathname.startsWith("/fr/")) {
    const parts = pathname.split("/");
    return `/${FR2NL_SERVICE[parts[2]] || parts[2]}/${parts[3]}`;
  }
  const parts = pathname.split("/");
  return `/fr/${NL2FR_SERVICE[parts[1]] || parts[1]}/${parts[2]}`;
};

export const areaPagePath = (lang, slug) =>
  lang === "fr" ? `/fr/plombier-electricien/${slug}` : `/spoedloodgieter/${slug}`;

export const servicePagePath = (lang, serviceSlug, areaSlug) =>
  lang === "fr"
    ? `/fr/${NL2FR_SERVICE[serviceSlug]}/${areaSlug}`
    : `/${serviceSlug}/${areaSlug}`;
