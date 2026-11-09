// Interface words that are the same in every voice: navigation, steps, footer and the maison home.
// The voice copy lives in lib/brand (per voice, per language); this is the rest.

const nl = {
  nav: { colourAnalysis: "Kleuranalyse", contact: "Contact", how: "Hoe het werkt", prices: "Prijzen", start: "Begin gratis" },
  steps: { label: (n: number, of: number) => `Stap ${n} van ${of}`, names: ["Jij", "Selfie", "Analyse", "Resultaat"] },
  footer: { terms: "Voorwaarden", privacy: "Privacy", vat: "Prijzen inclusief btw" },
  switchTo: { kulort: "Voor mannen", nyanse: "Voor vrouwen" },
  home: {
    eyebrow: "Kleuranalyse uit één selfie",
    h1: ["Je kleuren.", "Je kast. Je gids."],
    sub: "Ontdek in een paar minuten welke kleuren jou staan. Gratis, met één selfie.",
    doors: { kulort: ["Voor hem", "Je eerste indruk, geregeld."], nyanse: ["Voor haar", "Minder kopen, beter kiezen."] },
    begin: "Begin gratis",
    facts: (price: string) => ["Kleurprofiel gratis", "Je foto wordt nergens bewaard", `Stijlgids vanaf ${price}`, "Kleurenpas in de brievenbus"],
    proof: { eyebrow: "Het effect", h2: ["Zelfde gezicht.", "Andere kleur."], text: "Een kleur die bij je past laat je huid egaal en je ogen helder ogen. Een kleur die niet past trekt de aandacht weg van je gezicht. Dat verschil zie je in één oogopslag, en daarna zie je het overal." },
    how: { eyebrow: "Zo werkt het", h2: ["Drie stappen.", "Een kast die samengaat."], steps: [["Eén selfie", "Bij daglicht, zonder filter. Een paar minuten, ook zonder account."], ["Je kleurprofiel", "Je kleurtype, je beste kleuren en wat je beter laat hangen. Gratis."], ["Je stijlgids", "30 kleuren met naam, outfits, je eerste vijf aankopen en een kast-check. Als PDF en op je telefoon."]] },
    band: ["Minder kopen.", "Beter kiezen."],
    prices: {
      eyebrow: "Wat het kost", h2: ["Begin gratis.", "Kies daarna wat bij je past."],
      tiers: [["Kleurprofiel", "Gratis", "Je kleurtype, je plek op de drie schalen en je 6 beste kleuren."], ["Stijlgids", "", "Al je 30 kleuren, looks per gelegenheid, je capsule en je kast-check. Direct als PDF."], ["Stijlgids + kleurenpas", "", "Plus een stevige pas met je 8 kernkleuren, voor in je portemonnee. Gratis verzonden."], ["Persoonlijk kleuradvies", "", "Een kleurconsulent bekijkt jouw foto's en stuurt je een persoonlijke video. Zonder afspraak."]],
      badge: "Aanrader", fine: "Prijzen inclusief btw. Je betaalt pas als je je stijlgids kiest, na je gratis profiel.",
    },
    seasons: { eyebrow: "Vier seizoenen, twaalf kleurtypen", h2: ["Welk seizoen", "ben jij?"], names: [["Lente", "warm en helder"], ["Zomer", "koel en zacht"], ["Herfst", "warm en diep"], ["Winter", "koel en contrastrijk"]], more: "Alles over kleuranalyse en de 12 kleurtypen →" },
    faqTitle: "Vragen",
    faq: [["Hoe werkt het?", "Je maakt één selfie bij daglicht. De analyse draait op je telefoon en bepaalt je ondertoon, diepte en helderheid. Daaruit volgt je kleurtype, met je beste kleuren. Dat profiel is gratis."], ["Wat krijg ik in de stijlgids?", "Al je 30 kleuren met namen, combinaties voor werk, weekend, date en feest, je basis (wit, donker, denim), je eerste vijf aankopen, een kast-check en de kleuren voor horloge, sieraden en make-up. Als PDF en op je telefoon."], ["Ken ik mijn kleurtype al?", "Dan kies je het zelf en ga je direct naar je kleuren en je stijlgids, zonder selfie."], ["Wat gebeurt er met mijn foto?", "Hij wordt niet naar ons gestuurd en nergens bewaard."]],
    final: { h2: ["Klaar om", "je kleuren", "te zien?"], sub: "Gratis, met één selfie. Voor haar of voor hem?" },
  },
};

