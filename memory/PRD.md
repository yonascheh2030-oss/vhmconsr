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

## Geverifieerd
- POST/GET /api/leads (curl) OK
- Formulier end-to-end via browser OK (succes-toast + opslag)
- Navigatie/anchors, hero, diensten, prijzen, werkwijze, contact visueel OK

## Backlog (prioriteit)
- P0: Echte contactgegevens (telefoon, e-mail, adres, BTW-nummer) vervangen; domein sanivolt.be koppelen
- P0: E-mailnotificatie bij nieuwe lead (Resend)
- P1: Leads-dashboard (admin) om aanvragen op te volgen
- P1: Google Business Profile + echte reviews integreren
- P1: Aparte SEO-landingspagina's per gemeente (Zaventem, Diegem, Schaarbeek...)
- P2: Voor/na-slider (interactief), blog met tips (SEO), meertaligheid (FR/EN)
