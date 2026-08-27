"""SMTP email: new-lead notification (to Roberto) + customer confirmation.

Gracefully no-ops when SMTP is not configured, so lead capture never fails.
Configure via env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, NOTIFY_EMAIL.
"""
import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

logger = logging.getLogger(__name__)

BUDGET_LABEL = {
    "lt10k": "< €10.000", "10-25k": "€10.000–€25.000", "25-50k": "€25.000–€50.000",
    "50-100k": "€50.000–€100.000", "100-150k": "€100.000–€150.000",
    "150-250k": "€150.000–€250.000", "gt250k": "> €250.000", "unknown": "Nog niet bepaald",
}
TIMING_LABEL = {
    "asap": "Zo snel mogelijk", "1m": "Binnen 1 maand", "1-3m": "Binnen 1–3 maanden",
    "3-6m": "Binnen 3–6 maanden", "6-12m": "Binnen 6–12 maanden", "later": "Later",
    "unknown": "Nog niet bepaald",
}
CATEGORY_LABEL = {"hot": "HOT LEAD", "high": "HIGH PRIORITY", "normal": "NORMAAL", "low": "LAGE PRIORITEIT"}


def _smtp_configured() -> bool:
    return bool(os.environ.get("SMTP_HOST") and os.environ.get("SMTP_USER") and os.environ.get("SMTP_PASSWORD"))


def _send(to_email: str, subject: str, html: str) -> bool:
    if not _smtp_configured():
        logger.warning("SMTP niet geconfigureerd — e-mail overgeslagen (naar %s): %s", to_email, subject)
        return False
    host = os.environ["SMTP_HOST"]
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ["SMTP_USER"]
    password = os.environ["SMTP_PASSWORD"]
    sender = os.environ.get("SMTP_FROM") or user

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))
    try:
        if port == 465:
            server = smtplib.SMTP_SSL(host, port, timeout=20)
        else:
            server = smtplib.SMTP(host, port, timeout=20)
            server.starttls()
        server.login(user, password)
        server.sendmail(sender, [to_email], msg.as_string())
        server.quit()
        logger.info("E-mail verzonden naar %s: %s", to_email, subject)
        return True
    except Exception as e:  # never break the request flow
        logger.error("E-mail versturen mislukt (%s): %s", to_email, e)
        return False


