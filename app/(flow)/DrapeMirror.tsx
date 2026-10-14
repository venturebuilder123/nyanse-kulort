"use client";

import { useMemo, useState } from "react";
import { peopleFor, PEOPLE } from "@/lib/brand/people";
import type { BrandKey } from "@/lib/brand/types";
import type { Segment } from "@/lib/brand/segment";
import { profileForSeason } from "@/lib/color/declared";
import { colorName, paletteFor, showcase } from "@/lib/color/palette";
import type { SeasonKey } from "@/lib/color/seasons";
import { Drape } from "./Drape";

// The drape mirror (from the Nordic prototype): one person, large and calm; tap a colour and the
// cloth changes. Six from their own palette, two to leave on the rail. Like a session in the atelier,
// and it shows a whole palette instead of one colour pair.
export function DrapeMirror({ brand, segment }: { brand: BrandKey; segment: Segment | null }) {
  const people = useMemo(() => {
    const own = peopleFor(brand, segment);
    return own.length ? own : PEOPLE[brand];
  }, [brand, segment]);
  const [who, setWho] = useState(0);
  const person = people[who % people.length]!;
  const swatches = useMemo(() => {
    const pal = paletteFor(profileForSeason(person.season as SeasonKey), brand);
    return [
      ...showcase(pal).map((c) => ({ hex: c.hex, name: colorName(c, brand), ok: true })),
      ...pal.avoid.slice(0, 2).map((c) => ({ hex: c.hex, name: colorName(c, brand), ok: false })),
    ];
  }, [person, brand]);
  const [pick, setPick] = useState(0);
  const cur = swatches[Math.min(pick, swatches.length - 1)]!;

  return (
    <div className="mirror">
      <Drape photo={person.src} face={{ ...person.face, mirrored: false }} color={cur.hex} fit={{ w: 0.4, cy: 0.38 }} className="mirror-face" />
      <div className="mirror-side">
        <p className="mirror-verdict">
          <b>{cur.name}</b>
          <span>{cur.ok ? "laat het gezicht oplichten" : "trekt de aandacht weg: laat hangen"}</span>
        </p>
        <div className="mirror-swatches" role="radiogroup" aria-label="Kies een kleur">
          {swatches.map((s, i) => (
            <button
              key={s.hex}
              role="radio"
              aria-checked={i === pick}
              aria-label={`${s.name}${s.ok ? "" : ", laat hangen"}`}
              className={`${s.ok ? "" : "is-avoid"}${i === 6 ? " is-break" : ""}`}
              style={{ background: s.hex }}
              onClick={() => setPick(i)}
            />
          ))}
        </div>
        <p className="mirror-legend"><span>Zes uit dit palet</span><span>Twee om te laten hangen</span></p>
        {people.length > 1 && (
          <div className="mirror-people" aria-label="Ander voorbeeld">
            {people.slice(0, 6).map((p, i) => (
              <button key={p.src} aria-pressed={i === who % people.length} onClick={() => { setWho(i); setPick(0); }} aria-label={`Voorbeeld ${i + 1}`}>
                <img src={p.src} alt="" width={56} height={70} loading="lazy" />
              </button>
            ))}
          </div>
        )}
        <p className="ai-label">Voorbeeld · beelden gemaakt met AI, kleuren gekozen door onze analyse</p>
      </div>
    </div>
  );
}
