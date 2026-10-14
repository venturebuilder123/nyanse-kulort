import Link from "next/link";
import { AppBar, Footer } from "../ui";

export const metadata = { title: "Contact · KULØRT · NYANSE" };

// Contact for trust (founder, 14 Oct). Company details follow once registered at the KvK.
export default function Contact() {
  return (
    <main className="screen">
      <AppBar />
      <div className="pad contact">
        <p className="eyebrow">Contact</p>
        <h1 className="disp">Vragen? <em>We helpen je graag.</em></h1>
        <p className="sub">Over je kleurprofiel, je stijlgids, je kleurenpas of een persoonlijke sessie: mail ons, dan krijg je binnen twee werkdagen een persoonlijk antwoord.</p>
        <a className="btn" href="mailto:nyansekulort@gmail.com">nyansekulort@gmail.com</a>
        <p className="small">Of stuur een bericht via Instagram: <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener" target="_blank">@kulortnyanse</a></p>
        <div className="contact-list">
          <div><b>Je bestelling</b><p>Vermeld je bestelnummer uit de bevestigingsmail, dan zoeken we het meteen op.</p></div>
          <div><b>Je kleurenpas</b><p>Je pas gaat binnen ±1 week op de post (NL, BE, DE). Niet ontvangen? Laat het ons weten.</p></div>
          <div><b>Je gegevens</b><p>Je profiel verwijder je zelf met één tik. Liever dat wij het doen? Mail ons. Meer in de <Link href="/privacy">privacyverklaring</Link>.</p></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
