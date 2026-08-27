import { CATEGORY_STYLE, STATUS_LABEL } from "@/constants/betodecor";

export const CategoryBadge = ({ category, testid }) => {
  const s = CATEGORY_STYLE[category] || CATEGORY_STYLE.low;
  return (
    <span
      data-testid={testid}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[11px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {s.label}
    </span>
  );
};

export const ScoreBadge = ({ score, category }) => {
  const s = CATEGORY_STYLE[category] || CATEGORY_STYLE.low;
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg font-heading font-extrabold text-sm w-11 h-9"
      style={{ backgroundColor: s.bg, color: s.text, border: `1px solid ${s.border}` }}
    >
      {score}
    </span>
  );
};

const STATUS_STYLE = {
  nieuw: { bg: "#E0F2FE", text: "#075985" },
  bezocht: { bg: "#FEF3C7", text: "#92400E" },
  offerte_verzonden: { bg: "#DCFCE7", text: "#166534" },
};

export const StatusBadge = ({ status }) => {
  const s = STATUS_STYLE[status] || STATUS_STYLE.nieuw;
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 font-body text-[11px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {STATUS_LABEL.nl[status] || status}
    </span>
  );
};
