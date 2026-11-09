import { analysisDe, emailDe, pageDe, resultDe, retentionDe, SELFIE_DE_NYANSE } from "../common.de";
import type { VoiceCopy } from "../types";

// NYANSE auf Deutsch (9 Nov 2026). Girl Math: spielerisch gerechnet, mit Augenzwinkern, nie
// Geldversprechen. Boss Lady: sicher und knapp an Zeit, "weniger kaufen, besser wählen". Signature:
// ruhig und erwachsen, Farben für die, die du jetzt bist; nie "jünger aussehen", nie Unsicherheit.

const accessories = "welcher Schmuck, welche Taschen und welche Make-up-Töne dir stehen";
const shared = {
  pass: { label: "Farbkarte", season: "Deine Jahreszeit" },
  selfie: SELFIE_DE_NYANSE,
  analysis: analysisDe("Schmuck: Gold oder Silber?"),
  ring: ["#C8285A", "#C9A9AC", "#8FA3B8", "#A6879C", "#B9926B", "#2F4F3A", "#A2462A", "#1F4FC4", "#F4E3A1", "#D9C7AE"],
};
const style = (headline: readonly [string, string]) => ({ pill: "Kostenlos", skip: "Überspringen", headline, occasionQuestion: "", budgetQuestion: "Was gibst du meist pro Teil aus?", shopsQuestion: "Wo kaufst du gern ein?", shopsHint: "Optional. Damit wir später an den richtigen Stellen suchen.", next: "Weiter: Selfie" });
const free = { title: "Kostenlos", text: "Dein genauer Farbtyp (z. B. Soft Summer), 6 Farben, die dich strahlen lassen, und was du meiden solltest." };
const paid = { title: "In deinem Guide, ab 12,99 €", text: "Alle 30 Farben mit Namen, Kombinationen, die funktionieren, und welcher Schmuck, welche Taschen und Make-up-Töne dir stehen." };
const proof = { title: ["Gleiches Gesicht.", "Andere Farbe."] as const, text: "Ein Tuch unter dem Kinn und du siehst den Unterschied. Genau das macht die App mit deinem Selfie." };

