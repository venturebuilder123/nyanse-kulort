"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { labToHex } from "@/lib/color/convert";
import { FLOW } from "@/lib/i18n/flow";
import { colourName, scaleWord } from "@/lib/i18n/words";
import { clarityWord, depthWord, undertoneWord } from "@/lib/color/describe";
import { shadeLab, type Confirm, type Shade } from "@/lib/color/profile";
import { colorName, mostDifferent, paletteFor, showcase } from "@/lib/color/palette";
import { flowSession, type HairAnswer, type Jewel } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { AppBar, CheckIcon, Crumbs } from "../ui";

const STEP_MS = 1150;
const STEP_MS_REDUCED = 450;

// The analysis itself is done (it ran on the selfie screen). This screen turns the wait into
// value both ways: the person sees their own scales appear, and a few taps sharpen the result.
// The own check (founder, 21 Oct 2026): "we think this is your skin colour, right?" with one tint
// lighter and darker beside it, then eyes and hair. It corrects what the camera got wrong (white
// balance shifted by bright clothes, shadow on the eyes) before the season is chosen.
export default function Analyse() {
  const { config, copy, ctx, locale } = useBrand();
  const t = copy.analysis;
  const router = useRouter();
  const [r, setR] = useState<ReturnType<typeof flowSession.result>>(null);
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [hair, setHair] = useState<HairAnswer | null>(null);
  const [jewel, setJewel] = useState<Jewel | null>(null);
  const [confirm, setConfirm] = useState<Confirm>({});
  const leaving = useRef(false);

  useEffect(() => {
    setR(flowSession.result());
    setPhoto(flowSession.photoUrl());
    setLoaded(true);
  }, []);

  const drapes = useMemo(() => {
    if (!r) return [];
    const pal = paletteFor(r.profile, config.key);
    const good = showcase(pal, 2);
    const bad1 = mostDifferent(good[0]!, pal.avoid)!;
    const bad2 = mostDifferent(good[1]!, pal.avoid.filter((c) => c !== bad1)) ?? bad1;
    return [
      { c: bad1, ok: false },
      { c: good[0]!, ok: true },
      { c: bad2, ok: false },
      { c: good[1]!, ok: true },
    ];
  }, [r]);

  useEffect(() => {
    if (!r) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? STEP_MS_REDUCED : STEP_MS;
    const id = setInterval(() => setStep((s) => (s < drapes.length ? s + 1 : s)), ms);
    return () => clearInterval(id);
  }, [r, drapes.length]);

  const done = step >= drapes.length;
  const m = r?.measurements;
  // which own-check questions apply: eyes only when they were measured, hair only when natural or grey
  const asks = {
    skin: !!m?.skin && Number.isFinite(m.skin.lab.L),
    iris: !!m?.iris,
    hair: !!m?.hair && (hair === "natural" || hair === "grey"),
  };
  const pick = (part: keyof Confirm, s: Shade) => {
    const next = { ...confirm, [part]: s };
    setConfirm(next);
    flowSession.update({ confirm: next });
    // how often the measurement was off, per part: the accuracy signal from real use
    track("confirm_pick", ctx, { part, pick: s });
  };
  const needHairShade = asks.hair && !confirm.hair;
  const answered = (!asks.skin || !!confirm.skin) && (!asks.iris || !!confirm.iris) && !!hair && !needHairShade && !!jewel;

  const goOn = () => {
    if (leaving.current) return;
    leaving.current = true;
    router.replace("/resultaat"); // e-mail comes later: on the result and after payment
  };

  // Both questions answered and the drapes finished: continue without an extra tap.
  useEffect(() => {
    if (done && answered) {
      const id = setTimeout(goOn, 700);
      return () => clearTimeout(id);
    }
  }, [done, answered]);

  if (!loaded) return <main className="screen" />;
  if (!r) {
    return (
      <main className="screen">
        <div className="pad analysis"><p>{FLOW[locale].noAnalysis} <Link href="/selfie">{FLOW[locale].toSelfie}</Link></p></div>
      </main>
    );
  }

  const current = drapes[Math.min(step, drapes.length - 1)]!;
  const p = r.profile;
  const scales = [
    { label: t.scales.undertone, word: scaleWord(undertoneWord(p.undertone), locale) },
    { label: t.scales.depth, word: scaleWord(depthWord(p.depth), locale) },
    { label: t.scales.clarity, word: scaleWord(clarityWord(p.clarity), locale) },
  ];

  return (
    <main className="screen">
      <AppBar pill={t.pill} />
      <Crumbs step={3} />
      <div className="pad">
        <section className="scan">
          <p className="label-sm">{t.label}</p>
          <Drape photo={photo} face={r.face} color={current.c.hex} className="scan-face" />
          <p className={`verdict ${current.ok ? "is-ok" : "is-bad"}`} key={step} aria-live="polite">
            <b>{current.ok ? "✓" : "✗"} {colourName(colorName(current.c, config.key), locale)}</b>
            <span>{current.ok ? t.goodLines[Math.floor(step / 2) % t.goodLines.length] : t.badLines[Math.floor(step / 2) % t.badLines.length]}</span>
          </p>
        </section>

        <section className="quiz">
          <p className="quiz-title">{t.questionsTitle}</p>
          {asks.skin && !confirm.skin ? (
            <ShadeQuestion q={t.skinQ} hint={t.skinHint} labels={t.shade} swatch={(s) => labToHex(shadeLab(m!.skin.lab, "skin", s))} onPick={(s) => pick("skin", s)} />
          ) : asks.iris && !confirm.iris ? (
            <ShadeQuestion q={t.irisQ} hint={t.irisHint} labels={t.shade} round swatch={(s) => labToHex(shadeLab(m!.iris!.lab, "iris", s))} onPick={(s) => pick("iris", s)} />
          ) : !hair ? (
            <Question
              q={t.hairQ}
              options={t.hair}
              onPick={(v) => {
                setHair(v);
                flowSession.update({ hair: v });
              }}
            />
          ) : needHairShade ? (
            <ShadeQuestion q={t.hairShadeQ} hint={t.hairShadeHint} labels={t.shade} swatch={(s) => labToHex(shadeLab(m!.hair!.lab, "hair", s))} onPick={(s) => pick("hair", s)} />
          ) : !jewel ? (
            <Question
              q={t.jewelQ}
              options={t.jewel}
              onPick={(v) => {
                setJewel(v);
                flowSession.update({ jewel: v });
              }}
            />
          ) : (
            <p className="quiz-thanks"><CheckIcon /> {t.thanks}</p>
          )}
        </section>
        <ul className="scan-scales">
            {scales.map((s, i) => {
              const shown = step > i;
              return (
                <li key={s.label} className={shown ? "is-done" : step === i ? "is-busy" : ""}>
                  <span>{s.label}</span>
                  <b>{shown ? <><CheckIcon /> {s.word}</> : step === i ? "…" : ""}</b>
                </li>
              );
            })}
          </ul>
      </div>
      <div className="sticky">
        <button className="btn" disabled={!done} aria-busy={!done} onClick={goOn}>
          {done ? t.cta : t.waiting}
        </button>
      </div>
    </main>
  );
}

function Question<K extends string>({ q, options, onPick }: { q: string; options: Record<K, string>; onPick: (k: K) => void }) {
  return (
    <div className="q rise">
      <h2>{q}</h2>
      <div className="chips">
        {(Object.keys(options) as K[]).map((k) => (
          <button key={k} onClick={() => onPick(k)}>{options[k]}</button>
        ))}
      </div>
    </div>
  );
}

/** Our measured colour in the middle, one tint lighter and one darker beside it. */
function ShadeQuestion({ q, hint, labels, swatch, onPick, round }: { q: string; hint: string; labels: Record<Shade, string>; swatch: (s: Shade) => string; onPick: (s: Shade) => void; round?: boolean }) {
  const order: Shade[] = ["lighter", "match", "darker"];
  return (
    <div className="q rise">
      <h2>{q}</h2>
      <p className="q-hint">{hint}</p>
      <div className={`shades${round ? " is-round" : ""}`}>
        {order.map((s) => (
          <button key={s} className={s === "match" ? "is-ours" : ""} onClick={() => onPick(s)}>
            <i style={{ background: swatch(s) }} aria-hidden="true" />
            <span>{labels[s]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
