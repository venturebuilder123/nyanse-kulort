export type BrandKey = "nyanse" | "kulort";
export type VoiceKey = "girlmath" | "atelier" | "wingman";
export type Locale = "nl"; // structure ready for "en" | "de"

export type OccasionKey = "werk" | "weekend" | "date" | "feest" | "sport";
export type BudgetKey = "low" | "mid" | "high";

/** Headline split in a plain part and an emphasised part (accent colour / marker). */
export type Headline = readonly [plain: string, emphasis: string];

export type VoiceCopy = {
  locale: Locale;
  meta: { title: string; description: string };
  landing: {
    pill: string;
    headline: Headline;
    checks: readonly [string, string, string];
    occasionQuestion: string;
  };
  style: {
    pill: string;
    headline: Headline;
    occasionQuestion: string;
    budgetQuestion: string;
    shopsQuestion: string;
    shopsHint: string;
    next: string;
  };
  /** colours on the 3D ring, chosen per voice */
  ring: readonly string[];
};

export type BrandConfig = {
  key: BrandKey;
  name: string;
  /** production hostnames that select this brand */
  hosts: readonly string[];
  voices: readonly VoiceKey[];
  defaultVoice: VoiceKey;
  /** 8 favourite shops offered in the style step (CLAUDE.md §6.2) */
  shops: readonly string[];
  other: BrandKey;
  /** the small cross-brand link on the landing */
  switchLabel: string;
  themeColor: string;
  /** shown on bank statements and in mails (phase B) */
  descriptor: string;
};
