"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { euro, PRICES } from "@/lib/flow/pricing";

const NONE = { brand: "none", voice: "none" };

// The two doors are the hero: one tap and you are in the funnel (founder, 18 Oct: "de perfecte
// toegang tot de funnel"). Each door slowly cycles through its campaign photos, young to 45+.
const DOORS = [
  {
    key: "kulort",
    label: "Voor hem",
    line: "Je eerste indruk, geregeld.",
    imgs: ["kulort-40-campagne-1", "kulort-jong-campagne-1", "kulort-vol-campagne-1", "kulort-jv-campagne-1"],
  },
  {
    key: "nyanse",
    label: "Voor haar",
    line: "Minder kopen, beter kiezen.",
    imgs: ["nyanse-40-campagne-1", "nyanse-jong-campagne-1", "nyanse-vol-campagne-1", "nyanse-jv-campagne-1"],
  },
] as const;

const SEASONS = [
  { name: "Lente", line: "warm en helder", img: "/brand/seasons/family-lente.jpg" },
  { name: "Zomer", line: "koel en zacht", img: "/brand/seasons/family-zomer.jpg" },
  { name: "Herfst", line: "warm en diep", img: "/brand/seasons/family-herfst.jpg" },
  { name: "Winter", line: "koel en contrastrijk", img: "/brand/seasons/family-winter.jpg" },
];

// the ribbon: real palette colours with their names, two of each season family
const RIBBON: [string, string][] = [
  ["#F3A27A", "Abrikoos"], ["#8FBF6A", "Lentegroen"], ["#AFC6E0", "Poederblauw"], ["#B67C73", "Rozenhout"],
  ["#7A8B6F", "Salie"], ["#A0522D", "Siena"], ["#2F4F3A", "Bosgroen"], ["#C9A24A", "Oker"],
  ["#1B2A5C", "Navy"], ["#0E7C5A", "Smaragd"], ["#9B1B30", "Robijn"], ["#6E1F2A", "Bordeaux"],
  ["#E8C468", "Lichtgoud"], ["#3F6A6A", "Petrol"], ["#5E6A7A", "Leisteen"], ["#B9926B", "Camel"],
];

