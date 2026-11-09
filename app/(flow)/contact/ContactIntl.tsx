import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { AppBar, Footer } from "../ui";

// German and Spanish contact pages (9 Nov 2026). In German the legal details are headed "Impressum",
// as German law expects (§ 5 DDG).

export function ContactDe() {
  return (
    <main className="screen">
      <AppBar />
      <div className="pad contact">
        <p className="eyebrow">Kontakt</p>
        <h1 className="disp">Fragen? <em>Wir helfen gern.</em></h1>
        <p className="sub">Zu deinem Farbprofil, deinem Style-Guide, deiner Farbkarte oder deiner persönlichen Farbberatung: Schreib uns, dann bekommst du innerhalb von zwei Werktagen eine persönliche Antwort.</p>
        <a className="btn" href="mailto:nyansekulort@gmail.com">nyansekulort@gmail.com</a>
        <p className="small">Oder schick eine Nachricht auf Instagram: <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener" target="_blank">@kulortnyanse</a></p>
        <div className="contact-list">
          <div><b>Deine Bestellung</b><p>Gib deine Bestellnummer aus der Bestätigungs-E-Mail an, dann suchen wir sie sofort.</p></div>
          <div><b>Deine Farbkarte</b><p>Deine Karte geht innerhalb von etwa einer Woche in die Post (NL, BE, DE). Nicht angekommen? Sag uns Bescheid.</p></div>
          <div><b>Deine Daten</b><p>Dein Profil löschst du selbst mit einem Tipp. Lieber durch uns? Schreib uns. Mehr in der <Link href="/privacy">Datenschutzerklärung</Link>.</p></div>
        </div>
        <p className="small muted"><b>Impressum.</b> KULØRT und NYANSE sind Marken von {COMPANY.name} · {COMPANY.address} (Postanschrift, keine Besucheradresse) · Handelskammer {COMPANY.kvk} · USt-IdNr. {COMPANY.vat} · {COMPANY.email}</p>
      </div>
      <Footer />
    </main>
  );
}

export function ContactEs() {
  return (
    <main className="screen">
      <AppBar />
      <div className="pad contact">
        <p className="eyebrow">Contacto</p>
        <h1 className="disp">¿Preguntas? <em>Te ayudamos encantados.</em></h1>
        <p className="sub">Sobre tu perfil de color, tu guía de estilo, tu tarjeta de color o tu asesoría personal: escríbenos y recibirás una respuesta personal en dos días laborables.</p>
        <a className="btn" href="mailto:nyansekulort@gmail.com">nyansekulort@gmail.com</a>
        <p className="small">O envía un mensaje por Instagram: <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener" target="_blank">@kulortnyanse</a></p>
        <div className="contact-list">
          <div><b>Tu pedido</b><p>Indica tu número de pedido del e-mail de confirmación y lo buscamos enseguida.</p></div>
          <div><b>Tu tarjeta de color</b><p>Tu tarjeta sale por correo en una semana aproximadamente (NL, BE, DE). ¿No te ha llegado? Avísanos.</p></div>
          <div><b>Tus datos</b><p>Tu perfil lo borras tú con un toque. ¿Prefieres que lo hagamos nosotros? Escríbenos. Más en la <Link href="/privacy">política de privacidad</Link>.</p></div>
        </div>
        <p className="small muted">KULØRT y NYANSE son marcas de {COMPANY.name} · {COMPANY.address} (dirección postal, sin atención presencial) · Cámara de Comercio {COMPANY.kvk} · NIF-IVA {COMPANY.vat}</p>
      </div>
      <Footer />
    </main>
  );
}
