import { CONTENT } from "@/i18n/content";

const w = CONTENT.nl.wizard;

export const L = {
  projectType: (k) => (w.projectTypes[k] || k),
  work: (k) => (w.works[k] || k),
  budget: (k) => (w.budget[k] || k),
  timing: (k) => (w.starttermijn[k] || k),
  renoType: (k) => (w.renoType[k] || k),
  bewoond: (k) => (w.bewoond[k] || k),
};

export const eur = (n) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n || 0);

export const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("nl-BE", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
};
