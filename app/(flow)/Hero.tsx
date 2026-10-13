"use client";

import { useEffect, useState } from "react";
import { PEOPLE } from "@/lib/brand/people";
import { useBrand } from "./BrandProvider";
import { Drape } from "./Drape";

// Three illustrated faces (light, medium, deep skin), each shown in a wrong and a right colour.
// Illustrations only: no photos of real people (CLAUDE.md §12).
const FACES = [
  { skin: "#E8C3A6", hair: "#5B3B28", bad: "#8E98A3", good: "#C46A45" },
  { skin: "#B07D57", hair: "#22170F", bad: "#E6D7A6", good: "#1F5C63" },
  { skin: "#6B4632", hair: "#120D0A", bad: "#9C7A58", good: "#2F5FD0" },
];
const PHASE_MS = 1500;

/** Landing hero: the drape test. Same face, different colour: the problem and the promise in one look. */
export function Hero() {
  const { config } = useBrand();
  // AI-generated photos when they exist (docs/fase-b/AI-BEELDEN.md), the illustration otherwise
  return PEOPLE[config.key].length ? <PhotoHero /> : <IllustratedHero />;
}

/**
 * AI-generated people with the engine's own drape colours on one neutral photo each:
 * the same technique as on a real selfie, never a separately edited "bad" photo.
 */
function PhotoHero() {
  const { config, copy } = useBrand();
  const people = PEOPLE[config.key];
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    if (r) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % (people.length * 2)), PHASE_MS);
    return () => clearInterval(id);
  }, [people.length]);
  const person = people[Math.floor(phase / 2) % people.length]!;
  const good = reduced || phase % 2 === 1;
  return (
    <figure className="hero2 hero-photo" aria-label={copy.landing.hero.caption}>
      <div className="hero2-stage">
        <span className={`hero2-tag bad${!good ? " on" : ""}`}>✕ {copy.landing.hero.bad}</span>
        <span className={`hero2-tag good${good ? " on" : ""}`}>✓ {copy.landing.hero.good}</span>
        <Drape photo={person.src} face={{ ...person.face, mirrored: false }} color={good ? person.good : person.bad} fit={{ w: 0.5, cy: 0.4 }} className="hero-portrait" />
        <div className="hero2-pass"><MiniPass /></div>
      </div>
      <figcaption className="hero2-caption">{copy.landing.hero.caption}<span className="ai-label">Voorbeeld · beeld gemaakt met AI, kleurdoek door onze analyse</span></figcaption>
    </figure>
  );
}

function IllustratedHero() {
  const { config, copy } = useBrand();
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    if (r) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % (FACES.length * 2)), PHASE_MS);
    return () => clearInterval(id);
  }, []);

  const person = FACES[Math.floor(phase / 2)]!;
  const good = phase % 2 === 1;
  const drape = good ? person.good : person.bad;
  const long = config.key === "nyanse";

  return (
    <figure className="hero2" aria-label={copy.landing.hero.caption}>
      <div className="hero2-stage">
        <span className={`hero2-tag bad${!good || reduced ? " on" : ""}`}>✕ {copy.landing.hero.bad}</span>
        <span className={`hero2-tag good${good || reduced ? " on" : ""}`}>✓ {copy.landing.hero.good}</span>
        <svg viewBox="0 0 320 230" aria-hidden="true">
          <defs>
            <clipPath id="hero-left"><rect x="0" y="0" width="160" height="230" /></clipPath>
            <filter id="hero-blur"><feGaussianBlur stdDeviation="10" /></filter>
          </defs>
          <circle cx="160" cy="118" r="98" className="hero2-backdrop" />
          {long && <path d="M112 96 Q108 38 160 34 Q212 38 208 96 L214 176 Q160 190 106 176 Z" fill={person.hair} className="t-fill" />}
          <rect x="145" y="126" width="30" height="44" rx="9" fill={person.skin} className="t-fill" style={{ filter: "brightness(.9)" }} />
          <ellipse cx="121" cy="102" rx="6" ry="10" fill={person.skin} className="t-fill" />
          <ellipse cx="199" cy="102" rx="6" ry="10" fill={person.skin} className="t-fill" />
          <ellipse cx="160" cy="98" rx="40" ry="50" fill={person.skin} className="t-fill" />
          {/* the cloth's colour reflects on the face; nothing else changes (no greying of the 'wrong' side) */}
          <ellipse cx="160" cy="112" rx="40" ry="38" fill={drape} opacity={0.18} filter="url(#hero-blur)" className="t-fill" />
          {long ? (
            <path d="M118 98 Q112 40 160 38 Q206 40 204 98 Q196 62 162 60 Q132 62 124 82 Z" fill={person.hair} className="t-fill" />
          ) : (
            <path d="M119 90 Q117 46 160 43 Q203 46 201 90 Q195 66 160 64 Q125 66 119 90 Z" fill={person.hair} className="t-fill" />
          )}
          <path d="M139 86 q8 -4 15 0 M166 86 q8 -4 15 0" stroke={person.hair} strokeWidth="3" strokeLinecap="round" fill="none" className="t-stroke" />
          <circle cx="147" cy="97" r="2.6" fill="#24180f" />
          <circle cx="173" cy="97" r="2.6" fill="#24180f" />
          <path d="M151 121 q9 5 18 0" stroke="#7a4b3a" strokeOpacity=".55" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          {/* the drape */}
          <path d="M34 232 L34 190 Q66 150 128 156 L160 198 L192 156 Q254 150 286 190 L286 232 Z" fill={reduced ? person.good : drape} className="t-fill" />
          {reduced && <path d="M34 232 L34 190 Q66 150 128 156 L160 198 L160 232 Z" fill={person.bad} clipPath="url(#hero-left)" />}
          <path d="M128 156 L160 198 L192 156" stroke="rgba(0,0,0,.18)" strokeWidth="2" fill="none" />
        </svg>
        <div className="hero2-pass"><MiniPass /></div>
      </div>
      <figcaption className="hero2-caption">{copy.landing.hero.caption}</figcaption>
    </figure>
  );
}

/** Small kleurenpas: a product hint, not the hero. */
export function MiniPass() {
  const { config, copy } = useBrand();
  return (
    <div className="minipass">
      <span className="minipass-brand">{config.key === "kulort" ? "KULØRT" : "nyanse"}</span>
      <span className="minipass-strip">{copy.ring.slice(0, 8).map((c, i) => <i key={i} style={{ background: c }} />)}</span>
    </div>
  );
}
