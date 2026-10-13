"use client";

import { PEOPLE } from "@/lib/brand/people";
import { nameForHex } from "@/lib/color/palette";
import { useBrand } from "./BrandProvider";
import { Drape } from "./Drape";
import { CheckIcon, Display } from "./ui";

/** Sections under the first tap; on large screens they make the landing a full product page. */
export function LandingSections({ onStart }: { onStart: () => void }) {
  const { config, copy } = useBrand();
  const pg = copy.page;
  const people = PEOPLE[config.key].slice(0, 4);
  return (
    <>
      {people.length > 0 && (
        <section className="l-section" id="verschil">
          <Display text={pg.gallery.title} as="h2" small />
          <p className="sub">{pg.gallery.text}</p>
          <div className="gallery">
            {people.map((p) => (
              <figure key={p.src} className="split">
                <div className="split-frame">
                  <Drape photo={p.src} face={{ ...p.face, mirrored: false }} color={p.good} fit={{ w: 0.4, cy: 0.38 }} />
                  <div className="split-left">
                    <Drape photo={p.src} face={{ ...p.face, mirrored: false }} color={p.bad} fit={{ w: 0.4, cy: 0.38 }} />
                  </div>
                  <span className="split-line" aria-hidden="true" />
                </div>
                <figcaption>
                  <span className="bad">✕ {nameForHex(p.bad, config.key) ?? copy.landing.hero.bad}</span>
                  <span className="good">✓ {nameForHex(p.good, config.key) ?? copy.landing.hero.good}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="ai-label center">Voorbeelden · beelden gemaakt met AI, kleurdoeken gekozen door onze analyse</p>
        </section>
      )}

      <section className="l-section" id="hoe">
        <Display text={pg.how.title} as="h2" small />
        <ol className="steps">
          {pg.how.steps.map(([title, text], i) => (
            <li key={title}>
              <span className="step-n">{i + 1}</span>
              <b>{title}</b>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="l-section" id="gids">
        <Display text={pg.compare.title} as="h2" small />
        <p className="sub">{copy.result.lockedWhy}</p>
        <div className="compare-table" role="table" aria-label={`${pg.compare.free} of ${pg.compare.paid}`}>
          <div className="ct-row ct-head" role="row">
            <span role="columnheader" />
            <span role="columnheader">{pg.compare.free}</span>
            <span role="columnheader">{pg.compare.paid}<small>vanaf €6,99</small></span>
          </div>
          {pg.compare.rows.map(([label, free, paid]) => (
            <div className="ct-row" role="row" key={label}>
              <span role="cell">{label}</span>
              <span role="cell" aria-label={free ? "ja" : "nee"}>{free ? <CheckIcon /> : "—"}</span>
              <span role="cell" aria-label={paid ? "ja" : "nee"}>{paid ? <CheckIcon /> : "—"}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="l-section">
        <Display text={pg.trust.title} as="h2" small />
        <div className="trust-grid">
          {pg.trust.items.map(([title, text]) => (
            <div key={title} className="trust-item">
              <b>{title}</b>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="l-section l-final">
        <Display text={pg.final.title} as="h2" />
        <button className="btn" onClick={onStart}>{pg.final.cta}</button>
      </section>
    </>
  );
}