type Dict = typeof nl;
const en: Dict = {
  nav: { colourAnalysis: "Colour analysis", contact: "Contact", how: "How it works", prices: "Prices", start: "Start free" },
  steps: { label: (n, of) => `Step ${n} of ${of}`, names: ["You", "Selfie", "Analysis", "Result"] },
  footer: { terms: "Terms", privacy: "Privacy", vat: "Prices include VAT" },
  switchTo: { kulort: "For men", nyanse: "For women" },
  home: {
    eyebrow: "Colour analysis from one selfie",
    h1: ["Your colours.", "Your wardrobe. Your guide."],
    sub: "Find out in a few minutes which colours suit you. Free, with one selfie.",
    doors: { kulort: ["For him", "First impression: sorted."], nyanse: ["For her", "Buy less, choose better."] },
    begin: "Start free",
    facts: (price) => ["Free colour profile", "Your photo is never stored", `Style guide from ${price}`, "Colour card in the post"],
    proof: { eyebrow: "The effect", h2: ["Same face.", "Different colour."], text: "A colour that suits you makes your skin look even and your eyes clear. A colour that doesn't draws attention away from your face. You see the difference at a glance, and after that you see it everywhere." },
    how: { eyebrow: "How it works", h2: ["Three steps.", "A wardrobe that works together."], steps: [["One selfie", "In daylight, no filter. A few minutes, no account needed."], ["Your colour profile", "Your colour type, your best colours and what to leave on the rack. Free."], ["Your style guide", "30 colours with names, outfits, your first five buys and a wardrobe check. As a PDF and on your phone."]] },
    band: ["Buy less.", "Choose better."],
    prices: {
      eyebrow: "What it costs", h2: ["Start free.", "Then choose what suits you."],
      tiers: [["Colour profile", "Free", "Your colour type, your place on the three scales and your 6 best colours."], ["Style guide", "", "All 30 colours, looks per occasion, your capsule and your wardrobe check. Instantly as a PDF."], ["Style guide + colour card", "", "Plus a sturdy card with your 8 key colours, for your wallet. Free delivery."], ["Personal colour advice", "", "A colour consultant looks at your photos and sends you a personal video. No appointment."]],
      badge: "Recommended", fine: "Prices include VAT. You only pay when you choose your style guide, after your free profile.",
    },
    seasons: { eyebrow: "Four seasons, twelve colour types", h2: ["Which season", "are you?"], names: [["Spring", "warm and clear"], ["Summer", "cool and soft"], ["Autumn", "warm and deep"], ["Winter", "cool and high-contrast"]], more: "All about colour analysis and the 12 colour types →" },
    faqTitle: "Questions",
    faq: [["How does it work?", "You take one selfie in daylight. The analysis runs on your phone and measures your undertone, depth and clarity. That gives your colour type, with your best colours. The profile is free."], ["What's in the style guide?", "All 30 of your colours with names, combinations for work, weekend, dates and parties, your basics (white, dark, denim), your first five buys, a wardrobe check and the colours for watch, jewellery and make-up. As a PDF and on your phone."], ["I already know my colour type?", "Then pick it yourself and go straight to your colours and your style guide, no selfie needed."], ["What happens to my photo?", "It's not sent to us and it's never stored."]],
    final: { h2: ["Ready to see", "your colours", "?"], sub: "Free, with one selfie. For her or for him?" },
  },
};

