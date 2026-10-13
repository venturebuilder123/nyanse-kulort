"use client";

import { useBrand } from "./BrandProvider";

// Inner 4x4 bits of our real ArUco marker (DICT_4X4_50, id 1): the pass carries the same mark.
const MARKER = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [1, 0, 0, 1],
  [1, 0, 1, 0],
];

export function Marker() {
  return (
    <svg className="marker" viewBox="0 0 6 6" aria-hidden="true">
      <rect width="6" height="6" fill="#0d1016" />
      {MARKER.flatMap((row, y) =>
        row.map((on, x) => (on ? <rect key={`${x}-${y}`} x={x + 1} y={y + 1} width="1.02" height="1.02" fill="#ffffff" /> : null)),
      )}
    </svg>
  );
}

// Pass background per voice; the colour strip skips it so no swatch disappears into the card.
const PASS_BG: Record<string, string> = { wingman: "#1b2433", atelier: "#2a1f24", girlmath: "#d61f5b" };

/** The kleurenpas, our physical proof. `season` empty = hidden (curiosity on the landing). */
export function Pass({ season, colors, blurSeason }: { season?: string; colors: readonly string[]; blurSeason?: boolean }) {
  const { config, copy, voice } = useBrand();
  const strip = colors.filter((c) => c.toLowerCase() !== PASS_BG[voice]).slice(0, 8);
  return (
    <div className="pass">
      <div className="pass-top">
        <span className="pass-brand">{config.key === "kulort" ? "KULØRT" : "nyanse"}</span>
        <span className="pass-label">{copy.pass.label}</span>
      </div>
      <div className="pass-mid">
        <span className="pass-label">{copy.pass.season}</span>
        {season ? <span className={`pass-season${blurSeason ? " is-blurred" : ""}`}>{season}</span> : <span className="pass-hidden" aria-label="nog onbekend"><i /><i /><b>?</b></span>}
      </div>
      <div className="pass-bottom">
        <span className="pass-strip">{strip.map((c, i) => <i key={i} style={{ background: c }} />)}</span>
        <Marker />
      </div>
    </div>
  );
}

/** Landing hero: a fan of fabric swatches opening behind the floating pass. */
export function Hero() {
  const { copy } = useBrand();
  const blades = copy.ring.slice(0, 9);
  const spread = 104; // degrees, total
  return (
    <div className="hero" aria-hidden="true">
      <div className="fan">
        {blades.map((c, i) => {
          const angle = -spread / 2 + (spread / (blades.length - 1)) * i;
          return <i key={i} style={{ backgroundColor: c, ["--a" as string]: `${angle}deg`, ["--d" as string]: `${i * 45}ms` }} />;
        })}
      </div>
      <div className="pass-float">
        <Pass colors={copy.ring} />
      </div>
    </div>
  );
}
