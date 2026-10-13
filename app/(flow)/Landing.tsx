"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OCCASIONS } from "@/lib/brand/config";
import type { OccasionKey } from "@/lib/brand/types";
import { track } from "@/lib/analytics";
import { decodeToken, EMPTY, loadAnswers, saveAnswers, type Answers } from "@/lib/flow/answers";
import { switchUrl } from "@/lib/flow/switch";
import { useBrand } from "./BrandProvider";
import { Hero } from "./Hero";
import { AppBar, CheckIcon, Display, Footer, LockIcon, OccasionIcon } from "./ui";

export default function Landing() {
  const { config, copy, ctx } = useBrand();
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [switchHref, setSwitchHref] = useState(`/?brand=${config.other}`);

  useEffect(() => {
    // Answers carried over from the other brand arrive as a short-lived token.
    const params = new URLSearchParams(location.search);
    const token = params.get("t");
    let a = loadAnswers();
    if (token) {
      a = decodeToken(token) ?? a;
      saveAnswers(a);
      params.delete("t");
      params.delete("brand");
      const qs = params.toString();
      history.replaceState(null, "", location.pathname + (qs ? `?${qs}` : ""));
    }
    setAnswers(a);
    track("landing_view", ctx, { carried: !!token });
  }, []);

  useEffect(() => setSwitchHref(switchUrl(config.key, answers, location)), [answers, config.key]);

  function pick(k: OccasionKey) {
    const next = { ...answers, occasions: [k, ...answers.occasions.filter((o) => o !== k)] };
    saveAnswers(next);
    track("occasion_pick", ctx, { occasion: k });
    router.push("/stijl");
  }

  return (
    <main className="screen">
      <AppBar pill={copy.landing.pill} />
      <div className="pad landing">
        <p className="eyebrow">{copy.landing.eyebrow}</p>
        <Display text={copy.landing.headline} />
        <p className="sub">{copy.landing.sub}</p>
        {/* Pipeline A keeps the photo on the device, so this claim is true (CLAUDE.md §5). */}
        <p className="trust-main"><LockIcon />{copy.landing.trustMain}</p>
        <Hero />

        <section className="q" aria-labelledby="occ-q">
          <h2 id="occ-q">{copy.landing.occasionQuestion}</h2>
          <div className="tiles">
            {OCCASIONS.map((o) => (
              <button key={o.key} className="tile" aria-pressed={answers.occasions[0] === o.key} onClick={() => pick(o.key)}>
                <OccasionIcon k={o.key} />
                {o.label}
              </button>
            ))}
          </div>
          <p className="trustrow">
            {copy.landing.trustSmall.map((t) => <span key={t}><CheckIcon />{t}</span>)}
          </p>
        </section>

        <section className="gets" aria-label="Wat je krijgt">
          <div><b className="label-sm">{copy.landing.free.title}</b><p>{copy.landing.free.text}</p></div>
          <div><b className="label-sm">{copy.landing.paid.title}</b><p>{copy.landing.paid.text}</p></div>
        </section>

        <p className="switch">
          {config.switchLabel}?{" "}
          <a href={switchHref} onClick={() => track("brand_switch", ctx, { to: config.other })}>
            {config.other === "nyanse" ? "NYANSE" : "KULØRT"} →
          </a>
        </p>
      </div>
      <Footer />
    </main>
  );
}
