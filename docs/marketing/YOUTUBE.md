# YouTube Shorts, automatisch

Elke dinsdag om 19:00 gaat de reel van Instagram ook als **YouTube Short** online. De video is dezelfde. Titel, beschrijving en link zijn voor YouTube geschreven, en het label "AI-gegenereerd" staat aan. Dit gaat via de officiële YouTube Data API. Die is gratis en je hoeft nergens een wachtwoord in te vullen.

Totaal ±20 minuten, één keer.

## Stap 1: het kanaal (3 minuten)

1. Ga naar youtube.com en log in met het Google-account dat je hiervoor wilt gebruiken (bijvoorbeeld nyansekulort@gmail.com).
2. Klik rechtsboven op je profiel → **Kanaal maken**.
3. Vul in:
   - naam: **KULØRT · NYANSE**;
   - handle: bijvoorbeeld **@kulortnyanse**.
4. In YouTube Studio, onder **Aanpassen → Basisinfo**:
   - Zet bij **Links** de site: `https://www.kulort-nyanse.com/kleuranalyse?utm_source=youtube`. In Shorts zijn links in de beschrijving niet klikbaar. De kanaallink wel.
   - Zet in de beschrijving: *"One selfie, your colours. Same face, different colour: every Tuesday a new season."*

## Stap 2: een Google Cloud-project (5 minuten, op de computer)

1. Ga naar **console.cloud.google.com** en log in met **hetzelfde** account.
2. Klik bovenaan op de projectkiezer → **Nieuw project**. Noem het `kulort-nyanse` en klik **Maken**.
3. Zoek bovenaan op **YouTube Data API v3**, open het en klik **Inschakelen**.

## Stap 3: de inlog-app (5 minuten)

1. Ga in het menu naar **Google Auth Platform** (of: API's en services → OAuth-toestemmingsscherm) en klik **Aan de slag**.
   - App-naam: `KULØRT · NYANSE autopost`.
   - Ondersteunings-e-mail: je eigen adres.
   - Doelgroep: **Extern**.
   - Contact: je eigen adres.
   - Klik **Maken**.
2. Ga naar **Doelgroep** en klik **App publiceren** (status: "In productie").
   - **Dit is belangrijk.** In de teststand verloopt de sleutel na 7 dagen.
   - Google kan zeggen dat verificatie nodig is. Voor alleen jezelf hoeft dat niet: je krijgt dan straks één keer een waarschuwing.
3. Ga naar **Clients** → **Client maken**.
   - Type: **Desktop-app**.
   - Naam: `autopost`.
   - Klik **Maken**.
4. Kopieer de **Client-ID** en het **Clientgeheim** in `.env` achter `YT_CLIENT_ID=` en `YT_CLIENT_SECRET=` (die regels staan er al).

## Stap 4: één keer inloggen (2 minuten)

Typ in de terminal van dit project:

```
node scripts/youtube-auth.mjs
```

1. De browser opent. Kies het account van het kanaal.
2. Zie je **"Google heeft deze app niet geverifieerd"**? Klik op **Geavanceerd** → **Ga naar KULØRT · NYANSE autopost**. Dat is veilig: het is je eigen app.
3. Vraagt Google welk kanaal je wilt gebruiken? Kies dan **KULØRT · NYANSE**.
4. Klik **Toestaan**.

De terminal meldt daarna: *"✓ YT_REFRESH_TOKEN staat in .env"*.

## Stap 5: Vercel (2 minuten)

1. Zet de drie sleutels uit `.env` in Vercel (Settings → Environment Variables, Production): `YT_CLIENT_ID`, `YT_CLIENT_SECRET` en `YT_REFRESH_TOKEN`. Zet "Sensitive" aan bij de laatste twee.
2. Klik **Redeploy**.
3. Open daarna **/lab/social**. Bovenaan staat dan *"YouTube: ✓ KULØRT · NYANSE"*. Met **Nu plaatsen** bij een Short kun je meteen testen.

## Stap 6: de audit aanvragen (10 minuten, daarna wachten)

**Belangrijk:** zolang Google het project niet heeft gecontroleerd, zet YouTube elke video die via de API binnenkomt automatisch op **privé**. Tot de goedkeuring zet je elke dinsdag de Short zelf op openbaar: YouTube Studio → Content → Zichtbaarheid → **Openbaar**. Dat is één tik.

De controle aanvragen:
1. Zoek op **"YouTube API Services audit and quota extension form"** (support.google.com/youtube/contact/yt_api_form).
2. Kies **"I want to … audit"** en vul in:
   - het project-nummer uit stap 2;
   - het doel: *"Internal tool that uploads our own short videos to our own channel once a week. No other users, no data stored."*;
   - de site: www.kulort-nyanse.com.
3. De controle is gratis. Hoe lang het duurt, weten we niet zeker (AANNAME: een paar weken). Daarna gaan de Shorts vanzelf openbaar.

## Hoe het daarna loopt

- Dinsdag om 19:00 gaan de reel (Instagram) en de Short (YouTube) tegelijk online.
- De dag ervoor staan ze allebei in de mail "Morgen op social".
- Overslaan kan per platform in /lab/social.
- Limiet: YouTube geeft ±6 uploads per dag gratis. Wij doen er 1 per week.
