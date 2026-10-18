"use client";

import { useEffect, useState } from "react";
import { enabledLocales, LOCALE_COOKIE, type Locale } from "@/lib/i18n/locale";
import { useBrand } from "./BrandProvider";

// Language choice (founder, 18 Oct 2026): a quiet "NL · EN" text switch instead of flags (a flag
// is a country, not a language), and a one-line suggestion on the first visit. Both stay hidden
// until English is switched on (NEXT_PUBLIC_LOCALES="nl,en").

function go(to: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${to}; path=/; max-age=31536000; samesite=lax`;
  const { pathname, search } = location;
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  // the home pages have their own English URL (for search); the flow follows the cookie
  location.href = to === "en" && bare === "/" ? `/en${search}` : `${bare}${search}`;
}

export function LangSwitch({ className = "" }: { className?: string }) {
  const { locale } = useBrand();
  if (!enabledLocales().includes("en")) return null;
  return (
    <span className={`lang-switch ${className}`} role="group" aria-label="Taal / Language">
      <button type="button" aria-pressed={locale === "nl"} onClick={() => locale !== "nl" && go("nl")} lang="nl">NL</button>
      <span aria-hidden="true">·</span>
      <button type="button" aria-pressed={locale === "en"} onClick={() => locale !== "en" && go("en")} lang="en">EN</button>
    </span>
  );
}

/** First visit, browser not set to Dutch, no choice made yet: suggest English once, never redirect. */
export function LangHint() {
  const { locale } = useBrand();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (locale !== "nl" || !enabledLocales().includes("en")) return;
    if (document.cookie.includes(`${LOCALE_COOKIE}=`)) return;
    try { if (localStorage.getItem("nk_lang_hint")) return; } catch {}
    const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
    if (langs.some((l) => /^(nl|fy|li)\b/i.test(l))) return;
    setShow(true);
  }, [locale]);
  if (!show) return null;
  const close = () => { setShow(false); try { localStorage.setItem("nk_lang_hint", "1"); } catch {} };
  return (
    <div className="lang-hint" role="note" lang="en">
      <span>This page in English?</span>
      <button type="button" className="lang-hint-go" onClick={() => go("en")}>English</button>
      <button type="button" className="lang-hint-x" aria-label="Close" onClick={close}>×</button>
    </div>
  );
}
