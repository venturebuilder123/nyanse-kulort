# Instagram plaatst zichzelf: eenmalige koppeling (±15 minuten)

*19 oktober 2026. Daarna plaatst de site elke woensdag om 18:30 de seizoenscarrousel, en de eerste 4 donderdagen om 12:00 een volgers-beeld. Een dag van tevoren krijg je een mail; overslaan kan in **/lab/social**.*

**Geen wachtwoorden:** je maakt een sleutel aan in je eigen Meta-app. Je Facebook-profiel met professionele modus mag blijven bestaan, maar is hiervoor niet nodig. Intrekken kan altijd: Meta → Instellingen → Bedrijfsintegraties, of de app verwijderen.

## Route: inloggen met Instagram (geen Facebook-pagina nodig)

*Aangepast op 19 oktober 2026: de route via een Facebook-pagina bleek omslachtig. Een professioneel Facebook-profiel telt niet als pagina.*

### Stap 1: Instagram zakelijk (2 minuten)

In de **Instagram-app** (niet Facebook): je profiel → ☰ → **Accounttype en tools** → **Overschakelen naar professioneel account** → **Bedrijf**. Categorie: *Personal stylist*. Is het al zakelijk, dan sla je dit over.

### Stap 2: een Meta-app maken (3 minuten, op de computer)

1. Ga naar **developers.facebook.com** → log in → **Mijn apps → App maken**.
2. Kies bij het doel (use case) **"Berichten en content beheren op Instagram"**. In het Engels: *Manage messaging & content on Instagram*. Noem de app **KN Autopost**. Kies bij "bedrijfsportfolio" eventueel "nu niet".

### Stap 3: de sleutel ophalen (2 minuten)

1. Open in je app links **Instagram → API-instellingen met Instagram-bedrijfslogin**. In het Engels: *API setup with Instagram business login*.
2. Klik bij **"Toegangstokens genereren"** op **Account toevoegen** en log in met **@kulortnyanse**.
3. Klik daarna naast @kulortnyanse op **Token genereren** en kopieer de sleutel. Die begint met **IG…**.
4. Plak hem in je **`.env`** op een nieuwe regel: `IG_ACCESS_TOKEN=` en daarachter de sleutel. Niet in de chat.

### Stap 4: zeg "klaar"

Ik controleer de sleutel met `node scripts/ig-check.mjs`. Dat toont alleen je accountnaam.

### Stap 5: Supabase en Vercel (3 minuten)

1. **Supabase → SQL Editor:** run `supabase/migrations/0008_social_posts.sql`.
2. **Vercel → Environment Variables:**
   - `IG_ACCESS_TOKEN` (**Secret**, uit je `.env`);
   - `SOCIAL_START` (Config) = de maandag van de week waarin de reeks begint, bijvoorbeeld `2026-10-19`. De carrousel van die week gaat op woensdag online.

   Daarna **Redeploy**.
3. Open **/lab/social**. Bovenaan moet staan: "Koppeling: ✓ @kulortnyanse". Wil je testen? Klik bij de eerste post op **Nu plaatsen**.

**De sleutel vernieuwt zichzelf.** Een sleutel via Instagram-login is 60 dagen geldig. De site vernieuwt hem automatisch elke 30 dagen en bewaart de nieuwste in de database, dus je hoeft niets bij te houden.

### Alternatief: via een Facebook-pagina

Wil je later toch een echte Facebook-pagina, dan werkt de oude route ook: een paginasleutel uit de Graph API Explorer, plus `scripts/ig-setup.mjs`. De site herkent zelf welke sleutel het is.

## Hoe het daarna loopt

- **Elk uur** controleert GitHub of er een post klaarstaat; die gaat dan via de officiële API online. Een post die meer dan 2 dagen te laat is, wordt overgeslagen.
- **De dag ervoor** krijg je de mail "Morgen op Instagram", met het beeld en de eerste regel van het bijschrift.
- **Het ritme:** dinsdag 19:00 een reel (zelfde gezicht, ander doek), woensdag 18:30 de seizoenscarrousel en donderdag 12:00 een beeld.
- **Reels:** Instagram verwerkt de video eerst. Is dat na een minuut nog niet klaar, dan staat de post op "⏳ verwerkt" en gaat hij het volgende uur online.
- **Nieuwe Gemini-beelden:**
  1. Zet ze in `assets/gemini/effect/`, met de naam `effect-{seizoen}-{nyanse|kulort}-{1|2}.jpg`.
  2. Draai `node scripts/make-effect-posts.mjs` en push.
  3. Ze komen dan vanzelf in de kalender.
- **Overslaan of terugzetten** doe je in /lab/social. Daar zie je ook wat geplaatst is en wat misging.
- **Wat de API niet doet:** Stories met stickers (polls, "Add Yours"), muziek onder carrousels, en reageren op anderen. Die blijven handwerk en zijn optioneel.

## Geblokkeerd: "API access blocked"

**Wat het is.** Meta blokkeert de API-toegang van de app of van het account. Zelfs alleen je accountnaam opvragen lukt dan niet meer. Het token is niet het probleem: een verlopen token geeft foutcode 190, dit is code 200.

**Wat de site doet:**
- De geplande posts blijven klaarstaan.
- Elk uur probeert de site het opnieuw, tot 2 dagen na het geplande moment.
- Je krijgt één waarschuwingsmail per dag.

**Wat jij nagaat, in deze volgorde:**
1. **De Instagram-app op je telefoon.** Staat er een melding als "Bevestig dat jij het bent", "We hebben bepaalde activiteit beperkt" of een vraag om je e-mail of telefoon te bevestigen? Volg die.
2. **Instagram → Instellingen → Accountstatus.** Staat daar een beperking of een overtreding?
3. **developers.facebook.com → My Apps → jouw app.** Kijk naar meldingen bovenaan en onder het belletje: "App restricted", "Data Use Checkup", "Verify" of "Complete…". Rond af wat er staat.
4. **Je Facebook-profiel**, waarmee de app is gemaakt. Staat daar een melding over je account (accountkwaliteit, identiteit bevestigen)? Een beperkt ontwikkelaarsaccount blokkeert ook de app.
5. **Instagram → Instellingen → Website-machtigingen → Apps en websites.** Staat de app er nog als actief?

**Is de app zelf geblokkeerd ("App restricted" zonder te herstellen stap)?**
- Dien in het app-dashboard een bezwaar in ("Request review" of "Appeal").
- Lukt dat niet, dan maken we een nieuwe app aan (stappen 2 t/m 5 hierboven, ±10 minuten). Ik zet het token dan opnieuw.

## TikTok en Pinterest (later)

TikTok laat nieuwe apps pas na een beoordeling openbaar posten. Daarvoor zetten we een planner in die je koppelt met "inloggen met TikTok" (zie GUERRILLA.md §7). De beelden staan al klaar: `public/social/seasons/*/tiktok-cover.jpg` en de slides.
