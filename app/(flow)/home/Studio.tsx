"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PEOPLE, type Person } from "@/lib/brand/people";
import { track } from "@/lib/analytics";
import { profileForSeason } from "@/lib/color/declared";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide } from "@/lib/guide/build";
import { colourName } from "@/lib/i18n/words";
import { FLOW } from "@/lib/i18n/flow";
import { nameForHex } from "@/lib/color/palette";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";

// The opening of the home page (founder, 9 Nov 2026: direction C "Paletstudio" with a little of B).
// Story-like: one young model at a time in their own best colour, their season's palette fanning out
// behind them and the page tinting along. Real engine output, never a colour that does not suit them.
const NONE = { brand: "none", voice: "none" };
const STEP = 3800;

/** The young set, her and him in turn. */
export function youngPeople(only?: "kulort" | "nyanse"): (Person & { brand: "kulort" | "nyanse" })[] {
  const her = only === "kulort" ? [] : PEOPLE.nyanse.filter((p) => p.segment === "jong").map((p) => ({ ...p, brand: "nyanse" as const }));
  const him = (only === "nyanse" ? [] : PEOPLE.kulort).filter((p) => p.segment === "jong").map((p) => ({ ...p, brand: "kulort" as const }));
  const out: (Person & { brand: "kulort" | "nyanse" })[] = [];
  for (let i = 0; i < Math.max(her.length, him.length); i++) { if (her[i]) out.push(her[i]!); if (him[i]) out.push(him[i]!); }
  return out;
}

/** A colour mixed towards white: the page tint. */
export const tint = (hex: string, w = 0.84) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${[n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(v + (255 - v) * w)).join(",")})`;
};

export function Studio() {
  const { locale } = useBrand();
  const T = FLOW[locale].home2;
  const [hex, setHex] = useState("#EE7A67");
  return (
    <section className="st" style={{ ["--tint" as string]: tint(hex) }} id="start">
      <div className="st-copy">
        <h1 className="st-h1">{T.h1[0]} <em>{T.h1[1]}</em></h1>
        <p className="st-sub">{T.sub}</p>
      </div>
      <PaletteStage onColour={setHex} />
      <div className="st-doors">
        <a className="st-door" href="/nyanse" onClick={() => track("brand_switch", NONE, { to: "nyanse", from: "maison-studio" })}>{T.her}</a>
        <a className="st-door" href="/kulort" onClick={() => track("brand_switch", NONE, { to: "kulort", from: "maison-studio" })}>{T.him}</a>
      </div>
      <p className="st-facts">{T.facts.map((f) => <span key={f}>✓ {f}</span>)}</p>
      <p className="st-ai">{T.ai}</p>
    </section>
  );
}

/** The story stage: models in their best colour with their palette fanning out; for one brand or both. */
export function PaletteStage({ only, onColour }: { only?: "kulort" | "nyanse"; onColour?: (hex: string) => void }) {
  const { locale } = useBrand();
  const T = FLOW[locale].home2;
  const people = useMemo(() => youngPeople(only), [only]);
  const fans = useMemo(() => people.map((p) => buildGuide(profileForSeason(p.season as SeasonKey), p.brand).summary.core.slice(0, 7).map((c) => c.hex)), [people]);
  const [i, setI] = useState(0);
  const [run, setRun] = useState(0); // restarts the progress bar after a tap
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; });
    if (ref.current) io.observe(ref.current);
    const t = window.setTimeout(function tick() {
      if (visible && !document.hidden) setI((n) => (n + 1) % people.length);
    }, STEP);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [i, run, people.length]);

  const p = people[i]!;
  const good = nameForHex(p.good, p.brand);
  useEffect(() => onColour?.(p.good), [p.good, onColour]);
  const pick = (n: number) => { setI(n); setRun((r) => r + 1); track("home_story", NONE, { to: n }); };

  return (
    <div ref={ref} className="st-stage-wrap">
      <div className="st-stage">
        <div className="st-bars" role="tablist" aria-label={T.people}>
          {people.map((x, n) => (
            <button key={x.src} role="tab" aria-selected={n === i} aria-label={`${SEASONS[x.season as SeasonKey].name}`} onClick={() => pick(n)}>
              <i className={n < i ? "done" : n === i ? `now${reduce.current ? "" : " run"}` : ""} key={n === i ? `${i}-${run}` : n} style={{ animationDuration: `${STEP}ms` }} />
            </button>
          ))}
        </div>
        <div className="st-fan" key={`fan-${i}`} aria-hidden="true">
          {fans[i]!.map((hex, k) => <i key={hex + k} style={{ background: hex, ["--r" as string]: `${(k - 3) * 14}deg`, ["--d" as string]: `${k * 45}ms` }} />)}
        </div>
        <button type="button" className="st-face" key={`face-${i}`} onClick={() => pick((i + 1) % people.length)} aria-label={T.next}>
          <Drape photo={p.src} face={{ ...p.face, mirrored: false }} color={p.good} fit={{ w: 0.44, cy: 0.4 }} />
        </button>
        <p className="st-label" key={`label-${i}`}>
          <b>{SEASONS[p.season as SeasonKey].name}</b>
          <span><i style={{ background: p.good }} />{T.wears(good ? colourName(good, locale) : p.good)}</span>
        </p>
      </div>
    </div>
  );
}
