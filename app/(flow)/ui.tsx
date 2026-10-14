"use client";

import Link from "next/link";

import type { Headline, OccasionKey } from "@/lib/brand/types";
import { useBrand } from "./BrandProvider";

/**
 * Couture wordmarks without a symbol. KULØRT: light, extra-wide Archivo with wide tracking and
 * a hairline cognac slash through the Ø as signature. NYANSE: Didone capitals (Bodoni) with
 * wide tracking, one mark for both voices; the voice changes the copy, not the brand.
 */
export function Wordmark() {
  const { config } = useBrand();
  if (config.key === "kulort") {
    return (
      <span className="wordmark wm-kulort" role="img" aria-label="KULØRT">
        <span aria-hidden="true">KUL<span className="wm-o">O</span>RT</span>
      </span>
    );
  }
  return (
    <span className="wordmark wm-nyanse" role="img" aria-label="NYANSE">
      <span aria-hidden="true">NYANSE</span>
    </span>
  );
}

/** One maison: KULØRT | NYANSE on every page, the active line in ink; tap = back to the choice. */
export function HouseMark() {
  const { config } = useBrand();
  return (
    <a className="maison-mark house-mark" href="/kies" aria-label={`KULØRT en NYANSE, nu ${config.name}`}>
      <span className={`wordmark wm-kulort${config.key === "kulort" ? " is-on" : ""}`} aria-hidden="true">KUL<span className="wm-o">O</span>RT</span>
      <i aria-hidden="true" />
      <span className={`wordmark wm-nyanse${config.key === "nyanse" ? " is-on" : ""}`} aria-hidden="true">NYANSE</span>
    </a>
  );
}

export function AppBar({ pill }: { pill?: string }) {
  return (
    <header className="appbar">
      <HouseMark />
      {pill && <span className="pill">{pill}</span>}
    </header>
  );
}

const STEPS = ["Jij", "Stijl", "Selfie", "Analyse", "Resultaat"];
// steps you can go back to (the analysis itself is not a place to return to)
const STEP_HREF: (string | null)[] = ["/", "/stijl", "/selfie", null, null];

export function Crumbs({ step }: { step: number }) {
  return (
    <ol className="crumbs" aria-label={`Stap ${step + 1} van ${STEPS.length}`}>
      {STEPS.map((s, i) => {
        const href = i < step ? STEP_HREF[i] : null;
        return (
          <li key={s} className={i < step ? "is-done" : i === step ? "is-now" : ""} aria-current={i === step ? "step" : undefined}>
            {href ? <Link href={href}>{s}</Link> : s}
          </li>
        );
      })}
    </ol>
  );
}

export function Display({ text, as: Tag = "h1", small }: { text: Headline; as?: "h1" | "h2"; small?: boolean }) {
  return (
    <Tag className={`disp${small ? " sm" : ""}`}>
      {text[0]} <em>{text[1]}</em>
    </Tag>
  );
}

const ICON_PATHS: Record<OccasionKey, React.ReactNode> = {
  werk: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" />
    </>
  ),
  weekend: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  date: <path d="M7.5 3h9l-.6 5.2a3.9 3.9 0 0 1-7.8 0zM12 12.1V20M8 20.5h8" />,
  feest: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  sport: (
    <>
      <path d="M3 16.5c0-3.2 1.2-6.4 3.2-7.5l3 3 4.3-1.2 5.2 3.1c1.6 1 2.3 2 2.3 3v1.6H3z" />
      <path d="M3 19.5h18" />
    </>
  ),
};

export function OccasionIcon({ k }: { k: OccasionKey }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[k]}
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

/** Legal footer (CLAUDE.md §9): one legal entity behind both brands. Details follow at registration. */
export function Footer() {
  return (
    <footer className="foot">
      <Link href="/privacy">Privacy</Link>
      <span>Prijzen inclusief btw</span>
    </footer>
  );
}
