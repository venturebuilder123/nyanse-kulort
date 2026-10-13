"use client";

import type { Headline, OccasionKey } from "@/lib/brand/types";
import { useBrand } from "./BrandProvider";

const DOTS = ["#F3A27A", "#8FA3B8", "#A2462A", "#1F4FC4"];

export function Wordmark() {
  const { config } = useBrand();
  return (
    <span className="wordmark" aria-label={config.name}>
      {config.key === "kulort" ? "kulørt" : "nyanse"}
      <span className="dots" aria-hidden="true">
        {DOTS.map((c) => <i key={c} style={{ background: c }} />)}
      </span>
    </span>
  );
}

export function AppBar({ pill }: { pill: string }) {
  return (
    <header className="appbar">
      <Wordmark />
      <span className="pill">{pill}</span>
    </header>
  );
}

const STEPS = ["Jij", "Stijl", "Selfie", "Analyse", "Resultaat"];

export function Crumbs({ step }: { step: number }) {
  return (
    <ol className="crumbs" aria-label={`Stap ${step + 1} van ${STEPS.length}`}>
      {STEPS.map((s, i) => (
        <li key={s} className={i < step ? "done" : i === step ? "now" : ""} aria-current={i === step ? "step" : undefined}>
          {s}
        </li>
      ))}
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

/** Fabric swatches on a slowly turning ring (CSS 3D, static with reduced motion). */
export function ColorRing({ colors }: { colors: readonly string[] }) {
  const step = 360 / colors.length;
  // radius so the panels (64px) form a closed ring with small gaps
  const radius = Math.round(70 / (2 * Math.tan(Math.PI / colors.length)));
  return (
    <div className="ring-stage" aria-hidden="true">
      <div className="ring-shadow" />
      <div className="ring-tilt">
        <div className="ring">
          {colors.map((c, i) => (
            <i key={`${c}-${i}`} style={{ backgroundColor: c, transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }} />
          ))}
        </div>
      </div>
    </div>
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

export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