// German and Spanish (9 Nov 2026)
const de: Dict = {
  nav: { colourAnalysis: "Farbanalyse", contact: "Kontakt", how: "So funktioniert's", prices: "Preise", start: "Kostenlos starten" },
  steps: { label: (n, of) => `Schritt ${n} von ${of}`, names: ["Du", "Selfie", "Analyse", "Ergebnis"] },
  footer: { terms: "AGB", privacy: "Datenschutz", vat: "Preise inkl. MwSt." },
  switchTo: { kulort: "Für Männer", nyanse: "Für Frauen" },
  home: {
    eyebrow: "Farbanalyse mit einem Selfie",
    h1: ["Deine Farben.", "Dein Kleiderschrank. Dein Guide."],
    sub: "Finde in wenigen Minuten heraus, welche Farben dir stehen. Kostenlos, mit einem Selfie.",
    doors: { kulort: ["Für ihn", "Der erste Eindruck: erledigt."], nyanse: ["Für sie", "Weniger kaufen, besser wählen."] },
    begin: "Kostenlos starten",
    facts: (price) => ["Farbprofil kostenlos", "Dein Foto wird nirgends gespeichert", `Style-Guide ab ${price}`, "Farbkarte per Post"],
    proof: { eyebrow: "Der Effekt", h2: ["Gleiches Gesicht.", "Andere Farbe."], text: "Eine Farbe, die zu dir passt, lässt deine Haut ebenmäßig und deine Augen klar wirken. Eine Farbe, die nicht passt, lenkt vom Gesicht ab. Den Unterschied siehst du auf einen Blick, und danach überall." },
    how: { eyebrow: "So funktioniert's", h2: ["Drei Schritte.", "Ein Kleiderschrank, der zusammenpasst."], steps: [["Ein Selfie", "Bei Tageslicht, ohne Filter. Ein paar Minuten, ohne Konto."], ["Dein Farbprofil", "Dein Farbtyp, deine besten Farben und was du hängen lassen kannst. Kostenlos."], ["Dein Style-Guide", "30 Farben mit Namen, Outfits, deine ersten fünf Käufe und ein Kleiderschrank-Check. Als PDF und auf dem Handy."]] },
    band: ["Weniger kaufen.", "Besser wählen."],
    prices: {
      eyebrow: "Was es kostet", h2: ["Kostenlos starten.", "Dann wählen, was passt."],
      tiers: [["Farbprofil", "Kostenlos", "Dein Farbtyp, dein Platz auf den drei Skalen und deine 6 besten Farben."], ["Style-Guide", "", "Alle 30 Farben, Looks pro Anlass, deine Capsule und dein Kleiderschrank-Check. Sofort als PDF."], ["Style-Guide + Farbkarte", "", "Plus eine stabile Karte mit deinen 8 Kernfarben für dein Portemonnaie. Kostenloser Versand."], ["Persönliche Farbberatung", "", "Eine Farbberaterin sieht sich deine Fotos an und schickt dir ein persönliches Video. Ohne Termin."]],
      badge: "Empfehlung", fine: "Preise inkl. MwSt. Du zahlst erst, wenn du deinen Style-Guide wählst, nach deinem kostenlosen Profil.",
    },
    seasons: { eyebrow: "Vier Jahreszeiten, zwölf Farbtypen", h2: ["Welche Jahreszeit", "bist du?"], names: [["Frühling", "warm und klar"], ["Sommer", "kühl und sanft"], ["Herbst", "warm und tief"], ["Winter", "kühl und kontrastreich"]], more: "Alles über Farbanalyse und die 12 Farbtypen →" },
    faqTitle: "Fragen",
    faq: [["Wie funktioniert es?", "Du machst ein Selfie bei Tageslicht. Die Analyse läuft auf deinem Handy und misst Unterton, Tiefe und Klarheit. Daraus ergibt sich dein Farbtyp mit deinen besten Farben. Das Profil ist kostenlos."], ["Was steht im Style-Guide?", "Alle 30 Farben mit Namen, Kombinationen für Arbeit, Wochenende, Date und Party, deine Basics (Weiß, Dunkel, Denim), deine ersten fünf Käufe, ein Kleiderschrank-Check und die Farben für Uhr, Schmuck und Make-up. Als PDF und auf dem Handy."], ["Ich kenne meinen Farbtyp schon?", "Dann wähle ihn selbst und geh direkt zu deinen Farben und deinem Style-Guide, ohne Selfie."], ["Was passiert mit meinem Foto?", "Es wird nicht an uns geschickt und nirgends gespeichert."]],
    final: { h2: ["Bereit für", "deine Farben", "?"], sub: "Kostenlos, mit einem Selfie. Für sie oder für ihn?" },
  },
};

