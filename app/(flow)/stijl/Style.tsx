"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BUDGETS, OCCASIONS } from "@/lib/brand/config";
import { track } from "@/lib/analytics";
import { EMPTY, loadAnswers, saveAnswers, type Answers } from "@/lib/flow/answers";
import { useBrand } from "../BrandProvider";
import { AppBar, Crumbs, Display } from "../ui";

export default function Style() {
  const { config, copy, ctx } = useBrand();
  const router = useRouter();
  const [a, setA] = useState<Answers>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setA(loadAnswers());
    setReady(true);
  }, []);

  const update = (next: Answers) => {
    setA(next);
    saveAnswers(next);
  };
  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const canContinue = a.occasions.length > 0 && !!a.budget;

  return (
    <main className="screen">
      <AppBar pill={copy.style.pill} />
      <Crumbs step={1} />
      <div className="pad" style={{ visibility: ready ? "visible" : "hidden" }}>
        <Display text={copy.style.headline} as="h1" small />

        <section className="q" aria-labelledby="q-occ">
          <h2 id="q-occ">{copy.style.occasionQuestion}</h2>
          <div className="chips">
            {OCCASIONS.map((o) => (
              <button key={o.key} aria-pressed={a.occasions.includes(o.key)} onClick={() => update({ ...a, occasions: toggle(a.occasions, o.key) })}>
                {o.label}
              </button>
            ))}
          </div>
        </section>

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
          disabled={!canContinue}
          onClick={() => {
            track("style_done", ctx, { occasions: a.occasions, budget: a.budget, shops: a.shops.length });
            router.push("/selfie");
          }}
        >
          {copy.style.next}
        </button>
      </div>
    </main>
  );
}
