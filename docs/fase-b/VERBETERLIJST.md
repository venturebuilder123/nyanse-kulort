# Verbeterlijst (stand 13 oktober 2026)

Wat nog niet gebouwd is, gerangschikt op impact op de lancering (3 november). Per punt: wat, waarom, wat het van jou vraagt.

## Blokkerend voor echte verkoop
1. **Inschrijving bij de KvK.** Nodig voor elke betaalpartij en voor de verplichte bedrijfsgegevens in de footer (§9). Daarna kies je tussen Mollie of een merchant of record; de checkout is zo gebouwd dat beide kunnen. *Van jou: inschrijving (eenmalige kosten, checken).*
2. **Btw voor BE en DE (OSS).** Digitale verkopen aan consumenten in andere EU-landen: daar geldt het btw-tarief van dat land, via de OSS-regeling. Een merchant of record regelt dat voor je; met Mollie doe je het zelf (kwartaalaangifte). *Weegt mee in je betaalkeuze.*
3. **Betaalkoppeling en webhook**, plus de pagina `/klaar` die echte statussen laat zien (de schermen staan klaar).
4. **De stijlgids als PDF** (uniek per persoon, in de merkstijl), want die beloven we in de gids. Binnen 60 seconden in de mail (DoD §11).
5. **E-mail via Brevo** met double opt-in: het profiel na het e-mailveld, de gids na betaling, en "je pas is onderweg".
6. **Printpartner voor de kleurenpas** (bijv. Gelato): 24 ontwerpen (12 seizoenen × 2 merken), een koppeling die bij betaling automatisch print en verstuurt naar NL, BE en DE, en de statussen betaald → in productie → verzonden. *Van jou: account en offerte per pas.*

## Groot effect op conversie
7. **Talen: Engels, Duits, Spaans.** De tekststructuur is er al klaar voor (alle teksten per stem in `lib/brand/`). Nodig: taalherkenning (browser of domein), vertaling van ±400 zinnen per stem (eerste versie met Claude, daarna nalezen door een native speaker), en kleurnamen per taal. Duits eerst (verzending naar DE). *Van jou: wie leest de vertalingen na?*
8. **Reveal-video om te delen** (9:16, ±6 seconden, met watermerk) al bij het **gratis** resultaat. Dat is het deelbare moment en ons gratis marketingkanaal.
9. **Bevestigingsscherm met animatie:** de pas glijdt uit de envelop, de digitale pas draait om, en een QR-code met vriendencode.
10. **Vriendenkorting €1** (alleen na betaling van de vriend, maximaal 10 per code, §2).
11. **"Doe de test nog eens"** als bewijs van consistentie. Sceptici (persona Youssef) willen zien dat twee selfies hetzelfde zeggen.
12. **Echte fotoshoot** voor advertenties en het selfievoorbeeld, zodra de eerste verkoop er is (advies van de CX Director). *Van jou: budget (AANNAME €150–300).*
13. **Opnieuw genereren van kulort-4** met gelijk licht op beide wangen, zodat er weer vier mannen in de hero staan.

## Kwaliteit en vertrouwen
14. **Fase A-test met echte mensen** (Monk 1–10, mannen met en zonder baard). De AI-beelden gaven 5 van de 9 keer "Lente": mogelijk hellen de regels richting warm. Pas na de test claimen we iets over nauwkeurigheid.
15. **Lighthouse ≥ 90 op mobiel** meten en verbeteren (lettertypes per merk vooraf laden, analysecode later laden).
16. **Echte iPhone- en Android-test** van de hele flow: live camera, automatisch vastleggen, snelheid van de analyse.
17. **PostHog EU** koppelen: de funnel-events worden al vastgelegd, maar nog niet verstuurd.
18. **SEO en delen:** paginatitels en social-afbeeldingen (Open Graph) per merk, en een PWA-manifest per merk (icoon, naam, kleur) voor "zet op beginscherm".
19. **Grote schermen in de rest van de flow:** de selfie op desktop gaat via QR naar de telefoon; het resultaat kan op desktop een tweekoloms indeling krijgen.

## Na de GO (fase C)
20. **Lens, de browser-extensie**, als betaald abonnement (§8).
21. **Catalogus met echte producten in jouw kleuren** (affiliate-feeds), dan ook outfits in het gratis resultaat.
22. **Merk-badge voor webshops** (de vaste maandomzet uit §8).
23. **Vercel Pro** ($20 per maand) zodra er commercieel verkocht wordt.
