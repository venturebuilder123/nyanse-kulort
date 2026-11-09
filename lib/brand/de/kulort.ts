import { analysisDe, emailDe, pageDe, resultDe, retentionDe, SELFIE_DE } from "../common.de";
import type { VoiceCopy } from "../types";

// KULØRT auf Deutsch (9 Nov 2026). Wingman: Selbstvertrauen und erster Eindruck, immer über ihn.
// Director: Präsenz und Autorität, Qualität statt Menge. Dieselben Regeln wie die niederländischen Stimmen.

const accessories = "welche Uhr, welcher Gürtel und welche Schuhe passen";
const page = pageDe({ galleryTitle: ["Gleiches Gesicht.", "Andere Farbe."], howTitle: ["Drei Schritte.", "Fertig."], compareTitle: ["Kostenlos oder", "der Guide?"], finalTitle: ["Wisse, welche Farben", "für dich arbeiten."], accessories, trustTitle: ["Kein Aufwand.", "Kein Raten."] });
const weekly = ["{kleur}. Trag sie nah am Gesicht: Hemd, Pullover oder Krawatte.", "{kleur} diese Woche. Ein Teil reicht, der Rest neutral.", "{kleur}. Funktioniert unter einem dunklen Sakko, auch am Montag."] as const;
const shared = {
  pass: { label: "Farbkarte", season: "Deine Jahreszeit" },
  style: { pill: "Kostenlos", skip: "Überspringen", headline: ["Wo kaufst", "du ein?"] as const, occasionQuestion: "", budgetQuestion: "Was gibst du meist pro Teil aus?", shopsQuestion: "Wo kaufst du gern ein?", shopsHint: "Optional. Damit wir später an den richtigen Stellen suchen.", next: "Weiter: Selfie" },
  selfie: SELFIE_DE,
  analysis: analysisDe("Uhr oder Ring: Gold oder Silber?"),
  email: emailDe(["Deine Farben sind", "fertig."]),
  result: resultDe(
    "6 Farben, die für dich arbeiten",
    ["Alle 30 Farben mit Namen: Basis, Akzent und Neutral", "Kombinationen für Arbeit, Wochenende und Dates", "Uhr, Gürtel, Schuhe und Brille: welches Metall und Leder", "Dein persönlicher Style-Guide als PDF + digitale Karte"],
    { kind: "impression", title: "Warum es zählt", label: "Erster Eindruck", big: "0,1 Sek.", text: "So schnell bildet sich jemand einen ersten Eindruck von einem Gesicht.", source: "Willis & Todorov, Psychological Science, 2006" },
  ),
  guide: {
    tagline: "Der erste Eindruck: erledigt.",
    summary: "Alles, was du wissen musst, auf einer Seite. Mach einen Screenshot.",
    effect: "Darum funktioniert es. Gleiches Gesicht, gleiches Licht. Nur die Farbe unter dem Kinn ist anders.",
    combos: "Vier Looks, die immer funktionieren. Kein Aufwand, kein Raten.",
    swaps: "Nicht das, sondern das. So ersetzt du, was dir nicht steht.",
    closing: ["Trag, was", "für dich arbeitet."] as const,
  },
  ring: ["#1B2A5C", "#8A4A26", "#5E6A7A", "#2F4F3A", "#B9926B", "#6E1F2A", "#4F6886", "#C99A1E", "#3A3D45", "#EADCC2"],
};

