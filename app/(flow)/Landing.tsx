"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OCCASIONS } from "@/lib/brand/config";
import type { OccasionKey } from "@/lib/brand/types";
import { track } from "@/lib/analytics";
import { SEASONS } from "@/lib/color/seasons";
import { decodeToken, EMPTY, loadAnswers, saveAnswers, type Answers } from "@/lib/flow/answers";
import { journey, resumeFor, type Resume } from "@/lib/flow/journey";
import { invite } from "@/lib/flow/referral";
import { flowSession } from "@/lib/flow/session";
import { switchUrl } from "@/lib/flow/switch";
import { useBrand, useT } from "./BrandProvider";
import { LandingSections } from "./LandingSections";
import { AppBar, CheckIcon, Display, Footer, HouseMark, OccasionIcon } from "./ui";
import { LangSwitch } from "./Lang";

export default function Landing() {
  const { config, copy, ctx, segment } = useBrand();
  const t = useT();
  const rt = copy.retention;
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [switchHref, setSwitchHref] = useState(`/?brand=${config.other}`);
  // returning visitor: progress and profile are stored on this device (CLAUDE.md §5)
  const [resume, setResume] = useState<{ r: Resume; type?: string } | null>(null);
  // invited by a friend (?ref=): only shown when there really is a valid code
  const [invited, setInvited] = useState<{ friend?: string } | null>(null);

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
    const res = resumeFor(journey.get(), !!prev, !!prev?.paid, Date.now());
    // opened from the home screen with a guide: straight into the guide
    if (res?.kind === "guide" && params.get("utm_source") === "homescreen") return router.replace("/gids");
    if (res) {
      setResume({ r: res, type: prev ? SEASONS[prev.profile.match.season].name : undefined });
      track("resume_shown", ctx, { kind: res.kind });
    }
    const ref = invite.capture(location.search);
    if (ref && !prev?.paid) {
      setInvited({ friend: ref.friend });
      track("invite_view", ctx, { named: !!ref.friend });
    }
    track("landing_view", ctx, { carried: !!token, returning: !!prev, invited: !!ref });
  }, []);

  useEffect(() => setSwitchHref(switchUrl(config.key, answers, location)), [answers, config.key]);

  // several occasions can be picked; each one comes back later as a look (BRANDBOOK §3.1)
  function pick(k: OccasionKey) {
    const has = answers.occasions.includes(k);
    const next = { ...answers, occasions: has ? answers.occasions.filter((o) => o !== k) : [...answers.occasions, k] };
    setAnswers(next);
    saveAnswers(next);
    if (!has) track("occasion_pick", ctx, { occasion: k });
  }
  const goOn = () => router.push("/stijl");

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
      <AppBar />
      {/* large screens: a real top navigation instead of the app bar pill */}
      <nav className="topnav" aria-label="Hoofdmenu">
        <HouseMark />
        <div className="topnav-links">
          <a href="#hoe">{copy.page.nav.how}</a>
          <a href="#gids">{copy.page.nav.prices}</a>
          <span className="muted">{t.switchTo[config.key === "kulort" ? "nyanse" : "kulort"]}? {switchLink}</span>
          <LangSwitch />
          <button className="btn btn-sm" onClick={startHere}>{copy.page.nav.start}</button>
        </div>
      </nav>

      <div className="pad landing">
        {invited && !resume && (
          <p className="invite">{invited.friend ? rt.invited.replace("{naam}", invited.friend) : rt.invitedAnon}</p>
        )}

        {resume && (
          <section className="welcome" aria-live="polite">
            {resume.r.kind === "continue" ? (
              <>
                <p className="welcome-title">{rt.resumeTitle}</p>
                <p className="welcome-text">{rt.resumeText.replace("{n}", String(resume.r.stepsLeft)).replace("{s}", String(resume.r.seconds))}</p>
                <button className="btn" onClick={() => { track("resume_click", ctx, { kind: "continue" }); router.push((resume.r as { href: string }).href); }}>{rt.resumeCta}</button>
              </>
            ) : (
              <>
                <p className="welcome-title">{rt.greet.replace("{type}", resume.type ?? "")}</p>
                <p className="welcome-text">{resume.r.kind === "guide" ? rt.guideText : rt.resultText}</p>
                <div className="row-2">
                  <button className="btn" onClick={() => { track("resume_click", ctx, { kind: resume.r.kind }); router.push(resume.r.kind === "guide" ? "/gids" : "/resultaat"); }}>
                    {resume.r.kind === "guide" ? "Open mijn stijlgids" : copy.result.seeColors}
                  </button>
                  {resume.r.kind === "result" && (
                    <button className="link-btn" onClick={() => { flowSession.clear(); journey.clear(); setResume(null); }}>{copy.result.startOver}</button>
                  )}
                </div>
              </>
            )}
          </section>
        )}

        <div className="l-hero">
          <div className="l-copy">
            <p className="eyebrow">{copy.landing.eyebrow}</p>
            <Display text={copy.landing.headline} />
            <p className="sub">{copy.landing.sub}</p>
          </div>
          <figure className="l-visual l-photo">
            <img
              src={segment ? `/brand/editorial/${config.key}-${segment}-campagne-1.jpg` : copy.story.image}
              alt={copy.story.imageAlt}
              width={1200}
              height={1490}
              fetchPriority="high"
            />
          </figure>
          <section className="l-tap q" aria-labelledby="occ-q">
            <h2 id="occ-q">{copy.landing.occasionQuestion}</h2>
            <div className="tiles">
              {OCCASIONS.map((o) => (
                <button key={o.key} className="tile" aria-pressed={answers.occasions.includes(o.key)} onClick={() => pick(o.key)}>
                  <OccasionIcon k={o.key} />
                  {o.label}
                </button>
              ))}
            </div>
            <button className="btn l-next" disabled={!answers.occasions.length} onClick={goOn}>
              {answers.occasions.length ? "Verder" : "Kies één of meer"}
            </button>
            <Link className="known-link" href="/type">Ken je je kleurtype al? Kies het en ga direct naar je stijlgids →</Link>
            <p className="trustrow">
              {copy.landing.trustSmall.map((t) => <span key={t}><CheckIcon />{t}</span>)}
            </p>
          </section>
        </div>

        <LandingSections onStart={startHere} />

        <p className="switch">{t.switchTo[config.key === "kulort" ? "nyanse" : "kulort"]}? {switchLink}</p>
      </div>
      <Footer />
    </main>
  );
}
