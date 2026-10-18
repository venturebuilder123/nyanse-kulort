import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { euro, PRICES } from "@/lib/flow/pricing";
import { AppBar, Footer } from "../ui";

export const metadata = {
  title: "Algemene voorwaarden · KULØRT · NYANSE",
  description: "De voorwaarden voor je kleurprofiel, stijlgids, kleurenpas en persoonlijk consult bij KULØRT en NYANSE.",
};

// Terms for both brands (CLAUDE.md §9). Plain Dutch, short; to be checked by a lawyer (docs/BESLISSINGEN.md).
export default function Terms() {
  return (
    <main className="screen">
      <AppBar pill="Voorwaarden" />
      <article className="pad prose">
        <h1 className="disp sm">Algemene voorwaarden</h1>
        <p className="muted small">Versie 18 oktober 2026. Geldt voor alle bestellingen bij KULØRT en NYANSE.</p>

        <h2>1. Wie zijn wij</h2>
        <p>
          KULØRT en NYANSE zijn twee merken van {COMPANY.name}
          {COMPANY.address ? `, ${COMPANY.address} (postadres)` : ""}. KvK {COMPANY.kvk}, btw {COMPANY.vat}. Je bereikt ons via{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> of de <Link href="/contact">contactpagina</Link>.
        </p>

        <h2>2. Wat we aanbieden</h2>
        <ul>
          <li><b>Kleurprofiel</b>: gratis. Je ondertoon, diepte en helderheid en je kleurtype, op basis van een selfie of je eigen opgave.</li>
          <li><b>Stijlgids (digitaal)</b>: {euro(PRICES.digital)}. Je persoonlijke stijlgids, direct online te openen.</li>
          <li><b>Stijlgids met kleurenpas</b>: {euro(PRICES.card)}. De stijlgids plus een fysieke kleurenpas per post.</li>
          <li><b>Persoonlijk consult</b>: {euro(PRICES.session)}. Je stijlgids plus een persoonlijk kleuradvies met een kleurconsulent.</li>
        </ul>
        <p>Alle prijzen zijn in euro&apos;s en inclusief btw. Verzending van de kleurenpas binnen Nederland, België en Duitsland is inbegrepen.</p>

        <h2>3. Wat je van het advies mag verwachten</h2>
        <p>
          Je kleurprofiel is een advies over kleuren die bij je passen. Het hangt af van het licht en de kwaliteit van je foto of je eigen
          opgave. Het is geen garantie dat elk kledingstuk je bevalt. Smaak blijft van jou.
        </p>
        <p>
          Klopt je uitslag volgens jou niet, bijvoorbeeld door een foto bij slecht licht? Mail ons binnen 14 dagen met je bestelnummer.
          We kijken mee en zetten je gids zo nodig kosteloos om naar een ander kleurtype.
        </p>

        <h2>4. Bestellen en betalen</h2>
        <p>
          Je bestelling is rond zodra je hebt betaald. Je betaalt via Mollie (bijvoorbeeld iDEAL | Wero, Apple Pay of creditcard) of per
          bankoverschrijving. Je krijgt een bevestiging per e-mail.
        </p>

        <h2>5. Levering</h2>
        <ul>
          <li><b>Stijlgids</b>: direct na betaling, online en per e-mail (een persoonlijke link).</li>
          <li><b>Kleurenpas</b>: we versturen wekelijks. Reken op ongeveer een week. Komt hij niet aan, laat het ons weten.</li>
          <li><b>Persoonlijk consult</b>: we mailen je binnen twee werkdagen om een moment te plannen.</li>
        </ul>

        <h2>6. Herroepingsrecht (bedenktijd)</h2>
        <ul>
          <li>
            <b>Stijlgids (digitale inhoud)</b>: die leveren we direct. Bij het bestellen geef je daarvoor uitdrukkelijk toestemming en
            verklaar je dat je daarmee je herroepingsrecht voor de stijlgids verliest.
          </li>
          <li>
            <b>Kleurenpas</b>: je hebt 14 dagen bedenktijd vanaf ontvangst. Meld het ons binnen die termijn (bijvoorbeeld met het formulier
            hieronder) en stuur de pas binnen 14 dagen daarna terug; de kosten van het terugsturen zijn voor jou. We betalen het bedrag voor
            de pas binnen 14 dagen terug.
          </li>
          <li>
            <b>Persoonlijk consult</b>: je hebt 14 dagen bedenktijd vanaf je bestelling. Vraag je ons het consult binnen die 14 dagen te
            houden, dan vervalt je bedenktijd zodra het consult heeft plaatsgevonden. Verzetten of annuleren kan kosteloos tot 24 uur van
            tevoren.
          </li>
        </ul>
        <p className="small">
          <b>Modelformulier voor herroeping.</b> Aan {COMPANY.name}, {COMPANY.email}: &quot;Ik herroep hierbij mijn overeenkomst
          betreffende [de kleurenpas / het consult], besteld op [datum], bestelnummer [KN-…]. Naam: […]. Adres: […]. Datum: […].&quot;
        </p>

        <h2>7. Kortingscodes</h2>
        <p>Een kortingscode is persoonlijk, niet in te wisselen voor geld en niet te combineren met een andere korting.</p>

        <h2>8. Klachten</h2>
        <p>
          Niet tevreden? Mail ons met je bestelnummer. Je krijgt binnen twee werkdagen een reactie en binnen 14 dagen een oplossing of een
          duidelijk antwoord.
        </p>

        <h2>9. Aansprakelijkheid</h2>
        <p>
          We zijn niet aansprakelijk voor aankopen die je doet op basis van ons advies. Onze aansprakelijkheid is in elk geval beperkt tot
          het bedrag dat je voor je bestelling hebt betaald, behalve bij opzet of grove schuld. Je wettelijke rechten als consument blijven
          altijd gelden.
        </p>

        <h2>10. Privacy en recht</h2>
        <p>
          Hoe we met je gegevens omgaan, staat in de <Link href="/privacy">privacyverklaring</Link>. Op deze voorwaarden is Nederlands recht
          van toepassing.
        </p>
      </article>
      <Footer />
    </main>
  );
}
