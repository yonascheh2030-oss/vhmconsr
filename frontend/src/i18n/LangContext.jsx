import { createContext, useContext } from "react";
import { STR, NL2FR_SERVICE, FR2NL_SERVICE } from "./translations";
import { STR_EN, STR_ES, EN_SERVICE_SLUGS, ES_SERVICE_SLUGS } from "./translations_extra";

export { NL2FR_SERVICE, FR2NL_SERVICE };

const NL_SLUGS = Object.fromEntries(Object.keys(NL2FR_SERVICE).map((k) => [k, k]));
export const SERVICE_SLUGS = {
  nl: NL_SLUGS,
  fr: NL2FR_SERVICE,
  en: EN_SERVICE_SLUGS,
  es: ES_SERVICE_SLUGS,
};

const REVERSE = {
  fr: FR2NL_SERVICE,
  en: Object.fromEntries(Object.entries(EN_SERVICE_SLUGS).map(([a, b]) => [b, a])),
  es: Object.fromEntries(Object.entries(ES_SERVICE_SLUGS).map(([a, b]) => [b, a])),
};

const AREA_PREFIX = {
  fr: "plombier-electricien",
  en: "plumber-electrician",
  es: "fontanero-electricista",
};

const HUB_PREFIX = { fr: "services", en: "services", es: "servicios" };

const DICTS = { nl: STR.nl, fr: STR.fr, en: STR_EN, es: STR_ES };

const LangCtx = createContext({ lang: "nl", t: STR.nl, prefix: "" });

export const LangProvider = ({ lang = "nl", children }) => (
  <LangCtx.Provider value={{ lang, t: DICTS[lang], prefix: lang === "nl" ? "" : `/${lang}` }}>
    {children}
  </LangCtx.Provider>
);

export const useLang = () => useContext(LangCtx);

export const homePath = (lang) => (lang === "nl" ? "/" : `/${lang}`);

export const areaPagePath = (lang, slug) =>
  lang === "nl" ? `/spoedloodgieter/${slug}` : `/${lang}/${AREA_PREFIX[lang]}/${slug}`;

export const servicePagePath = (lang, serviceSlug, areaSlug) =>
  lang === "nl"
    ? `/${serviceSlug}/${areaSlug}`
    : `/${lang}/${SERVICE_SLUGS[lang][serviceSlug]}/${areaSlug}`;

export const serviceHubPath = (lang, serviceSlug) =>
  lang === "nl"
    ? `/diensten/${serviceSlug}`
    : `/${lang}/${HUB_PREFIX[lang]}/${SERVICE_SLUGS[lang][serviceSlug]}`;

export const parsePath = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { type: "home" };
  const first = parts[0];
  if (["fr", "en", "es"].includes(first)) {
    if (parts.length === 1) return { type: "home" };
    const second = parts[1];
    if (second === AREA_PREFIX[first]) return { type: "area", area: parts[2] };
    if (second === HUB_PREFIX[first]) return { type: "hub", service: REVERSE[first][parts[2]] };
    return { type: "sa", service: REVERSE[first][second], area: parts[2] };
  }
  if (first === "spoedloodgieter") return { type: "area", area: parts[1] };
  if (first === "diensten") return { type: "hub", service: parts[1] };
  return { type: "sa", service: first, area: parts[1] };
};

export const buildPath = (lang, parsed) => {
  if (!parsed || parsed.type === "home") return homePath(lang);
  if (parsed.type === "area") return areaPagePath(lang, parsed.area);
  if (parsed.type === "hub") return serviceHubPath(lang, parsed.service);
  return servicePagePath(lang, parsed.service, parsed.area);
};

export const altLangPath = (pathname, target) => buildPath(target, parsePath(pathname));
