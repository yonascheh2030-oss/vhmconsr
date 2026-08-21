import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, MessageCircle, Send, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { SITE } from "../constants/site";
import { useLang } from "../i18n/LangContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "bg-transparent border-b border-zinc-300 py-4 focus:outline-none focus:border-brand-blue transition-colors rounded-none w-full font-manrope text-base text-brand-ink placeholder:text-zinc-400";

export const LeadForm = () => {
  const { t } = useLang();
  const [form, setForm] = useState({ naam: "", telefoon: "", dienst: "", gemeente: "", bericht: "", spoed: false });
  const [sending, setSending] = useState(false);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.naam.trim() || !form.telefoon.trim() || !form.dienst) {
      toast.error(t.form.toastError);
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/leads`, form);
      toast.success(t.form.toastSuccess);
      setForm({ naam: "", telefoon: "", dienst: "", gemeente: "", bericht: "", spoed: false });
    } catch {
      toast.error(t.form.toastFail);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-brand-ink text-white py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-10">
          <span className="font-outfit font-black text-sm tracking-[0.3em] text-brand-volt">08</span>
          <span className="h-px flex-1 bg-white/15" />
          <span className="font-manrope text-xs font-semibold tracking-[0.3em] uppercase text-zinc-400">
            {t.form.chapterLabel}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-5">
            <h2 className="font-outfit font-black uppercase tracking-tighter text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              {t.form.headingA}<span className="text-brand-volt">{t.form.headingB}</span>
            </h2>
            <p className="mt-6 font-manrope text-base md:text-lg text-zinc-400 leading-relaxed">
              {t.form.intro}
            </p>
            <div className="mt-10 space-y-4">
              <a
                href={SITE.phoneHref}
                data-testid="contact-call-button"
                className="flex items-center gap-4 border border-white/20 px-6 py-5 hover:border-brand-volt hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Phone className="w-6 h-6 text-brand-volt" />
                <div>
                  <p className="font-manrope text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
                    {t.form.callLabel}
                  </p>
                  <p className="font-outfit font-bold text-xl group-hover:text-brand-volt transition-colors">
                    {SITE.phoneDisplay}
                  </p>
                </div>
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-button"
                className="flex items-center gap-4 border border-white/20 px-6 py-5 hover:border-[#25D366] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                <div>
                  <p className="font-manrope text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
                    WhatsApp
                  </p>
                  <p className="font-outfit font-bold text-xl group-hover:text-[#25D366] transition-colors">
                    {t.form.whatsappCta}
                  </p>
                </div>
              </a>
              <p className="font-manrope text-sm text-zinc-500 pt-2">
                {t.form.orMail} <a href={`mailto:${SITE.email}`} className="text-brand-volt underline underline-offset-4" data-testid="contact-email-link">{SITE.email}</a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <form
              onSubmit={submit}
              data-testid="lead-form"
              className="bg-white text-brand-ink p-8 lg:p-12 shadow-[12px_12px_0px_#0038FF]"
            >
              <p className="font-outfit font-black text-2xl tracking-tight uppercase mb-8">
                {t.form.cardA}<span className="text-brand-blue">{t.form.cardB}</span>
              </p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label htmlFor="lead-naam" className="font-manrope text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">{t.form.labels.naam} *</label>
                  <input id="lead-naam" data-testid="lead-form-naam" value={form.naam} onChange={set("naam")} placeholder={t.form.placeholders.naam} className={inputCls} required />
                </div>
                <div>
                  <label htmlFor="lead-telefoon" className="font-manrope text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">{t.form.labels.telefoon} *</label>
                  <input id="lead-telefoon" data-testid="lead-form-telefoon" type="tel" value={form.telefoon} onChange={set("telefoon")} placeholder="+32 ..." className={inputCls} required />
                </div>
                <div>
                  <label htmlFor="lead-dienst" className="font-manrope text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">{t.form.labels.dienst} *</label>
                  <select id="lead-dienst" data-testid="lead-form-dienst" value={form.dienst} onChange={set("dienst")} className={`${inputCls} cursor-pointer`} required>
                    <option value="">{t.form.kiesDienst}</option>
                    {t.form.diensten.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lead-gemeente" className="font-manrope text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">{t.form.labels.gemeente}</label>
                  <input id="lead-gemeente" data-testid="lead-form-gemeente" value={form.gemeente} onChange={set("gemeente")} placeholder={t.form.placeholders.gemeente} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="lead-bericht" className="font-manrope text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">{t.form.labels.bericht}</label>
                  <textarea id="lead-bericht" data-testid="lead-form-bericht" value={form.bericht} onChange={set("bericht")} rows={3} placeholder={t.form.placeholders.bericht} className={`${inputCls} resize-none`} />
                </div>
              </div>
              <label className="mt-6 flex items-center gap-3 cursor-pointer select-none" data-testid="lead-form-spoed">
                <input type="checkbox" checked={form.spoed} onChange={set("spoed")} className="w-5 h-5 accent-brand-danger" />
                <span className="font-manrope text-sm font-semibold text-brand-danger">{t.form.spoedLabel}</span>
              </label>
              <button
                type="submit"
                disabled={sending}
                data-testid="lead-form-submit"
                className="mt-8 w-full flex items-center justify-center gap-3 bg-brand-blue text-white px-8 py-5 font-outfit text-sm font-bold tracking-[0.2em] uppercase hover:-translate-y-1 hover:shadow-[4px_4px_0px_#09090B] transition-transform duration-200 disabled:opacity-60 disabled:translate-y-0 disabled:shadow-none"
              >
                {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                {sending ? t.form.sending : t.form.submit}
              </button>
              <p className="mt-4 font-manrope text-xs text-zinc-400 text-center">
                {t.form.footnote}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
