// Languages (founder, 18 Oct 2026): Dutch first; English is prepared and switched on with
// NEXT_PUBLIC_LOCALES="nl,en" once the November numbers are in. No flags (a flag is a country,
// not a language): a quiet "NL · EN" switch, a gentle suggestion on the first visit, and real
// /en URLs so search engines find the English pages.

export type Locale = "nl" | "en";
export const LOCALES: readonly Locale[] = ["nl", "en"];
export const LOCALE_COOKIE = "nk_lang";
export const LOCALE_HEADER = "x-nk-locale";

/** Which languages visitors can choose. Until "en" is in the list, the site stays Dutch only. */
export const enabledLocales = (): Locale[] => {
  const raw = (process.env.NEXT_PUBLIC_LOCALES ?? "nl").split(",").map((s) => s.trim());
  const on = LOCALES.filter((l) => raw.includes(l));
  return on.includes("nl") ? on : ["nl", ...on];
};

export const isLocale = (v: unknown): v is Locale => v === "nl" || v === "en";

/**
 * /en and /en/... are the English URLs; ?lang= switches; otherwise the remembered choice.
 * Returns the locale and the path without the /en prefix (the pages themselves are shared).
 */
export function resolveLocale(input: { pathname: string; param?: string | null; cookie?: string | null; enabled?: Locale[] }): { locale: Locale; path: string; prefixed: boolean } {
  const enabled = input.enabled ?? enabledLocales();
  const m = /^\/en(\/.*)?$/.exec(input.pathname);
  if (m && enabled.includes("en")) return { locale: "en", path: m[1] || "/", prefixed: true };
  if (isLocale(input.param) && enabled.includes(input.param)) return { locale: input.param, path: input.pathname, prefixed: false };
  if (isLocale(input.cookie) && enabled.includes(input.cookie)) return { locale: input.cookie, path: input.pathname, prefixed: false };
  return { locale: "nl", path: input.pathname, prefixed: false };
}
