import Link from "next/link";
import { AppBar, Footer } from "../ui";
import DeleteProfile from "./DeleteProfile";

// Privacy statement for both brands (CLAUDE.md §9). Company details are filled in at registration.
export default function Privacy() {
  return (
    <main className="screen">
      <AppBar pill="Privacy" />
      <article className="pad prose">
        <h1 className="disp sm">Privacy</h1>
        <p className="muted small">Versie 13 oktober 2026. Geldt voor NYANSE en KULØRT, twee merken van [bedrijfsnaam], [adres], KvK [nummer].</p>

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
          <li><b>Bij een bestelling</b> ook je kleurprofiel (alleen getallen, nooit je foto), zodat je je stijlgids met de link uit je mail op elk apparaat kunt openen.</li>
          <li><b>Gebruik van de app</b>, zonder je naam, e-mail of foto en zonder cookies (PostHog, servers in de EU; je IP-adres wordt niet bewaard), om te zien welke stappen werken en hoe vaak de app terugkomt. Je voortgang staat op je eigen telefoon, zodat je verder kunt waar je was.</li>
        </ul>
        <p>We gebruiken je gezicht nooit om je te herkennen en we leiden er niets gevoeligs uit af. We verkopen niets door.</p>

        <h2>Wie helpt ons</h2>
        <p>Hosting (Vercel), database in de EU (Supabase), betalingen (Mollie), e-mail in de EU (Brevo) en statistieken in de EU (PostHog). Met elke partij is een verwerkersovereenkomst gesloten.</p>

        <h2>Cookies</h2>
        <p>Alleen functionele cookies: welk merk en welke stijl je ziet, zodat de app tijdens je bezoek hetzelfde blijft. De stijl onthouden we alleen tijdens je bezoek.</p>

        <h2>Jouw rechten</h2>
        <p>Je kunt je gegevens inzien, laten aanpassen of laten verwijderen. Mail naar <a href="mailto:privacy@[domein]">privacy@[domein]</a>. Een klacht kun je indienen bij de Autoriteit Persoonsgegevens.</p>

        <p><Link href="/">← Terug</Link></p>
      </article>
      <Footer />
    </main>
  );
}
