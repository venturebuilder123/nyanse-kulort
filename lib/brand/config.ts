import { bossladyEn, girlmathEn, signatureEn } from "./en/nyanse";
import { directorEn, wingmanEn } from "./en/kulort";
import { bossladyDe, girlmathDe, signatureDe } from "./de/nyanse";
import { directorDe, wingmanDe } from "./de/kulort";
import { bossladyEs, girlmathEs, signatureEs } from "./es/nyanse";
import { directorEs, wingmanEs } from "./es/kulort";
import type { Locale } from "@/lib/i18n/locale";
import { bosslady } from "./nyanse/bosslady";
import { girlmath } from "./nyanse/girlmath";
import { signature } from "./nyanse/signature";
import { director } from "./kulort/director";
import { wingman } from "./kulort/wingman";
import type { BrandConfig, BrandKey, BudgetKey, OccasionKey, VoiceCopy, VoiceKey } from "./types";

export const BRANDS: Record<BrandKey, BrandConfig> = {
  kulort: {
    key: "kulort",
    name: "KULØRT",
    hosts: ["kulort.com", "kulort.nl", "kulort.app"],
    voices: ["wingman", "director"],
    defaultVoice: "wingman",
    shops: ["Zalando", "OFM", "Nolson", "Uniqlo", "COS", "Sissy-Boy", "ASOS", "Profuomo"],
    premium: ["Suitsupply", "Hugo Boss", "Ralph Lauren", "Tommy Hilfiger", "Massimo Dutti", "Scotch & Soda", "Arket", "Gant", "Denham", "Drykorn", "Reiss", "Paul Smith", "Lacoste", "A.P.C.", "Acne Studios", "Stone Island", "Oger", "de Bijenkorf"],
    other: "nyanse",
    switchLabel: "Voor vrouwen",
    themeColor: { light: "#F4F0EA", dark: "#10141B" },
    descriptor: "KULORT",
  },
  nyanse: {
    key: "nyanse",
    name: "NYANSE",
    hosts: ["nyanse.com", "nyanse.nl", "nyanse.app"],
    voices: ["bosslady", "girlmath", "signature"],
    defaultVoice: "bosslady",
    shops: ["Zalando", "H&M", "Zara", "Mango", "COS", "Arket", "ASOS", "Sissy-Boy"],
    premium: ["Massimo Dutti", "& Other Stories", "Fabienne Chapot", "Scotch & Soda", "Sandro", "Maje", "Claudie Pierlot", "Ba&sh", "Ganni", "Toteme", "Reiss", "Ralph Lauren", "Max Mara", "Isabel Marant", "Alix The Label", "Josh V", "Summum", "de Bijenkorf"],
    other: "kulort",
    switchLabel: "Voor mannen",
    themeColor: { light: "#FBF7F6", dark: "#120F14" },
    descriptor: "NYANSE",
  },
};

export const VOICES: Record<VoiceKey, VoiceCopy> = { wingman, director, bosslady, girlmath, signature };
export const VOICES_EN: Record<VoiceKey, VoiceCopy> = { wingman: wingmanEn, director: directorEn, bosslady: bossladyEn, girlmath: girlmathEn, signature: signatureEn };
export const VOICES_DE: Record<VoiceKey, VoiceCopy> = { wingman: wingmanDe, director: directorDe, bosslady: bossladyDe, girlmath: girlmathDe, signature: signatureDe };
export const VOICES_ES: Record<VoiceKey, VoiceCopy> = { wingman: wingmanEs, director: directorEs, bosslady: bossladyEs, girlmath: girlmathEs, signature: signatureEs };
/** The copy for a voice in a language (Dutch is the source). */
export const copyFor = (voice: VoiceKey, locale: Locale): VoiceCopy => ({ nl: VOICES, en: VOICES_EN, de: VOICES_DE, es: VOICES_ES })[locale][voice];

/** First test is KULØRT (CLAUDE.md §2), so it is the fallback brand. */
export const DEFAULT_BRAND: BrandKey = "kulort";

/** UTM shorthand from ads: ?s=gm|at (CLAUDE.md §2). */
export const VOICE_PARAM: Record<string, VoiceKey> = { gm: "girlmath", bl: "bosslady", at: "bosslady", sg: "signature", wm: "wingman", dr: "director" };

export const OCCASIONS: { key: OccasionKey; label: string; en: string; de: string; es: string }[] = [
  { key: "werk", label: "Werk", en: "Work", de: "Arbeit", es: "Trabajo" },
  { key: "weekend", label: "Weekend", en: "Weekend", de: "Wochenende", es: "Fin de semana" },
  { key: "date", label: "Date", en: "Date", de: "Date", es: "Cita" },
  { key: "feest", label: "Feest", en: "Party", de: "Party", es: "Fiesta" },
];

export const BUDGETS: { key: BudgetKey; label: string; en: string; de: string; es: string }[] = [
  { key: "low", label: "Tot €30", en: "Up to €30", de: "Bis 30 €", es: "Hasta 30 €" },
  { key: "mid", label: "€30–80", en: "€30–80", de: "30–80 €", es: "30–80 €" },
  { key: "high", label: "€80+", en: "€80+", de: "80 €+", es: "80 €+" },
];
/** the label of an occasion or budget in the visitor's language */
export const labelIn = (o: { label: string; en: string; de: string; es: string }, l: Locale) => (l === "nl" ? o.label : o[l]);
