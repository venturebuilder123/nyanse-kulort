import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { AppBar, Footer } from "../ui";
import { currentBrand } from "../brand";
import DeleteProfile from "./DeleteProfile";

// Privacy statement for both brands (CLAUDE.md §9), in Dutch and English (21 Oct 2026).
export default async function Privacy() {
  const { locale } = await currentBrand();
  return locale === "en" ? <PrivacyEn /> : <PrivacyNl />;
}

function PrivacyNl() {
  return (
    <main className="screen">
      <AppBar pill="Privacy" />
      <article className="pad prose">
        <h1 className="disp sm">Privacy</h1>
        <p className="muted small">Versie 18 oktober 2026. Geldt voor NYANSE en KULØRT, twee merken van {COMPANY.name} (KvK {COMPANY.kvk}). Wij zijn verantwoordelijk voor je gegevens.</p>

        <h2>Je foto</h2>
        <p>De kleuranalyse draait op je eigen telefoon. Je foto wordt niet naar ons of naar anderen gestuurd en nergens bewaard, ook niet op je telefoon. Sluit je het tabblad, dan is hij weg.</p>

        <h2>Je profiel</h2>
        <p>Je kleurprofiel (alleen getallen en je antwoorden, geen foto) staat op je eigen telefoon, zodat je het later terugziet. Met één tik wis je het:</p>
        <DeleteProfile />

        <h2>Wat we wel verwerken</h2>
        <ul>
          <li><b>Je kleurprofiel</b> (getallen voor ondertoon, diepte en helderheid) en je antwoorden (gelegenheid, budget, winkels, haar, goud of zilver). Om je profiel en gids te maken.</li>
          <li><b>Je e-mailadres</b>, alleen als je het geeft. Om je profiel en gids te sturen. Maandmails alleen als je dat apart aanvinkt; afmelden kan in elke mail. Zonder bestelling bewaren we je adres maximaal 2 jaar na je laatste contact.</li>
          <li><b>Bestelgegevens</b> en, bij de kleurenpas, je adres. Om te leveren en voor de boekhouding (7 jaar bewaarplicht).</li>
          <li><b>Kleur van de week</b>, alleen als je die aanzet: het pushadres van je browser, je merk, je kleurtype en je tijdzone. Maximaal één melding per week, overdag. Uitzetten kan in je gids; met &quot;Verwijder mijn profiel&quot; verdwijnt het ook van onze server.</li>
          <li><b>Bij persoonlijk kleuradvies</b> de foto&apos;s die je ons zelf mailt. Alleen onze kleurconsulent bekijkt ze, alleen voor jouw advies. We verwijderen ze binnen 30 dagen na je video.</li>
          <li><b>Bij een bestelling</b> ook je kleurprofiel (alleen getallen, nooit je foto), zodat je je stijlgids met de link uit je mail op elk apparaat kunt openen.</li>
          <li><b>Gebruik van de app</b>, zonder je naam, e-mail of foto en zonder cookies (PostHog, servers in de EU; je IP-adres wordt niet bewaard), om te zien welke stappen werken en hoe vaak de app terugkomt. Je voortgang staat op je eigen telefoon, zodat je verder kunt waar je was.</li>
        </ul>
        <p>We gebruiken je gezicht nooit om je te herkennen en we leiden er niets gevoeligs uit af. We verkopen niets door.</p>

        <h2>Wie helpt ons</h2>
        <p>Hosting (Vercel), database in de EU (Supabase), betalingen (Mollie), e-mail in de EU (Brevo) en statistieken in de EU (PostHog). Met elke partij is een verwerkersovereenkomst gesloten.</p>

        <h2>Cookies</h2>
        <p>Alleen functionele cookies: welk merk en welke stijl je ziet, zodat de app tijdens je bezoek hetzelfde blijft. De stijl onthouden we alleen tijdens je bezoek.</p>

        <h2>Jouw rechten</h2>
        <p>Je kunt je gegevens inzien, laten aanpassen of laten verwijderen. Mail naar <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Een klacht kun je indienen bij de Autoriteit Persoonsgegevens.</p>

        <p><Link href="/">← Terug</Link></p>
      </article>
      <Footer />
    </main>
  );
}

function PrivacyEn() {
  return (
    <main className="screen">
      <AppBar pill="Privacy" />
      <article className="pad prose">
        <h1 className="disp sm">Privacy</h1>
        <p className="muted small">Version 21 October 2026. Applies to NYANSE and KULØRT, two brands of {COMPANY.name} (Dutch Chamber of Commerce {COMPANY.kvk}). We are responsible for your data.</p>

        <h2>Your photo</h2>
        <p>The colour analysis runs on your own phone. Your photo is not sent to us or anyone else and is never stored, not even on your phone. Close the tab and it is gone.</p>

        <h2>Your profile</h2>
        <p>Your colour profile (numbers and your answers only, no photo) is kept on your own phone, so you can see it again later. Delete it with one tap:</p>
        <DeleteProfile />

        <h2>What we do process</h2>
        <ul>
          <li><b>Your colour profile</b> (numbers for undertone, depth and clarity) and your answers (occasion, budget, shops, hair, gold or silver, your own check of skin, eyes and hair). To make your profile and guide.</li>
          <li><b>Your e-mail address</b>, only if you give it. To send your profile and guide. Monthly e-mails only if you tick that box separately; you can unsubscribe in every e-mail. Without an order we keep your address for at most 2 years after your last contact.</li>
          <li><b>Order details</b> and, for the colour card, your address. To deliver and for our accounts (7-year legal retention).</li>
          <li><b>Colour of the week</b>, only if you switch it on: your browser&apos;s push address, your brand, your colour type and your time zone. At most one notification a week, during the day. Switch it off in your guide; &quot;Delete my profile&quot; also removes it from our server.</li>
          <li><b>For personal colour advice</b>, the photos you e-mail us yourself. Only our colour consultant looks at them, only for your advice. We delete them within 30 days of your video.</li>
          <li><b>With an order</b>, also your colour profile (numbers only, never your photo) and your language, so you can open your style guide on any device with the link in your e-mail.</li>
          <li><b>Use of the app</b>, without your name, e-mail or photo and without cookies (PostHog, servers in the EU; your IP address is not stored), to see which steps work and how often people come back. Your progress is stored on your own phone, so you can continue where you left off.</li>
        </ul>
        <p>We never use your face to recognise you and we never infer anything sensitive from it. We sell nothing on.</p>

        <h2>Who helps us</h2>
        <p>Hosting (Vercel), a database in the EU (Supabase), payments (Mollie), e-mail in the EU (Brevo) and statistics in the EU (PostHog). We have a data processing agreement with each of them.</p>

        <h2>Cookies</h2>
        <p>Functional cookies only: which brand, style and language you see, so the app stays the same during your visit. The style is remembered for your visit only; your language choice for a year.</p>

        <h2>Your rights</h2>
        <p>You can view, correct or delete your data. E-mail <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. You can file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens) or the authority in your own country.</p>

        <p><Link href="/">← Back</Link></p>
      </article>
      <Footer />
    </main>
  );
}
