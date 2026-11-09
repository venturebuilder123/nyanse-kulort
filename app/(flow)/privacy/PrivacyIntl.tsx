import Link from "next/link";
import { COMPANY } from "@/lib/company";
import { AppBar, Footer } from "../ui";
import DeleteProfile from "./DeleteProfile";

// German and Spanish privacy statements (9 Nov 2026), the same content as the Dutch and English ones.

export function PrivacyDe() {
  return (
    <main className="screen">
      <AppBar pill="Datenschutz" />
      <article className="pad prose">
        <h1 className="disp sm">Datenschutz</h1>
        <p className="muted small">Fassung vom 9. November 2026. Gilt für NYANSE und KULØRT, zwei Marken von {COMPANY.name} (niederländische Handelskammer {COMPANY.kvk}). Wir sind für deine Daten verantwortlich. Dies ist eine Übersetzung; bei Abweichungen gilt der niederländische Text.</p>

        <h2>Dein Foto</h2>
        <p>Die Farbanalyse läuft auf deinem eigenen Handy. Dein Foto wird weder an uns noch an andere geschickt und nirgends gespeichert, auch nicht auf deinem Handy. Schließt du den Tab, ist es weg.</p>

        <h2>Dein Profil</h2>
        <p>Dein Farbprofil (nur Zahlen und deine Antworten, kein Foto) liegt auf deinem eigenen Handy, damit du es später wieder ansehen kannst. Mit einem Tipp löschen:</p>
        <DeleteProfile />

        <h2>Was wir verarbeiten</h2>
        <ul>
          <li><b>Dein Farbprofil</b> (Zahlen für Unterton, Tiefe und Klarheit) und deine Antworten (Anlass, Budget, Shops, Haar, Gold oder Silber, deine eigene Prüfung von Haut, Augen und Haar). Um dein Profil und deinen Guide zu erstellen und um zu lernen, welche Shops und Marken wir aufnehmen sollten.</li>
          <li><b>Deine E-Mail-Adresse</b>, nur wenn du sie angibst. Um dir Profil und Guide zu schicken. Monatliche E-Mails nur, wenn du das separat ankreuzt; abmelden kannst du dich in jeder E-Mail. Ohne Bestellung bewahren wir deine Adresse höchstens 2 Jahre nach dem letzten Kontakt auf.</li>
          <li><b>Bestelldaten</b> und, für die Farbkarte, deine Adresse. Für die Lieferung und unsere Buchhaltung (gesetzliche Aufbewahrung 7 Jahre).</li>
          <li><b>Farbe der Woche</b>, nur wenn du sie einschaltest: die Push-Adresse deines Browsers, deine Marke, dein Farbtyp und deine Zeitzone. Höchstens eine Mitteilung pro Woche, tagsüber. Ausschalten in deinem Guide; &quot;Mein Profil löschen&quot; entfernt sie auch von unserem Server.</li>
          <li><b>Bei persönlicher Farbberatung</b> die Fotos, die du uns selbst mailst. Nur unsere Farbberaterin sieht sie, nur für deine Beratung. Wir löschen sie innerhalb von 30 Tagen nach deinem Video.</li>
          <li><b>Bei einer Bestellung</b> auch dein Farbprofil (nur Zahlen, nie dein Foto) und deine Sprache, damit du deinen Style-Guide mit dem Link aus deiner E-Mail auf jedem Gerät öffnen kannst.</li>
          <li><b>Nutzung der App</b>, ohne Namen, E-Mail oder Foto und ohne Cookies (PostHog, Server in der EU; deine IP-Adresse wird nicht gespeichert), um zu sehen, welche Schritte funktionieren und wie oft Menschen wiederkommen. Dein Fortschritt liegt auf deinem eigenen Handy, damit du weitermachen kannst.</li>
        </ul>
        <p>Wir nutzen dein Gesicht nie, um dich zu erkennen, und leiten daraus nie etwas Sensibles ab. Wir verkaufen nichts weiter.</p>

        <h2>Wer uns hilft</h2>
        <p>Hosting (Vercel), eine Datenbank in der EU (Supabase), Zahlungen (Mollie), E-Mail in der EU (Brevo) und Statistik in der EU (PostHog). Mit allen haben wir einen Auftragsverarbeitungsvertrag.</p>

        <h2>Cookies</h2>
        <p>Nur funktionale Cookies: welche Marke, welcher Stil und welche Sprache du siehst, damit die App während deines Besuchs gleich bleibt. Der Stil wird nur für deinen Besuch gespeichert, deine Sprachwahl ein Jahr.</p>

        <h2>Deine Rechte</h2>
        <p>Du kannst deine Daten einsehen, berichtigen oder löschen lassen. Schreib an <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Beschweren kannst du dich bei der niederländischen Datenschutzbehörde (Autoriteit Persoonsgegevens) oder bei der Aufsichtsbehörde in deinem Land.</p>

        <p><Link href="/">← Zurück</Link></p>
      </article>
      <Footer />
    </main>
  );
}

