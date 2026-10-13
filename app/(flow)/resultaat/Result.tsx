"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SEASON_TEXT_NL } from "@/lib/brand/common";
import { SEASONS } from "@/lib/color/seasons";
import type { WhyBlock } from "@/lib/brand/types";
import { clarityWord, depthWord, familyOf, undertoneWord } from "@/lib/color/describe";
import { hexToLab, labToLch } from "@/lib/color/convert";
import { LOW_CONFIDENCE } from "@/lib/color/profile";
import { colorName, mostDifferent, paletteFor, showcase } from "@/lib/color/palette";
import { track } from "@/lib/analytics";
import { euro, PRICES, type Tier } from "@/lib/flow/pricing";
import { suggestEmail } from "@/lib/flow/email";
import { forgetMe } from "@/lib/flow/forget";
import { FRIEND_DISCOUNT, invite } from "@/lib/flow/referral";
import { flowSession, type FaceBox } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { MiniPass } from "../Hero";
import { PEOPLE } from "@/lib/brand/people";
import { nameForHex } from "@/lib/color/palette";
import type { SeasonKey } from "@/lib/color/seasons";
import { loadAnswers } from "@/lib/flow/answers";
import { buildGuide } from "@/lib/guide/build";
import { FlatLay } from "../Flats";
import { AppBar, Footer } from "../ui";

