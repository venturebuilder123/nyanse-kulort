"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { euro, PRICES } from "@/lib/flow/pricing";
import { LangSwitch } from "./Lang";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand, useT } from "./BrandProvider";

const NONE = { brand: "none", voice: "none" };

// The two doors are the hero: one tap and you are in the funnel (founder, 18 Oct: "de perfecte
// toegang tot de funnel"). Each door slowly cycles through its campaign photos, young to 45+.
const DOORS = [
  {
    key: "kulort",
    imgs: ["kulort-40-campagne-1", "kulort-jong-campagne-1", "kulort-vol-campagne-1", "kulort-jv-campagne-1"],
  },
  {
    key: "nyanse",
    imgs: ["nyanse-40-campagne-1", "nyanse-jong-campagne-1", "nyanse-vol-campagne-1", "nyanse-jv-campagne-1"],
  },
] as const;

const SEASONS = [
  { img: "/brand/seasons/family-lente.jpg" },
  { img: "/brand/seasons/family-zomer.jpg" },
  { img: "/brand/seasons/family-herfst.jpg" },
  { img: "/brand/seasons/family-winter.jpg" },
];

// the ribbon: real palette colours with their names, two of each season family
const RIBBON: [hex: string, nl: string, en: string][] = [
  ["#F3A27A", "Abrikoos", "Apricot"], ["#8FBF6A", "Lentegroen", "Spring green"], ["#AFC6E0", "Poederblauw", "Powder blue"], ["#B67C73", "Rozenhout", "Rosewood"],
  ["#7A8B6F", "Salie", "Sage"], ["#A0522D", "Siena", "Sienna"], ["#2F4F3A", "Bosgroen", "Forest green"], ["#C9A24A", "Oker", "Ochre"],
  ["#1B2A5C", "Navy", "Navy"], ["#0E7C5A", "Smaragd", "Emerald"], ["#9B1B30", "Robijn", "Ruby"], ["#6E1F2A", "Bordeaux", "Burgundy"],
  ["#E8C468", "Lichtgoud", "Light gold"], ["#3F6A6A", "Petrol", "Petrol"], ["#5E6A7A", "Leisteen", "Slate"], ["#B9926B", "Camel", "Camel"],
];


/** Elements with .mh-reveal fade up once when they scroll into view (still with reduced motion). */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(".mh-reveal")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** A door's photos, cross-fading every few seconds (paused off-screen and with reduced motion). */
// The effect, from the Gemini diptychs (wrong drape left, right drape right; colours from the engine).
const PROOF = [
  { src: "/brand/ads/proof-women.jpg", bad: ["#1F4FC4", "Koningsblauw", "Royal blue"], good: ["#3F6A6A", "Zacht petrol", "Soft teal"], alt: ["Dezelfde vrouw met een koningsblauwe en een zacht petrol doek", "The same woman in a royal blue and a soft teal drape"] },
  { src: "/brand/ads/proof-men.jpg", bad: ["#E2533A", "Tomaat", "Tomato"], good: ["#3A2A6B", "Indigo", "Indigo"], alt: ["Dezelfde man met een tomaatrode en een indigo doek", "The same man in a tomato red and an indigo drape"] },
] as const;

function DoorPhotos({ imgs, priority }: { imgs: readonly string[]; priority?: boolean }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; });
    if (ref.current) io.observe(ref.current);
    const t = window.setInterval(() => { if (visible && !document.hidden) setI((n) => (n + 1) % imgs.length); }, 4200);
    return () => { clearInterval(t); io.disconnect(); };
  }, [imgs.length]);
  return (
    <div className="mh-door-photos" ref={ref}>
      {imgs.map((src, n) => (
        <img
          key={src}
          src={`/brand/editorial/${src}.jpg`}
          alt=""
          width={1200}
          height={1490}
          className={n === i ? "is-on" : ""}
          loading={n === 0 && priority ? "eager" : "lazy"}
          fetchPriority={n === 0 && priority ? "high" : "auto"}
          decoding="async"
        />
      ))}
    </div>
  );
}

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