export const bossladyDe: VoiceCopy = {
  ...shared,
  locale: "de",
  meta: { title: "NYANSE · Welche Farben stehen dir? Farbanalyse mit einem Selfie", description: "Dein persönliches Farbprofil aus einem Selfie, in jedem Laden dabei." },
  landing: {
    pill: "Kostenloses Farbprofil",
    eyebrow: "Farbanalyse mit einem Selfie",
    headline: ["Farben, die so hart", "arbeiten wie du."],
    sub: "Keine Zeit für Fehlkäufe. Ein Selfie zeigt, welche Farben dich selbstbewusst aussehen lassen, vom Meeting bis zum Dinner.",
    trustMain: "Dein Foto verlässt dein Handy nicht",
    occasionQuestion: "Wo willst du am besten aussehen? Wähle eins oder mehr.",
    trustSmall: ["Kein Konto nötig", "Farbprofil kostenlos"],
    free,
    paid,
    hero: { caption: "Gleiches Gesicht. Andere Farbe.", bad: "verblasst", good: "deine Farbe" },
  },
  page: pageDe({ galleryTitle: ["Gleiches Gesicht.", "Andere Farbe."], howTitle: ["So", "funktioniert's."], compareTitle: ["Kostenlos oder", "der Guide?"], finalTitle: ["Weniger kaufen,", "besser wählen."], accessories, trustTitle: ["Ruhig und", "unkompliziert."] }),
  story: {
    image: "/brand/editorial/nyanse-jv-campagne-1.jpg",
    imageAlt: "Eine Frau am Spiegel wählt zwischen einer korallfarbenen und einer grauen Bluse",
    pains: { title: ["Schön. Gekauft.", "Nie getragen."], items: [["Keine Zeit für Zweifel", "Dein Kalender ist voll. Dein Kleiderschrank muss einfach funktionieren."], ["Schöne Teile, keine Outfits", "Alles einzeln gekauft, nichts passt zusammen."], ["Retouren als Hobby", "Online bestellt, zu Hause doch nicht deine Farbe."]] },
    proof,
    gets: { title: ["Was du", "bekommst."], items: [["Dein Farbprofil", "Kostenlos: dein Typ, deine 6 besten Farben und was du hängen lassen kannst."], ["Dein persönlicher Style-Guide", "Alle 30 Farben, 4 Looks, eine Capsule aus 12 Teilen, Schmuck, Tasche und Make-up."], ["Deine Farbkarte", "Im Portemonnaie. Im Laden siehst du auf einen Blick, ob es passt."]] },
    final: ["Weniger kaufen,", "besser wählen."],
  },
  retention: retentionDe({ friend: "eine Freundin", friendLine: "Freundinnenrabatt", calm: true, weekly: ["{kleur}. Trag sie nah am Gesicht: eine Bluse, ein Schal, ein Pullover.", "{kleur} diese Woche. Ein Teil, der Rest in deinen Neutralen.", "{kleur}. Weniger kaufen, besser wählen: Schau zuerst in deinen eigenen Schrank."] }),
  guide: {
    tagline: "Weniger kaufen, besser wählen.",
    summary: "Deine Farben auf einen Blick. Halte sie griffbereit.",
    effect: "Der Unterschied ist eine Sache: die Farbe nah an deinem Gesicht.",
    combos: "Vier Kombinationen, bei denen alles zusammenpasst.",
    swaps: "Nicht das, sondern das. Eine ruhigere Alternative aus deiner eigenen Palette.",
    closing: ["Ein Kleiderschrank, in dem", "alles zusammenpasst."],
  },
  style: style(["Dein Stil,", "dein Budget."]),
  email: emailDe(["Deine Farben sind", "fertig."]),
  result: resultDe(
    "6 Farben, die dich strahlen lassen",
    ["Alle 30 Farben mit Namen: Basis, Akzent und Neutral", "Kombinationen, die funktionieren, damit dein Schrank zusammenpasst", "Schmuck, Taschen und Make-up-Töne", "Dein persönlicher Style-Guide als PDF + digitale Karte"],
    { kind: "compare", title: "Einmal richtig wählen", them: ["Farbberaterin", "ein Termin von 1 bis 2 Stunden"], us: ["Mit deinem Style-Guide", "ein Selfie, deine Farben immer dabei"] },
  ),
};