export default function Result() {
  const { config, copy, ctx } = useBrand();
  const t = copy.result;
  const [r, setR] = useState<ReturnType<typeof flowSession.result>>(null);
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  // no pre-selected tier: the visitor chooses (ACM guidance on default options)
  const [tier, setTier] = useState<Tier | null>(null);
  const [showCta, setShowCta] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [waiver, setWaiver] = useState(false);
  const [country, setCountry] = useState("NL");
  const [hasEmail, setHasEmail] = useState(true);
  const [mail, setMail] = useState("");
  const [mailSaved, setMailSaved] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setR(flowSession.result());
    setPhoto(flowSession.photoUrl());
    try {
      setHasEmail(!!sessionStorage.getItem("nk_email"));
    } catch {
      setHasEmail(false);
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (r) track("paywall_view", ctx, { season: r.profile.match.season, confidence: Number(r.profile.confidence.overall.toFixed(2)) });
  }, [r]);

  // The sticky CTA appears only once the free value (photo + colours) has been seen,
  // so it never covers the before/after.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowCta(!!e && (e.isIntersecting || e.boundingClientRect.top < 0)));
    io.observe(el);
    return () => io.disconnect();
  }, [loaded]);

  // friend code from the invite link: €1 off, checked again server-side at payment (CLAUDE.md §2)
  const [ref, setRef] = useState<ReturnType<typeof invite.get>>(null);
  useEffect(() => setRef(invite.get()), []);
  const pay = (k: "card" | "digital") => PRICES[k] - (ref ? FRIEND_DISCOUNT : 0);

  const pal = useMemo(() => (r ? paletteFor(r.profile, config.key) : null), [r, config.key]);
  if (!loaded) return <main className="screen" />;
  if (!r || !pal) return <main className="screen"><div className="pad"><p>Nog geen analyse. <Link href="/selfie">Naar de selfie</Link></p></div></main>;

  const p = r.profile;
  const family = familyOf(p.match.season);
  // Recomputed with the latest answers (e.g. "Kaal" lifts the hair penalty), not the flag from the selfie.
  const low = p.confidence.overall < LOW_CONFIDENCE;
  const chroma = (hex: string) => labToLch(hexToLab(hex)).C;
  // Wingman: wearable anchors (navy, bordeaux) first, the loud colours last
  const six = config.key === "kulort" ? [...showcase(pal)].sort((a, b) => chroma(a.hex) - chroma(b.hex)) : showcase(pal);
  const bad = six[0] ? mostDifferent(six[0], pal.avoid) : undefined;
  const name = (c: (typeof six)[number]) => colorName(c, config.key);
  const ctaLabel = !tier ? t.ctaChoose : `${tier === "card" ? t.ctaCard : t.ctaDigital} · ${euro(PRICES[tier])}`;

  function onCta() {
    if (!tier) {
      tiersRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    track("checkout_open", ctx, { tier });
    setWaiver(false);
    dialog.current?.showModal();
  }

  return (
    <main className="screen">
      <AppBar pill={t.pill} />
      <section className="r-hero">
        <p className="label-sm">{t.label}{low && <span className="tag-soft">{t.provisional}</span>}</p>
        <h1 className="disp r-family">{family}</h1>
        {/* the precise type is free: it is googleable anyway; the guide sells what Google can't */}
        <p className="r-typename"><span>{t.typeLabel}</span><b>{SEASONS[p.match.season].name}</b></p>
        {p.match.border && <p className="r-between">{t.between.replace("{b}", SEASONS[p.match.second].name)}</p>}
        <span className="r-swatches" aria-hidden="true">{six.map((c) => <i key={c.id} style={{ background: c.hex }} />)}</span>
        <p className="r-desc">{SEASON_TEXT_NL[p.match.season]}</p>
      </section>

      <div className="pad result">
        {low && (
          <div className="stack-md">
            <p className="notice">{t.lowConfidence}</p>
            <Link href="/selfie" className="btn">{t.lowCta}</Link>
          </div>
        )}

        {photo && bad && six[0] ? (
          <BeforeAfter photo={photo} face={r.face} bad={bad.hex} good={six[0].hex} badName={name(bad)} goodName={name(six[0])} title={t.baTitle} hint={t.baHint} />
        ) : (
          // after a reload the photo is gone: it is never stored, not even on the phone
          <div className="notice">
            <span>{t.noPhoto}</span>
            <Link href="/selfie" className="notice-link">{t.newSelfie} →</Link>
          </div>
        )}

        {(() => {
          // the effect on someone from the same colour family (AI model, labelled)
          const model = PEOPLE[config.key].find((m) => familyOf(m.season as SeasonKey) === family);
          if (!model) return null;
          return (
            <section className="q">
              <h2 className="eyebrow-h">Ook een {family}</h2>
              <figure className="split">
                <div className="split-frame">
                  <Drape photo={model.src} face={{ ...model.face, mirrored: false }} color={model.good} fit={{ w: 0.4, cy: 0.38 }} />
                  <div className="split-left"><Drape photo={model.src} face={{ ...model.face, mirrored: false }} color={model.bad} fit={{ w: 0.4, cy: 0.38 }} /></div>
                  <span className="split-line" aria-hidden="true" />
                </div>
                <figcaption>
                  <span className="bad">✕ {nameForHex(model.bad, config.key)}</span>
                  <span className="good">✓ {nameForHex(model.good, config.key)}</span>
                </figcaption>
              </figure>
              <p className="ai-label">Voorbeeld · AI-model uit dezelfde kleurfamilie, kleuren gekozen door onze analyse</p>
            </section>
          );
        })()}

        <section className="q">
          <h2 className="eyebrow-h">{t.colorsTitle}</h2>
          <div className="palette6">
            {six.map((c) => (
              <div key={c.id} className="chip">
                <i style={{ background: c.hex }} />
                <b>{name(c)}</b>
              </div>
            ))}
          </div>
        </section>
        <div ref={sentinel} aria-hidden="true" />

        {(() => {
          // one free look, for the occasion picked on the landing; the other three are in the guide
          const occ = loadAnswers().occasions[0];
          const combos = buildGuide(p, config.key).combos;
          const look = combos.find((c) => c.occasion === (occ === "sport" ? "weekend" : occ)) ?? combos[0]!;
          return (
            <section className="q">
              <h2 className="eyebrow-h">Een look voor {look.title.toLowerCase()}, in jouw kleuren</h2>
              <FlatLay pieces={look.pieces} extras={look.extras} className="r-look" />
              <ul className="r-look-list">{[...look.pieces, ...look.extras].map((pc) => <li key={pc.item + pc.color.hex}><i style={{ background: pc.color.hex }} />{pc.item} · {pc.color.name}</li>)}</ul>
              <p className="small muted">{look.tip} Nog drie looks, je capsule-garderobe en je accessoires staan in je stijlgids.</p>
            </section>
          );
        })()}

        <section className="q">
          <h2 className="eyebrow-h">{t.avoidTitle}</h2>
          <div className="avoid">{pal.avoid.slice(0, 3).map((c) => <span key={c.id}><i style={{ background: c.hex }} />{name(c)}</span>)}</div>
          <p className="small muted">{t.avoidText}</p>
        </section>

        <section className="q">
          <h2 className="eyebrow-h">{t.scalesTitle}</h2>
          <div className="r-scales">
            <ScaleBar label={copy.analysis.scales.undertone} word={undertoneWord(p.undertone)} value={(p.undertone + 1) / 2} left="koel" right="warm" />
            <ScaleBar label={copy.analysis.scales.depth} word={depthWord(p.depth)} value={p.depth} left="licht" right="diep" />
            <ScaleBar label={copy.analysis.scales.clarity} word={clarityWord(p.clarity)} value={p.clarity} left="zacht" right="helder" />
          </div>
        </section>

        <section className="q">
          <h2 className="eyebrow-h">{t.lockedTitle}</h2>
          <p className="locked-why">{t.lockedWhy}</p>
          <div className="locked">
            <MiniPass />
            <ul className="locked-list">
              {t.lockedItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        {!hasEmail && (
          <section className="q">
            <h2 className="eyebrow-h">{t.mailTitle}</h2>
            {mailSaved ? (
              <p className="small">{t.mailDone.replace("{email}", mailSaved)}</p>
            ) : (
              <form
                className="row-inline"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  const v = (suggestEmail(mail) ?? mail).trim();
                  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)) return;
                  // TODO(phase B): Brevo double opt-in. Until then the address stays on this device.
                  try {
                    sessionStorage.setItem("nk_email", JSON.stringify({ email: v, optin: false }));
                  } catch {}
                  track("email_submit", ctx, { from: "result" });
                  setMailSaved(v);
                }}
              >
                <input type="email" inputMode="email" autoComplete="email" autoCapitalize="none" placeholder={copy.email.placeholder} value={mail} onChange={(e) => setMail(e.target.value)} aria-label={t.mailTitle} />
                <button className="btn" type="submit">{t.mailCta}</button>
              </form>
            )}
          </section>
        )}

        <Why block={t.why} />

        {r.paid ? (
          <section className="q">
            <Link className="btn" href="/gids">Open mijn stijlgids</Link>
          </section>
        ) : (
        <section className="q" ref={tiersRef} aria-labelledby="tiers-h">
          <h2 id="tiers-h" className="eyebrow-h">{t.tiersTitle}</h2>
          <div className="tiers" role="radiogroup" aria-labelledby="tiers-h">
            {(["card", "digital"] as const).map((k) => {
              const tt = t.tiers[k];
              return (
                <button
                  key={k}
                  role="radio"
                  aria-checked={tier === k}
                  className={`tier${k === "card" ? " is-rec" : ""}`}
                  onClick={() => { setTier(k); track("tier_select", ctx, { tier: k }); }}
                >
                  {"badge" in tt && <span className="badge">{tt.badge}</span>}
                  <span className="tier-head"><span className="radio" aria-hidden="true" /><b>{tt.name}</b><span className="price">{euro(PRICES[k])}</span></span>
                  <span className="tier-line">{tt.line}</span>
                  <ul>{tt.features.map((f) => <li key={f}>{f}</li>)}</ul>
                </button>
              );
            })}
          </div>
          {low && <p className="small muted">{t.lowTiersNote}</p>}
          <p className="fine">{t.fine}</p>
        </section>
        )}

        <button className="link-btn" onClick={() => { void forgetMe().then(() => router.replace("/")); }}>{t.deleteProfile}</button>
      </div>
      <Footer />

      {/* low confidence: the next step is a better selfie, not a purchase */}
      {!low && !r.paid && (
        <div className={`sticky sticky-float${showCta ? " is-on" : ""}`} aria-hidden={!showCta}>
          <button className="btn" onClick={onCta} tabIndex={showCta ? 0 : -1}>{ctaLabel}</button>
        </div>
      )}

      <dialog ref={dialog} className="sheet" aria-label="Afrekenen" onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}>
        {tier && (
          <div className="sheet-body">
            <div className="grab" />
            <div className="line"><span>{t.tiers[tier].name}</span><b>{euro(PRICES[tier])}</b></div>
            {ref && (
              <div className="line discount"><span>{copy.retention.friendLine} · {ref.code}</span><b>−{euro(FRIEND_DISCOUNT)}</b></div>
            )}
            {tier === "card" && (
              <>
                <div className="line muted"><span>{t.checkout.shipping}</span><span>{t.checkout.shippingWhen}</span></div>
                <fieldset className="address">
                  <legend>{t.checkout.address}</legend>
                  <input autoComplete="name" placeholder={t.checkout.name} aria-label={t.checkout.name} />
                  <input autoComplete="address-line1" placeholder={t.checkout.street} aria-label={t.checkout.street} />
                  <div className="row-inline">
                    <input autoComplete="postal-code" placeholder={t.checkout.postcode} aria-label={t.checkout.postcode} />
                    <input autoComplete="address-level2" placeholder={t.checkout.city} aria-label={t.checkout.city} />
                  </div>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label={t.checkout.country}>
                    <option value="NL">Nederland</option>
                    <option value="BE">België</option>
                    <option value="DE">Duitsland</option>
                    <option value="other">Ander land</option>
                  </select>
                  {country === "other" && <p className="small warn-text">{t.checkout.countryNote}</p>}
                </fieldset>
              </>
            )}
            <label className="check">
              <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)} />
              <span>{t.checkout.withdrawal}</span>
            </label>
            <button className="btn" disabled>{t.checkout.pay} · {euro(pay(tier))}</button>
            <p className="notice">{t.checkout.test}</p>
            <button className="link-btn" onClick={() => dialog.current?.close()}>{t.checkout.close}</button>
          </div>
        )}
      </dialog>
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

