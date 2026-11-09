"use client";

import { useEffect, useState } from "react";
import { enabledLocales, LOCALE_COOKIE, LOCALE_LABEL, prefixOf, type Locale } from "@/lib/i18n/locale";
import { useBrand } from "./BrandProvider";

// Language choice (founder, 18 Oct 2026; German and Spanish 9 Nov 2026): text, no flags (a flag is a
// country, not a language). Desktop shows all languages; phones a compact menu, so the header stays
// calm. A one-line suggestion on the first visit follows the browser's language.

function go(to: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
  const { pathname, search } = location;
  const bare = pathname.replace(/^\/(en|de|es)(?=\/|$)/, "") || "/";
  // the home pages have their own URL per language (for search); the flow follows the cookie
  location.href = to !== "nl" && bare === "/" ? `${prefixOf(to)}${search}` : `${bare}${search}`;
}

const NAME: Record<Locale, string> = { nl: "Nederlands", en: "English", de: "Deutsch", es: "Español" };

export function LangSwitch({ className = "" }: { className?: string }) {
  const { locale } = useBrand();
  const on = enabledLocales();
  if (on.length < 2) return null;
  return (
    <span className={`lang-switch ${className}`} role="group" aria-label="Taal / Language / Sprache / Idioma">
      <span className="lang-row">
        {on.map((l, i) => (
          <span key={l} className="lang-item">
            {i > 0 && <span aria-hidden="true">·</span>}
            <button type="button" aria-pressed={locale === l} onClick={() => locale !== l && go(l)} lang={l} title={NAME[l]}>{LOCALE_LABEL[l]}</button>
          </span>
        ))}
      </span>
      <label className="lang-menu">
        <span className="sr-only">Language</span>
        <select id={`lang-${className || "x"}`} value={locale} onChange={(e) => go(e.target.value as Locale)}>
          {on.map((l) => <option key={l} value={l} lang={l}>{LOCALE_LABEL[l]} · {NAME[l]}</option>)}
        </select>
        <span className="lang-menu-face" aria-hidden="true">{LOCALE_LABEL[locale]} ▾</span>
      </label>
    </span>
  );
}

const HINT: Record<Exclude<Locale, "nl">, [q: string, go: string, close: string]> = {
  en: ["This page in English?", "English", "Close"],
  de: ["Diese Seite auf Deutsch?", "Deutsch", "Schließen"],
  es: ["¿Esta página en español?", "Español", "Cerrar"],
};

/** First visit, browser not set to Dutch, no choice made yet: suggest their language once, never redirect. */
export function LangHint() {
  const { locale } = useBrand();
  const [to, setTo] = useState<Exclude<Locale, "nl"> | null>(null);
  useEffect(() => {
    const on = enabledLocales();
    if (locale !== "nl" || on.length < 2) return;
    if (document.cookie.includes(`${LOCALE_COOKIE}=`)) return;
    try { if (localStorage.getItem("nk_lang_hint")) return; } catch {}
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    if (langs.some((l) => /^(nl|fy|li)\b/i.test(l))) return;
    const first = langs.map((l) => l.slice(0, 2).toLowerCase()).find((l) => l === "de" || l === "es" || l === "en") as Exclude<Locale, "nl"> | undefined;
    const pick = first && on.includes(first) ? first : on.includes("en") ? "en" : null;
    setTo(pick);
  }, [locale]);
  if (!to) return null;
  const [q, label, close] = HINT[to];
  const shut = () => { setTo(null); try { localStorage.setItem("nk_lang_hint", "1"); } catch {} };
  return (
    <div className="lang-hint" role="note" lang={to}>
      <span>{q}</span>
      <button type="button" className="lang-hint-go" onClick={() => go(to)}>{label}</button>
      <button type="button" className="lang-hint-x" aria-label={close} onClick={shut}>×</button>
    </div>
  );
}