function Doors({ where, priority }: { where: string; priority?: boolean }) {
  const t = useT();
  // a full page load (not <Link>), so the layout re-renders with the picked brand
  const go = (key: string) => () => track("brand_switch", NONE, { to: key, from: `maison-${where}` });
  return (
    <div className="mh-doors">
      {DOORS.map((d) => (
        <a key={d.key} className={`mh-door mh-door-${d.key}`} href={`/${d.key}`} onClick={go(d.key)}>
          <DoorPhotos imgs={d.imgs} priority={priority} />
          <span className="mh-door-shade" aria-hidden="true" />
          <span className="mh-door-copy">
            <span className="mh-door-label">{t.home.doors[d.key][0]}</span>
            {d.key === "kulort" ? (
              <span className="wordmark wm-kulort">KUL<span className="wm-o">O</span>RT</span>
            ) : (
              <span className="wordmark wm-nyanse">NYANSE</span>
            )}
            <span className="mh-door-line">{t.home.doors[d.key][1]}</span>
            <span className="mh-door-cta">{t.home.begin} <span aria-hidden="true">→</span></span>
          </span>
        </a>
      ))}
    </div>
  );
}

// The home page of kulort-nyanse.com: the doors first, then why, how, what it costs. Ads skip this
// page via /kulort and /nyanse; this page is for people who arrive by name, search or Instagram.
export default function Split() {
  useEffect(() => track("landing_view", NONE, { maison: true }), []);
  useReveal();
  const t = useT();
  const h = t.home;
  const { locale } = useBrand();
  const price = (n: number) => euro(n, locale);

  return (
    <main className="mh">
      <header className="mh-top">
        <MaisonMark />
        <nav aria-label="Menu">
          <a href="#hoe">{t.nav.how}</a>
          <a href="#prijzen">{t.nav.prices}</a>
          <Link href="/kleuranalyse">{t.nav.colourAnalysis}</Link>
          <a className="mh-top-cta" href="#start">{t.nav.start}</a>
          <LangSwitch className="lang-top" />
        </nav>
      </header>

      <section className="mh-hero" id="start">
        <div className="mh-hero-copy">
          <p className="mh-eyebrow">{h.eyebrow}</p>
          <h1 className="mh-h1">{h.h1[0]} <em>{h.h1[1]}</em></h1>
          <p className="mh-sub">{h.sub}</p>
        </div>
        <Doors where="hero" priority />
        <ul className="mh-facts">
          {h.facts(price(PRICES.digital)).map((f) => <li key={f}>{f}</li>)}
        </ul>
      </section>

      <div className="mh-ribbon" aria-hidden="true">
        <div className="mh-ribbon-track">
          {[...RIBBON, ...RIBBON].map(([hex, nl, en], i) => (
            <span key={i}><i style={{ background: hex }} />{locale === "en" ? en : nl}</span>
          ))}
        </div>
      </div>

      <section className="mh-proof mh-reveal">
        <div className="mh-proof-copy">
          <p className="mh-eyebrow">{h.proof.eyebrow}</p>
          <h2 className="mh-h2">{h.proof.h2[0]} <em>{h.proof.h2[1]}</em></h2>
          <p className="mh-sub">{h.proof.text}</p>
        </div>
        <div className="mh-proof-pair">
          {PROOF.map((p) => (
            <figure key={p.src}>
              <img src={p.src} alt={locale === "en" ? p.alt[1] : p.alt[0]} width={1200} height={1200} loading="lazy" />
              <figcaption aria-hidden="true">
                <span><i style={{ background: p.bad[0] }} />✕ {locale === "en" ? p.bad[2] : p.bad[1]}</span>
                <span className="ok"><i style={{ background: p.good[0] }} />✓ {locale === "en" ? p.good[2] : p.good[1]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mh-how" id="hoe">
        <div className="mh-head mh-reveal">
          <p className="mh-eyebrow">{h.how.eyebrow}</p>
          <h2 className="mh-h2">{h.how.h2[0]} <em>{h.how.h2[1]}</em></h2>
        </div>
        <ol>
          {["/brand/ads/note-to-self.jpg", "/brand/seasons/season-softAutumn.jpg", "/brand/ads/workbook.jpg"].map((img, i) => (
            <li key={img} className="mh-reveal">
              <img src={img} alt="" loading="lazy" />
              <span className="mh-n">0{i + 1}</span>
              <b>{h.how.steps[i]![0]}</b>
              <span>{h.how.steps[i]![1]}</span>
            </li>
          ))}
        </ol>
      </section>

      <figure className="mh-band mh-reveal">
        <img src="/brand/editorial/maison-hero-1.jpg" alt={FLOW[locale].split.atelierAlt} width={1800} height={1208} loading="lazy" />
        <blockquote>
          <span className="mh-band-mark" aria-hidden="true"><MaisonMark small /></span>
          {h.band[0]} <em>{h.band[1]}</em>
        </blockquote>
      </figure>

      <section className="mh-prices" id="prijzen">
        <div className="mh-head mh-reveal">
          <p className="mh-eyebrow">{h.prices.eyebrow}</p>
          <h2 className="mh-h2">{h.prices.h2[0]} <em>{h.prices.h2[1]}</em></h2>
        </div>
        <div className="mh-price-row">
          {h.prices.tiers.map(([name, free, text], i) => (
            <div key={name} className={`mh-price mh-reveal${i === 2 ? " is-rec" : ""}`}>
              {i === 2 && <span className="mh-badge">{h.prices.badge}</span>}
              <b>{name}</b>
              <span className="mh-amount">{i === 0 ? free : price([0, PRICES.digital, PRICES.card, PRICES.session][i]!)}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="mh-fine">{h.prices.fine}</p>
      </section>

      <section className="mh-seasons">
        <div className="mh-head mh-reveal">
          <p className="mh-eyebrow">{h.seasons.eyebrow}</p>
          <h2 className="mh-h2">{h.seasons.h2[0]} <em>{h.seasons.h2[1]}</em></h2>
        </div>
        <div className="mh-season-row">
          {SEASONS.map((s, i) => (
            <figure key={s.img} className="mh-reveal">
              <img src={s.img} alt={h.seasons.names[i]![0]} width={1000} height={1241} loading="lazy" />
              <figcaption><b>{h.seasons.names[i]![0]}</b><span>{h.seasons.names[i]![1]}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="mh-more"><Link href="/kleuranalyse">{h.seasons.more}</Link></p>
      </section>

      <section className="mh-faq mh-reveal">
        <h2 className="mh-h2">{h.faqTitle}</h2>
        {h.faq.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      <section className="mh-final">
        <div className="mh-head mh-reveal">
          <h2 className="mh-h2">{h.final.h2[0]} <em>{h.final.h2[1]}</em>{h.final.h2[2] === "?" ? "?" : ` ${h.final.h2[2]}`}</h2>
          <p className="mh-sub">{h.final.sub}</p>
        </div>
        <Doors where="final" />
      </section>

      <footer className="mh-foot">
        <MaisonMark small />
        <nav aria-label="Voettekst">
          <Link href="/contact">{t.nav.contact}</Link>
          <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener" target="_blank">Instagram</a>
          <Link href="/kleuranalyse">{t.nav.colourAnalysis}</Link>
          <Link href="/voorwaarden">{t.footer.terms}</Link>
          <Link href="/privacy">{t.footer.privacy}</Link>
        </nav>
        <span>{t.footer.vat}</span>
        <LangSwitch />
      </footer>
    </main>
  );
}