function BeforeAfter(props: { photo: string; face?: FaceBox; bad: string; good: string; badName: string; goodName: string; title: string; hint: string }) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const fit = { w: 0.44, cy: 0.36 }; // smaller, higher face: the cloth stays in view
  const move = (clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (r) setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <section className="q">
      <h2 className="eyebrow-h">{props.title}</h2>
      <div
        className="ba"
        ref={frame}
        onPointerDown={(e) => { (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => { if (e.buttons) move(e.clientX); }}
      >
        <Drape photo={props.photo} face={props.face} color={props.good} fit={fit} />
        <div className="ba-top" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Drape photo={props.photo} face={props.face} color={props.bad} fit={fit} />
        </div>
        <span className="ba-divider" style={{ left: `${pos}%` }}><span className="ba-handle" aria-hidden="true">‹ ›</span></span>
        <span className="ba-tag l">✕ {props.badName}</span>
        <span className="ba-tag r">✓ {props.goodName}</span>
      </div>
      <input type="range" min={4} max={96} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label={props.hint} className="ba-range" />
    </section>
  );
}

function Why({ block }: { block: WhyBlock }) {
  if (block.kind === "impression") {
    return (
      <section className="q">
        <h2 className="eyebrow-h">{block.title}</h2>
        <div className="impress">
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
        <h2 className="eyebrow-h">{block.title}</h2>
        <div className="compare">
          <div className="them"><b>{block.them[0]}</b><span>{block.them[1]}</span></div>
          <div className="us"><b>{block.us[0]}</b><span>{block.us[1]}</span></div>
        </div>
      </section>
    );
  }
  return (
    <section className="q">
      <h2 className="eyebrow-h">{block.title}</h2>
      <div className="bon">
        <span className="h">{block.head}</span>
        {block.lines.map(([a, b]) => <div key={a} className="r"><span>{a}</span><span>{b}</span></div>)}
        <div className="r tot"><span>{block.total[0]}</span><span>{block.total[1]}</span></div>
      </div>
    </section>
  );
}
