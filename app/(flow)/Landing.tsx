"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OCCASIONS } from "@/lib/brand/config";
import type { OccasionKey } from "@/lib/brand/types";
import { track } from "@/lib/analytics";
import { familyOf } from "@/lib/color/describe";
import { decodeToken, EMPTY, loadAnswers, saveAnswers, type Answers } from "@/lib/flow/answers";
import { flowSession } from "@/lib/flow/session";
import { switchUrl } from "@/lib/flow/switch";
import { useBrand } from "./BrandProvider";
import { Hero } from "./Hero";
import { LandingSections } from "./LandingSections";
import { AppBar, CheckIcon, Display, Footer, LockIcon, OccasionIcon, Wordmark } from "./ui";

export default function Landing() {
  const { config, copy, ctx } = useBrand();
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [switchHref, setSwitchHref] = useState(`/?brand=${config.other}`);
  // returning visitor: the profile is stored on this device (CLAUDE.md §5)
  const [returning, setReturning] = useState<string | null>(null);

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
    const prev = flowSession.result();
    if (prev) setReturning(familyOf(prev.profile.match.season));
    track("landing_view", ctx, { carried: !!token, returning: !!prev });
  }, []);

  useEffect(() => setSwitchHref(switchUrl(config.key, answers, location)), [answers, config.key]);

  function pick(k: OccasionKey) {
    const next = { ...answers, occasions: [k, ...answers.occasions.filter((o) => o !== k)] };
    saveAnswers(next);
    track("occasion_pick", ctx, { occasion: k });
    router.push("/stijl");
  }

  const startHere = () => {
    document.getElementById("occ-q")?.scrollIntoView({ behavior: "smooth", block: "center" });
    (document.querySelector(".tile") as HTMLButtonElement | null)?.focus({ preventScroll: true });
  };
  const switchLink = (
    <a href={switchHref} onClick={() => track("brand_switch", ctx, { to: config.other })}>
      {config.other === "nyanse" ? "NYANSE" : "KULØRT"} →
    </a>
  );

  return (
    <main className="screen landing-screen">
      <AppBar pill={copy.landing.pill} />
      {/* large screens: a real top navigation instead of the app bar pill */}
      <nav className="topnav" aria-label="Hoofdmenu">
        <Wordmark />
        <div className="topnav-links">
          <a href="#hoe">{copy.page.nav.how}</a>
          <a href="#gids">{copy.page.nav.prices}</a>
          <span className="muted">{config.switchLabel}? {switchLink}</span>
          <button className="btn btn-sm" onClick={startHere}>{copy.page.nav.start}</button>
        </div>
      </nav>

      <div className="pad landing">
        {returning && (
          <section className="welcome">
            <p>{copy.result.welcomeBack.replace("{familie}", returning)}</p>
            <div className="row-2">
              <button className="btn" onClick={() => router.push("/resultaat")}>{copy.result.seeColors}</button>
              <button className="link-btn" onClick={() => { flowSession.clear(); setReturning(null); }}>{copy.result.startOver}</button>
            </div>
          </section>
        )}

        <div className="l-hero">
          <div className="l-copy">
            <p className="eyebrow">{copy.landing.eyebrow}</p>
            <Display text={copy.landing.headline} />
            <p className="sub">{copy.landing.sub}</p>
            {/* Pipeline A keeps the photo on the device, so this claim is true (CLAUDE.md §5). */}
            <p className="trust-main"><LockIcon />{copy.landing.trustMain}</p>
          </div>
          <div className="l-visual"><Hero /></div>
          <section className="l-tap q" aria-labelledby="occ-q">
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
        </div>

        <LandingSections onStart={startHere} />

        <p className="switch">{config.switchLabel}? {switchLink}</p>
      </div>
      <Footer />
    </main>
  );
}
