"use client";

import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import type { SeasonKey } from "@/lib/color/seasons";
import { SEASONS } from "@/lib/color/seasons";
import { nameForHex } from "@/lib/color/palette";
import { colourName } from "@/lib/i18n/words";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { youngPeople } from "./Studio";

// "Links of rechts?" (founder, 9 Nov 2026: a little of direction B). The same face with the colour the
// engine advises against and the one it recommends, in random order; you pick, we show why. A game
// that is also the proof, and it ends at the test.
const NONE = { brand: "none", voice: "none" };

export function SwipeTest({ only }: { only?: "kulort" | "nyanse" } = {}) {
  const { locale } = useBrand();
  const T = FLOW[locale].home2.swipe;
  const people = useMemo(() => youngPeople(only), [only]);
  const [n, setN] = useState(0);
  const [picked, setPicked] = useState<"l" | "r" | null>(null);
  const [score, setScore] = useState({ right: 0, played: 0 });
  const p = people[n % people.length]!;
  // the good colour sits left or right, alternating per person, so nobody learns a pattern
  const goodLeft = n % 3 === 1;
  const sides = goodLeft ? [p.good, p.bad] : [p.bad, p.good];
  const nm = (hex: string) => { const x = nameForHex(hex, p.brand); return x ? colourName(x, locale) : hex; };
  const her = p.brand === "nyanse";
  const pick = (side: "l" | "r") => {
    if (picked) return;
    const ok = (side === "l") === goodLeft;
    setPicked(side);
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), played: s.played + 1 }));
    track("home_swipe", NONE, { ok, season: p.season });
  };
  const ok = picked && (picked === "l") === goodLeft;
  const next = () => { setPicked(null); setN((x) => x + 1); };

  return (
    <section className="sw-test" aria-labelledby="sw-h" style={{ ["--good" as string]: p.good }}>
      <div className="sw-head">
        <p className="mh-eyebrow">{T.eyebrow}</p>
        <h2 id="sw-h" className="sw-h2">{picked ? (ok ? T.right : T.wrong) : T.q(her)}</h2>
        {score.played > 0 && <p className="sw-score">{T.score(score.right, score.played)}</p>}
      </div>
      <div className={`sw-pair${picked ? " is-done" : ""}`} key={n}>
        {(["l", "r"] as const).map((side, k) => {
          const hex = sides[k]!, isGood = hex === p.good;
          return (
            <button key={side} type="button" className={`sw-card${picked ? (isGood ? " is-good" : " is-bad") : ""}`} onClick={() => pick(side)} aria-label={side === "l" ? T.left : T.right_}>
              <Drape photo={p.src} face={{ ...p.face, mirrored: false }} color={hex} fit={{ w: 0.5, cy: 0.4 }} />
              <span className="sw-tag">{picked ? `${isGood ? "✓" : "✕"} ${nm(hex)}` : side === "l" ? T.left : T.right_}</span>
            </button>
          );
        })}
      </div>
      {picked ? (
        <div className="sw-after">
          <p>{T.why(nm(p.good), nm(p.bad), SEASONS[p.season as SeasonKey].name)}</p>
          <div className="sw-actions">
            <a className="btn" href={her ? "/nyanse" : "/kulort"} onClick={() => track("brand_switch", NONE, { to: p.brand, from: "maison-swipe" })}>{T.cta}</a>
            <button type="button" className="btn btn-ghost" onClick={next}>{T.next}</button>
          </div>
        </div>
      ) : (
        <p className="sw-hint">{T.hint}</p>
      )}
    </section>
  );
}