export const wingmanDe: VoiceCopy = {
  ...shared,
  locale: "de",
  meta: { title: "KULØRT · Welche Farben stehen dir wirklich? Farbanalyse mit einem Selfie", description: "Finde mit einem Selfie heraus, welche Farben dich scharf aussehen lassen und welche du hängen lassen kannst." },
  landing: {
    pill: "Kostenloses Farbprofil",
    eyebrow: "Farbanalyse mit einem Selfie",
    headline: ["Welche Farben stehen", "dir wirklich?"],
    sub: "Sieh sofort, welche Farben dich scharf aussehen lassen und welche du hängen lassen kannst.",
    trustMain: "Dein Foto verlässt dein Handy nicht",
    occasionQuestion: "Wo willst du gut aussehen? Wähle eins oder mehr.",
    trustSmall: ["Kein Konto nötig", "Farbprofil kostenlos"],
    free: { title: "Kostenlos", text: "Dein genauer Farbtyp (z. B. Bright Winter), 6 Farben, die passen, und was du hängen lassen kannst." },
    paid: { title: "In deinem Guide, ab 12,99 €", text: "Alle 30 Farben mit Namen, Kombinationen, die funktionieren, und welche Uhr, welcher Gürtel und welche Schuhe dir stehen." },
    hero: { caption: "Gleiches Gesicht. Andere Farbe.", bad: "verblasst", good: "deine Farbe" },
  },
  page,
  story: {
    image: "/brand/editorial/kulort-jv-campagne-1.jpg",
    imageAlt: "Ein Mann in dunkelblauem Blazer und hellblauem Hemd im Büro",
    pains: { title: ["Voller Schrank.", "Nichts anzuziehen."], items: [["Im Laden super, zu Hause nicht", "Es liegt selten am Schnitt. Meist an der Farbe."], ["Lose Teile", "Ein Stapel Hemden, die zu nichts passen."], ["Jeden Morgen raten", "Und am Ende wieder dasselbe Hemd."]] },
    proof: { title: ["Gleiches Gesicht.", "Andere Farbe."], text: "Ein Tuch unter dem Kinn und du siehst den Unterschied. Genau das macht die App mit deinem Selfie." },
    gets: { title: ["Was du", "bekommst."], items: [["Dein Farbprofil", "Kostenlos: dein Typ, deine 6 besten Farben und was du hängen lassen kannst."], ["Dein persönlicher Style-Guide", "Alle 30 Farben, 4 Looks für Arbeit, Wochenende, Dates und Party, und eine Capsule aus 12 Teilen."], ["Deine Farbkarte", "Im Portemonnaie. Im Laden weißt du es auf einen Blick."]] },
    final: ["Wisse, welche Farben", "für dich arbeiten."],
  },
  retention: retentionDe({ friend: "ein Freund", friendLine: "Freundesrabatt", weekly }),
};

export const directorDe: VoiceCopy = {
  ...wingmanDe,
  landing: {
    ...wingmanDe.landing,
    headline: ["Der richtige Eindruck,", "jeden Tag."],
    sub: "Weniger kaufen, besser wählen. Ein Selfie zeigt, welche Farben dich ruhig und souverän wirken lassen, im Meeting und darüber hinaus.",
    occasionQuestion: "Wo muss es stimmen? Wähle eins oder mehr.",
  },
  story: {
    image: "/brand/editorial/kulort-vol-campagne-1.jpg",
    imageAlt: "Ein Mann nimmt einen camelfarbenen Pullover von einem Stapel Strick",
    pains: { title: ["Gekauft.", "Nie getragen."], items: [["Investiert ohne Ertrag", "Ein guter Blazer, der trotzdem nicht wirkt. Es war die Farbe."], ["Keine Zeit für Zweifel", "Dein Kalender ist voll. Dein Kleiderschrank muss einfach stimmen."], ["Ein Schrank ohne Linie", "Schöne Teile, die zusammen nichts ergeben."]] },
    proof: wingmanDe.story.proof,
    gets: { title: ["Was du", "bekommst."], items: [["Dein Farbprofil", "Kostenlos: dein Typ, deine 6 besten Farben und was du hängen lassen kannst."], ["Dein persönlicher Style-Guide", "Alle 30 Farben, 4 Looks und eine Capsule aus 12 Teilen: Alles, was du kaufst, passt zusammen."], ["Deine Farbkarte", "Deine Farben in der Tasche. Beim Schneider oder im Laden, auf einen Blick."]] },
    final: ["Ein Kleiderschrank, der", "für dich arbeitet."],
  },
};
