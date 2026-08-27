"""Seed realistic sample renovation leads so the dashboard is testable in dev."""
import uuid
from datetime import datetime, timezone, timedelta

from scoring import compute_lead_score, estimated_value

_SAMPLES = [
    {
        "project_types": ["woning"], "oppervlakte": 185, "verdiepingen": 2, "kamers": 7,
        "bouwjaar": 1968, "bewoond": "nee", "renovatie_type": "volledig",
        "works": ["afbraak", "ruwbouw", "elektriciteit", "sanitair", "verwarming", "vloeren", "tegelwerken", "pleisterwerken", "schilderwerken", "afwerking"],
        "beschrijving": "Volledige renovatie van een verouderde gezinswoning. Alles moet vernieuwd worden: technieken, badkamer, keuken en volledige afwerking.",
        "budget": "100-150k", "starttermijn": "1-3m", "heeft_deadline": True, "deadline": "2026-09-01",
        "straat": "Leuvensesteenweg", "huisnummer": "212", "postcode": "1930", "gemeente": "Zaventem", "land": "België",
        "voornaam": "Sofie", "achternaam": "Peeters", "telefoon": "+32 476 12 34 56", "email": "sofie.peeters@example.com",
        "opmerkingen": "Graag afspraak in de voormiddag.", "lang": "nl", "status": "nieuw", "days_ago": 0,
    },
    {
        "project_types": ["bedrijfspand", "kantoor"], "oppervlakte": 420, "verdiepingen": 3, "kamers": 14,
        "bouwjaar": 1985, "bewoond": "nee", "renovatie_type": "volledig",
        "works": ["afbraak", "ruwbouw", "nieuwe-indeling", "elektriciteit", "sanitair", "ventilatie", "vloeren", "gyproc", "schilderwerken", "afwerking"],
        "beschrijving": "Volledige renovatie van een kantoorgebouw met nieuwe indeling, technieken en afwerking over drie verdiepingen.",
        "budget": "gt250k", "starttermijn": "asap", "heeft_deadline": True, "deadline": "2026-08-15",
        "straat": "Woluwelaan", "huisnummer": "58", "postcode": "1831", "gemeente": "Diegem", "land": "België",
        "voornaam": "Karim", "achternaam": "El Amrani", "telefoon": "+32 470 99 88 77", "email": "karim@example-bv.be",
        "bedrijfsnaam": "El Amrani Invest BV", "btw": "BE0777.888.999", "lang": "fr", "status": "nieuw", "days_ago": 1,
    },
    {
        "project_types": ["appartement"], "oppervlakte": 95, "verdiepingen": 1, "kamers": 4,
        "bouwjaar": 2001, "bewoond": "ja", "renovatie_type": "volledig",
        "works": ["elektriciteit", "sanitair", "badkamer", "keuken", "vloeren", "schilderwerken", "afwerking"],
        "beschrijving": "Appartement volledig opfrissen: nieuwe keuken, badkamer, vloeren en schilderwerk.",
        "budget": "50-100k", "starttermijn": "1-3m", "heeft_deadline": False, "deadline": None,
        "straat": "Rue de la Loi", "huisnummer": "120", "postcode": "1000", "gemeente": "Brussel", "land": "België",
        "voornaam": "Marie", "achternaam": "Dubois", "telefoon": "+32 478 55 44 33", "email": "marie.dubois@example.com",
        "lang": "fr", "status": "bezocht", "days_ago": 3,
    },
    {
        "project_types": ["badkamer"], "oppervlakte": 12, "verdiepingen": 1, "kamers": 1,
        "bouwjaar": 1995, "bewoond": "ja", "renovatie_type": "gedeeltelijk",
        "works": ["sanitair", "tegelwerken", "elektriciteit"],
        "beschrijving": "Badkamer vernieuwen met inloopdouche en nieuwe tegels.",
        "budget": "10-25k", "starttermijn": "3-6m", "heeft_deadline": False, "deadline": None,
        "straat": "Kerkstraat", "huisnummer": "9", "postcode": "1800", "gemeente": "Vilvoorde", "land": "België",
        "voornaam": "Jan", "achternaam": "Willems", "telefoon": "+32 471 22 33 44", "email": "jan.willems@example.com",
        "lang": "nl", "status": "nieuw", "days_ago": 4,
    },
    {
        "project_types": ["keuken"], "oppervlakte": 18, "verdiepingen": 1, "kamers": 1,
        "bouwjaar": 2010, "bewoond": "ja", "renovatie_type": "gedeeltelijk",
        "works": ["keuken", "elektriciteit", "vloeren"],
        "beschrijving": "Nieuwe keuken plaatsen.",
        "budget": "10-25k", "starttermijn": "6-12m", "heeft_deadline": False, "deadline": None,
        "straat": "Dorpsstraat", "huisnummer": "44", "postcode": "3070", "gemeente": "Kortenberg", "land": "België",
        "voornaam": "Elena", "achternaam": "García", "telefoon": "+32 479 66 55 44", "email": "elena.garcia@example.com",
        "lang": "es", "status": "nieuw", "days_ago": 6,
    },
    {
        "project_types": ["woning"], "oppervlakte": 140, "verdiepingen": 2, "kamers": 6,
        "bouwjaar": 1975, "bewoond": "nee", "renovatie_type": "volledig",
        "works": ["afbraak", "ruwbouw", "elektriciteit", "sanitair", "verwarming", "isolatie", "vloeren", "pleisterwerken", "schilderwerken", "afwerking", "dak"],
        "beschrijving": "Grote renovatie van een woning, budget hoog maar de woning ligt buiten de regio (kust).",
        "budget": "150-250k", "starttermijn": "1-3m", "heeft_deadline": False, "deadline": None,
        "straat": "Zeedijk", "huisnummer": "3", "postcode": "8400", "gemeente": "Oostende", "land": "België",
        "voornaam": "Peter", "achternaam": "Maes", "telefoon": "+32 472 11 22 33", "email": "peter.maes@example.com",
        "lang": "nl", "status": "nieuw", "days_ago": 2,
    },
    {
        "project_types": ["handelsruimte"], "oppervlakte": 65, "verdiepingen": 1, "kamers": 2,
        "bouwjaar": 1990, "bewoond": "nee", "renovatie_type": "gedeeltelijk",
        "works": ["elektriciteit", "vloeren", "schilderwerken", "afwerking"],
        "beschrijving": "Handelsruimte opfrissen voor nieuwe huurder.",
        "budget": "25-50k", "starttermijn": "1m", "heeft_deadline": True, "deadline": "2026-07-20",
        "straat": "Stationlei", "huisnummer": "77", "postcode": "1800", "gemeente": "Vilvoorde", "land": "België",
        "voornaam": "Tom", "achternaam": "Claes", "telefoon": "+32 473 44 55 66", "email": "tom.claes@example.com",
        "lang": "nl", "status": "offerte_verzonden", "days_ago": 8,
    },
    {
        "project_types": ["andere"], "oppervlakte": 30, "verdiepingen": 1, "kamers": 1,
        "bouwjaar": 2015, "bewoond": "ja", "renovatie_type": "onzeker",
        "works": ["schilderwerken"],
        "beschrijving": "Kleine schilderklus.",
        "budget": "lt10k", "starttermijn": "later", "heeft_deadline": False, "deadline": None,
        "straat": "Parklaan", "huisnummer": "12", "postcode": "1030", "gemeente": "Schaarbeek", "land": "België",
        "voornaam": "Luc", "achternaam": "Vermeulen", "telefoon": "+32 474 77 88 99", "email": "luc.v@example.com",
        "lang": "nl", "status": "nieuw", "days_ago": 10,
    },
]


async def seed_sample_leads(db):
    count = await db.leads.count_documents({})
    if count > 0:
        return
    now = datetime.now(timezone.utc)
    docs = []
    for s in _SAMPLES:
        days_ago = s.pop("days_ago", 0)
        s.setdefault("files", [])
        scoring = compute_lead_score(s)
        doc = {
            **s,
            "id": str(uuid.uuid4()),
            "score": scoring["score"],
            "category": scoring["category"],
            "score_breakdown": scoring["breakdown"],
            "geschatte_waarde": estimated_value(s.get("budget")),
            "created_at": (now - timedelta(days=days_ago, hours=days_ago)).isoformat(),
        }
        docs.append(doc)
    if docs:
        await db.leads.insert_many(docs)