export function PrivacyEs() {
  return (
    <main className="screen">
      <AppBar pill="Privacidad" />
      <article className="pad prose">
        <h1 className="disp sm">Privacidad</h1>
        <p className="muted small">Versión del 9 de noviembre de 2026. Se aplica a NYANSE y KULØRT, dos marcas de {COMPANY.name} (Cámara de Comercio de los Países Bajos {COMPANY.kvk}). Somos responsables de tus datos. Esto es una traducción; en caso de diferencias, prevalece el texto neerlandés.</p>

        <h2>Tu foto</h2>
        <p>El análisis de color se hace en tu propio móvil. Tu foto no se nos envía ni a nosotros ni a nadie, y no se guarda en ningún sitio, ni siquiera en tu móvil. Cierras la pestaña y desaparece.</p>

        <h2>Tu perfil</h2>
        <p>Tu perfil de color (solo números y tus respuestas, ninguna foto) se guarda en tu propio móvil, para que puedas volver a verlo. Bórralo con un toque:</p>
        <DeleteProfile />

        <h2>Qué tratamos</h2>
        <ul>
          <li><b>Tu perfil de color</b> (números de subtono, profundidad y claridad) y tus respuestas (ocasión, presupuesto, tiendas, pelo, oro o plata, tu propia comprobación de piel, ojos y pelo). Para crear tu perfil y tu guía, y para saber qué tiendas y marcas añadir.</li>
          <li><b>Tu dirección de e-mail</b>, solo si nos la das. Para enviarte tu perfil y tu guía. E-mails mensuales solo si marcas esa casilla aparte; puedes darte de baja en cada e-mail. Sin pedido, guardamos tu dirección como máximo 2 años desde el último contacto.</li>
          <li><b>Datos del pedido</b> y, para la tarjeta de color, tu dirección. Para la entrega y nuestra contabilidad (conservación legal de 7 años).</li>
          <li><b>Color de la semana</b>, solo si lo activas: la dirección push de tu navegador, tu marca, tu tipo de color y tu zona horaria. Como mucho un aviso a la semana, de día. Desactívalo en tu guía; &quot;Borrar mi perfil&quot; también lo elimina de nuestro servidor.</li>
          <li><b>En la asesoría de color personal</b>, las fotos que nos envías tú por e-mail. Solo las ve nuestra asesora de color, solo para tu asesoría. Las borramos en los 30 días siguientes a tu vídeo.</li>
          <li><b>Con un pedido</b>, también tu perfil de color (solo números, nunca tu foto) y tu idioma, para que puedas abrir tu guía en cualquier dispositivo con el enlace de tu e-mail.</li>
          <li><b>Uso de la app</b>, sin nombre, e-mail ni foto y sin cookies (PostHog, servidores en la UE; tu dirección IP no se guarda), para ver qué pasos funcionan y cuántas veces vuelve la gente. Tu progreso se guarda en tu propio móvil, para que puedas seguir donde lo dejaste.</li>
        </ul>
        <p>Nunca usamos tu cara para reconocerte y nunca deducimos de ella nada sensible. No vendemos nada a terceros.</p>

        <h2>Quién nos ayuda</h2>
        <p>Alojamiento (Vercel), una base de datos en la UE (Supabase), pagos (Mollie), e-mail en la UE (Brevo) y estadísticas en la UE (PostHog). Con todos tenemos un contrato de encargo de tratamiento.</p>

        <h2>Cookies</h2>
        <p>Solo cookies funcionales: qué marca, estilo e idioma ves, para que la app no cambie durante tu visita. El estilo se recuerda solo durante tu visita; tu idioma, un año.</p>

        <h2>Tus derechos</h2>
        <p>Puedes consultar, corregir o borrar tus datos. Escribe a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Puedes reclamar ante la autoridad neerlandesa de protección de datos (Autoriteit Persoonsgegevens) o ante la autoridad de tu país.</p>

        <p><Link href="/">← Volver</Link></p>
      </article>
      <Footer />
    </main>
  );
}
