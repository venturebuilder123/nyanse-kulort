// Languages (founder, 18 Oct 2026): Dutch first. English live since 21 Oct 2026 (founder: "the option
// must be there for customers"); German, Spanish and French later. NEXT_PUBLIC_LOCALES="nl" turns it off. No flags (a flag is a country,
// not a language): a quiet "NL · EN" switch, a gentle suggestion on the first visit, and real
// /en URLs so search engines find the English pages.

export type Locale = "nl" | "en" | "de" | "es";
export const LOCALES: readonly Locale[] = ["nl", "en", "de", "es"];
export const LOCALE_COOKIE = "nk_lang";
export const LOCALE_HEADER = "x-nk-locale";
/** the label in the language switch, in the language itself */
export const LOCALE_LABEL: Record<Locale, string> = { nl: "NL", en: "EN", de: "DE", es: "ES" };
/** number and date formatting per language */
export const INTL: Record<Locale, string> = { nl: "nl-NL", en: "en-GB", de: "de-DE", es: "es-ES" };

/** Which languages visitors can choose (default all four; 9 Nov 2026: German and Spanish added). */
export const enabledLocales = (): Locale[] => {
  const raw = (process.env.NEXT_PUBLIC_LOCALES || "nl,en,de,es").split(",").map((s) => s.trim());
  const on = LOCALES.filter((l) => raw.includes(l));
  return on.includes("nl") ? on : ["nl", ...on];
};

export const isLocale = (v: unknown): v is Locale => LOCALES.includes(v as Locale);

/**
 * /en, /de and /es (and anything under them) are the URLs of that language; ?lang= switches; otherwise
 * the remembered choice. Returns the locale and the path without the prefix (the pages are shared).
 */
export function resolveLocale(input: { pathname: string; param?: string | null; cookie?: string | null; enabled?: Locale[] }): { locale: Locale; path: string; prefixed: boolean } {
  const enabled = input.enabled ?? enabledLocales();
  const m = /^\/(en|de|es)(\/.*)?$/.exec(input.pathname);
  if (m && enabled.includes(m[1] as Locale)) return { locale: m[1] as Locale, path: m[2] || "/", prefixed: true };
  if (isLocale(input.param) && enabled.includes(input.param)) return { locale: input.param, path: input.pathname, prefixed: false };
  if (isLocale(input.cookie) && enabled.includes(input.cookie)) return { locale: input.cookie, path: input.pathname, prefixed: false };
  return { locale: "nl", path: input.pathname, prefixed: false };
}

/** The URL prefix of a language ("" for Dutch). */
export const prefixOf = (l: Locale) => (l === "nl" ? "" : `/${l}`);
