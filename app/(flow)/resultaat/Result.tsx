"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SEASON_TEXT_NL } from "@/lib/brand/common";
import type { WhyBlock } from "@/lib/brand/types";
import { clarityWord, depthWord, familyOf, undertoneWord } from "@/lib/color/describe";
import { colorName, mostDifferent, paletteFor, showcase } from "@/lib/color/palette";
import { SEASONS } from "@/lib/color/seasons";
import { track } from "@/lib/analytics";
import { euro, PRICES, type Tier } from "@/lib/flow/pricing";
import { flowSession } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { Pass } from "../Hero";
import { AppBar } from "../ui";

export default function Result() {
  const { config, copy, ctx } = useBrand();
  const t = copy.result;
  const [r, setR] = useState<ReturnType<typeof flowSession.result>>(null);
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier>("card");
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    setR(flowSession.result());
    setPhoto(flowSession.photoUrl());
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (r) track("paywall_view", ctx, { season: r.profile.match.season, confidence: Number(r.profile.confidence.overall.toFixed(2)) });
  }, [r]);

  const pal = useMemo(() => (r ? paletteFor(r.profile) : null), [r]);
  if (!loaded) return <main className="screen" />;
  if (!r || !pal) return <main className="screen"><div className="pad"><p>Nog geen analyse. <Link href="/selfie">Naar de selfie</Link></p></div></main>;

  const p = r.profile;
  const family = familyOf(p.match.season);
  const secondFamily = familyOf(p.match.second);
  const six = showcase(pal);
  const bad = six[0] ? mostDifferent(six[0], pal.avoid) : undefined;
  const name = (c: (typeof six)[number]) => colorName(c, config.key);

  return (
    <main className="screen">
      <AppBar pill={t.pill} />
      <section className="r-hero">
        <p className="label-sm">{t.label}</p>
        <h1 className="disp r-family">{family}</h1>
        {p.match.border && secondFamily !== family && (
          <p className="r-between">{t.between.replace("{a}", family).replace("{b}", secondFamily)}</p>
        )}
        <span className="r-swatches" aria-hidden="true">{six.map((c) => <i key={c.id} style={{ background: c.hex }} />)}</span>
        <p className="r-desc">{SEASON_TEXT_NL[p.match.season]}</p>
      </section>

      <div className="pad">
        {r.lowConfidence && (
          <div className="notice">
            <span>{t.lowConfidence}</span>
            <Link href="/selfie" className="notice-link">{t.lowConfidenceCta} →</Link>
          </div>
        )}

        {photo && bad && six[0] && <BeforeAfter photo={photo} face={r.face} bad={bad.hex} good={six[0].hex} badName={name(bad)} goodName={name(six[0])} title={t.baTitle} hint={t.baHint} />}

        <section className="q">
          <h2>{t.colorsTitle}</h2>
          <div className="palette6">
            {six.map((c) => (
              <div key={c.id} className="chip">
                <i style={{ background: c.hex }} />
                <div><b>{name(c)}</b><code>{c.hex}</code></div>
              </div>
            ))}
          </div>
        </section>

        <section className="q">
          <h2>{t.scalesTitle}</h2>
          <div className="r-scales">
            <ScaleBar label={copy.analysis.scales.undertone} word={undertoneWord(p.undertone)} value={(p.undertone + 1) / 2} left="koel" right="warm" />
            <ScaleBar label={copy.analysis.scales.depth} word={depthWord(p.depth)} value={p.depth} left="licht" right="diep" />
            <ScaleBar label={copy.analysis.scales.clarity} word={clarityWord(p.clarity)} value={p.clarity} left="zacht" right="helder" />
          </div>
        </section>

        <section className="q">
          <h2>{t.avoidTitle}</h2>
          <div className="avoid">{pal.avoid.slice(0, 3).map((c) => <span key={c.id}><i style={{ background: c.hex }} />{name(c)}</span>)}</div>
          <p className="small muted">{t.avoidText}</p>
        </section>

        <section className="q">
          <h2>{t.lockedTitle}</h2>
          <div className="locked">
            <Pass season={SEASONS[p.match.season].name} blurSeason colors={pal.colors.map((c) => c.hex)} />
            <p className="small"><b>{t.lockedSubtype}:</b> <span className="blur-text">{SEASONS[p.match.season].name}</span>, en nog 24 kleuren.</p>
          </div>
        </section>

        <Why block={t.why} brandName={config.name} />

        <section className="q">
          <h2>{t.tiersTitle}</h2>
          <div className="tiers">
            {(["card", "digital"] as const).map((k) => {
              const tt = t.tiers[k];
              return (
                <button
                  key={k}
                  className="tier"
                  aria-pressed={tier === k}
                  onClick={() => { setTier(k); track("tier_select", ctx, { tier: k }); }}
                >
                  {"badge" in tt && <span className="badge">{tt.badge}</span>}
                  <span className="tier-head"><b>{tt.name}</b><span>{euro(PRICES[k])}</span></span>
                  <ul>{tt.features.map((f) => <li key={f}>{f}</li>)}</ul>
                </button>
              );
            })}
          </div>
          <p className="fine">{t.fine}</p>
        </section>
      </div>

      <div className="sticky">
        <button className="btn" onClick={() => { setCheckout(true); track("checkout_open", ctx, { tier }); }}>
          {t.cta} {t.tiers[tier].name.toLowerCase()} · {euro(PRICES[tier])}
        </button>
      </div>

      {checkout && (
        <div className="sheet-back" onClick={() => setCheckout(false)}>
          <div className="sheet" role="dialog" aria-label="Afrekenen" onClick={(e) => e.stopPropagation()}>
            <div className="grab" />
            <div className="line"><span>{t.tiers[tier].name}</span><b>{euro(PRICES[tier])}</b></div>
            <p className="notice">Testversie: betalen staat nog uit. Hier komen Apple Pay, Google Pay, iDEAL | Wero, PayPal en kaart (Mollie).</p>
            <button className="link-btn" onClick={() => setCheckout(false)}>Sluiten</button>
          </div>
        </div>
      )}
    </main>
  );
}