const es: Dict = {
  nav: { colourAnalysis: "Análisis de color", contact: "Contacto", how: "Cómo funciona", prices: "Precios", start: "Empieza gratis" },
  steps: { label: (n, of) => `Paso ${n} de ${of}`, names: ["Tú", "Selfie", "Análisis", "Resultado"] },
  footer: { terms: "Condiciones", privacy: "Privacidad", vat: "Precios con IVA incluido" },
  switchTo: { kulort: "Para hombres", nyanse: "Para mujeres" },
  home: {
    eyebrow: "Análisis de color con un selfie",
    h1: ["Tus colores.", "Tu armario. Tu guía."],
    sub: "Descubre en pocos minutos qué colores te favorecen. Gratis, con un solo selfie.",
    doors: { kulort: ["Para él", "La primera impresión, resuelta."], nyanse: ["Para ella", "Compra menos, elige mejor."] },
    begin: "Empieza gratis",
    facts: (price) => ["Perfil de color gratis", "Tu foto no se guarda en ningún sitio", `Guía de estilo desde ${price}`, "Tarjeta de color por correo"],
    proof: { eyebrow: "El efecto", h2: ["La misma cara.", "Otro color."], text: "Un color que te favorece hace que tu piel se vea uniforme y tus ojos claros. Un color que no te favorece aparta la atención de tu cara. Ves la diferencia de un vistazo, y después la ves en todas partes." },
    how: { eyebrow: "Cómo funciona", h2: ["Tres pasos.", "Un armario que combina."], steps: [["Un selfie", "Con luz natural, sin filtro. Unos minutos, sin cuenta."], ["Tu perfil de color", "Tu tipo de color, tus mejores colores y lo que mejor dejar en la percha. Gratis."], ["Tu guía de estilo", "30 colores con nombre, looks, tus cinco primeras compras y una revisión de armario. En PDF y en tu móvil."]] },
    band: ["Compra menos.", "Elige mejor."],
    prices: {
      eyebrow: "Lo que cuesta", h2: ["Empieza gratis.", "Luego elige lo que te va."],
      tiers: [["Perfil de color", "Gratis", "Tu tipo de color, tu lugar en las tres escalas y tus 6 mejores colores."], ["Guía de estilo", "", "Tus 30 colores, looks por ocasión, tu cápsula y tu revisión de armario. Al instante en PDF."], ["Guía de estilo + tarjeta de color", "", "Más una tarjeta resistente con tus 8 colores clave, para la cartera. Envío gratis."], ["Asesoría de color personal", "", "Una asesora de color mira tus fotos y te envía un vídeo personal. Sin cita."]],
      badge: "Recomendado", fine: "Precios con IVA incluido. Solo pagas cuando eliges tu guía de estilo, después de tu perfil gratuito.",
    },
    seasons: { eyebrow: "Cuatro estaciones, doce tipos de color", h2: ["¿Qué estación", "eres?"], names: [["Primavera", "cálida y clara"], ["Verano", "fresco y suave"], ["Otoño", "cálido y profundo"], ["Invierno", "frío y contrastado"]], more: "Todo sobre el análisis de color y los 12 tipos →" },
    faqTitle: "Preguntas",
    faq: [["¿Cómo funciona?", "Te haces un selfie con luz natural. El análisis se hace en tu móvil y mide tu subtono, profundidad y claridad. De ahí sale tu tipo de color, con tus mejores colores. El perfil es gratis."], ["¿Qué incluye la guía de estilo?", "Tus 30 colores con nombre, combinaciones para trabajo, fin de semana, citas y fiestas, tus básicos (blanco, oscuro, denim), tus cinco primeras compras, una revisión de armario y los colores para reloj, joyas y maquillaje. En PDF y en tu móvil."], ["¿Ya sé mi tipo de color?", "Entonces elígelo tú y ve directamente a tus colores y tu guía, sin selfie."], ["¿Qué pasa con mi foto?", "No se nos envía y no se guarda en ningún sitio."]],
    final: { h2: ["¿Quieres ver", "tus colores", "?"], sub: "Gratis, con un selfie. ¿Para ella o para él?" },
  },
};

export const UI = { nl, en, de, es } as const;
