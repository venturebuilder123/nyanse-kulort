# Beslissingen

Nieuwste bovenaan. Per beslissing: wat, waarom, en wat het kost.

## 13 oktober 2026 — fase A, week 1 gebouwd

- **Supabase in West EU (Ierland)** in plaats van Frankfurt: ook EU, voldoet. Niet opnieuw aanmaken.
- **`/lab` is de eerste route van de echte app** (Next.js 16, TypeScript strict). De kleurlogica en kaartdetectie gaan zo mee naar fase B.
- **ArUco via js-aruco2 (54 kB) in plaats van OpenCV.js (±8 MB).** Herkent onze marker (getest tegen OpenCV). Omgezet naar één ES-module (`scripts/vendor-aruco.mjs`), omdat de moderne bundler het oude script niet slikt.
- **MediaPipe-modellen en WASM op ons eigen domein** (`scripts/setup-models.mjs`), niet via Google of een CDN. Er gaat bij een analyse dus niets naar derden.
- **Haar en baard via segmentatie** (selfie_multiclass), niet via een vaste strook boven het voorhoofd. Dat werkt ook bij een pony, kaal hoofd of lang haar, en scheidt een baard van de wanghuid.
- **Meten en regels zijn gescheiden.** We bewaren de meetwaarden (Lab per gebied); het profiel wordt steeds opnieuw berekend. Een regelaanpassing werkt dus direct op oude tests, zonder nieuwe foto's. Daardoor is het bewaren van testfoto's minder nodig (toestemming 2 is optioneel).
- **Elke kaartfoto wordt ook zonder correctie gemeten:** zuiver effect van de kaart op precies dezelfde foto.
- **Ondertoon = afstand tot de neutrale lijn, niet de tint-hoek.** Gevonden in de eerste end-to-end-test: bij bleke of overbelichte huid sprong de hoek alle kanten op (spreiding 0,39 → 0,13 op dezelfde foto in 3 lichtsoorten).
- **Week 1 slaat op in de browser (IndexedDB)** met back-up en CSV-export; Supabase volgt in week 2.
- **Testpersonen 18+** (het toestemmingsformulier), strenger dan 16+ in het product: een test met huidtint verdient extra zorg.
- **Open vraag aan de oprichter:** telt een uitslag "op de rand" (bijv. Bright Spring ↔ Bright Winter) mee als andere uitslag in de gate? Zie de samenvatting van 13 oktober.

## 12 oktober 2026 — fase A gestart

- **Referentiekaart v1** ([PDF](fase-a/referentiekaart-v1.pdf), bron: `tools/card/`). ArUco `DICT_4X4_50` id 1 (grote cellen, dus ook klein in beeld te herkennen; ondersteund door OpenCV.js en js-aruco2), 18%-grijs (#777777), wit = onbedrukt papier, en 4 controlevlakken: lichte en donkere huid plus rood (warm) en blauw (koel), want ondertoon is precies de as die we meten. Kosten: €0 (zelf printen).
- **De layout staat in één bestand** (`tools/card/layout-v1.json`), zodat de print en de detectie in `/lab` niet uit elkaar kunnen lopen.
- **Thuisgeprinte kaart = alleen relatieve correctie.** Genoeg voor de consistentie-gate; voor de echte pas is een drukkerij nodig.
- **Voorstel (wacht op GO):** naast consistentie ook spreiding en een grondwaarheid meten. Zie [fase-a/PLAN.md](fase-a/PLAN.md).

## 12 oktober 2026

- **Twee merken: NYANSE (vrouwen) en KULØRT (mannen).** Eén motor, twee stemmen-sets. Waarom: een hip, Noords modemerk geeft vertrouwen, en de ø ziet er sterk uit. Beide .com-domeinen gaven "No match" in whois.
- **Huefit afgevallen:** huefit.store (gratis Chrome-extensie, India, sinds 2025). **Monteint afgevallen:** een Moncler-productlijn. **Teintu afgevallen:** voelde oubollig. Ook bezet: Drape, Undertone, ToneFit, Tint, Glød.
- **Prijs blijft €6,99 / €9,99.** Digitaal niet gratis maken: het draait om zichtbaarheid op social en de impulsaankoop.
- **Lens (browser-extensie) is de eerste prioriteit na een GO.** Je AI-shoppingmaatje dat op elke webshop je kleuren markeert.
- **Overgenomen van huefit.store:** Monk Skin Tone Scale voor het testen, analyse op het apparaat, profiel lokaal met één tik verwijderen, en een "nooit op commissie"-belofte. **Niet overgenomen:** onbewezen cijfers en anonieme testimonials.
- **Geen kinderen** (AVG art. 8, DSA, kleuring verandert nog).
- **Reddingsplan na de red team:** kalibratiepas, profiel op drie schalen in plaats van 12 vakjes, merk-badge voor webshops als vaste maandomzet, reveal-video en creators op commissie in plaats van advertenties in Q4, en eerst twee gratis tests als stoppunt.
- **Eén vraag om geld in de flow.** Upsells naar de mail. Geen disclaimer-teksten in de interface.
- **Tastbaar product:** een kleurenpas in de brievenbus (€9,99-pakket).
