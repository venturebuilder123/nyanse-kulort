# Instagram plaatst zichzelf: eenmalige koppeling (±15 minuten)

*19 oktober 2026. Daarna plaatst de site elke maandag om 19:00 de seizoenscarrousel, en de eerste 4 donderdagen een volgers-beeld. Een dag van tevoren krijg je een mail; overslaan kan in **/lab/social**.*

**Geen wachtwoorden:** je maakt een sleutel aan in je eigen Meta-app. Intrekken kan altijd: Meta → Instellingen → Bedrijfsintegraties, of de app verwijderen.

## Stap 1: Instagram zakelijk maken (2 minuten)

Instagram-app → je profiel → ☰ → **Accounttype en tools** (of: Instellingen → Zakelijk) → **Overschakelen naar professioneel account** → **Bedrijf**. Categorie: *Personal stylist*.

## Stap 2: Facebook-pagina maken en koppelen (3 minuten)

1. Op facebook.com (met je eigen account): **Pagina's → Nieuwe pagina maken** → naam **KULØRT · NYANSE**, categorie *Persoonlijke stylist*. De pagina hoef je niet te gebruiken; hij is alleen nodig voor de koppeling.
2. Op de pagina: **Instellingen → Gekoppelde accounts → Instagram → Verbinden**, en log in met @kulortnyanse.

## Stap 3: een Meta-app maken (3 minuten)

1. Ga naar **developers.facebook.com** → log in met hetzelfde Facebook-account → **Mijn apps → App maken**.
2. Kies **"Overig" → "Zakelijk"** (of het type dat Instagram-beheer aanbiedt) en noem de app **KN Autopost**. Geen app-beoordeling nodig: de app is alleen voor jouw eigen account.
   - AANNAME: zo werkt het voor de beheerder van de app; Meta past de stappen soms aan.

## Stap 4: de sleutel ophalen (3 minuten)

1. Ga in developers.facebook.com naar **Tools → Graph API Explorer**.
2. Kies rechts **jouw app (KN Autopost)** en bij "User or Page" **User Token**.
3. Vink bij Permissions aan: `instagram_basic`, `instagram_content_publish`, `pages_show_list`, `pages_read_engagement`, `business_management`.
4. Klik op **Generate Access Token** en kies in het venster je pagina en je Instagram-account.
5. Klik op het ⓘ-icoontje naast de sleutel → **Open in Access Token Tool** → **Extend Access Token**. Kopieer die **lange** sleutel.
6. Plak hem in je `.env` op een nieuwe regel: `IG_USER_TOKEN=` en daarachter de sleutel. Niet in de chat.

## Stap 5: zeg "klaar" (ik doe de rest)

Ik draai `node scripts/ig-setup.mjs`. Dat script:
- zoekt je pagina en het gekoppelde Instagram-account;
- haalt een **paginasleutel die niet verloopt**;
- zet `IG_ACCESS_TOKEN` en `IG_USER_ID` in je `.env`.

Het toont alleen namen, nooit de sleutels.

## Stap 6: Vercel en Supabase (3 minuten)

1. **Supabase → SQL Editor:** run `supabase/migrations/0008_social_posts.sql`.
2. **Vercel → Environment Variables:**
   - `IG_ACCESS_TOKEN` (**Secret**) en `IG_USER_ID` (Config): kopieer ze uit je `.env`;
   - `SOCIAL_START` (Config) = de maandag waarop de reeks begint, bijvoorbeeld `2026-10-26`.

   Daarna **Redeploy**.
3. Open **/lab/social**. Bovenaan moet staan: "Koppeling: ✓ @kulortnyanse". Wil je testen? Klik bij de eerste post op **Nu plaatsen**.

## Hoe het daarna loopt

- **Elk uur** controleert GitHub of er een post klaarstaat; die gaat dan via de officiële API online. Een post die meer dan 2 dagen te laat is, wordt overgeslagen.
- **De dag ervoor** krijg je de mail "Morgen op Instagram", met het beeld en de eerste regel van het bijschrift.
- **Overslaan of terugzetten** doe je in /lab/social. Daar zie je ook wat geplaatst is en wat misging.
- **Wat de API niet doet:** Stories met stickers (polls, "Add Yours"), muziek onder carrousels, en reageren op anderen. Die blijven handwerk en zijn optioneel.

## TikTok en Pinterest (later)

TikTok laat nieuwe apps pas na een beoordeling openbaar posten. Daarvoor zetten we een planner in die je koppelt met "inloggen met TikTok" (zie GUERRILLA.md §7). De beelden staan al klaar: `public/social/seasons/*/tiktok-cover.jpg` en de slides.
