"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { clarityWord, depthWord, undertoneWord } from "@/lib/color/describe";
import { colorName, mostDifferent, paletteFor, showcase } from "@/lib/color/palette";
import { flowSession, type HairAnswer, type Jewel } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { AppBar, CheckIcon, Crumbs } from "../ui";

const STEP_MS = 1150;
const STEP_MS_REDUCED = 450;

// The analysis itself is done (it ran on the selfie screen). This screen turns the wait into
// value both ways: the person sees their own scales appear, and two taps sharpen the result.
export default function Analyse() {
  const { config, copy } = useBrand();
  const t = copy.analysis;
  const router = useRouter();
  const [r, setR] = useState<ReturnType<typeof flowSession.result>>(null);
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [hair, setHair] = useState<HairAnswer | null>(null);
  const [jewel, setJewel] = useState<Jewel | null>(null);
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
  const answered = !!hair && !!jewel;

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
        <div className="pad analysis"><p>Nog geen analyse. <Link href="/selfie">Naar de selfie</Link></p></div>
      </main>
    );
  }

  const current = drapes[Math.min(step, drapes.length - 1)]!;
  const p = r.profile;
  const scales = [
    { label: t.scales.undertone, word: undertoneWord(p.undertone) },
    { label: t.scales.depth, word: depthWord(p.depth) },
    { label: t.scales.clarity, word: clarityWord(p.clarity) },
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
            <b>{current.ok ? "✓" : "✗"} {colorName(current.c, config.key)}</b>
            <span>{current.ok ? t.goodLines[Math.floor(step / 2) % t.goodLines.length] : t.badLines[Math.floor(step / 2) % t.badLines.length]}</span>
          </p>
        </section>

        <section className="quiz">
          <p className="quiz-title">{t.questionsTitle}</p>
          {!hair ? (
            <Question
              q={t.hairQ}
              options={t.hair}
              onPick={(v) => {
                setHair(v);
                flowSession.update({ hair: v });
              }}
            />
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
