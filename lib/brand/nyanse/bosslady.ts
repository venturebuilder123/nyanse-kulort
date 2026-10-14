import { analysisNl, emailNl, pageNl, resultNl, SELFIE_NL_NYANSE } from "../common";
import type { VoiceCopy } from "../types";

const STORY_BOSSLADY: VoiceCopy["story"] = {
  image: "/brand/editorial/nyanse-jv-campagne-1.jpg",
  imageAlt: "Een vrouw kiest voor de spiegel tussen een koraalrode en een grijze blouse",
  pains: {
    title: ["Mooi gekocht.", "Nooit gedragen."],
    items: [
      ["Geen tijd voor twijfel", "Je agenda staat vol. Je kast moet gewoon werken."],
      ["Mooie stukken, geen outfits", "Alles los gekocht, niets combineert met elkaar."],
      ["Retourneren als hobby", "Online besteld, thuis blijkt het toch niet jouw kleur."],
    ],
  },
  proof: { title: ["Zelfde gezicht.", "Andere kleur."], text: "Eén doek onder de kin en je ziet het verschil. Precies wat de app met jouw selfie doet." },
  gets: {
    title: ["Wat je", "krijgt."],
    items: [
      ["Je kleurprofiel", "Gratis: je type, je 6 beste kleuren en wat je laat hangen."],
      ["Je persoonlijke stijlgids", "Al je 30 kleuren, 4 looks, een capsule van 12 stuks, sieraden, tas en make-up."],
      ["Je kleurenpas", "In je portemonnee. In de winkel zie je in één blik of het past."],
    ],
  },
  final: ["Minder kopen,", "beter kiezen."],
};

// Boss Lady (NYANSE 28–44): sure, decisive, short on time. "Minder kopen, beter kiezen."
export const bosslady: VoiceCopy = {
  locale: "nl",
  meta: {
    title: "NYANSE · Welke kleuren staan jou? Kleuranalyse uit één selfie",
    description: "Je persoonlijke kleurprofiel uit één selfie, dat met je meegaat naar elke winkel.",
  },
  landing: {
    pill: "Gratis kleurprofiel",
    eyebrow: "Kleuranalyse uit één selfie",
    headline: ["Kleuren die", "voor je werken."],
    sub: "Geen tijd voor miskopen. Eén selfie laat zien welke kleuren je zeker laten ogen, van meeting tot diner.",
    trustMain: "Je foto verlaat je telefoon niet",
    occasionQuestion: "Waar wil je er goed uitzien? Kies er één of meer.",
    trustSmall: ["Geen account nodig", "Kleurprofiel gratis"],
    free: { title: "Gratis", text: "Je precieze kleurtype (bijv. Soft Summer), 6 kleuren die je laten stralen en wat je beter vermijdt." },
    paid: { title: "In je gids, vanaf €6,99", text: "Al je 30 kleuren met namen, combinaties die werken en welke sieraden, tassen en make-uptinten bij je passen." },
    hero: { caption: "Zelfde gezicht. Andere kleur.", bad: "valt weg", good: "jouw kleur" },
  },
  page: pageNl({ galleryTitle: ["Zelfde gezicht.", "Andere kleur."], howTitle: ["Zo werkt", "het."], compareTitle: ["Gratis of", "de gids?"], finalTitle: ["Minder kopen,", "beter kiezen."], accessories: "welke sieraden, tassen en make-uptinten bij je passen", trustTitle: ["Rustig en", "zonder gedoe."] }),
  story: STORY_BOSSLADY,
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
        "{kleur}. Minder kopen, beter kiezen: kijk eerst in je eigen kast.",
      ],
    },
  },
  guide: {
    tagline: "Minder kopen, beter kiezen.",
    summary: "Je kleuren in één oogopslag. Om bij de hand te houden.",
    effect: "Het verschil zit in één ding: de kleur bij je gezicht.",
    combos: "Vier combinaties waarin alles samengaat.",
    swaps: "Niet dit, maar dit. Een rustiger alternatief uit je eigen palet.",
    closing: ["Een kast waarin", "alles samengaat."],
  },
  pass: { label: "Kleurenpas", season: "Jouw seizoen" },
  style: {
    pill: "Gratis",
    skip: "Sla over",
    headline: ["Jouw stijl,", "jouw budget."],
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
    "6 kleuren die je laten stralen",
    ["Alle 30 kleuren met namen: basis, accent en neutraal", "Combinaties die werken, zodat je kast samengaat", "Sieraden, tassen en make-uptinten", "Je persoonlijke stijlgids als PDF + digitale pas"],
    { kind: "compare", title: "Eén keer goed kiezen", them: ["Kleuradviseur", "een afspraak van 1 à 2 uur"], us: ["Met je stijlgids", "één selfie, je kleuren altijd bij je"] },
  ),
  ring: ["#C8285A", "#C9A9AC", "#8FA3B8", "#A6879C", "#B9926B", "#2F4F3A", "#A2462A", "#1F4FC4", "#F4E3A1", "#D9C7AE"],
};