export const girlmathDe: VoiceCopy = {
  ...bossladyDe,
  meta: { title: "NYANSE · Welche Farben stehen dir? Farbanalyse mit einem Selfie", description: "Hör auf zu kaufen, was dir nicht steht. Deine Farben aus einem Selfie." },
  landing: {
    ...bossladyDe.landing,
    headline: ["Hör auf zu kaufen, was", "dir nicht steht."],
    sub: "Ein Selfie = du weißt, welche Farben dir stehen. Also auch, welche du nicht kaufen musst.",
    free: { title: "Kostenlos", text: "Dein genauer Farbtyp (z. B. Bright Spring), 6 Farben, die dir stehen, und was du auslassen kannst." },
    paid: { title: "In deinem Guide, ab 12,99 €", text: "Alle 30 Farben mit Namen, Kombinationen, die funktionieren, und welcher Schmuck und welche Make-up-Töne dir stehen." },
  },
  page: pageDe({ galleryTitle: ["Gleiches Gesicht.", "Andere Farbe."], howTitle: ["So", "einfach."], compareTitle: ["Kostenlos oder", "der Guide?"], finalTitle: ["Hör auf zu kaufen, was", "dir nicht steht."], accessories: "welcher Schmuck und welche Make-up-Töne dir stehen", trustTitle: ["Kein Stress,", "kein Haken."] }),
  story: {
    image: "/brand/editorial/nyanse-jong-campagne-1.jpg",
    imageAlt: "Drei Freundinnen in einem WG-Zimmer halten ein fliederfarbenes Top hoch",
    pains: { title: ["Voller Schrank,", "nichts anzuziehen."], items: [["Umkleide: ja. Zu Hause: nein.", "Es lag nicht an dir. Es war die Farbe."], ["Noch eins in Schwarz", "Weil es sicher ist. Aber ist Schwarz überhaupt deine Farbe?"], ["Retoure Nummer zigtausend", "Bestellen, anprobieren, zurückschicken. Schon wieder."]] },
    proof: { title: ["Gleiches Gesicht.", "Andere Farbe."], text: "Ein Tuch unter dem Kinn und du siehst es sofort. Genau das macht die App mit deinem Selfie." },
    gets: { title: ["Was du", "bekommst."], items: [["Dein Farbprofil", "Kostenlos: dein Typ, deine 6 besten Farben und was du auslassen kannst."], ["Dein persönlicher Style-Guide", "30 Farben, 4 Looks, eine Capsule aus 12 Teilen: mehr Outfits aus weniger Kleidung."], ["Deine Farbkarte", "Im Portemonnaie, für die Umkleide. Keine Vielleicht-Käufe mehr."]] },
    final: ["Hör auf zu kaufen, was", "dir nicht steht."],
  },
  retention: {
    ...retentionDe({ friend: "eine Freundin", friendLine: "Bestie-Rabatt", weekly: ["{kleur} ist deine Farbe der Woche. Nah am Gesicht = sofort Glow.", "{kleur}. Check zuerst deinen Schrank: Vielleicht hast du sie schon 👀", "{kleur} diese Woche. Ein Teil, der Rest neutral. Fertig."] }),
    greet: "Hey {type} ✨",
    resumeTitle: "Fast geschafft!",
    resumeCta: "Zu Ende machen",
    guideText: "Dein Style-Guide ist fertig 💅",
    invited: "{naam} hat dich eingeladen 💌 Du bekommst 1 € Rabatt auf deinen Guide.",
    invitedAnon: "Eine Freundin hat dich eingeladen 💌 Du bekommst 1 € Rabatt auf deinen Guide.",
  },
  guide: {
    tagline: "Weniger Fehlkäufe, mehr Outfits, die funktionieren. ✨",
    summary: "Der Spickzettel. Screenshot und fertig.",
    effect: "Gleiches Gesicht, andere Farbe. Das ist das ganze Geheimnis.",
    combos: "Vier Outfits, die immer funktionieren. Girl Math: Das sind unendlich viele Kombinationen.",
    swaps: "Nicht das, sondern das. Damit du nie wieder das Falsche kaufst.",
    closing: ["Hör auf zu kaufen, was", "dir nicht steht."],
  },
  style: style(["Was ist dein", "Budget?"]),
  email: emailDe(["Okay, deine Farben sind", "fertig."]),
  result: resultDe(
    "6 Farben, die dich strahlen lassen",
    ["Alle 30 Farben mit Namen: Basis, Akzent und Neutral", "Kombinationen, die funktionieren, also weniger Fehlkäufe", "Schmuck und Make-up-Töne", "Dein persönlicher Style-Guide als PDF + digitale Karte"],
    { kind: "receipt", title: "Warum das eigentlich ein Schnäppchen ist", head: "Girl Math", lines: [["Style-Guide", "12,99 €"], ["÷ 365 Tage", "0,04 € pro Tag"], ["Weniger Raten beim Shoppen", "✓"]], total: ["Girl Math sagt", "lohnt sich ✨"] },
  ),
  ring: ["#D61F5B", "#FFE9A6", "#F4A3A0", "#8FA3B8", "#F3A27A", "#A6879C", "#2BB3A8", "#FFE6EE", "#B9926B", "#6E5468"],
};

