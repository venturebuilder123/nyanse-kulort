"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buildGuide, type Swatch } from "@/lib/guide/build";
import { flowSession } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { Wordmark } from "../ui";

type R = ReturnType<typeof flowSession.result>;

/** The personal style guide: a document on screen, A4 pages when printed or saved as PDF. */
export default function Guide() {
  const { config, voice } = useBrand();
  const [r, setR] = useState<R>(null);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    const res = flowSession.result();
    setR(res);
    setName(res?.name ?? "");
    setLoaded(true);
  }, []);
  const g = useMemo(() => (r ? buildGuide(r.profile, config.key) : null), [r, config.key]);

  if (!loaded) return <main className="screen" />;
  if (!r || !g) return <Locked text="Nog geen kleurprofiel op dit apparaat." href="/" cta="Begin je kleuranalyse" />;
  if (!r.paid) return <Locked text="Je stijlgids hoort bij de gids of de gids met kleurenpas." href="/resultaat" cta="Bekijk je opties" />;

  const date = new Date(r.at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
  const saveName = (v: string) => {
    setName(v);
    flowSession.update({ name: v.trim() || undefined });
  };
  const n = (i: number) => String(i).padStart(2, "0");
  const men = config.key === "kulort";

  return (
    <main className={`guide g-${voice}`}>
      <div className="g-toolbar">
        <Wordmark />
        <label className="g-name">
          <span>Naam op je gids</span>
          <input value={name} onChange={(e) => saveName(e.target.value)} placeholder="Je voornaam" autoComplete="given-name" />
        </label>
        <button className="btn btn-sm" onClick={() => window.print()}>Opslaan als PDF</button>
      </div>

      {/* 1. cover */}
      <section className="g-page g-cover">
        <div className="g-cover-top">
          <Wordmark />
          <span>Stijlgids</span>
        </div>
        <div className="g-cover-mid">
          {name && <p className="g-for">Voor {name}</p>}
          <h1 className="g-season">{g.season}</h1>
          <p className="g-family">{g.family}{g.second ? ` · op de grens met ${g.second}` : ""}</p>
        </div>
        <Strip colors={g.pass} tall />
        <p className="g-cover-date">{date}</p>
      </section>

      {/* 2. your colouring */}
      <Page n={n(2)} title="Zo is jouw kleur opgebouwd">
        <div className="g-scales">
          <Scale label="Ondertoon" word={g.scales.undertone} value={(g.scales.values.undertone + 1) / 2} left="koel" right="warm" />
          <Scale label="Diepte" word={g.scales.depth} value={g.scales.values.depth} left="licht" right="diep" />
          <Scale label="Helderheid" word={g.scales.clarity} value={g.scales.values.clarity} left="zacht" right="helder" />
        </div>
        <div className="g-callout">
          <b>{g.contrast.title}</b>
          <p>{g.contrast.text}</p>
        </div>
        <p className="g-body">
          Je bent een <b>{g.season}</b>. Dat betekent: een {g.scales.undertone} ondertoon, {g.scales.depth} van diepte en {g.scales.clarity} van
          helderheid. Kleuren die op dezelfde plek liggen, laten je gezicht rustig en helder ogen. Kleuren ver weg trekken de aandacht van je gezicht af.
        </p>
      </Page>

      {/* 3. 30 colours */}
      <Page n={n(3)} title="Je 30 kleuren">
        {g.groups.map((gr) => (
          <div key={gr.title} className="g-group">
            <div className="g-group-head"><b>{gr.title}</b><span>{gr.text}</span></div>
            <div className="g-swatches">
              {gr.colors.map((c) => <Chip key={c.hex} c={c} />)}
            </div>
          </div>
        ))}
      </Page>

      {/* 4. combinations */}
      <Page n={n(4)} title="Combinaties die werken">
        <div className="g-combos">
          {g.combos.map((c) => (
            <div key={c.title} className="g-combo">
              <div className="g-combo-stack">
                {c.pieces.map((pc) => <i key={pc.item + pc.color.hex} style={{ background: pc.color.hex }} />)}
              </div>
              <div>
                <b>{c.title}</b>
                <ul>{c.pieces.map((pc) => <li key={pc.item + pc.color.hex}><Dot hex={pc.color.hex} />{pc.item} · {pc.color.name}</li>)}</ul>
                <p className="g-tip">{c.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </Page>

      {/* 5. accessories (+ make-up) */}
      <Page n={n(5)} title={men ? "Horloge, riem, schoenen en bril" : "Sieraden, tas en make-up"}>
        <div className="g-acc">
          {[...g.accessories, ...(g.makeup ?? [])].map((a) => (
            <div key={a.title} className="g-acc-item">
              <div className="g-acc-sw">{a.swatches.map((s) => <i key={s.name + s.hex} style={{ background: s.hex }} title={s.name} />)}</div>
              <b>{a.title}</b>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </Page>

      {/* 6. avoid */}
      <Page n={n(6)} title="Liever niet bij je gezicht">
        <div className="g-avoid">
          {g.avoid.map((a) => (
            <div key={a.color.hex} className="g-avoid-item">
              <i style={{ background: a.color.hex }} />
              <div><b>{a.color.name}</b><p>{a.reason}</p></div>
            </div>
          ))}
        </div>
        <p className="g-body">Je hoeft ze niet weg te gooien. Draag ze onder je middel: als broek, rok of schoenen. Daar kijkt niemand naar je gezicht.</p>
      </Page>

      {/* 7. capsule */}
      <Page n={n(7)} title="Je capsule: 12 stuks die samen werken">
        <div className="g-capsule">
          {g.capsule.map((c, i) => (
            <div key={i} className="g-cap-item"><i style={{ background: c.color.hex }} /><b>{c.item}</b><span>{c.color.name}</span></div>
          ))}
        </div>
        <p className="g-body">Met deze 12 stuks maak je tientallen combinaties, omdat alles in jouw kleuren is. Vervang stuk voor stuk wat je al hebt.</p>
      </Page>

      {/* 8. in the shop + pass */}
      <Page n={n(8)} title="In de winkel">
        <ul className="g-tips">{g.shopping.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="g-pass">
          <div className="g-pass-card">
            <div className="g-pass-top"><Wordmark /><span>Kleurenpas</span></div>
            <b>{g.season}</b>
            <Strip colors={g.pass} />
          </div>
          <p className="g-body">Je pas: je 8 kernkleuren. Maak een screenshot, of bewaar de echte pas in je portemonnee.</p>
        </div>
      </Page>
    </main>
  );
}

function Page({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="g-page">
      <header className="g-head"><span className="g-n">{n}</span><h2>{title}</h2></header>
      <div className="g-content">{children}</div>
      <footer className="g-foot"><Wordmark /><span>Aanbevolen op kleur, nooit op commissie.</span></footer>
    </section>
  );
}

function Strip({ colors, tall }: { colors: Swatch[]; tall?: boolean }) {
  return <div className={`g-strip${tall ? " tall" : ""}`}>{colors.map((c) => <i key={c.hex} style={{ background: c.hex }} />)}</div>;
}
function Chip({ c }: { c: Swatch }) {
  return <div className="g-chip"><i style={{ background: c.hex }} /><span>{c.name}</span></div>;
}
function Dot({ hex }: { hex: string }) {
  return <i className="g-dot" style={{ background: hex }} />;
}
function Scale({ label, word, value, left, right }: { label: string; word: string; value: number; left: string; right: string }) {
  return (
    <div className="g-scale">
      <div className="g-scale-head"><span>{label}</span><b>{word}</b></div>
      <div className="g-scale-track"><i style={{ left: `${Math.max(2, Math.min(98, value * 100))}%` }} /></div>
      <div className="g-scale-ends"><span>{left}</span><span>{right}</span></div>
    </div>
  );
}
function Locked({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <main className="screen">
      <div className="pad" style={{ justifyContent: "center", textAlign: "center", minHeight: "70svh" }}>
        <h1 className="disp sm">Je stijlgids</h1>
        <p className="sub" style={{ margin: "0 auto" }}>{text}</p>
        <Link className="btn" href={href}>{cta}</Link>
      </div>
    </main>
  );
}
