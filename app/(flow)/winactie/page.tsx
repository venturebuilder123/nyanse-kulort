import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { euro, PRICES } from "@/lib/flow/pricing";
import { AppBar } from "../ui";

export const metadata = {
  title: "Winactie · KULØRT · NYANSE",
  description: "Actievoorwaarden van de Instagram-winactie van KULØRT · NYANSE: win je kleuren, 10 × persoonlijke stijlgids.",
};

// The Instagram giveaway (founder, 21 Oct 2026; docs/marketing/GROEI-SPRINT.md). Free to enter, no
// purchase, published terms: the Gedragscode Promotionele Kansspelen. Dutch first, English summary
// below, because the Instagram posts are in English. To be checked by a lawyer.
const START = "maandag 2 november 2026, 12:00";
const END = "zondag 8 november 2026, 23:59";

export default function Giveaway() {
  return (
    <main className="screen">
      <AppBar pill="Winactie" />
      <article className="pad prose">
        <h1 className="disp sm">Winactie: win je kleuren</h1>
        <p className="muted small">Actievoorwaarden, versie 21 oktober 2026.</p>

        <h2>1. Organisator</h2>
        <p>
          De winactie wordt georganiseerd door {COMPANY.name}, de onderneming achter KULØRT en NYANSE, {COMPANY.address} (postadres), KvK {COMPANY.kvk}.
          Contact: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>

        <h2>2. Looptijd</h2>
        <p>Van {START} tot en met {END} (Nederlandse tijd). Reacties daarna tellen niet mee.</p>

        <h2>3. Zo doe je mee</h2>
        <ol>
          <li>Volg <b>@kulortnyanse</b> op Instagram.</li>
          <li>Reageer onder de winactie-post met het seizoen dat je denkt te zijn (een gok mag).</li>
          <li>Tag één vriend of vriendin in je reactie.</li>
        </ol>
        <p>Meedoen is gratis; je hoeft niets te kopen. Iedereen doet één keer mee, ook met meerdere reacties.</p>

        <h2>4. Wie mag meedoen</h2>
        <p>Je bent 18 jaar of ouder en woont in de Europese Unie. Medewerkers van {COMPANY.name} en hun gezinsleden doen niet mee.</p>

        <h2>5. De prijs</h2>
        <p>
          Er zijn <b>10 winnaars</b>. Elke winnaar krijgt de <b>persoonlijke stijlgids (digitaal)</b> (waarde {euro(PRICES.digital)}): een persoonlijke kleuranalyse met één
          selfie en de persoonlijke stijlgids, direct online. Je krijgt een eenmalige code die je zelf invult bij de bestelling. De prijs is persoonlijk, niet
          inwisselbaar voor geld en niet geldig voor de kleurenpas of het persoonlijke consult.
        </p>

        <h2>6. Trekking en bekendmaking</h2>
        <ul>
          <li>Op maandag 9 november 2026 trekken we 10 winnaars en 5 reserves willekeurig uit alle geldige deelnemers. We controleren of zij @kulortnyanse volgen.</li>
          <li>Winnaars krijgen binnen 2 dagen een DM van <b>@kulortnyanse</b> en maken we bekend in onze Instagram-stories.</li>
          <li>Reageert een winnaar niet binnen 7 dagen, dan gaat de prijs naar een reservewinnaar.</li>
          <li><b>Pas op voor nepaccounts.</b> We sturen alleen berichten vanaf @kulortnyanse en vragen nooit om een betaling, een wachtwoord of je bankgegevens.</li>
        </ul>

        <h2>7. Je gegevens</h2>
        <p>
          We gebruiken je Instagram-naam alleen voor deze winactie. Winnaars krijgen hun code per DM; voor de gids vul je zelf je e-mailadres in bij de bestelling, net
          als elke klant. Meer in onze <Link href="/privacy">privacyverklaring</Link>.
        </p>

        <h2>8. Overige</h2>
        <ul>
          <li>Deze winactie is op geen enkele manier gesponsord, ondersteund of georganiseerd door Instagram of Meta. Deelnemers vrijwaren Instagram en Meta van elke aansprakelijkheid.</li>
          <li>De actie volgt de Gedragscode Promotionele Kansspelen. De waarde van de prijzen blijft ruim onder de grens van de kansspelbelasting.</li>
          <li>Bij misbruik of nepaccounts kunnen we deelnemers uitsluiten. Over de uitslag wordt niet gecorrespondeerd.</li>
          <li>Klachten of vragen: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. We reageren binnen 5 werkdagen.</li>
        </ul>

        <h2 lang="en">In English</h2>
        <p lang="en">
          Free giveaway by {COMPANY.name} (KULØRT · NYANSE), from 2 to 8 November 2026 (Amsterdam time). Follow @kulortnyanse, comment the season you think you are and tag one friend.
          18+, living in the EU; no purchase needed; one entry per person. Ten winners each get the personal style guide, digital (worth {euro(PRICES.digital)}), with a
          single-use code, drawn at random on 9 November 2026 and contacted only by DM from @kulortnyanse. We never ask for payment or passwords. Not sponsored,
          endorsed or administered by, or associated with Instagram or Meta. The Dutch text above prevails.
        </p>
      </article>
    </main>
  );
}