export const signatureDe: VoiceCopy = {
  ...bossladyDe,
  meta: { title: "NYANSE · Farben für die, die du jetzt bist", description: "Dein persönliches Farbprofil aus einem Selfie, in jedem Laden dabei." },
  landing: {
    ...bossladyDe.landing,
    headline: ["Farben für die,", "die du jetzt bist."],
    sub: "Dein Haar, deine Haut und dein Geschmack entwickeln sich. Ein Selfie zeigt, welche Farben dir heute am besten stehen.",
    hero: { caption: "Gleiches Gesicht. Andere Farbe.", bad: "zehrt", good: "deine Farbe" },
  },
  page: pageDe({ galleryTitle: ["Gleiches Gesicht.", "Andere Farbe."], howTitle: ["So", "funktioniert's."], compareTitle: ["Kostenlos oder", "der Guide?"], finalTitle: ["Farben mit", "Selbstvertrauen."], accessories, trustTitle: ["Ruhig, persönlich,", "unkompliziert."] }),
  story: {
    image: "/brand/editorial/nyanse-40-campagne-1.jpg",
    imageAlt: "Eine Frau mit silbergrauem Haar in einer kobaltblauen Bluse an einem Cafétisch",
    pains: { title: ["Deine Farben", "gehen mit dir."], items: [["Was dir früher stand, steht dir jetzt anders", "Graueres Haar, weichere Haut: Auch deine Palette verschiebt sich."], ["Ein Schrank voller alter Gewissheiten", "Farben, die du immer getragen hast, die jetzt weniger für dich tun."], ["Weniger, aber besser", "Du kaufst mit Bedacht. Also muss die Farbe stimmen."]] },
    proof,
    gets: { title: ["Was du", "bekommst."], items: [["Dein Farbprofil", "Kostenlos: dein Typ, deine 6 besten Farben und was du hängen lassen kannst."], ["Dein persönlicher Style-Guide", "Alle 30 Farben, 4 Looks, eine Capsule aus 12 Teilen, Schmuck und Make-up."], ["Deine Farbkarte", "Im Portemonnaie. Im Laden siehst du auf einen Blick, ob es passt."]] },
    final: ["Farben für die,", "die du jetzt bist."],
  },
  retention: retentionDe({ friend: "eine Freundin", friendLine: "Freundinnenrabatt", calm: true, weekly: ["{kleur}. Trag sie nah am Gesicht: eine Bluse, ein Schal, ein Pullover.", "{kleur} diese Woche. Ein Teil, der Rest in deinen Neutralen.", "{kleur}. Schön zu grauem oder silbernem Haar: nah am Gesicht tragen."] }),
  guide: {
    tagline: "Ruhe im Kleiderschrank, Sicherheit in deinen Farben.",
    summary: "Deine Farben auf einen Blick. Halte sie griffbereit.",
    effect: "Der Unterschied ist eine Sache: die Farbe nah an deinem Gesicht.",
    combos: "Vier Kombinationen, bei denen alles zusammenpasst.",
    swaps: "Nicht das, sondern das. Eine ruhigere Alternative aus deiner eigenen Palette.",
    closing: ["Farben für die,", "die du jetzt bist."],
  },
  style: style(["Dein Stil,", "deine Wahl."]),
  result: resultDe(
    "6 Farben, die dir jetzt am besten stehen",
    ["Alle 30 Farben mit Namen: Basis, Akzent und Neutral", "Kombinationen, die funktionieren, damit dein Schrank zusammenpasst", "Schmuck, Taschen und Make-up-Töne", "Dein persönlicher Style-Guide als PDF + digitale Karte"],
    { kind: "compare", title: "Deine Farben gehen mit dir", them: ["Früher", "Farben, gewählt für dein Haar von damals"], us: ["Jetzt", "gemessen an der, die du heute bist, graues Haar inklusive"] },
  ),
  ring: ["#6B2D5C", "#B9A3B0", "#7D8FA6", "#A6879C", "#C2A27E", "#3F5A4C", "#8E3B46", "#2B4A8C", "#E9DCC4", "#CFC3B8"],
};
