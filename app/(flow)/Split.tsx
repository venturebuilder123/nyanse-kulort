"use client";

import Link from "next/link";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

const NONE = { brand: "none", voice: "none" };

const DOORS = [
  {
    key: "kulort",
    label: "Voor hem",
    line: "Je eerste indruk, geregeld.",
    img: "/brand/editorial/maison-door-kulort.jpg",
    cta: "Start KULØRT",
  },
  {
    key: "nyanse",
    label: "Voor haar",
    line: "Minder kopen, beter kiezen.",
    img: "/brand/editorial/maison-door-nyanse.jpg",
    cta: "Start NYANSE",
  },
] as const;

const SEASONS = [
  { name: "Lente", line: "warm en helder", img: "/brand/seasons/family-lente.jpg" },
  { name: "Zomer", line: "koel en zacht", img: "/brand/seasons/family-zomer.jpg" },
  { name: "Herfst", line: "warm en diep", img: "/brand/seasons/family-herfst.jpg" },
  { name: "Winter", line: "koel en contrastrijk", img: "/brand/seasons/family-winter.jpg" },
];

/** KULØRT | NYANSE: the maison lock-up (docs/brand/BRANDBOOK.md §6). */
export function MaisonMark({ small }: { small?: boolean }) {
  return (
    <span className={`maison-mark${small ? " sm" : ""}`} role="img" aria-label="KULØRT en NYANSE">
      <span className="wordmark wm-kulort" aria-hidden="true">KUL<span className="wm-o">O</span>RT</span>
      <i aria-hidden="true" />
      <span className="wordmark wm-nyanse" aria-hidden="true">NYANSE</span>
    </span>
  );
}

// The home page of kulort-nyanse.com (decision 14 Oct 2026): first what it is, in one glance,
// then two doors. Ads skip this page via /kulort and /nyanse.
export default function Split() {
  useEffect(() => track("landing_view", NONE, { maison: true }), []);
  // a full page load (not <Link>), so the layout re-renders with the picked brand
  const door = (key: string) => () => track("brand_switch", NONE, { to: key, from: "maison" });

  return (
    <main className="maison">
      <header className="ms-top">
        <MaisonMark />
        <p>Atelier voor persoonlijke kleur</p>
      </header>

      <section className="ms-hero">
        <div className="ms-hero-copy">
          <p className="ms-eyebrow">Kleuranalyse uit één selfie</p>
          <h1 className="ms-h1">Je kleuren.<br /><em>Je kast. Je gids.</em></h1>
          <p className="ms-sub">
            Ontdek welke kleuren je staan, wat je beter laat hangen, en hoe je daar een kast van maakt die werkt.
            Met een stijlgids op naam en een kleurenpas voor in je portemonnee.
          </p>
          <ul className="ms-facts">
            <li>Kleurprofiel gratis</li>
            <li>Gids vanaf €6,99</li>
            <li>Je foto verlaat je telefoon niet</li>
          </ul>
          <div className="ms-doors-inline">
            <a className="ms-btn" href="/kulort" onClick={door("kulort")}>Voor hem · KULØRT</a>
            <a className="ms-btn" href="/nyanse" onClick={door("nyanse")}>Voor haar · NYANSE</a>
          </div>
        </div>
        <figure className="ms-hero-img">
          <img src="/brand/editorial/maison-hero-1.jpg" alt="Twee klanten in het atelier houden een stofstaal in hun kleur onder hun kin" width={1800} height={1208} fetchPriority="high" />
        </figure>
      </section>

      <section className="ms-doors" aria-label="Kies je atelier">
        {DOORS.map((d) => (
          <a key={d.key} className={`ms-door ms-door-${d.key}`} href={`/${d.key}`} onClick={door(d.key)}>
            <img src={d.img} alt="" width={1200} height={1490} loading="lazy" />
            <span className="ms-door-copy">
              <span className="ms-door-label">{d.label}</span>
              {d.key === "kulort" ? (
                <span className="wordmark wm-kulort">KUL<span className="wm-o">O</span>RT</span>
              ) : (
                <span className="wordmark wm-nyanse">NYANSE</span>
              )}
              <span className="ms-door-line">{d.line}</span>
              <span className="ms-door-cta">{d.cta} →</span>
            </span>
          </a>
        ))}
      </section>

      <section className="ms-how">
        <p className="ms-eyebrow">Zo werkt het</p>
        <h2 className="ms-h2">Drie stappen, <em>een leven lang plezier</em></h2>
        <ol>
          <li>
            <img src="/brand/editorial/nyanse-jv-campagne-1.jpg" alt="" width={1200} height={1490} loading="lazy" />
            <b>1 · Eén selfie</b>
            <span>Bij daglicht, in 30 seconden. De analyse draait op je telefoon.</span>
          </li>
          <li>
            <img src="/brand/seasons/season-softAutumn.jpg" alt="" width={900} height={1117} loading="lazy" />
            <b>2 · Je kleuren</b>
            <span>Je kleurtype, je beste kleuren en wat je beter laat hangen. Gratis.</span>
          </li>
          <li>
            <img src="/brand/product/envelope.jpg" alt="" width={1200} height={1490} loading="lazy" />
            <b>3 · Je gids en pas</b>
            <span>30 kleuren met naam, looks, je capsule-garderobe en een pas in de brievenbus.</span>
          </li>
        </ol>
      </section>

      <section className="ms-seasons">
        <p className="ms-eyebrow">Vier seizoenen, twaalf kleurtypen</p>
        <h2 className="ms-h2">Welk seizoen <em>ben jij?</em></h2>
        <div className="ms-season-row">
          {SEASONS.map((s) => (
            <figure key={s.name}>
              <img src={s.img} alt="" width={1000} height={1241} loading="lazy" />
              <figcaption><b>{s.name}</b><span>{s.line}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ms-gift">
        <img src="/brand/product/pass-front.jpg" alt="De kleurenpas met acht kleuren" width={1200} height={896} loading="lazy" />
        <div>
          <p className="ms-eyebrow">Het cadeau aan jezelf</p>
          <h2 className="ms-h2">Je kleuren altijd bij je, <em>ook in de paskamer</em></h2>
          <p className="ms-sub">Een stevige pas met je acht kernkleuren, in de brievenbus in Nederland, België en Duitsland.</p>
          <div className="ms-doors-inline">
            <a className="ms-btn" href="/kulort" onClick={door("kulort")}>Voor hem · KULØRT</a>
            <a className="ms-btn" href="/nyanse" onClick={door("nyanse")}>Voor haar · NYANSE</a>
          </div>
        </div>
      </section>

      <footer className="ms-foot">
        <MaisonMark small />
        <span>Mensen op deze pagina zijn gemaakt met AI</span>
        <span>Prijzen inclusief btw</span>
        <Link href="/privacy">Privacy</Link>
      </footer>
    </main>
  );
}
