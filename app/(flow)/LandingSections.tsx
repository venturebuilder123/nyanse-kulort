"use client";

import { profileForSeason } from "@/lib/color/declared";
import type { SeasonKey } from "@/lib/color/seasons";
import { PRICES, euro } from "@/lib/flow/pricing";
import { buildGuide } from "@/lib/guide/build";
import { guideEn } from "@/lib/guide/en";
import { FLOW } from "@/lib/i18n/flow";
import { garmentName } from "@/lib/i18n/words";
import { useBrand } from "./BrandProvider";
import { DrapeMirror } from "./DrapeMirror";
import { FlatLay } from "./Flats";
import { Display } from "./ui";

// an example look per brand, so the page shows real clothes in a real palette
const EXAMPLE: Record<"kulort" | "nyanse", SeasonKey> = { kulort: "deepAutumn", nyanse: "softSummer" };
const GET_IMAGES = ["/brand/ads/note-to-self.jpg", "/brand/ads/workbook.jpg", "/brand/ads/best-fit.jpg"];

/**
 * The brand landing's story (docs/brand/BRANDBOOK.md §2–§3): recognise the problem, see the
 * difference, know what you get and what it costs, then one clear next step.
 */
export function LandingSections({ onStart }: { onStart: () => void }) {
  const { config, copy, segment, locale } = useBrand();
  const L = FLOW[locale].sections;
  const st = copy.story;
  const pg = copy.page;
  const guide = locale === "en" ? guideEn(buildGuide(profileForSeason(EXAMPLE[config.key]), config.key)) : buildGuide(profileForSeason(EXAMPLE[config.key]), config.key);
  // NYANSE: a softer weekend look (top, skirt, loafers, scarf); KULØRT: the work look
  const cols = guide.groups.flatMap((gr) => gr.colors);
  const look =
    config.key === "nyanse"
      ? {
          title: "Weekend",
          pieces: [
            { item: "Top", color: cols.find((c) => /roze|mauve|rozen/i.test(c.name)) ?? cols[0]! },
            { item: "Rok", color: guide.capsule.find((c) => c.item === "Pantalon")?.color ?? cols[1]! },
            { item: "Schoenen", color: guide.accessories.find((a) => a.title.includes("schoenen"))?.swatches[0] ?? cols[3]! },
          ],
          extras: [{ item: "Sjaal", color: cols.find((c) => /salie|zeegroen|grijsgroen/i.test(c.name)) ?? cols[2]! }],
        }
      : guide.combos[0]!;
  const proof = config.key === "kulort" ? "/brand/ads/proof-men.jpg" : "/brand/ads/proof-women.jpg";

  return (
    <>
      {/* 1. recognise the problem */}
      <section className="l-section l-pains" id="herken">
        <Display text={st.pains.title} as="h2" small />
        <ol className="pains">
          {st.pains.items.map(([title, text], i) => (
            <li key={title}>
              <span className="pain-n">0{i + 1}</span>
              <b>{title}</b>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 2. the difference */}
      <section className="l-section l-proof" id="verschil">
        <div className="l-proof-head">
          <Display text={st.proof.title} as="h2" small />
          <p className="sub">{st.proof.text}</p>
        </div>
        <figure className="l-proof-img">
          <img src={proof} alt={L.proofAlt(config.key === "kulort")} width={1200} height={1200} loading="lazy" />
          <figcaption>{L.proofCap}</figcaption>
        </figure>
        <p className="eyebrow-h l-try">{L.try}</p>
        <DrapeMirror brand={config.key} segment={segment} />
      </section>

      {/* 3. what you get */}
      <section className="l-section l-gets" id="gids">
        <Display text={st.gets.title} as="h2" small />
        <div className="gets">
          {st.gets.items.map(([title, text], i) => (
            <article key={title} className="get">
              <img src={GET_IMAGES[i]} alt="" width={1200} height={900} loading="lazy" />
              <span className="get-n">{i === 0 ? L.free : i === 1 ? L.from(euro(PRICES.digital, locale)) : L.withCard(euro(PRICES.card, locale))}</span>
              <b>{title}</b>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="l-look">
          <div>
            <p className="eyebrow-h">{L.fromGuide(look.title.toLowerCase())}</p>
            <p className="l-look-text">{L.lookText}</p>
            <ul className="r-look-list">{[...look.pieces, ...look.extras].map((p) => <li key={p.item + p.color.hex}><i style={{ background: p.color.hex }} />{garmentName(p.item, locale)} · {p.color.name}</li>)}</ul>
          </div>
          <FlatLay pieces={look.pieces} extras={look.extras} brand={config.key} className="l-look-lay" />
        </div>
      </section>

      {/* 4. how it works */}
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

      {/* 5. the next step */}
      <section className="l-section l-final">
        <img src={config.key === "kulort" ? "/brand/editorial/maison-door-kulort.jpg" : "/brand/ads/right-choice.jpg"} alt="" width={1200} height={1490} loading="lazy" />
        <div>
          <Display text={st.final} as="h2" />
          <p className="sub">{L.final(euro(PRICES.digital, locale), euro(PRICES.card, locale))}</p>
          <button className="btn" onClick={onStart}>{pg.final.cta}</button>
        </div>
      </section>
    </>
  );
}
