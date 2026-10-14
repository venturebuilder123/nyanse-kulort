"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BUDGETS } from "@/lib/brand/config";
import { track } from "@/lib/analytics";
import { EMPTY, loadAnswers, saveAnswers, type Answers } from "@/lib/flow/answers";
import { useBrand } from "../BrandProvider";
import { AppBar, Crumbs, Display } from "../ui";

export default function Style() {
  const { config, copy, ctx } = useBrand();
  const router = useRouter();
  const [a, setA] = useState<Answers>(EMPTY);

  useEffect(() => {
    setA(loadAnswers());
    // Warm up the face models (±8 MB) while people choose, so the selfie step starts fast.
    // Not on the landing: people who bounce there should not pay for the download.
    const warm = () => void import("@/lib/analysis/face/mediapipe").then((m) => m.loadVision()).catch(() => {});
    if ("requestIdleCallback" in window) requestIdleCallback(warm);
    else setTimeout(warm, 500);
  }, []);

  const update = (next: Answers) => {
    setA(next);
    saveAnswers(next);
  };
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);


  return (
    <main className="screen">
      <AppBar pill={copy.style.pill} />
      <Crumbs step={1} />
      <div className="pad">
        <Display text={copy.style.headline} as="h1" small />

        <section className="q" aria-labelledby="q-budget">
          <h2 id="q-budget">{copy.style.budgetQuestion}</h2>
          <div className="chips">
            {BUDGETS.map((b) => (
              <button key={b.key} aria-pressed={a.budget === b.key} onClick={() => update({ ...a, budget: b.key })}>
                {b.label}
              </button>
            ))}
          </div>
        </section>

        <section className="q" aria-labelledby="q-shops">
          <h2 id="q-shops">{copy.style.shopsQuestion}</h2>
          <p className="hint">{copy.style.shopsHint}</p>
          <div className="chips">
            {config.shops.map((s) => (
              <button key={s} aria-pressed={a.shops.includes(s)} onClick={() => update({ ...a, shops: toggle(a.shops, s) })}>
                {s}
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className="sticky">
        <button
          className="btn"
          onClick={() => {
            // budget is optional: without an answer we search the middle range
            track("style_done", ctx, { occasions: a.occasions, budget: a.budget ?? "none", shops: a.shops.length });
            router.push("/selfie");
          }}
        >
          {copy.style.next}
        </button>
        <button className="link-btn" onClick={() => router.push("/type")}>
          Ik ken mijn kleurprofiel al
        </button>
      </div>
    </main>
  );
}
