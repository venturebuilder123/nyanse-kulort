import Link from "next/link";
import { AppBar, Footer } from "../ui";

// CONCEPT privacy statement for both brands (CLAUDE.md §9). To be checked by a lawyer before launch;
// company details are filled in at registration.
export default function Privacy() {
  return (
    <main className="screen">
      <AppBar pill="Privacy" />
      <article className="pad prose">
        <h1 className="disp sm">Privacy</h1>
        <p className="muted small">Concept, 13 oktober 2026. Geldt voor NYANSE en KULØRT, twee merken van [bedrijfsnaam], [adres], KvK [nummer].</p>

        <h2>Je foto</h2>
        <p>De kleuranalyse draait op je eigen telefoon. Je foto wordt niet naar ons of naar anderen gestuurd en niet bewaard. Sluit je het tabblad, dan is hij weg.</p>

        <h2>Wat we wel verwerken</h2>
        <ul>
          <li><b>Je kleurprofiel</b> (getallen voor ondertoon, diepte en helderheid) en je antwoorden (gelegenheid, budget, winkels, haar, goud of zilver). Om je profiel en gids te maken.</li>
          <li><b>Je e-mailadres</b>, alleen als je het geeft. Om je profiel en gids te sturen. Maandmails alleen als je dat apart aanvinkt; afmelden kan in elke mail.</li>
          <li><b>Bestelgegevens</b> en, bij de kleurenpas, je adres. Om te leveren en voor de boekhouding (7 jaar bewaarplicht).</li>
          <li><b>Gebruik van de app</b>, zonder je naam of foto, om te zien welke stappen werken.</li>
        </ul>
        <p>We gebruiken je gezicht nooit om je te herkennen en we leiden er niets gevoeligs uit af. We verkopen niets door.</p>

        <h2>Wie helpt ons</h2>
        <p>Hosting (Vercel), database in de EU (Supabase), betalingen (Mollie), e-mail in de EU (Brevo) en statistieken in de EU (PostHog). Met elke partij is een verwerkersovereenkomst gesloten.</p>

        <h2>Cookies</h2>
        <p>Alleen functionele cookies: welk merk en welke stijl je ziet, zodat de app tijdens je bezoek hetzelfde blijft.</p>

        <h2>Jouw rechten</h2>
        <p>Je kunt je gegevens inzien, laten aanpassen of laten verwijderen. Mail naar <a href="mailto:privacy@[domein]">privacy@[domein]</a>. Een klacht kun je indienen bij de Autoriteit Persoonsgegevens.</p>

        <p><Link href="/">← Terug</Link></p>
      </article>
      <Footer />
    </main>
  );
}
