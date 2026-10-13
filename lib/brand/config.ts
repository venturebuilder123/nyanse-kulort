import { atelier } from "./nyanse/atelier";
import { girlmath } from "./nyanse/girlmath";
import { wingman } from "./kulort/wingman";
import type { BrandConfig, BrandKey, BudgetKey, OccasionKey, VoiceCopy, VoiceKey } from "./types";

export const BRANDS: Record<BrandKey, BrandConfig> = {
  kulort: {
    key: "kulort",
    name: "KULØRT",
    hosts: ["kulort.com", "kulort.nl", "kulort.app"],
    voices: ["wingman"],
    defaultVoice: "wingman",
    shops: ["Zalando", "OFM", "Nolson", "Uniqlo", "COS", "Sissy-Boy", "ASOS", "Vinted"],
    other: "nyanse",
    switchLabel: "Voor vrouwen",
    themeColor: "#1B2433",
    descriptor: "KULORT",
  },
  nyanse: {
    key: "nyanse",
    name: "NYANSE",
    hosts: ["nyanse.com", "nyanse.nl", "nyanse.app"],
    voices: ["atelier", "girlmath"],
    defaultVoice: "atelier",
    shops: ["Zalando", "H&M", "Zara", "Mango", "COS", "Arket", "ASOS", "Vinted"],
    other: "kulort",
    switchLabel: "Voor mannen",
    themeColor: "#C8285A",
    descriptor: "NYANSE",
  },
};

export const VOICES: Record<VoiceKey, VoiceCopy> = { wingman, atelier, girlmath };

/** First test is KULØRT (CLAUDE.md §2), so it is the fallback brand. */
export const DEFAULT_BRAND: BrandKey = "kulort";

/** UTM shorthand from ads: ?s=gm|at (CLAUDE.md §2). */
export const VOICE_PARAM: Record<string, VoiceKey> = { gm: "girlmath", at: "atelier", wm: "wingman" };

export const OCCASIONS: { key: OccasionKey; label: string }[] = [
  { key: "werk", label: "Werk" },
  { key: "weekend", label: "Weekend" },
  { key: "date", label: "Date" },
  { key: "feest", label: "Feest" },
  { key: "sport", label: "Sport & vrije tijd" },
];

export const BUDGETS: { key: BudgetKey; label: string }[] = [
  { key: "low", label: "Tot €30" },
  { key: "mid", label: "€30–80" },
  { key: "high", label: "€80+" },
];
