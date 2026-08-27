import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowLeft, Phone, Mail, MessageCircle, CalendarClock, Loader2, FileText, MapPin, ExternalLink,
} from "lucide-react";
import { api, authHeaders, fileUrl } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { CategoryBadge, ScoreBadge } from "@/components/admin/badges";
import { L, eur, fmtDate } from "@/lib/labels";

const STATUSES = [
  { key: "nieuw", label: "Nieuw" },
  { key: "bezocht", label: "Bezocht" },
  { key: "offerte_verzonden", label: "Offerte verzonden" },
];

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-6 py-2.5 border-b border-beto-border last:border-0">
    <span className="font-body text-sm text-beto-muted">{label}</span>
    <span className="font-body text-sm font-medium text-beto-ink text-right">{value || "—"}</span>
  </div>
);

const Action = ({ href, icon: Icon, label, testid, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    target={href && href.startsWith("http") ? "_blank" : undefined}
    rel="noopener noreferrer"
    data-testid={testid}
    className="inline-flex items-center gap-2 rounded-lg border border-beto-border bg-white px-4 py-2.5 font-body text-sm font-medium text-beto-ink hover:border-beto-primary hover:text-beto-primary transition-colors"
  >
    <Icon className="w-4 h-4" /> {label}
  </a>
);

export default function LeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/leads/${id}`, { headers: authHeaders() });
      setLead(data);
    } catch (e) {
      if (e?.response?.status === 401) logout();
      else if (e?.response?.status === 404) toast.error("Lead niet gevonden.");
    } finally {
      setLoading(false);
    }
  }, [id, logout]);

  useEffect(() => { load(); }, [load]);

  const setStatus = async (status) => {
    setSaving(true);
    try {
      const { data } = await api.patch(`/admin/leads/${id}/status`, { status }, { headers: authHeaders() });
      setLead(data);
      toast.success("Status bijgewerkt.");
    } catch {
      toast.error("Bijwerken mislukt.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beto-dash flex items-center justify-center">
        <Loader2 className="w-7 h-7 animate-spin text-beto-primary" />
      </div>
    );
  }
  if (!lead) {
    return (
      <div className="min-h-screen bg-beto-dash flex flex-col items-center justify-center gap-4">
        <p className="font-body text-beto-muted">Lead niet gevonden.</p>
        <Link to="/admin" className="text-beto-primary font-semibold">Terug naar overzicht</Link>
      </div>
    );
  }

  const digits = (lead.telefoon || "").replace(/\D/g, "");
  const naam = `${lead.voornaam} ${lead.achternaam}`;
  const streetPart = [lead.straat, lead.huisnummer].filter(Boolean).join(" ");
  const cityPart = [lead.postcode, lead.gemeente].filter(Boolean).join(" ");
  const adres = [streetPart, cityPart].filter(Boolean).join(", ");
  const bd = lead.score_breakdown || {};

  return (
    <div className="min-h-screen bg-beto-dash">
      <header className="bg-white border-b border-beto-border sticky top-0 z-20">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/admin")} data-testid="detail-back" className="inline-flex items-center gap-2 font-body text-sm font-medium text-beto-ink hover:text-beto-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Terug
          </button>
          <span className="font-heading font-extrabold text-lg tracking-tight text-beto-ink">Beto<span className="text-beto-primary">Decor</span></span>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-5 lg:px-8 py-8">
        {/* Top card */}
        <div className="rounded-xl border border-beto-border bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <ScoreBadge score={lead.score} category={lead.category} />
              <div>
                <h1 className="font-heading font-extrabold text-2xl text-beto-ink" data-testid="detail-name">{naam}</h1>
                <div className="mt-1.5 flex items-center gap-2">
                  <CategoryBadge category={lead.category} testid="detail-category" />
                  <span className="font-body text-sm text-beto-muted">{fmtDate(lead.created_at)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Action href={`tel:${lead.telefoon}`} icon={Phone} label="Bellen" testid="action-call" />
              <Action href={`mailto:${lead.email}`} icon={Mail} label="E-mail" testid="action-email" />
              {digits && <Action href={`https://wa.me/${digits}`} icon={MessageCircle} label="WhatsApp" testid="action-whatsapp" />}
              <Action href={`mailto:${lead.email}?subject=Plaatsbezoek%20BetoDecor`} icon={CalendarClock} label="Plaatsbezoek plannen" testid="action-visit" />
            </div>
          </div>

          {/* Status control */}
          <div className="mt-6 pt-6 border-t border-beto-border">
            <p className="font-body text-sm font-medium text-beto-ink mb-3">Status wijzigen</p>
            <div className="flex flex-wrap gap-2" data-testid="status-control">
              {STATUSES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setStatus(s.key)}
                  disabled={saving}
                  data-testid={`status-${s.key}`}
                  className={`rounded-full px-4 py-2 font-body text-sm font-semibold transition-colors disabled:opacity-60 ${
                    lead.status === s.key ? "bg-beto-primary text-white" : "border border-beto-borderstrong text-beto-ink hover:border-beto-primary"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          {/* Project + contact */}
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-xl border border-beto-border bg-white p-6">
              <h2 className="font-heading font-bold text-lg text-beto-ink mb-4">Project</h2>
              <Row label="Projecttype" value={(lead.project_types || []).map(L.projectType).join(", ")} />
              <Row label="Renovatie" value={lead.renovatie_type ? L.renoType(lead.renovatie_type) : "—"} />
              <Row label="Oppervlakte" value={lead.oppervlakte ? `${lead.oppervlakte} m²` : "—"} />
              <Row label="Verdiepingen" value={lead.verdiepingen} />
              <Row label="Kamers" value={lead.kamers} />
              <Row label="Bouwjaar" value={lead.bouwjaar} />
              <Row label="Bewoond" value={lead.bewoond ? L.bewoond(lead.bewoond) : "—"} />
              <Row label="Budget" value={<span>{L.budget(lead.budget)} <span className="text-beto-muted">({eur(lead.geschatte_waarde)})</span></span>} />
              <Row label="Start" value={L.timing(lead.starttermijn)} />
              <Row label="Deadline" value={lead.heeft_deadline ? (lead.deadline || "Ja") : "Nee"} />
              {(lead.works || []).length > 0 && (
                <div className="pt-4">
                  <p className="font-body text-sm text-beto-muted mb-2">Werken</p>
                  <div className="flex flex-wrap gap-2">
                    {lead.works.map((k) => (
                      <span key={k} className="rounded-full bg-beto-dash px-3 py-1 font-body text-xs text-beto-ink">{L.work(k)}</span>
                    ))}
                  </div>
                </div>
              )}
              {lead.beschrijving && (
                <div className="pt-4">
                  <p className="font-body text-sm text-beto-muted mb-2">Omschrijving</p>
                  <p className="font-body text-sm text-beto-ink bg-beto-dash rounded-lg p-4 leading-relaxed">{lead.beschrijving}</p>
                </div>
              )}
            </section>

            {/* Media */}
            <section className="rounded-xl border border-beto-border bg-white p-6">
              <h2 className="font-heading font-bold text-lg text-beto-ink mb-4">Foto's & plannen</h2>
              {(lead.files || []).length === 0 ? (
                <p className="font-body text-sm text-beto-muted">Geen bestanden geüpload.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" data-testid="detail-media">
                  {lead.files.map((f) => {
                    const isImg = (f.content_type || "").startsWith("image/");
                    const url = fileUrl(f.storage_path);
                    return isImg ? (
                      <a key={f.id} href={url} target="_blank" rel="noopener noreferrer" className="group block rounded-lg overflow-hidden border border-beto-border aspect-square">
                        <img src={url} alt={f.original_filename} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </a>
                    ) : (
                      <a key={f.id} href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 rounded-lg border border-beto-border aspect-square bg-beto-dash text-beto-muted hover:text-beto-primary hover:border-beto-primary transition-colors p-3">
                        <FileText className="w-7 h-7" />
                        <span className="text-[11px] text-center truncate w-full">{f.original_filename}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <section className="rounded-xl border border-beto-border bg-white p-6">
              <h2 className="font-heading font-bold text-lg text-beto-ink mb-4">Contact</h2>
              <Row label="Naam" value={naam} />
              <Row label="Telefoon" value={lead.telefoon} />
              <Row label="E-mail" value={lead.email} />
              <Row label="Bedrijf" value={lead.bedrijfsnaam} />
              <Row label="BTW" value={lead.btw} />
              <div className="pt-3 flex items-start gap-2 text-beto-muted">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-beto-primary" />
                <span className="font-body text-sm text-beto-ink">{adres || "—"}</span>
              </div>
              {lead.opmerkingen && (
                <p className="mt-3 font-body text-sm text-beto-ink bg-beto-dash rounded-lg p-3">{lead.opmerkingen}</p>
              )}
            </section>

            <section className="rounded-xl border border-beto-border bg-white p-6">
              <h2 className="font-heading font-bold text-lg text-beto-ink mb-4">Leadscore</h2>
              <div className="text-center mb-4">
                <p className="font-heading font-extrabold text-4xl text-beto-ink">{lead.score}<span className="text-beto-muted text-xl">/100</span></p>
                <CategoryBadge category={lead.category} />
              </div>
              <Row label="Budget" value={`${bd.budget ?? "—"} / 30`} />
              <Row label="Projecttype" value={`${bd.project ?? "—"} / 25`} />
              <Row label="Locatie" value={`${bd.location ?? "—"} / 20`} />
              <Row label="Timing" value={`${bd.timing ?? "—"} / 15`} />
              <Row label="Compleetheid" value={`${bd.completeness ?? "—"} / 10`} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
