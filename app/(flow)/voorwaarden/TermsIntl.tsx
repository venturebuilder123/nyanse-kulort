import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { euro, PRICES } from "@/lib/flow/pricing";
import { AppBar, Footer } from "../ui";

// German and Spanish terms (9 Nov 2026), translations of the Dutch text, which prevails. To be checked
// by a lawyer together with the Dutch and English versions (docs/BESLISSINGEN.md).

export function TermsDe() {
  const e = (n: number) => euro(n, "de");
  return (
    <main className="screen">
      <AppBar pill="AGB" />
      <article className="pad prose">
        <h1 className="disp sm">Allgemeine Geschäftsbedingungen</h1>
        <p className="muted small">Fassung vom 9. November 2026. Gilt für alle Bestellungen bei KULØRT und NYANSE. Dies ist eine Übersetzung; bei Abweichungen gilt der niederländische Text.</p>

        <h2>1. Wer wir sind</h2>
        <p>
          KULØRT und NYANSE sind zwei Marken von {COMPANY.name}{COMPANY.address ? `, ${COMPANY.address}, Niederlande (Postanschrift)` : ""}. Handelskammer {COMPANY.kvk}, USt-IdNr. {COMPANY.vat}. Du erreichst uns unter{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> oder über die <Link href="/contact">Kontaktseite</Link>.
        </p>

        <h2>2. Unser Angebot</h2>
        <ul>
          <li><b>Farbprofil</b>: kostenlos. Dein Unterton, deine Tiefe und Klarheit und dein Farbtyp, auf Basis eines Selfies oder deiner eigenen Wahl.</li>
          <li><b>Style-Guide (digital)</b>: {e(PRICES.digital)}. Dein persönlicher Style-Guide, sofort online.</li>
          <li><b>Style-Guide mit Farbkarte</b>: {e(PRICES.card)}. Der Style-Guide plus eine physische Farbkarte per Post.</li>
          <li><b>Persönliche Farbberatung</b>: {e(PRICES.session)}. Style-Guide und Farbkarte plus ein persönliches Video einer Farbberaterin auf Basis deiner Fotos.</li>
        </ul>
        <p>Alle Preise in Euro inklusive MwSt. Der Versand der Farbkarte innerhalb der Niederlande, Belgiens und Deutschlands ist inklusive.</p>

        <h2>3. Was du von der Beratung erwarten kannst</h2>
        <p>Dein Farbprofil ist eine Empfehlung zu Farben, die dir stehen. Es hängt vom Licht und der Qualität deines Fotos oder von deiner eigenen Wahl ab. Es ist keine Garantie, dass dir jedes Kleidungsstück gefällt. Der Geschmack bleibt deiner.</p>
        <p>Findest du dein Ergebnis falsch, zum Beispiel wegen eines Fotos bei schlechtem Licht? Schreib uns innerhalb von 14 Tagen mit deiner Bestellnummer. Wir sehen es uns an und stellen deinen Guide bei Bedarf kostenlos auf einen anderen Farbtyp um.</p>

        <h2>4. Bestellung und Zahlung</h2>
        <p>Deine Bestellung ist abgeschlossen, sobald du bezahlt hast. Du zahlst über Mollie (zum Beispiel Karte, Apple Pay, PayPal oder iDEAL | Wero) oder per Überweisung. Du bekommst eine Bestätigung per E-Mail.</p>

        <h2>5. Lieferung</h2>
        <ul>
          <li><b>Style-Guide</b>: direkt nach der Zahlung, online und per E-Mail (ein persönlicher Link).</li>
          <li><b>Farbkarte</b>: Wir versenden wöchentlich. Rechne mit etwa einer Woche. Kommt sie nicht an, sag uns Bescheid.</li>
          <li><b>Persönliche Farbberatung</b>: Schick uns nach deiner Bestellung 3 Fotos als Antwort auf die Bestätigungs-E-Mail. Innerhalb von 3 Werktagen nach deinen Fotos bekommst du dein Video per E-Mail.</li>
        </ul>

        <h2>6. Widerrufsrecht</h2>
        <ul>
          <li><b>Style-Guide (digitaler Inhalt)</b>: Wir liefern ihn sofort. Bei der Bestellung stimmst du dem ausdrücklich zu und bestätigst, dass du damit dein Widerrufsrecht für den Style-Guide verlierst.</li>
          <li><b>Farbkarte</b>: Du hast ab Erhalt 14 Tage Zeit, es dir anders zu überlegen. Teile es uns innerhalb dieser Frist mit (zum Beispiel mit dem Formular unten) und schick die Karte innerhalb von 14 Tagen danach zurück; die Rücksendekosten trägst du. Wir erstatten den Betrag für die Karte innerhalb von 14 Tagen.</li>
          <li><b>Persönliche Farbberatung</b>: Du hast ab deiner Bestellung 14 Tage Zeit, es dir anders zu überlegen. Schickst du uns deine Fotos innerhalb dieser 14 Tage, bittest du uns, sofort zu beginnen. Dein Widerrufsrecht für die Beratung endet, sobald dein Video geliefert ist.</li>
        </ul>
        <p className="small">
          <b>Muster-Widerrufsformular.</b> An {COMPANY.name}, {COMPANY.email}: &quot;Hiermit widerrufe ich meinen Vertrag über [die Farbkarte / die Farbberatung], bestellt am [Datum], Bestellnummer [KN-…]. Name: […]. Anschrift: […]. Datum: […].&quot;
        </p>

        <h2>7. Rabattcodes</h2>
        <p>Ein Rabattcode ist persönlich, nicht in Geld umtauschbar und nicht mit einem anderen Rabatt kombinierbar. Ein kostenloser Code (100 %) gilt nur für den digitalen Style-Guide.</p>

        <h2>8. Beschwerden</h2>
        <p>Nicht zufrieden? Schreib uns mit deiner Bestellnummer. Du bekommst innerhalb von zwei Werktagen eine Antwort und innerhalb von 14 Tagen eine Lösung oder eine klare Auskunft. Du kannst auch die Online-Streitbeilegungsplattform der EU nutzen.</p>

        <h2>9. Haftung</h2>
        <p>Wir haften nicht für Käufe, die du auf Grundlage unserer Beratung tätigst. Unsere Haftung ist in jedem Fall auf den Betrag deiner Bestellung begrenzt, außer bei Vorsatz oder grober Fahrlässigkeit. Deine gesetzlichen Verbraucherrechte gelten immer.</p>

        <h2>10. Datenschutz und Recht</h2>
        <p>Wie wir mit deinen Daten umgehen, steht in der <Link href="/privacy">Datenschutzerklärung</Link>. Für diese AGB gilt niederländisches Recht, ohne dass dir der Schutz der zwingenden Vorschriften des Landes, in dem du lebst, entzogen wird.</p>
      </article>
      <Footer />
    </main>
  );
}

export function TermsEs() {
  const e = (n: number) => euro(n, "es");
  return (
    <main className="screen">
      <AppBar pill="Condiciones" />
      <article className="pad prose">
        <h1 className="disp sm">Condiciones generales</h1>
        <p className="muted small">Versión del 9 de noviembre de 2026. Se aplica a todos los pedidos en KULØRT y NYANSE. Esto es una traducción; en caso de diferencias, prevalece el texto neerlandés.</p>

        <h2>1. Quiénes somos</h2>
        <p>
          KULØRT y NYANSE son dos marcas de {COMPANY.name}{COMPANY.address ? `, ${COMPANY.address}, Países Bajos (dirección postal)` : ""}. Cámara de Comercio {COMPANY.kvk}, NIF-IVA {COMPANY.vat}. Puedes escribirnos a{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> o desde la <Link href="/contact">página de contacto</Link>.
        </p>

        <h2>2. Qué ofrecemos</h2>
        <ul>
          <li><b>Perfil de color</b>: gratis. Tu subtono, profundidad y claridad y tu tipo de color, a partir de un selfie o de tu propia elección.</li>
          <li><b>Guía de estilo (digital)</b>: {e(PRICES.digital)}. Tu guía de estilo personal, online al instante.</li>
          <li><b>Guía de estilo con tarjeta de color</b>: {e(PRICES.card)}. La guía más una tarjeta de color física por correo.</li>
          <li><b>Asesoría de color personal</b>: {e(PRICES.session)}. Guía y tarjeta, más un vídeo personal de una asesora de color basado en tus fotos.</li>
        </ul>
        <p>Todos los precios están en euros e incluyen IVA. El envío de la tarjeta dentro de Países Bajos, Bélgica y Alemania está incluido.</p>

        <h2>3. Qué puedes esperar del asesoramiento</h2>
        <p>Tu perfil de color es un consejo sobre los colores que te favorecen. Depende de la luz y de la calidad de tu foto o de tu propia elección. No garantiza que te guste cada prenda. El gusto sigue siendo tuyo.</p>
        <p>¿Crees que tu resultado no es correcto, por ejemplo por una foto con mala luz? Escríbenos en 14 días con tu número de pedido. Lo revisamos y, si hace falta, cambiamos tu guía a otro tipo de color sin coste.</p>

        <h2>4. Pedido y pago</h2>
        <p>Tu pedido se completa cuando has pagado. Pagas a través de Mollie (por ejemplo tarjeta, Apple Pay, PayPal o iDEAL | Wero) o por transferencia. Recibes una confirmación por e-mail.</p>

        <h2>5. Entrega</h2>
        <ul>
          <li><b>Guía de estilo</b>: justo después del pago, online y por e-mail (un enlace personal).</li>
          <li><b>Tarjeta de color</b>: enviamos cada semana. Cuenta con una semana aproximadamente. Si no llega, avísanos.</li>
          <li><b>Asesoría de color personal</b>: después de tu pedido, envíanos 3 fotos respondiendo al e-mail de confirmación. En 3 días laborables tras tus fotos recibes tu vídeo por e-mail.</li>
        </ul>

        <h2>6. Derecho de desistimiento</h2>
        <ul>
          <li><b>Guía de estilo (contenido digital)</b>: la entregamos al instante. Al hacer el pedido lo aceptas expresamente y declaras que así pierdes tu derecho de desistimiento sobre la guía.</li>
          <li><b>Tarjeta de color</b>: tienes 14 días desde que la recibes para cambiar de opinión. Avísanos en ese plazo (por ejemplo con el formulario de abajo) y devuelve la tarjeta en los 14 días siguientes; los gastos de devolución corren de tu cuenta. Reembolsamos el importe de la tarjeta en 14 días.</li>
          <li><b>Asesoría de color personal</b>: tienes 14 días desde tu pedido para cambiar de opinión. Si nos envías tus fotos dentro de esos 14 días, nos pides empezar enseguida. Tu derecho de desistimiento sobre la asesoría termina cuando te entregamos el vídeo.</li>
        </ul>
        <p className="small">
          <b>Modelo de formulario de desistimiento.</b> A {COMPANY.name}, {COMPANY.email}: &quot;Por la presente desisto de mi contrato sobre [la tarjeta de color / la asesoría de color], pedido el [fecha], número de pedido [KN-…]. Nombre: […]. Dirección: […]. Fecha: […].&quot;
        </p>

        <h2>7. Códigos de descuento</h2>
        <p>Un código de descuento es personal, no se puede canjear por dinero y no se combina con otro descuento. Un código gratuito (100 %) solo vale para la guía de estilo digital.</p>

        <h2>8. Reclamaciones</h2>
        <p>¿Algo no te convence? Escríbenos con tu número de pedido. Recibirás respuesta en dos días laborables y una solución o una respuesta clara en 14 días. También puedes usar la plataforma de resolución de litigios en línea de la UE.</p>

        <h2>9. Responsabilidad</h2>
        <p>No somos responsables de las compras que hagas basándote en nuestro consejo. Nuestra responsabilidad se limita en todo caso al importe de tu pedido, salvo dolo o negligencia grave. Tus derechos legales como consumidor siempre se aplican.</p>

        <h2>10. Privacidad y ley aplicable</h2>
        <p>Cómo tratamos tus datos está en la <Link href="/privacy">política de privacidad</Link>. Estas condiciones se rigen por la ley neerlandesa, sin privarte de la protección de las normas imperativas del país en el que vives.</p>
      </article>
      <Footer />
    </main>
  );
}
