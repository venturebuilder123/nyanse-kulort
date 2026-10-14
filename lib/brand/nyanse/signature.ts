import { analysisNl, emailNl, pageNl, resultNl, SELFIE_NL_NYANSE } from "../common";
import type { VoiceCopy } from "../types";

const STORY_SIGNATURE: VoiceCopy["story"] = {
  image: "/brand/editorial/nyanse-40-campagne-1.jpg",
  imageAlt: "Een vrouw met zilvergrijs haar in een kobaltblauwe blouse aan een cafétafel",
  pains: {
    title: ["Je kleuren", "veranderen mee."],
    items: [
      ["Wat vroeger stond, staat nu anders", "Grijzer haar, een zachtere huid: je palet schuift mee."],
      ["Een kast vol oude zekerheden", "Kleuren die je altijd droeg, maar die je nu minder doen."],
      ["Minder, maar beter", "Je koopt met zorg. Dan moet de kleur kloppen."],
    ],
  },
  proof: { title: ["Zelfde gezicht.", "Andere kleur."], text: "Eén doek onder de kin en je ziet het verschil. Precies wat de app met jouw selfie doet." },
  gets: {
    title: ["Wat je", "krijgt."],
    items: [
      ["Je kleurprofiel", "Gratis: je type, je 6 beste kleuren en wat je laat hangen."],
      ["Je persoonlijke stijlgids", "Al je 30 kleuren, 4 looks, een capsule van 12 stuks, sieraden en make-up."],
      ["Je kleurenpas", "In je portemonnee. In de winkel zie je in één blik of het past."],
    ],
  },
  final: ["Kleuren die passen bij", "wie je nu bent."],
};

// Signature (NYANSE 40+): calm, assured, grown-up. Colours that fit who you are now; grey hair
// as a strength. Never "look younger", never anti-ageing, never insecurity (CLAUDE.md §12).
export const signature: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "NYANSE · Kleuren die passen bij wie je nu bent",
    description: "Je persoonlijke kleurprofiel uit één selfie, dat met je meegaat naar elke winkel.",
  },
  landing: {
    pill: "Gratis kleurprofiel",
    eyebrow: "Kleuranalyse uit één selfie",
    headline: ["Kleuren die passen bij", "wie je nu bent."],
    sub: "Je haar, je huid en je smaak veranderen mee. Eén selfie laat zien welke kleuren je nu het mooist staan.",
    trustMain: "Je foto verlaat je telefoon niet",
    occasionQuestion: "Waar wil je er goed uitzien?",
    trustSmall: ["Geen account nodig", "Kleurprofiel gratis"],
    free: { title: "Gratis", text: "Je precieze kleurtype (bijv. Soft Summer), 6 kleuren die je laten stralen en wat je beter vermijdt." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren met namen, combinaties die werken en welke sieraden, tassen en make-uptinten bij je passen." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "trekt weg", good: "jouw kleur" },
  },
  page: pageNl({ galleryTitle: ["Zelfde gezicht.", "Andere kleur."], howTitle: ["Zo werkt", "het."], compareTitle: ["Gratis of", "de gids?"], finalTitle: ["Kleuren met", "zekerheid."], accessories: "welke sieraden, tassen en make-uptinten bij je passen", trustTitle: ["Rustig, persoonlijk,", "zonder gedoe."] }),
  story: STORY_SIGNATURE,
  retention: {
    greet: "Welkom terug, {type}.",
    resumeTitle: "Je bent er bijna.",
    resumeText: "Nog {n} stappen, ongeveer {s} seconden. Je antwoorden zijn bewaard.",
    resumeCta: "Verder waar je was",
    resultText: "Je kleuren liggen klaar, zoals je ze achterliet.",
    guideText: "Je stijlgids ligt klaar.",
    invited: "{naam} raadt je dit aan. Je ontvangt €1 korting op je gids.",
    invitedAnon: "Een vriendin raadt je dit aan. Je ontvangt €1 korting op je gids.",
    friendLine: "Vriendenkorting",
    push: {
      title: "Eén kleur per week",
      text: "Elke week één kleur uit jouw palet, met een rustige suggestie hoe je hem draagt. Hooguit één melding per week, overdag. Uitzetten met één tik.",
      cta: "Ontvang de kleur van de week",
      on: "Aangezet. Volgende week de eerste kleur.",
      off: "Kleur van de week uitzetten",
      ios: "Op de iPhone werkt dit vanaf je beginscherm. Zet de app er eerst op (stap hieronder) en open hem daarvandaan.",
      denied: "Meldingen staan uit in je instellingen. Daar kun je ze weer aanzetten.",
    },
    weekly: {
      title: "{type} · kleur van de week",
      bodies: [
        "{kleur}. Draag hem bij je gezicht: een blouse, een sjaal, een trui.",
        "{kleur} deze week. Eén stuk, de rest in je neutrale tinten.",
        "{kleur}. Mooi bij grijs of zilver haar: draag hem dicht bij je gezicht.",
      ],
    },
  },
  guide: {
    tagline: "Rust in je kast, zekerheid in je kleuren.",
    summary: "Je kleuren in één oogopslag. Om bij de hand te houden.",
    effect: "Het verschil zit in één ding: de kleur bij je gezicht.",
    combos: "Vier combinaties waarin alles samengaat.",
    swaps: "Niet dit, maar dit. Een rustiger alternatief uit je eigen palet.",
    closing: ["Kleuren die passen", "bij wie je nu bent."],
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
    skip: "Sla over",
    headline: ["Jouw stijl,", "jouw keuze."],
    occasionQuestion: "",
    budgetQuestion: "Wat geef je meestal uit per item?",
    shopsQuestion: "Waar shop je graag?",
    shopsHint: "Optioneel. Zo zoeken we straks op de goede plekken.",
    next: "Volgende: selfie",
  },
  selfie: SELFIE_NL_NYANSE,
  analysis: analysisNl("Sieraden: goud of zilver?"),
  email: emailNl(["Je kleuren zijn", "klaar."]),
  result: resultNl(
    "6 kleuren die je nu het mooist staan",
    ["Alle 30 kleuren met namen: basis, accent en neutraal", "Combinaties die werken, zodat je kast samengaat", "Sieraden, tassen en make-uptinten", "Je persoonlijke stijlgids als PDF + digitale pas"],
    { kind: "compare", title: "Je kleuren veranderen mee", them: ["Vroeger", "kleuren gekozen bij je haar van toen"], us: ["Nu", "gemeten op wie je vandaag bent, ook met grijs haar"] },
  ),
  ring: ["#6B2D5C", "#B9A3B0", "#7D8FA6", "#A6879C", "#C2A27E", "#3F5A4C", "#8E3B46", "#2B4A8C", "#E9DCC4", "#CFC3B8"],
};
