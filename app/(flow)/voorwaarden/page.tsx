import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { euro, PRICES } from "@/lib/flow/pricing";
import { currentBrand } from "../brand";
import { AppBar, Footer } from "../ui";

export const metadata = {
  title: "Algemene voorwaarden · KULØRT · NYANSE",
  description: "De voorwaarden voor je kleurprofiel, stijlgids, kleurenpas en persoonlijk kleuradvies bij KULØRT en NYANSE.",
};

// Terms for both brands (CLAUDE.md §9). Plain Dutch, short; to be checked by a lawyer (docs/BESLISSINGEN.md).
// English translation (21 Oct 2026) for EU customers; the Dutch text prevails.
export default async function Terms() {
  const { locale } = await currentBrand();
  return locale === "en" ? <TermsEn /> : <TermsNl />;
}

function TermsNl() {
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
          <li><b>Persoonlijk kleuradvies</b>: {euro(PRICES.session)}. Stijlgids en kleurenpas, plus een persoonlijke video van een kleurconsulent op basis van jouw foto&apos;s.</li>
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
          <li><b>Persoonlijk kleuradvies</b>: na je bestelling stuur je ons 3 foto&apos;s door de bevestigingsmail te beantwoorden. Binnen 3 werkdagen na je foto&apos;s krijg je je video per e-mail.</li>
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
            <b>Persoonlijk kleuradvies</b>: je hebt 14 dagen bedenktijd vanaf je bestelling. Stuur je ons binnen die 14 dagen je foto&apos;s,
            dan vraag je ons daarmee om meteen te beginnen. Je bedenktijd voor het advies vervalt zodra je video is geleverd.
          </li>
        </ul>
        <p className="small">
          <b>Modelformulier voor herroeping.</b> Aan {COMPANY.name}, {COMPANY.email}: &quot;Ik herroep hierbij mijn overeenkomst
          betreffende [de kleurenpas / het kleuradvies], besteld op [datum], bestelnummer [KN-…]. Naam: […]. Adres: […]. Datum: […].&quot;
        </p>

        <h2>7. Kortingscodes</h2>
        <p>Een kortingscode is persoonlijk, niet in te wisselen voor geld en niet te combineren met een andere korting. Een gratis code (100%) geldt alleen voor de digitale stijlgids.</p>

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

function TermsEn() {
  const e = (n: number) => euro(n, "en");
  return (
    <main className="screen">
      <AppBar pill="Terms" />
      <article className="pad prose">
        <h1 className="disp sm">Terms and conditions</h1>
        <p className="muted small">Version 21 October 2026. Applies to all orders at KULØRT and NYANSE. This is a translation; in case of differences, the Dutch text prevails.</p>

        <h2>1. Who we are</h2>
        <p>
          KULØRT and NYANSE are two brands of {COMPANY.name}{COMPANY.address ? `, ${COMPANY.address}, the Netherlands (postal address)` : ""}. Chamber of Commerce {COMPANY.kvk}, VAT {COMPANY.vat}. You can reach us at{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or via the <Link href="/contact">contact page</Link>.
        </p>

        <h2>2. What we offer</h2>
        <ul>
          <li><b>Colour profile</b>: free. Your undertone, depth and clarity and your colour type, based on a selfie or your own choice.</li>
          <li><b>Style guide (digital)</b>: {e(PRICES.digital)}. Your personal style guide, online straight away.</li>
          <li><b>Style guide with colour card</b>: {e(PRICES.card)}. The style guide plus a physical colour card by post.</li>
          <li><b>Personal colour advice</b>: {e(PRICES.session)}. Style guide and colour card, plus a personal video from a colour consultant based on your photos.</li>
        </ul>
        <p>All prices are in euros and include VAT. Shipping of the colour card within the Netherlands, Belgium and Germany is included.</p>

        <h2>3. What you can expect from the advice</h2>
        <p>
          Your colour profile is advice on colours that suit you. It depends on the light and the quality of your photo or your own choice. It is no
          guarantee that you will like every garment. Taste remains yours.
        </p>
        <p>
          Think your result is wrong, for example because of a photo in poor light? E-mail us within 14 days with your order number. We will take a
          look and, if needed, switch your guide to another colour type free of charge.
        </p>

        <h2>4. Ordering and payment</h2>
        <p>Your order is complete once you have paid. You pay via Mollie (for example a card, Apple Pay, PayPal or iDEAL | Wero) or by bank transfer. You receive a confirmation by e-mail.</p>

        <h2>5. Delivery</h2>
        <ul>
          <li><b>Style guide</b>: straight after payment, online and by e-mail (a personal link).</li>
          <li><b>Colour card</b>: we ship weekly. Allow about a week. If it doesn&apos;t arrive, let us know.</li>
          <li><b>Personal colour advice</b>: after your order, send us 3 photos by replying to the confirmation e-mail. Within 3 working days of your photos you receive your video by e-mail.</li>
        </ul>

        <h2>6. Right of withdrawal (cooling-off period)</h2>
        <ul>
          <li><b>Style guide (digital content)</b>: we deliver it straight away. When ordering, you expressly agree to this and declare that you thereby lose your right of withdrawal for the style guide.</li>
          <li><b>Colour card</b>: you have 14 days to change your mind from receipt. Tell us within that period (for example with the form below) and return the card within 14 days after that; the return costs are yours. We refund the amount for the card within 14 days.</li>
          <li><b>Personal colour advice</b>: you have 14 days to change your mind from your order. If you send us your photos within those 14 days, you ask us to start straight away. Your right of withdrawal for the advice ends once your video has been delivered.</li>
        </ul>
        <p className="small">
          <b>Model withdrawal form.</b> To {COMPANY.name}, {COMPANY.email}: &quot;I hereby withdraw from my contract for [the colour card / the colour advice], ordered on [date], order number [KN-…]. Name: […]. Address: […]. Date: […].&quot;
        </p>

        <h2>7. Discount codes</h2>
        <p>A discount code is personal, cannot be exchanged for money and cannot be combined with another discount. A free (100%) code is valid for the digital style guide only.</p>

        <h2>8. Complaints</h2>
        <p>Not happy? E-mail us with your order number. You get a reply within two working days and a solution or a clear answer within 14 days. You can also use the EU&apos;s online dispute resolution platform.</p>

        <h2>9. Liability</h2>
        <p>We are not liable for purchases you make based on our advice. Our liability is in any case limited to the amount you paid for your order, except in case of intent or gross negligence. Your statutory consumer rights always apply.</p>

        <h2>10. Privacy and law</h2>
        <p>How we handle your data is in the <Link href="/privacy">privacy statement</Link>. Dutch law applies to these terms, without depriving you of the protection of the mandatory rules of the country where you live.</p>
      </article>
      <Footer />
    </main>
  );
}
