"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PEOPLE } from "@/lib/brand/people";
import { familyOf } from "@/lib/color/describe";
import { nameForHex } from "@/lib/color/palette";
import type { SeasonKey } from "@/lib/color/seasons";
import { buildGuide, type Swatch } from "@/lib/guide/build";
import { makeReferralCode, referralUrl } from "@/lib/flow/referral";
import { flowSession } from "@/lib/flow/session";
import { track } from "@/lib/analytics";
import { pushOff, pushOn, pushState, type PushState } from "@/lib/push/client";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { Wordmark } from "../ui";

type R = ReturnType<typeof flowSession.result>;

/** The personal style guide: an editorial document on screen, exact A4 pages as PDF. */
export default function Guide() {
  const { config, voice, copy } = useBrand();
  const gc = copy.guide;
  const [r, setR] = useState<R>(null);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [qr, setQr] = useState<string | null>(null);
  const [site, setSite] = useState("");

  useEffect(() => {
    const res = flowSession.result();
    if (res && res.paid && !res.refCode) flowSession.update({ refCode: makeReferralCode(res.name) });
    const fresh = flowSession.result();
    setR(fresh);
    setName(fresh?.name ?? "");
    setSite(location.host);
    setLoaded(true);
  }, []);
  // regenerate when the code changes (it gets the name once a name is filled in)
  const refCode = r?.refCode;
  useEffect(() => {
    if (!refCode) return;
    void import("qrcode")
      .then((q) => q.toDataURL(referralUrl(location.origin, refCode), { margin: 1, width: 360, color: { dark: "#111111", light: "#ffffff" } }))
      .then(setQr)
      .catch(() => {});
  }, [refCode]);
  const g = useMemo(() => (r ? buildGuide(r.profile, config.key) : null), [r, config.key]);

  if (!loaded) return <main className="screen" />;
  if (!r || !g) return <Locked text="Nog geen kleurprofiel op dit apparaat." href="/" cta="Begin je kleuranalyse" />;
  if (!r.paid) return <Locked text="Je stijlgids hoort bij de gids of de gids met kleurenpas." href="/resultaat" cta="Bekijk je opties" />;

  const date = new Date(r.at);
  const month = date.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });
  const saveName = (v: string) => {
    setName(v);
    const nm = v.trim() || undefined;
    // a code without a name gets the name as soon as it is filled in
    const code = r.refCode?.startsWith("KLEUR-") && nm ? makeReferralCode(nm) : r.refCode;
    flowSession.update({ name: nm, refCode: code });
    if (code !== r.refCode) setR(flowSession.result());
  };
  const men = config.key === "kulort";
  // an AI model from the same colour family shows the effect (labelled as an example)
  const family = familyOf(r.profile.match.season);
  const model = PEOPLE[config.key].find((p) => familyOf(p.season as SeasonKey) === family) ?? PEOPLE[config.key][0];
  let page = 1;
  const next = () => String(++page).padStart(2, "0");

  return (
    <main className={`guide g-${voice} g-${config.key}`}>
      <div className="g-toolbar">
        <Wordmark />
        <label className="g-name">
          <span>Naam op je gids</span>
          <input value={name} onChange={(e) => saveName(e.target.value)} placeholder="Je voornaam" autoComplete="given-name" />
        </label>
        <button className="btn btn-sm" onClick={() => window.print()}>Opslaan als PDF</button>
      </div>
      <PushToggle season={r.profile.match.season} />

      {/* 01 cover */}
      <section className="g-page g-cover">
        <div className="g-cover-top">
          <Wordmark />
          <span>N°01 · {month}</span>
        </div>
        <div className="g-cover-bars" aria-hidden="true">{g.pass.map((c) => <i key={c.hex} style={{ background: c.hex }} />)}</div>
        <div className="g-cover-mid">
          <p className="g-kicker">Stijlgids{name ? ` · voor ${name}` : ""}</p>
          <h1 className="g-season">{g.season}</h1>
          <p className="g-family">{g.family}{g.second ? ` · op de grens met ${g.second}` : ""}</p>
        </div>
        <p className="g-cover-tag">{gc.tagline}</p>
      </section>

      {/* 02 summary */}
      <Page n={next()} kicker="In één oogopslag" title="Jouw kleuren, kort">
        <p className="g-lede">{gc.summary}</p>
        <div className="g-sum">
          <div className="g-sum-type"><span>Type</span><b>{g.season}</b><em>{g.scales.undertone} · {g.scales.depth} · {g.scales.clarity}</em></div>
          <div className="g-sum-block"><span>Je kernkleuren</span><Strip colors={g.summary.core} named /></div>
          <div className="g-sum-block"><span>Liever niet</span><Strip colors={g.summary.avoid} named crossed /></div>
          <div className="g-sum-row">
            <div><span>Metaal</span><b>{g.summary.metal}</b></div>
            <div><span>Leer</span><b>{g.summary.leather}</b></div>
            <div><span>Contrast</span><b>{g.contrast.title.replace("Jij ", "").replace(/^\w/, (c) => c.toUpperCase())}</b></div>
          </div>
          <ol className="g-rules">{g.summary.rules.map((rule) => <li key={rule}>{rule}</li>)}</ol>
        </div>
      </Page>

      {/* 03 the effect, shown on an AI model of the same family */}
      {model && (
        <Page n={next()} kicker="Het effect" title="Zelfde gezicht. Andere kleur.">
          <p className="g-lede">{gc.effect}</p>
          <div className="g-effect">
            <figure>
              <Drape photo={model.src} face={{ ...model.face, mirrored: false }} color={model.bad} fit={{ w: 0.42, cy: 0.38 }} />
              <figcaption><b>✕ {nameForHex(model.bad, config.key) ?? "Valt weg"}</b><span>Deze kleur trekt de aandacht weg van het gezicht.</span></figcaption>
            </figure>
            <figure>
              <Drape photo={model.src} face={{ ...model.face, mirrored: false }} color={model.good} fit={{ w: 0.42, cy: 0.38 }} />
              <figcaption><b>✓ {nameForHex(model.good, config.key) ?? "Jouw kleur"}</b><span>Deze kleur sluit aan bij de eigen kleuren van huid, haar en ogen.</span></figcaption>
            </figure>
          </div>
          <p className="g-caption">Voorbeeld met een AI-model uit dezelfde kleurfamilie ({family}). Kleuren gekozen door onze analyse.</p>
        </Page>
      )}

      {/* colouring */}
      <Page n={next()} kicker="Je profiel" title="Zo is jouw kleur opgebouwd">
        <div className="g-scales">
          <Scale label="Ondertoon" word={g.scales.undertone} value={(g.scales.values.undertone + 1) / 2} left="koel" right="warm" />
          <Scale label="Diepte" word={g.scales.depth} value={g.scales.values.depth} left="licht" right="diep" />
          <Scale label="Helderheid" word={g.scales.clarity} value={g.scales.values.clarity} left="zacht" right="helder" />
        </div>
        <div className="g-callout"><b>{g.contrast.title}</b><p>{g.contrast.text}</p></div>
        <p className="g-body">
          Je bent een <b>{g.season}</b>: een {g.scales.undertone} ondertoon, {g.scales.depth} van diepte en {g.scales.clarity} van helderheid.
          Kleuren op dezelfde plek laten je gezicht rustig en helder ogen. Kleuren ver weg trekken de aandacht van je gezicht af.
        </p>
      </Page>

      {/* 30 colours */}
      <Page n={next()} kicker="Je palet" title="Je 30 kleuren">
        {g.groups.map((gr) => (
          <div key={gr.title} className="g-group">
            <div className="g-group-head"><b>{gr.title}</b><span>{gr.text}</span></div>
            <div className="g-swatches">{gr.colors.map((c) => <Chip key={c.hex} c={c} />)}</div>
          </div>
        ))}
      </Page>

      {/* combinations */}
      <Page n={next()} kicker="Zo draag je het" title="Combinaties die werken">
        <p className="g-lede">{gc.combos}</p>
        <div className="g-combos">
          {g.combos.map((c) => (
            <div key={c.title} className="g-combo">
              <div className="g-look" aria-hidden="true">
                <i className="g-look-top" style={{ background: c.pieces[0]!.color.hex }} />
                <i className="g-look-mid" style={{ background: c.pieces[1]!.color.hex }} />
                <i className="g-look-low" style={{ background: c.pieces[2]!.color.hex }} />
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

      {/* accessories (+ make-up) */}
      <Page n={next()} kicker="De details" title={men ? "Horloge, riem, schoenen en bril" : "Sieraden, tas en make-up"}>
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

      {/* not this, but this */}
      <Page n={next()} kicker="Wat niet past" title="Niet dit, maar dit">
        <p className="g-lede">{gc.swaps}</p>
        <div className="g-swaps">
          {g.swaps.map((s) => (
            <div key={s.avoid.hex} className="g-swap">
              <div className="g-swap-pair">
                <i className="no" style={{ background: s.avoid.hex }} />
                <span aria-hidden="true">→</span>
                <i style={{ background: s.instead.hex }} />
              </div>
              <p><b>{s.avoid.name}</b> {s.reason}. Kies <b>{s.instead.name}</b>.</p>
            </div>
          ))}
        </div>
        <p className="g-body">Je hoeft ze niet weg te gooien. Onder je middel, als broek, rok of schoenen, vallen ze minder op.</p>
      </Page>

      {/* capsule */}
      <Page n={next()} kicker="Je garderobe" title="12 stuks die samen werken">
        <div className="g-capsule">
          {g.capsule.map((c, i) => (
            <div key={i} className="g-cap-item"><i style={{ background: c.color.hex }} /><b>{c.item}</b><span>{c.color.name}</span></div>
          ))}
        </div>
        <p className="g-body">Alles in jouw kleuren, dus alles combineert. Vervang stuk voor stuk wat je al hebt.</p>
      </Page>

      {/* shop, home screen, friends */}
      <Page n={next()} kicker="Altijd bij je" title="In de winkel en op je telefoon">
        <ul className="g-tips">{g.shopping.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="g-two">
          <div className="g-home">
            <b>Zet je kleuren op je beginscherm</b>
            <ol>
              <li><span>iPhone</span> Open {site || "de site"} in Safari · tik op Deel (vierkant met pijl) · kies <em>Zet op beginscherm</em>.</li>
              <li><span>Android</span> Open in Chrome · tik op ⋮ · kies <em>Toevoegen aan startscherm</em>.</li>
            </ol>
          </div>
          <div className="g-pass-card">
            <div className="g-pass-top"><Wordmark /><span>Kleurenpas</span></div>
            <b>{g.season}</b>
            <Strip colors={g.pass} />
          </div>
        </div>
        {r.refCode && (
          <div className="g-friend">
            {qr && <img src={qr} alt={`QR-code naar ${site} met vriendencode ${r.refCode}`} width={120} height={120} />}
            <div>
              <span className="g-kicker">Deel je kleuren</span>
              <b className="g-code">{r.refCode}</b>
              <p>Je vrienden krijgen €1 korting op hun gids. Scan de code of ga naar <b>{site}</b>.</p>
            </div>
          </div>
        )}
        <p className="g-closing">{gc.closing[0]} <em>{gc.closing[1]}</em></p>
      </Page>
    </main>
  );
}

/** The weekly colour tip: opt-in, asked only after a tap, off with one tap. Screen only. */
function PushToggle({ season }: { season: SeasonKey }) {
  const { config, voice, copy, ctx } = useBrand();
  const t = copy.retention.push;
  const [state, setState] = useState<PushState>("unsupported");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => setState(pushState()), []);
  if (state === "unsupported") return null;

  async function on() {
    setBusy(true);
    setFailed(false);
    try {
      const s = await pushOn({ brand: config.key, voice, season });
      setState(s);
      if (s === "on") track("push_optin", ctx, { season });
    } catch {
      setFailed(true);
    }
    setBusy(false);
  }
  async function off() {
    setBusy(true);
    await pushOff().catch(() => {});
    setState("off");
    track("push_optout", ctx);
    setBusy(false);
  }

  return (
    <aside className="g-push" aria-live="polite">
      <div>
        <b>{t.title}</b>
        <p>{state === "on" ? t.on : state === "ios-install" ? t.ios : state === "denied" ? t.denied : t.text}</p>
        {failed && <p className="g-push-err">Dat lukte nu niet. Probeer het later nog eens.</p>}
      </div>
      {state === "off" && <button className="btn btn-sm" disabled={busy} onClick={on}>{t.cta}</button>}
      {state === "on" && <button className="link-btn" disabled={busy} onClick={off}>{t.off}</button>}
    </aside>
  );
}

function Page({ n, kicker, title, children }: { n: string; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="g-page">
      <header className="g-head">
        <div><span className="g-kicker">{kicker}</span><h2>{title}</h2></div>
        <span className="g-n">{n}</span>
      </header>
      <div className="g-content">{children}</div>
      <footer className="g-foot"><Wordmark /><span>Aanbevolen op kleur, nooit op commissie.</span></footer>
    </section>
  );
}

function Strip({ colors, named, crossed }: { colors: Swatch[]; named?: boolean; crossed?: boolean }) {
  return (
    <div className={`g-strip${named ? " named" : ""}${crossed ? " crossed" : ""}`}>
      {colors.map((c) => (
        <div key={c.hex}>
          <i style={{ background: c.hex }} />
          {named && <span>{c.name}</span>}
        </div>
      ))}
    </div>
  );
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
