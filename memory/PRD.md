# PRD — Sanivolt (sanivolt.be)

## Origineel probleemstatement
"Oke maak een website een goedvindbaar website voor spoedklussen loodgieter en electrien sanivolt.be lijkt mij een goed naam. Zorg dat je gelijk een prof website maken met een Senior engineer kwalitatieve Lead generator. We zullen gelijk vindbaar moeten zijn in Zaventem, Diegem, Haren, Zuid, Schaerbeek en omstreken. Ook vindbaar via alle zoekmachines zoals Google, Gemini enz."

## Doel
Award-waardige leadgeneratie-website voor Sanivolt: spoedloodgieter & elektricien, 24/7, regio Zaventem/Diegem/Haren/Zuid/Schaarbeek en omstreken.

## User personas
- Bewoner met acute spoed (lek, verstopping, stroompanne) — wil direct bellen/WhatsAppen
- Eigenaar/verhuurder met renovatie- of installatieplannen — wil offerte aanvragen
- Zaakvoerder (laadpalen, onderhoud) — wil betrouwbaarheid en garantie

## Architectuur
- Frontend: React (CRA/craco) + Tailwind + framer-motion + lenis + react-fast-marquee
- Backend: FastAPI (server.py), routes onder /api
- Database: MongoDB (collectie `leads`)
- SEO: index.html meta/OG/JSON-LD (Plumber+Electrician, FAQPage), robots.txt, sitemap.xml, llms.txt (AI-zoekmachines)

## Kernvereisten (statisch)
- Licht, clean, betrouwbaar design (Swiss editorial, Outfit + Manrope, blauw #0038FF)
- Leadkanalen: telefoon + offerteformulier + WhatsApp-knop
- Volledig dienstengamma: loodgieterij, elektriciteit, ontstopping, verwarming, sanitair renovatie, airco, laadpalen
- Reviews, voor/na-foto's, prijsindicatie + kennismakingsaanbieding, werkwijze-stappen
- Placeholder-contactgegevens (+32 470 00 00 00, info@sanivolt.be) — later vervangen door echte

## Geïmplementeerd
- 2026-08-21: Kinetic hero (masked line-reveal, parallax beeld), locatie-marquee, diensten-bento (7 diensten), werkwijze-manifesto (4 stappen), voor/na-sectie, prijzen + aanbieding (−15%, code SANIVOLT15), reviews, werkgebied (13 gemeenten), offerteformulier → POST /api/leads (MongoDB), FAQ-accordeon, footer, zwevende WhatsApp-knop, lenis smooth scroll
- 2026-08-21: Volledige SEO-laag (meta, OG, canonical sanivolt.be, JSON-LD LocalBusiness/Plumber/Electrician + FAQPage, robots.txt, sitemap.xml, llms.txt voor AI-zoekmachines)
- 2026-08-21: 13 regiopagina's per gemeente op /spoedloodgieter/{gemeente} (Zaventem, Diegem, Haren, Schaarbeek, Brussel-Zuid, Machelen, Vilvoorde, Evere, Kraainem, Steenokkerzeel, Kortenberg, Grimbergen, Wezembeek-Oppem) met unieke lokale tekst, eigen meta-title/description/canonical/JSON-LD per pagina (react-helmet-async), interne links vanuit Werkgebied-chips en interlinks tussen regio's; sitemap.xml en llms.txt uitgebreid met alle regio-URL's
- Bugfix 2026-08-21: route veranderd van /spoedloodgieter-:slug naar /spoedloodgieter/:slug (React Router v7 ondersteunt geen gedeeltelijke segment-params) + Helmet <title> als template-string
- 2026-08-21: Dienst × Stad matrix live — 91 pagina's op /{dienst}/{gemeente} (7 diensten: spoedloodgieter, elektricien, ontstopping, verwarming, sanitair-renovatie, airco, laadpalen × 13 gemeenten), elk met eigen meta-title/description/canonical/JSON-LD Service, prijsindicatie, USP-bullets en tweerichtings-interlinks (andere diensten in dezelfde gemeente + dezelfde dienst in andere gemeenten); diensten-strip op regiopagina's linkt nu intern; sitemap.xml bevat 106 URL's; llms.txt beschrijft het URL-patroon
- 2026-08-21: Review-automatisering (deel 1): "Beoordeel ons op Google"-knop bij Reviews + link in footer; SITE.googleReviewUrl is nog een PLACEHOLDER tot het Google Bedrijfsprofiel bestaat
- 2026-08-21: Volledige Franse versie live — eigen URL's onder /fr (home /fr, regiopagina's /fr/plombier-electricien/{gemeente}, dienst-stad /fr/{dienst-fr}/{gemeente} met Franse slugs zoals debouchage, bornes-de-recharge), NL/FR-taalwisselaar in de header, hreflang-tags (nl/fr/x-default) en html lang per pagina, Franse JSON-LD/meta per pagina, sitemap.xml nu 211 URL's, alle componenten via centraal vertaalbestand (src/i18n/)
- 2026-08-21: Engelse (/)en en Spaanse (/es) versies toegevoegd — site nu in 4 talen met taalwisselaar NL/FR/EN/ES, eigen slugs per taal (bijv. /en/drain-unblocking/evere, /es/desatascos/schaarbeek), hreflang over 4 talen, sitemap 449 URL's
- 2026-08-21: Professionele dienstpagina's (hubs) per dienst in 4 talen: /diensten/{dienst}, /fr/services/{...}, /en/services/{...}, /es/servicios/{...} — met hero + beeld, bullets, prijsindicatie en links naar alle 13 dienst-stad-pagina's; homepage-dienstkaarten linken nu naar deze hubs
- 2026-08-21: Team-sectie op de homepage (hoofdstuk 06, genummerde hoofdstukken doorgenummerd): vier senior engineers met naam, rol, specialiteit en portretfoto (PLACEHOLDER-stockfoto's tot echte teamfoto's beschikbaar zijn), vertaald in NL/FR/EN/ES (src/i18n/team.js)

## Geverifieerd
- POST/GET /api/leads (curl) OK
- Formulier end-to-end via browser OK (succes-toast + opslag)
- Navigatie/anchors, hero, diensten, prijzen, werkwijze, contact visueel OK
- Regiopagina's: titel/H1 per gemeente OK (Zaventem, Schaarbeek, Diegem getest), interlink-navigatie OK, homepage-chips → regiopagina OK
- Dienst-stad pagina's: /ontstopping/vilvoorde en cross-link naar /airco/vilvoorde OK, breadcrumb OK
- Review-knop zichtbaar (placeholder-URL tot Google Bedrijfsprofiel live is)

## Backlog (prioriteit)
- P0: Echte contactgegevens (telefoon, e-mail, adres, BTW-nummer) vervangen; domein sanivolt.be koppelen
- P0: E-mailnotificatie bij nieuwe lead (Resend)
- P1: Leads-dashboard (admin) om aanvragen op te volgen
- P1: Google Business Profile aanmaken + echte review-link vervangen (nu placeholder)
- P1: Lead-meldingen per e-mail bij nieuwe aanvraag (Resend) — door gebruiker uitgesteld
- P1: Review-automatisering deel 2: automatisch review-verzoek versturen na afgeronde klus (hangt samen met lead-meldingen)
- P1: SEA-voorbereiding: Google Ads landingspagina's + Local Services Ads (externe setup door gebruiker)
- P2: Dynamische geotargeting van titels op basis van bezoekerslocatie
- P2: Voor/na-slider (interactief), blog met tips (SEO), Engelse versie (derde taal)
