import { analysisNl, emailNl, pageNl, resultNl, SELFIE_NL } from "../common";
import type { VoiceCopy } from "../types";

const STORY_DIRECTOR: VoiceCopy["story"] = {
  image: "/brand/editorial/kulort-vol-campagne-1.jpg",
  imageAlt: "Een man kiest een camel trui van een stapel gevouwen truien",
  pains: {
    title: ["Duur gekocht.", "Nooit gedragen."],
    items: [
      ["Investeren zonder rendement", "Een goed colbert dat toch niet werkt. Het zat in de kleur."],
      ["Geen tijd voor twijfel", "Je agenda staat vol. Je kast moet gewoon kloppen."],
      ["Een garderobe zonder lijn", "Mooie stukken die samen niets doen."],
    ],
  },
  proof: { title: ["Zelfde gezicht.", "Andere kleur."], text: "Eén doek onder de kin en je ziet het verschil. Precies wat de app met jouw selfie doet." },
  gets: {
    title: ["Wat je", "krijgt."],
    items: [
      ["Je kleurprofiel", "Gratis: je type, je 6 beste kleuren en wat je laat hangen."],
      ["Je persoonlijke stijlgids", "Al je 30 kleuren, 4 looks en een capsule van 12 stuks: wat je koopt, combineert."],
      ["Je kleurenpas", "Je kleuren op zak. Bij de kleermaker of in de winkel in één blik."],
    ],
  },
  final: ["Een kast die", "voor je werkt."],
};

// Director (KULØRT 30+): presence and authority, quality over quantity, no time to waste.
export const director: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "KULØRT · Welke kleuren staan jou? Kleuranalyse uit één selfie",
    description: "Ontdek met één selfie welke kleuren jou staan, en welke je kunt laten hangen.",
  },
  landing: {
    pill: "Gratis kleurprofiel",
    eyebrow: "Kleuranalyse uit één selfie",
    headline: ["Elke dag", "de juiste indruk."],
    sub: "Minder kopen, beter kiezen. Eén selfie laat zien welke kleuren je rustig en zeker laten ogen, in de boardroom en daarbuiten.",
    trustMain: "Je foto verlaat je telefoon niet",
    occasionQuestion: "Waar moet het kloppen? Kies er één of meer.",
    trustSmall: ["Geen account nodig", "Kleurprofiel gratis"],
    free: { title: "Gratis", text: "Je precieze kleurtype (bijv. Bright Winter), 6 kleuren die werken en wat je beter laat hangen." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren met namen, combinaties die werken en welke kleur horloge, riem en schoenen bij je past." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "valt weg", good: "jouw kleur" },
  },
  page: pageNl({ galleryTitle: ["Zelfde gezicht.", "Andere kleur."], howTitle: ["Drie stappen.", "Klaar."], compareTitle: ["Gratis of", "de gids?"], finalTitle: ["Weet welke kleuren", "voor je werken."], accessories: "welk horloge, welke riem en schoenen kloppen", trustTitle: ["Geen gedoe.", "Geen gok."] }),
  story: STORY_DIRECTOR,
  retention: {
    greet: "{type}. Goed dat je terug bent.",
    resumeTitle: "Je bent er bijna.",
    resumeText: "Nog {n} stappen, ±{s} seconden. Je antwoorden staan klaar.",
    resumeCta: "Ga verder",
    resultText: "Je kleuren staan klaar, precies zoals je ze achterliet.",
    guideText: "Je stijlgids staat klaar.",
    invited: "{naam} stuurde je dit. Jij krijgt €1 korting op je gids.",
    invitedAnon: "Een vriend stuurde je dit. Jij krijgt €1 korting op je gids.",
    friendLine: "Vriendenkorting",
    push: {
      title: "Eén kleurtip per week",
      text: "Elke week één kleur uit jouw palet en hoe je hem draagt. Maximaal één melding per week, overdag. Uitzetten met één tik.",
      cta: "Zet kleurtips aan",
      on: "Kleurtips staan aan. Volgende week de eerste.",
      off: "Kleurtips uitzetten",
      ios: "Op de iPhone werkt dit als de app op je beginscherm staat. Zet hem er eerst op (stap hieronder) en open hem daarvandaan.",
      denied: "Meldingen staan uit in je instellingen. Daar kun je ze weer aanzetten.",
    },
    weekly: {
      title: "{type} · kleur van de week",
      bodies: [
        "{kleur}. Draag hem dicht bij je gezicht: overhemd, trui of das.",
        "{kleur} deze week. Eén stuk is genoeg, de rest neutraal.",
        "{kleur}. Werkt onder een donker jasje, ook op maandag.",
      ],
    },
  },
  guide: {
    tagline: "Je eerste indruk, geregeld.",
    summary: "Alles wat je moet weten, op één pagina. Screenshot hem.",
    effect: "Dit is waarom het werkt. Zelfde gezicht, zelfde licht. Alleen de kleur onder de kin verschilt.",
    combos: "Vier looks die altijd kloppen. Geen gedoe, geen gok.",
    swaps: "Niet dit, maar dit. Zo vervang je wat je niet staat.",
    closing: ["Trek aan wat", "voor je werkt."],
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
    skip: "Sla over",
    headline: ["Waar shop", "jij?"],
    occasionQuestion: "",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Optioneel. Zo zoeken we straks op de goede plekken.",
    next: "Volgende: selfie",
  },
  selfie: SELFIE_NL,
  analysis: analysisNl("Horloge of ring: goud of zilver?"),
  email: emailNl(["Je kleuren zijn", "klaar."]),
  result: resultNl(
    "6 kleuren die voor je werken",
    ["Alle 30 kleuren met namen: basis, accent en neutraal", "Combinaties die werken voor werk, weekend en date", "Horloge, riem, schoenen en bril: welk metaal en leer", "Je persoonlijke stijlgids als PDF + digitale pas"],
    { kind: "impression", title: "Waarom het telt", label: "Eerste indruk", big: "0,1 sec", text: "Zo snel vormt iemand een eerste indruk van een gezicht.", source: "Willis & Todorov, Psychological Science, 2006" },
  ),
  ring: ["#1B2A5C", "#8A4A26", "#5E6A7A", "#2F4F3A", "#B9926B", "#6E1F2A", "#4F6886", "#C99A1E", "#3A3D45", "#EADCC2"],
};