const FAQ: [string, string][] = [
  ["Hoe werkt het?", "Je maakt één selfie bij daglicht. De analyse draait op je telefoon en bepaalt je ondertoon, diepte en helderheid. Daaruit volgt je kleurtype, met je beste kleuren. Dat profiel is gratis."],
  ["Wat krijg ik in de stijlgids?", "Al je 30 kleuren met namen, combinaties voor werk, weekend, date en feest, je basis (wit, donker, denim), je eerste vijf aankopen, een kast-check en de kleuren voor horloge, sieraden en make-up. Als PDF en op je telefoon."],
  ["Ken ik mijn kleurtype al?", "Dan kies je het zelf en ga je direct naar je kleuren en je stijlgids, zonder selfie."],
  ["Wat gebeurt er met mijn foto?", "Hij wordt niet naar ons gestuurd en nergens bewaard."],
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
  // a full page load (not <Link>), so the layout re-renders with the picked brand
  const go = (key: string) => () => track("brand_switch", NONE, { to: key, from: `maison-${where}` });
  return (
    <div className="mh-doors">
      {DOORS.map((d) => (
        <a key={d.key} className={`mh-door mh-door-${d.key}`} href={`/${d.key}`} onClick={go(d.key)}>
          <DoorPhotos imgs={d.imgs} priority={priority} />
          <span className="mh-door-shade" aria-hidden="true" />
          <span className="mh-door-copy">
            <span className="mh-door-label">{d.label}</span>
            {d.key === "kulort" ? (
              <span className="wordmark wm-kulort">KUL<span className="wm-o">O</span>RT</span>
            ) : (
              <span className="wordmark wm-nyanse">NYANSE</span>
            )}
            <span className="mh-door-line">{d.line}</span>
            <span className="mh-door-cta">Begin gratis <span aria-hidden="true">→</span></span>
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

  return (
    <main className="mh">
      <header className="mh-top">
        <MaisonMark />
        <nav aria-label="Menu">
          <a href="#hoe">Hoe het werkt</a>
          <a href="#prijzen">Prijzen</a>
          <Link href="/kleuranalyse">Kleuranalyse</Link>
          <a className="mh-top-cta" href="#start">Begin gratis</a>
        </nav>
      </header>

      <section className="mh-hero" id="start">
        <div className="mh-hero-copy">
          <p className="mh-eyebrow">Kleuranalyse uit één selfie</p>
          <h1 className="mh-h1">Je kleuren. <em>Je kast. Je gids.</em></h1>
          <p className="mh-sub">Ontdek in een paar minuten welke kleuren jou staan. Gratis, met één selfie. Kies je atelier:</p>
        </div>
        <Doors where="hero" priority />
        <ul className="mh-facts" aria-label="In het kort">
          <li>Kleurprofiel gratis</li>
          <li>Je foto wordt nergens bewaard</li>
          <li>Stijlgids vanaf {euro(PRICES.digital)}</li>
          <li>Kleurenpas in de brievenbus</li>
        </ul>
      </section>

      <div className="mh-ribbon" aria-hidden="true">
        <div className="mh-ribbon-track">
          {[...RIBBON, ...RIBBON].map(([hex, name], i) => (
            <span key={i}><i style={{ background: hex }} />{name}</span>
          ))}
        </div>
      </div>

      <section className="mh-proof mh-reveal">
        <div className="mh-proof-copy">
          <p className="mh-eyebrow">Het effect</p>
          <h2 className="mh-h2">Zelfde gezicht. <em>Andere kleur.</em></h2>
          <p className="mh-sub">
            Een kleur die bij je past laat je huid egaal en je ogen helder ogen. Een kleur die niet past trekt de aandacht weg van je gezicht.
            Dat verschil zie je in één oogopslag, en daarna zie je het overal.
          </p>
        </div>
        <div className="mh-proof-pair">
          <figure><img src="/brand/ads/proof-women.jpg" alt="Dezelfde vrouw met een grijsblauwe en een warme oranje doek" width={1200} height={1201} loading="lazy" /></figure>
          <figure><img src="/brand/ads/proof-men.jpg" alt="Dezelfde man met een grijsblauwe en een warme oranje doek" width={1200} height={1201} loading="lazy" /></figure>
        </div>
      </section>

      <section className="mh-how" id="hoe">
        <div className="mh-head mh-reveal">
          <p className="mh-eyebrow">Zo werkt het</p>
          <h2 className="mh-h2">Drie stappen. <em>Een kast die samengaat.</em></h2>
        </div>
        <ol>
          <li className="mh-reveal">
            <img src="/brand/ads/note-to-self.jpg" alt="" width={1600} height={873} loading="lazy" />
            <span className="mh-n">01</span>
            <b>Eén selfie</b>
            <span>Bij daglicht, zonder filter. Een paar minuten, ook zonder account.</span>
          </li>
          <li className="mh-reveal">
            <img src="/brand/seasons/season-softAutumn.jpg" alt="" width={900} height={1117} loading="lazy" />
            <span className="mh-n">02</span>
            <b>Je kleurprofiel</b>
            <span>Je kleurtype, je beste kleuren en wat je beter laat hangen. Gratis.</span>
          </li>
          <li className="mh-reveal">
            <img src="/brand/ads/workbook.jpg" alt="" width={1600} height={893} loading="lazy" />
            <span className="mh-n">03</span>
            <b>Je stijlgids</b>
            <span>30 kleuren met naam, outfits, je eerste vijf aankopen en een kast-check. Als PDF en op je telefoon.</span>
          </li>
        </ol>
      </section>

      <figure className="mh-band mh-reveal">
        <img src="/brand/editorial/maison-hero-1.jpg" alt="Twee klanten in het atelier houden een stofstaal in hun kleur onder hun kin" width={1800} height={1208} loading="lazy" />
        <blockquote>
          <span className="mh-band-mark" aria-hidden="true"><MaisonMark small /></span>
          Minder kopen. <em>Beter kiezen.</em>
        </blockquote>
      </figure>

      <section className="mh-prices" id="prijzen">
        <div className="mh-head mh-reveal">
          <p className="mh-eyebrow">Wat het kost</p>
          <h2 className="mh-h2">Begin gratis. <em>Kies daarna wat bij je past.</em></h2>
        </div>
        <div className="mh-price-row">
          <div className="mh-price mh-reveal"><b>Kleurprofiel</b><span className="mh-amount">Gratis</span><p>Je kleurtype, je plek op de drie schalen en je 6 beste kleuren.</p></div>
          <div className="mh-price mh-reveal"><b>Stijlgids</b><span className="mh-amount">{euro(PRICES.digital)}</span><p>Al je 30 kleuren, looks per gelegenheid, je capsule en je kast-check. Direct als PDF.</p></div>
          <div className="mh-price is-rec mh-reveal"><span className="mh-badge">Aanrader</span><b>Stijlgids + kleurenpas</b><span className="mh-amount">{euro(PRICES.card)}</span><p>Plus een stevige pas met je 8 kernkleuren, voor in je portemonnee. Gratis verzonden.</p></div>
          <div className="mh-price mh-reveal"><b>Persoonlijk kleuradvies</b><span className="mh-amount">{euro(PRICES.session)}</span><p>Een kleurconsulent bekijkt jouw foto&apos;s en stuurt je een persoonlijke video. Zonder afspraak.</p></div>
        </div>
        <p className="mh-fine">Prijzen inclusief btw. Je betaalt pas als je je stijlgids kiest, na je gratis profiel.</p>
      </section>

      <section className="mh-seasons">
        <div className="mh-head mh-reveal">
          <p className="mh-eyebrow">Vier seizoenen, twaalf kleurtypen</p>
          <h2 className="mh-h2">Welk seizoen <em>ben jij?</em></h2>
        </div>
        <div className="mh-season-row">
          {SEASONS.map((s) => (
            <figure key={s.name} className="mh-reveal">
              <img src={s.img} alt={`Kleuren van het seizoen ${s.name}`} width={1000} height={1241} loading="lazy" />
              <figcaption><b>{s.name}</b><span>{s.line}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="mh-more"><Link href="/kleuranalyse">Alles over kleuranalyse en de 12 kleurtypen →</Link></p>
      </section>

      <section className="mh-faq mh-reveal">
        <h2 className="mh-h2">Vragen</h2>
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </section>

      <section className="mh-final">
        <div className="mh-head mh-reveal">
          <h2 className="mh-h2">Klaar om <em>je kleuren</em> te zien?</h2>
          <p className="mh-sub">Gratis, met één selfie. Kies je atelier.</p>
        </div>
        <Doors where="final" />
      </section>

      <footer className="mh-foot">
        <MaisonMark small />
        <nav aria-label="Voettekst">
          <Link href="/contact">Contact</Link>
          <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener" target="_blank">Instagram</a>
          <Link href="/kleuranalyse">Kleuranalyse</Link>
          <Link href="/voorwaarden">Voorwaarden</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
        <span>Prijzen inclusief btw</span>
      </footer>
    </main>
  );
}