def send_new_lead_notification(lead: dict) -> bool:
    to_email = os.environ.get("NOTIFY_EMAIL")
    if not to_email:
        return False
    cat = lead.get("category", "normal")
    urgent = cat == "hot"
    prefix = "🔥 URGENTE HOT LEAD" if urgent else f"Nieuwe lead ({CATEGORY_LABEL.get(cat, '')})"
    naam = f"{lead.get('voornaam', '')} {lead.get('achternaam', '')}".strip()
    ptypes = ", ".join(lead.get("project_types") or [])
    subject = f"{prefix} — {ptypes or 'Renovatie'} in {lead.get('gemeente', '')} ({lead.get('score')}/100)"
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:{'#991B1B' if urgent else '#9C5B3E'};color:#fff;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="margin:0;font-size:20px;">{prefix}</h2>
        <p style="margin:6px 0 0;opacity:.9;">Leadscore: <strong>{lead.get('score')}/100</strong> — {CATEGORY_LABEL.get(cat, '')}</p>
      </div>
      <div style="border:1px solid #E7E5E4;border-top:none;padding:24px;border-radius:0 0 8px 8px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1C1917;">
          <tr><td style="padding:6px 0;color:#78716C;">Naam</td><td style="padding:6px 0;font-weight:600;">{naam}</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">Telefoon</td><td style="padding:6px 0;font-weight:600;">{lead.get('telefoon', '')}</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">E-mail</td><td style="padding:6px 0;font-weight:600;">{lead.get('email', '')}</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">Projecttype</td><td style="padding:6px 0;font-weight:600;">{ptypes}</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">Oppervlakte</td><td style="padding:6px 0;font-weight:600;">{lead.get('oppervlakte') or '—'} m²</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">Budget</td><td style="padding:6px 0;font-weight:600;">{BUDGET_LABEL.get(lead.get('budget'), '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">Start</td><td style="padding:6px 0;font-weight:600;">{TIMING_LABEL.get(lead.get('starttermijn'), '—')}</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">Locatie</td><td style="padding:6px 0;font-weight:600;">{lead.get('straat', '')} {lead.get('huisnummer', '')}, {lead.get('postcode', '')} {lead.get('gemeente', '')}</td></tr>
          <tr><td style="padding:6px 0;color:#78716C;">Foto's/plannen</td><td style="padding:6px 0;font-weight:600;">{len(lead.get('files') or [])} bestand(en)</td></tr>
        </table>
        <p style="margin:16px 0 6px;color:#78716C;font-size:13px;">Omschrijving</p>
        <p style="margin:0;font-size:14px;color:#1C1917;background:#F5F5F4;padding:12px;border-radius:6px;">{(lead.get('beschrijving') or '—')}</p>
      </div>
    </div>
    """
    return _send(to_email, subject, html)


_CONFIRM = {
    "nl": {
        "subject": "Bedankt voor uw renovatieaanvraag — BetoDecor",
        "title": "Bedankt voor uw renovatieaanvraag",
        "body": "We hebben uw projectgegevens goed ontvangen. BetoDecor bekijkt uw aanvraag zorgvuldig en neemt contact met u op om de mogelijkheden en een eventueel plaatsbezoek te bespreken.",
        "note": "Een definitieve offerte wordt pas opgesteld na beoordeling van het project en, indien nodig, een plaatsbezoek.",
        "regards": "Met vriendelijke groeten,<br>Het team van BetoDecor",
    },
    "fr": {
        "subject": "Merci pour votre demande de rénovation — BetoDecor",
        "title": "Merci pour votre demande de rénovation",
        "body": "Nous avons bien reçu les détails de votre projet. BetoDecor examine votre demande avec soin et vous contactera pour discuter des possibilités et d'une éventuelle visite sur place.",
        "note": "Un devis définitif ne sera établi qu'après évaluation du projet et, si nécessaire, une visite sur place.",
        "regards": "Cordialement,<br>L'équipe de BetoDecor",
    },
    "en": {
        "subject": "Thank you for your renovation request — BetoDecor",
        "title": "Thank you for your renovation request",
        "body": "We have received your project details. BetoDecor will carefully review your request and contact you to discuss the possibilities and a possible site visit.",
        "note": "A final quote is only drawn up after assessment of the project and, if necessary, a site visit.",
        "regards": "Kind regards,<br>The BetoDecor team",
    },
    "es": {
        "subject": "Gracias por su solicitud de reforma — BetoDecor",
        "title": "Gracias por su solicitud de reforma",
        "body": "Hemos recibido los detalles de su proyecto. BetoDecor revisará su solicitud cuidadosamente y se pondrá en contacto con usted para hablar de las posibilidades y una posible visita.",
        "note": "Un presupuesto definitivo solo se elabora tras la evaluación del proyecto y, si es necesario, una visita.",
        "regards": "Un cordial saludo,<br>El equipo de BetoDecor",
    },
}


def send_customer_confirmation(lead: dict) -> bool:
    to_email = lead.get("email")
    if not to_email:
        return False
    lang = lead.get("lang", "nl")
    c = _CONFIRM.get(lang, _CONFIRM["nl"])
    naam = lead.get("voornaam", "")
    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1C1917;">
      <div style="background:#1C1917;color:#fff;padding:28px 24px;border-radius:8px 8px 0 0;">
        <p style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">BetoDecor</p>
        <p style="margin:4px 0 0;opacity:.7;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Totaalrenovatie &amp; Bouw</p>
      </div>
      <div style="border:1px solid #E7E5E4;border-top:none;padding:28px 24px;border-radius:0 0 8px 8px;">
        <h2 style="margin:0 0 12px;font-size:20px;">{c['title']}</h2>
        <p style="margin:0 0 4px;">{('Beste ' if lang=='nl' else 'Bonjour ' if lang=='fr' else 'Hola ' if lang=='es' else 'Dear ')}{naam},</p>
        <p style="margin:12px 0;line-height:1.6;color:#44403C;">{c['body']}</p>
        <p style="margin:16px 0;padding:14px;background:#F5F5F4;border-left:3px solid #9C5B3E;border-radius:4px;font-size:13px;color:#57534E;">{c['note']}</p>
        <p style="margin:18px 0 0;line-height:1.6;">{c['regards']}</p>
      </div>
      <p style="text-align:center;color:#A8A29E;font-size:12px;margin-top:16px;">BetoDecor — Konijnenstraat 16, 1930 Zaventem — BE 1010257176</p>
    </div>
    """
    return _send(to_email, c["subject"], html)
