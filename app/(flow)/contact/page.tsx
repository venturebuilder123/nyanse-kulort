import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { currentBrand } from "../brand";
import { AppBar, Footer } from "../ui";

export const metadata = { title: "Contact · KULØRT · NYANSE" };

// Contact for trust (founder, 14 Oct); the legal details sit quietly at the bottom (18 Oct).
export default async function Contact() {
  const { locale } = await currentBrand();
  if (locale === "en") return <ContactEn />;
  return (
    <main className="screen">
      <AppBar />
      <div className="pad contact">
        <p className="eyebrow">Contact</p>
        <h1 className="disp">Vragen? <em>We helpen je graag.</em></h1>
        <p className="sub">Over je kleurprofiel, je stijlgids, je kleurenpas of je persoonlijke kleuradvies: mail ons, dan krijg je binnen twee werkdagen een persoonlijk antwoord.</p>
        <a className="btn" href="mailto:nyansekulort@gmail.com">nyansekulort@gmail.com</a>
        <p className="small">Of stuur een bericht via Instagram: <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener" target="_blank">@kulortnyanse</a></p>
        <div className="contact-list">
          <div><b>Je bestelling</b><p>Vermeld je bestelnummer uit de bevestigingsmail, dan zoeken we het meteen op.</p></div>
          <div><b>Je kleurenpas</b><p>Je pas gaat binnen ±1 week op de post (NL, BE, DE). Niet ontvangen? Laat het ons weten.</p></div>
          <div><b>Je gegevens</b><p>Je profiel verwijder je zelf met één tik. Liever dat wij het doen? Mail ons. Meer in de <Link href="/privacy">privacyverklaring</Link>.</p></div>
        </div>
        <p className="small muted">KULØRT en NYANSE zijn merken van {COMPANY.name} · {COMPANY.address} (postadres, geen bezoekadres) · KvK {COMPANY.kvk} · btw {COMPANY.vat}</p>
      </div>
      <Footer />
    </main>
  );
}

function ContactEn() {
  return (
    <main className="screen">
      <AppBar />
      <div className="pad contact">
        <p className="eyebrow">Contact</p>
        <h1 className="disp">Questions? <em>We&apos;re happy to help.</em></h1>
        <p className="sub">About your colour profile, your style guide, your colour card or your personal colour advice: e-mail us and you&apos;ll get a personal answer within two working days.</p>
        <a className="btn" href="mailto:nyansekulort@gmail.com">nyansekulort@gmail.com</a>
        <p className="small">Or send a message on Instagram: <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener" target="_blank">@kulortnyanse</a></p>
        <div className="contact-list">
          <div><b>Your order</b><p>Include your order number from the confirmation e-mail and we&apos;ll look it up straight away.</p></div>
          <div><b>Your colour card</b><p>Your card goes in the post within about a week (NL, BE, DE). Not received? Let us know.</p></div>
          <div><b>Your data</b><p>You delete your profile yourself with one tap. Rather have us do it? E-mail us. More in the <Link href="/privacy">privacy statement</Link>.</p></div>
        </div>
        <p className="small muted">KULØRT and NYANSE are brands of {COMPANY.name} · {COMPANY.address} (postal address, no visits) · Chamber of Commerce {COMPANY.kvk} · VAT {COMPANY.vat}</p>
      </div>
      <Footer />
    </main>
  );
}