function ScaleBar({ label, word, value, left, right }: { label: string; word: string; value: number; left: string; right: string }) {
  return (
    <div className="scalebar">
      <div className="scalebar-head"><span>{label}</span><b>{word}</b></div>
      <div className="scalebar-track"><i style={{ left: `${Math.max(2, Math.min(98, value * 100))}%` }} /></div>
      <div className="scalebar-ends"><span>{left}</span><span>{right}</span></div>
    </div>
  );
}

function BeforeAfter(props: { photo: string; face?: Parameters<typeof Drape>[0]["face"]; bad: string; good: string; badName: string; goodName: string; title: string; hint: string }) {
  const [pos, setPos] = useState(50);
  return (
    <section className="q">
      <h2>{props.title}</h2>
      <div className="ba">
        <Drape photo={props.photo} face={props.face} color={props.good} />
        <div className="ba-top" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Drape photo={props.photo} face={props.face} color={props.bad} />
        </div>
        <span className="ba-divider" style={{ left: `${pos}%` }} />
        <span className="ba-tag l">✗ {props.badName}</span>
        <span className="ba-tag r">✓ {props.goodName}</span>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label={props.hint} className="ba-range" />
    </section>
  );
}

function Why({ block, brandName }: { block: WhyBlock; brandName: string }) {
  if (block.kind === "impression") {
    return (
      <section className="q">
        <h2>{block.title}</h2>
        <div className="impress">
          <span className="label-sm">{block.label}</span>
          <span className="big">{block.big}</span>
          <span>{block.text}</span>
          <span className="src">{block.source}</span>
        </div>
      </section>
    );
  }
  if (block.kind === "compare") {
    return (
      <section className="q">
        <h2>{block.title}</h2>
        <div className="compare">
          <div className="them"><b>{block.them[0]}</b><span>{block.them[1]}</span></div>
          <div className="us"><b>{block.us[0] || brandName}</b><span>{block.us[1]}</span></div>
        </div>
      </section>
    );
  }
  return (
    <section className="q">
      <h2>{block.title}</h2>
      <div className="bon">
        <span className="h">{block.head}</span>
        {block.lines.map(([a, b]) => <div key={a} className="r"><span>{a}</span><span>{b}</span></div>)}
        <div className="r tot"><span>{block.total[0]}</span><span>{block.total[1]}</span></div>
      </div>
    </section>
  );
}
