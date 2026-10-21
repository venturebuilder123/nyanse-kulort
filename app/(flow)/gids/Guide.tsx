"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import HEROES from "@/lib/brand/heroes.json";
import { PEOPLE, peopleFor } from "@/lib/brand/people";
import { familyOf } from "@/lib/color/describe";
import { oftenNamed } from "@/lib/brand/seasons-copy";
import { nameForHex } from "@/lib/color/palette";
import type { SeasonKey } from "@/lib/color/seasons";
import { buildGuide, type Swatch } from "@/lib/guide/build";
import { guideEn } from "@/lib/guide/en";
import { colourName, familyName, garmentName } from "@/lib/i18n/words";
import type { Locale } from "@/lib/i18n/locale";
import { makeReferralCode, referralUrl } from "@/lib/flow/referral";
import { orderKey, verifyAccess, type Access } from "@/lib/flow/access";
import { flowSession } from "@/lib/flow/session";
import { loadAnswers } from "@/lib/flow/answers";
import { track } from "@/lib/analytics";
import { pushOff, pushOn, pushState, type PushState } from "@/lib/push/client";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { Flat, FlatLay, Piece, type FlatKind } from "../Flats";
import { HouseMark, Wordmark } from "../ui";

// accessory drawings on the details page (make-up keeps its swatches); Dutch and English titles
const ACC_FLAT: Record<string, FlatKind> = {
  Horloge: "watch", Riem: "belt", Schoenen: "shoe", "Bril en zonnebril": "glasses",
  Sieraden: "necklace", "Tas en schoenen": "bag", Sjaal: "scarf", Zonnebril: "glasses",
  Watch: "watch", Belt: "belt", Shoes: "shoe", "Glasses and sunglasses": "glasses",
  Jewellery: "necklace", "Bag and shoes": "bag", Scarf: "scarf", Sunglasses: "glasses",
};

// The fixed words of the guide, per language (founder, 21 Oct 2026: English for EU customers)
const TEXT = {
  nl: {
    noProfile: "Nog geen kleurprofiel op dit apparaat.", start: "Begin je kleuranalyse",
    pending: "We controleren je betaling. Zodra je overschrijving binnen is, krijg je een mail en opent je stijlgids hier.", order: "Bekijk je bestelling",
    notPaid: "Je stijlgids hoort bij de stijlgids of de stijlgids met kleurenpas.", options: "Bekijk je opties", lockedTitle: "Je stijlgids",
    nameLabel: "Naam op je gids", namePh: "Je naam", pdfBusy: "PDF maken…", pdf: "Download PDF", file: "stijlgids",
    guideFor: (n: string) => `Stijlgids${n ? ` · voor ${n}` : ""}`, border: (s: string) => ` · op de grens met ${s}`, declared: (s: string) => `Op basis van je eigen opgave: ${s}`,
    glanceK: "In één oogopslag", glanceT: "Jouw kleuren, kort", type: "Type", core: "Je kernkleuren", avoid: "Liever niet", metal: "Metaal", leather: "Leer", contrast: "Contrast",
    effectK: "Het effect", effectT: "Zelfde gezicht. Andere kleur.", badFallback: "Valt weg", badLine: "Deze kleur trekt de aandacht weg van het gezicht.", goodFallback: "Jouw kleur", goodLine: "Deze kleur sluit aan bij de eigen kleuren van huid, haar en ogen.", example: (f: string) => `Voorbeeld uit dezelfde kleurfamilie (${f}).`,
    profileK: "Je profiel", profileT: "Zo is jouw kleur opgebouwd",
    undertone: "Ondertoon", cool: "koel", warm: "warm", undertoneWhat: "De ondertoon onder je huid: meer roze en blauw (koel) of meer goud en perzik (warm). Die verandert niet als je bruint.",
    undertoneCool: "Jij bent koel: zilver, ijswit, navy en blauwrood laten je fris ogen. Goud, oranje en crème maken je grauw.", undertoneWarm: "Jij bent warm: goud, crème, camel en tomaatrood laten je gloeien. IJswit, zilvergrijs en blauwroze maken je bleek.", undertoneMid: "Jij zit in het midden: kies kleuren die niet uitgesproken warm of koel zijn, zoals zacht marine, rozenhout en taupe.",
    depth: "Diepte", light: "licht", deep: "diep", depthWhat: "Hoe licht of donker je haar, ogen en huid samen zijn. Dit bepaalt hoe licht of donker je kleuren mogen zijn.",
    depthDeep: "Jij bent diep: donkere, verzadigde kleuren dragen je. Pastels vallen naast jou weg.", depthLight: "Jij bent licht: lichte en middentinten laten je stralen. Zwart en heel donkere kleuren zijn te zwaar.", depthMid: "Jij zit in het midden: middentinten zijn je basis. Heel licht en heel donker gebruik je spaarzaam.",
    clarity: "Helderheid", soft: "zacht", clear: "helder", clarityWhat: "Hoe helder je ogen en het contrast in je gezicht zijn. Dit bepaalt of je kleuren fel of gedempt moeten zijn.",
    clarityClear: "Jij bent helder: zuivere, felle kleuren passen bij je ogen. Stoffige, grijzige tinten maken je moe.", claritySoft: "Jij bent zacht: gedempte, iets grijzige kleuren laten je verzorgd ogen. Felle kleuren overstemmen je.", clarityMid: "Jij zit in het midden: kleuren met wat diepte, niet neon en niet stoffig.",
    named: (f: string) => `Vaak genoemd als ${f}`,
    youAre: (s: string, u: string, d: string, c: string) => <>Je bent een <b>{s}</b>: een {u} ondertoon, {d} van diepte en {c} van helderheid. Kleuren op dezelfde plek laten je gezicht rustig en helder ogen. Kleuren ver weg trekken de aandacht van je gezicht af.</>,
    paletteK: "Je palet", paletteT: "Je 30 kleuren", combosK: "Zo draag je het", combosT: "Combinaties die werken",
    wornK: "Zo ziet het eruit", wornT: (s: string) => `${s}, gedragen`, wornAlt: (s: string) => `Twee outfits in de kleuren van ${s}`, wornLede: "Zo kleden mensen met jouw kleurtype zich: dezelfde kleurfamilie, van top tot schoen.",
    basicsK: "Waar je begint", basicsT: "Jouw basis en je eerste 5 aankopen",
    auditK: "Tien minuten", auditT: "Kijk je kast na", auditLede: "Je hoeft niet alles opnieuw te kopen. Begin met wat je al hebt.",
    keep: "Houden", keepText: "Lijkt op een van je kleuren of laat je gezicht oplichten.", below: "Onder je middel", belowText: (men: boolean) => `Niet jouw kleur, wel geliefd: draag het ${men ? "als broek of schoenen" : "als broek, rok of schoenen"}, ver van je gezicht.`,
    out: "Weg", outText: "Niet jouw kleur, en je hebt het een jaar niet gedragen. Verkoop het tweedehands of geef het weg; de opbrengst gaat naar je eerste stuk uit je palet.",
    detailsK: "De details", detailsT: (men: boolean): string => (men ? "Horloge, riem, schoenen en bril" : "Sieraden, tas en make-up"),
    swapsK: "Wat niet past", swapsT: "Niet dit, maar dit", choose: "Kies", swapsBody: (men: boolean) => `Je hoeft ze niet weg te gooien. Onder je middel, ${men ? "als broek of schoenen" : "als broek, rok of schoenen"}, vallen ze minder op.`,
    capsuleK: "Je garderobe", capsuleT: "12 stuks die samen werken", capsuleBody: "Alles in jouw kleuren, dus alles combineert. Vervang stuk voor stuk wat je al hebt.",
    alwaysK: "Altijd bij je", alwaysT: "In de winkel en op je telefoon", home: "Zet je kleuren op je beginscherm",
    iphone: (site: string) => <>Open {site || "de site"} in Safari · tik op Deel (vierkant met pijl) · kies <em>Zet op beginscherm</em>.</>, android: <>Open in Chrome · tik op ⋮ · kies <em>Toevoegen aan startscherm</em>.</>,
    pass: "Kleurenpas", qrAlt: (site: string, code: string) => `QR-code naar ${site} met vriendencode ${code}`, share: "Deel je kleuren", shareText: (site: string) => <>Je vrienden krijgen €1 korting op hun gids. Scan de code of ga naar <b>{site}</b>.</>,
    pushFail: "Dat lukte nu niet. Probeer het later nog eens.", footer: "Aanbevolen op kleur, nooit op commissie.",
    shopK: "Shop je kleuren", shopT: "Nu te koop, in jouw kleuren", shopLede: "Echte producten waarvan we de kleur hebben gemeten. Elk stuk past bij een kleur uit je palet.", shopNote: "Links naar winkels zijn affiliate-links: wij krijgen een kleine vergoeding, jij betaalt niets extra. Aanbevolen op kleur, nooit op commissie.",
  },
  en: {
    noProfile: "No colour profile on this device yet.", start: "Start your colour analysis",
    pending: "We're checking your payment. As soon as your transfer arrives, you'll get an e-mail and your style guide opens here.", order: "View your order",
    notPaid: "Your style guide comes with the style guide or the style guide with colour card.", options: "See your options", lockedTitle: "Your style guide",
    nameLabel: "Name on your guide", namePh: "Your name", pdfBusy: "Making PDF…", pdf: "Download PDF", file: "style-guide",
    guideFor: (n: string) => `Style guide${n ? ` · for ${n}` : ""}`, border: (s: string) => ` · on the border with ${s}`, declared: (s: string) => `Based on your own choice: ${s}`,
    glanceK: "At a glance", glanceT: "Your colours, in short", type: "Type", core: "Your core colours", avoid: "Better not", metal: "Metal", leather: "Leather", contrast: "Contrast",
    effectK: "The effect", effectT: "Same face. Different colour.", badFallback: "Falls flat", badLine: "This colour pulls attention away from the face.", goodFallback: "Your colour", goodLine: "This colour matches the natural colours of skin, hair and eyes.", example: (f: string) => `An example from the same colour family (${f}).`,
    profileK: "Your profile", profileT: "How your colouring is built",
    undertone: "Undertone", cool: "cool", warm: "warm", undertoneWhat: "The undertone beneath your skin: more pink and blue (cool) or more gold and peach (warm). It doesn't change with a tan.",
    undertoneCool: "You're cool: silver, icy white, navy and blue-red make you look fresh. Gold, orange and cream make you look grey.", undertoneWarm: "You're warm: gold, cream, camel and tomato red make you glow. Icy white, silver grey and blue-pink make you look pale.", undertoneMid: "You sit in the middle: choose colours that are not clearly warm or cool, like soft navy, rosewood and taupe.",
    depth: "Depth", light: "light", deep: "deep", depthWhat: "How light or dark your hair, eyes and skin are together. It decides how light or dark your colours can be.",
    depthDeep: "You're deep: dark, saturated colours carry you. Pastels fade next to you.", depthLight: "You're light: light and medium tones make you glow. Black and very dark colours are too heavy.", depthMid: "You sit in the middle: medium tones are your base. Use very light and very dark sparingly.",
    clarity: "Clarity", soft: "soft", clear: "clear", clarityWhat: "How clear your eyes and the contrast in your face are. It decides whether your colours should be bright or muted.",
    clarityClear: "You're clear: pure, bright colours match your eyes. Dusty, greyish shades make you look tired.", claritySoft: "You're soft: muted, slightly greyed colours make you look polished. Bright colours overpower you.", clarityMid: "You sit in the middle: colours with some depth, not neon and not dusty.",
    named: (f: string) => `Often named as ${f}`,
    youAre: (s: string, u: string, d: string, c: string) => <>You're a <b>{s}</b>: a {u} undertone, {d} in depth and {c} in clarity. Colours close to that point make your face look calm and clear. Colours far away pull attention from your face.</>,
    paletteK: "Your palette", paletteT: "Your 30 colours", combosK: "How to wear it", combosT: "Combinations that work",
    wornK: "What it looks like", wornT: (s: string) => `${s}, worn`, wornAlt: (s: string) => `Two outfits in the colours of ${s}`, wornLede: "This is how people with your colour type dress: one colour family, from top to toe.",
    basicsK: "Where to start", basicsT: "Your basics and your first 5 buys",
    auditK: "Ten minutes", auditT: "Check your wardrobe", auditLede: "You don't need to buy everything again. Start with what you already own.",
    keep: "Keep", keepText: "Looks like one of your colours or makes your face light up.", below: "Below the waist", belowText: (men: boolean) => `Not your colour, but loved: wear it ${men ? "as trousers or shoes" : "as trousers, a skirt or shoes"}, away from your face.`,
    out: "Let go", outText: "Not your colour, and you haven't worn it in a year. Sell it second-hand or give it away; the money goes towards your first piece from your palette.",
    detailsK: "The details", detailsT: (men: boolean): string => (men ? "Watch, belt, shoes and glasses" : "Jewellery, bag and make-up"),
    swapsK: "What doesn't suit you", swapsT: "Not this, but this", choose: "Choose", swapsBody: (men: boolean) => `No need to throw them out. Below the waist, ${men ? "as trousers or shoes" : "as trousers, a skirt or shoes"}, they stand out less.`,
    capsuleK: "Your wardrobe", capsuleT: "12 pieces that work together", capsuleBody: "Everything in your colours, so everything combines. Replace what you own one piece at a time.",
    alwaysK: "Always with you", alwaysT: "In the shop and on your phone", home: "Put your colours on your home screen",
    iphone: (site: string) => <>Open {site || "the site"} in Safari · tap Share (square with arrow) · choose <em>Add to Home Screen</em>.</>, android: <>Open in Chrome · tap ⋮ · choose <em>Add to Home screen</em>.</>,
    pass: "Colour card", qrAlt: (site: string, code: string) => `QR code to ${site} with friend code ${code}`, share: "Share your colours", shareText: (site: string) => <>Your friends get €1 off their guide. Scan the code or go to <b>{site}</b>.</>,
    pushFail: "That didn't work right now. Please try again later.", footer: "Recommended by colour, never by commission.",
    shopK: "Shop your colours", shopT: "For sale now, in your colours", shopLede: "Real products whose colour we measured. Every piece matches a colour from your palette.", shopNote: "Links to shops are affiliate links: we get a small fee, you pay nothing extra. Recommended by colour, never by commission.",
  },
} satisfies Record<Locale, unknown>;
type Text = (typeof TEXT)["nl"];

type R = ReturnType<typeof flowSession.result>;

/** The personal style guide: an editorial document on screen, exact A4 pages as PDF. */
export default function Guide() {
  const { config, voice, copy, segment, locale } = useBrand();
  const gc = copy.guide;
  const T: Text = TEXT[locale];
  const it = (nl: string) => garmentName(nl, locale);
  const [r, setR] = useState<R>(null);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [qr, setQr] = useState<string | null>(null);
  const [pdf, setPdf] = useState<"idle" | "busy" | "error">("idle");
  const [site, setSite] = useState("");

  const [access, setAccess] = useState<Access | null>(null);

  // the guide opens only for an order the server confirms as paid (link from the mail: ?o=&k=)
  useEffect(() => {
    void (async () => {
      const q = new URLSearchParams(location.search);
      const o = q.get("o"), k = q.get("k");
      const key = o && k ? { ref: o, k } : orderKey.get();
      let a = await verifyAccess(key);
      // offline but verified before on this device: let it open (no network in the shop)
      if (a.state === "offline" && key && flowSession.result()?.paid) a = { state: "paid", tier: "digital" };
      if (o && k) history.replaceState(null, "", location.pathname);
      setAccess(a);
      const res = flowSession.result();
      if (a.state === "paid" && res && !res.refCode) flowSession.update({ refCode: makeReferralCode(res.name) });
      const fresh = flowSession.result();
      setR(fresh);
      setName(fresh?.name ?? "");
      setSite(location.host);
      setLoaded(true);
      if (a.state === "paid") track("guide_opened", { brand: config.key, voice }, {});
    })();
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
  const g = useMemo(() => (r ? (locale === "en" ? guideEn(buildGuide(r.profile, config.key)) : buildGuide(r.profile, config.key)) : null), [r, config.key, locale]);

  if (!loaded) return <main className="screen" />;
  if (!r || !g) return <Locked title={T.lockedTitle} text={T.noProfile} href="/" cta={T.start} />;
  if (access?.state === "pending") return <Locked title={T.lockedTitle} text={T.pending} href="/klaar" cta={T.order} />;
  if (access?.state !== "paid") return <Locked title={T.lockedTitle} text={T.notPaid} href="/resultaat" cta={T.options} />;

  const date = new Date(r.at);
  const month = date.toLocaleDateString(locale === "en" ? "en-GB" : "nl-NL", { month: "long", year: "numeric" });
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
  const familyShown = familyName(family, locale);
  const named = oftenNamed(r.profile.match.season, config.key, locale);
  const model = [...peopleFor(config.key, segment), ...PEOPLE[config.key]].find((p) => familyOf(p.season as SeasonKey) === family) ?? PEOPLE[config.key][0];
  let page = 1;
  const next = () => String(++page).padStart(2, "0");

  return (
    <main className={`guide g-${voice} g-${config.key}`}>
      <div className="g-toolbar">
        <Wordmark />
        <label className="g-name">
          <span>{T.nameLabel}</span>
          <input value={name} onChange={(e) => saveName(e.target.value)} placeholder={T.namePh} autoComplete="given-name" />
        </label>
        <button className="btn btn-sm" disabled={pdf === "busy"} onClick={async () => {
          setPdf("busy");
          const ok = await downloadGuidePdf(`${config.name}-${T.file}-${g.season.replace(/\s+/g, "-").toLowerCase()}.pdf`);
          setPdf(ok ? "idle" : "error");
          if (ok) track("guide_pdf", { brand: config.key, voice }, {});
        }}>{pdf === "busy" ? T.pdfBusy : T.pdf}</button>
      </div>
      <PushToggle season={r.profile.match.season} />

      {/* 01 cover */}
      <section className="g-page g-cover">
        <div className="g-cover-top">
          <HouseMark />
        </div>
        <span className="g-cover-issue">N°01 · {month}</span>
        <img className="g-cover-photo" src={coverPhoto(r.profile.match.season, config.key)} alt="" width={800} height={1600} />
        <div className="g-cover-bars" aria-hidden="true">{g.pass.map((c) => <i key={c.hex} style={{ background: c.hex }} />)}</div>
        <div className="g-cover-mid">
          <p className="g-kicker">{T.guideFor(name)}</p>
          <h1 className="g-season">{g.season}</h1>
          <p className="g-family">{g.family}{g.second ? T.border(g.second) : ""}</p>
        </div>
        <p className="g-cover-tag">{gc.tagline}</p>
        {r.declared && <p className="g-cover-note">{T.declared(g.season)}</p>}
      </section>

      {/* 02 summary */}
      <Page n={next()} kicker={T.glanceK} title={T.glanceT} footer={T.footer}>
        <p className="g-lede">{gc.summary}</p>
        <div className="g-sum">
          <div className="g-sum-type"><span>{T.type}</span><b>{g.season}</b><em>{g.scales.undertone} · {g.scales.depth} · {g.scales.clarity}</em></div>
          <div className="g-sum-block"><span>{T.core}</span><Strip colors={g.summary.core} named /></div>
          <div className="g-sum-block"><span>{T.avoid}</span><Strip colors={g.summary.avoid} named crossed /></div>
          <div className="g-sum-row">
            <div><span>{T.metal}</span><b>{g.summary.metal}</b></div>
            <div><span>{T.leather}</span><b>{g.summary.leather}</b></div>
            <div><span>{T.contrast}</span><b>{g.contrast.title.replace(/^(Jij|You) /, "").replace(/^\w/, (c) => c.toUpperCase())}</b></div>
          </div>
          <ol className="g-rules">{g.summary.rules.map((rule) => <li key={rule}>{rule}</li>)}</ol>
        </div>
      </Page>

      {/* 03 the effect, shown on an AI model of the same family */}
      {model && (
        <Page n={next()} kicker={T.effectK} title={T.effectT} footer={T.footer}>
          <p className="g-lede">{gc.effect}</p>
          <div className="g-effect">
            <figure>
              <Drape photo={model.src} face={{ ...model.face, mirrored: false }} color={model.bad} fit={{ w: 0.42, cy: 0.38 }} />
              <figcaption><b>✕ {colourName(nameForHex(model.bad, config.key) ?? T.badFallback, locale)}</b><span>{T.badLine}</span></figcaption>
            </figure>
            <figure>
              <Drape photo={model.src} face={{ ...model.face, mirrored: false }} color={model.good} fit={{ w: 0.42, cy: 0.38 }} />
              <figcaption><b>✓ {colourName(nameForHex(model.good, config.key) ?? T.goodFallback, locale)}</b><span>{T.goodLine}</span></figcaption>
            </figure>
          </div>
          <p className="g-caption">{T.example(familyShown)}</p>
        </Page>
      )}

      {/* colouring */}
      <Page n={next()} kicker={T.profileK} title={T.profileT} footer={T.footer}>
        <div className="g-scales">
          <Scale label={T.undertone} word={g.scales.undertone} value={(g.scales.values.undertone + 1) / 2} left={T.cool} right={T.warm} what={T.undertoneWhat}
            mine={g.scales.values.undertone < -0.15 ? T.undertoneCool : g.scales.values.undertone > 0.15 ? T.undertoneWarm : T.undertoneMid} />
          <Scale label={T.depth} word={g.scales.depth} value={g.scales.values.depth} left={T.light} right={T.deep} what={T.depthWhat}
            mine={g.scales.values.depth >= 0.6 ? T.depthDeep : g.scales.values.depth < 0.35 ? T.depthLight : T.depthMid} />
          <Scale label={T.clarity} word={g.scales.clarity} value={g.scales.values.clarity} left={T.soft} right={T.clear} what={T.clarityWhat}
            mine={g.scales.values.clarity >= 0.6 ? T.clarityClear : g.scales.values.clarity < 0.35 ? T.claritySoft : T.clarityMid} />
        </div>
        <div className="g-callout"><b>{g.contrast.title}</b><p>{g.contrast.text}</p></div>
        {named.names.length > 0 && <p className="g-named"><span>{T.named(familyName(named.family, locale))}</span>{named.names.join(" · ")}</p>}
        <p className="g-body">{T.youAre(g.season, g.scales.undertone, g.scales.depth, g.scales.clarity)}</p>
      </Page>

      {/* 30 colours */}
      <Page n={next()} kicker={T.paletteK} title={T.paletteT} footer={T.footer}>
        {g.groups.map((gr) => (
          <div key={gr.title} className="g-group">
            <div className="g-group-head"><b>{gr.title}</b><span>{gr.text}</span></div>
            <div className="g-swatches">{gr.colors.map((c) => <Chip key={c.hex} c={c} />)}</div>
          </div>
        ))}
      </Page>

      {/* combinations */}
      <Page n={next()} kicker={T.combosK} title={T.combosT} footer={T.footer}>
        <p className="g-lede">{gc.combos}</p>
        <div className="g-combos">
          {g.combos.map((c) => (
            <div key={c.title} className="g-combo">
              <FlatLay pieces={c.pieces} extras={c.extras} className="g-flatlay" brand={config.key} />
              <div>
                <b>{c.title}</b>
                <ul>{[...c.pieces, ...c.extras].map((pc) => <li key={pc.item + pc.color.hex}><Dot hex={pc.color.hex} />{it(pc.item)} · {pc.color.name}</li>)}</ul>
                <p className="g-tip">{c.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </Page>

      {/* the colour type, worn */}
      <Page n={next()} kicker={T.wornK} title={T.wornT(g.season)} footer={T.footer}>
        <div className="g-worn">
          <img src={`/brand/outfits/${r.profile.match.season}-both.jpg`} alt={T.wornAlt(g.season)} width={1400} height={1400} />
          <div>
            <p className="g-lede">{T.wornLede}</p>
            <ol className="g-rules">{g.summary.rules.map((rule) => <li key={rule}>{rule}</li>)}</ol>
          </div>
        </div>
      </Page>

      {/* basics + first five buys */}
      <Page n={next()} kicker={T.basicsK} title={T.basicsT} footer={T.footer}>
        <div className="g-basics">
          {g.basics.map((b) => (
            <div key={b.title} className="g-basic">
              <i style={{ background: b.color.hex }} />
              <b>{b.title}</b>
              <span className="g-basic-name">{b.color.name}</span>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
        <ol className="g-buys">
          {g.firstBuys.map((b) => (
            <li key={b.item}>
              <span className="g-buy-img"><Piece item={b.item} color={b.color.hex} brand={config.key} /></span>
              <div><b>{it(b.item)} · {b.color.name}</b><p>{b.why}</p></div>
            </li>
          ))}
        </ol>
      </Page>

      {/* wardrobe check */}
      <Page n={next()} kicker={T.auditK} title={T.auditT} footer={T.footer}>
        <p className="g-lede">{T.auditLede}</p>
        <ol className="g-audit">{g.audit.map((a) => <li key={a}>{a}</li>)}</ol>
        <div className="g-audit-piles">
          <div><b>{T.keep}</b><span>{T.keepText}</span><Strip colors={g.summary.core.slice(0, 4)} named /></div>
          <div><b>{T.below}</b><span>{T.belowText(men)}</span><Strip colors={g.summary.avoid.slice(0, 3)} named crossed /></div>
          <div><b>{T.out}</b><span>{T.outText}</span></div>
        </div>
      </Page>

      {/* accessories (+ make-up) */}
      <Page n={next()} kicker={T.detailsK} title={T.detailsT(men)} footer={T.footer}>
        <div className="g-acc">
          {[...g.accessories, ...(g.makeup ?? [])].map((a) => (
            <div key={a.title} className="g-acc-item">
              {ACC_FLAT[a.title] ? (
                <div className="g-acc-flat"><Flat kind={ACC_FLAT[a.title]!} color={a.swatches[ACC_FLAT[a.title] === "watch" ? 1 : 0]?.hex ?? a.swatches[0]!.hex} second={a.swatches.find((x) => /goud|zilver|platina|brons|koper|gold|silver|platinum|bronze|copper/i.test(x.name))?.hex} /></div>
              ) : null}
              <div className="g-acc-sw">{a.swatches.map((s) => <i key={s.name + s.hex} style={{ background: s.hex }} title={s.name} />)}</div>
              <b>{a.title}</b>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </Page>

      {/* not this, but this */}
      <Page n={next()} kicker={T.swapsK} title={T.swapsT} footer={T.footer}>
        <p className="g-lede">{gc.swaps}</p>
        <div className="g-swaps">
          {g.swaps.map((s) => (
            <div key={s.avoid.hex} className="g-swap">
              <div className="g-swap-pair">
                <i className="no" style={{ background: s.avoid.hex }} />
                <span aria-hidden="true">→</span>
                <i style={{ background: s.instead.hex }} />
              </div>
              <p><b>{s.avoid.name}</b> {s.reason}. {T.choose} <b>{s.instead.name}</b>.</p>
            </div>
          ))}
        </div>
        <p className="g-body">{T.swapsBody(men)}</p>
      </Page>

      {/* capsule */}
      <Page n={next()} kicker={T.capsuleK} title={T.capsuleT} footer={T.footer}>
        <div className="g-capsule">
          {g.capsule.map((c, i) => (
            <div key={i} className="g-cap-item"><span className="g-cap-img"><Piece item={c.item} color={c.color.hex} brand={config.key} /></span><b>{it(c.item)}</b><span>{c.color.name}</span></div>
          ))}
        </div>
        <p className="g-body">{T.capsuleBody}</p>
      </Page>

      {/* shop, home screen, friends */}
      {/* products in these colours from the catalogue; renders nothing while the catalogue is empty */}
      <ShopPage brand={config.key} palette={g.groups.flatMap((gr) => gr.colors)} avoid={g.avoid.map((a) => a.color.hex)} T={T} locale={locale} />

      <Page n={next()} kicker={T.alwaysK} title={T.alwaysT} footer={T.footer}>
        <ul className="g-tips">{g.shopping.slice(0, 4).map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="g-two">
          <div className="g-home">
            <b>{T.home}</b>
            <ol>
              <li><span>iPhone</span> {T.iphone(site)}</li>
              <li><span>Android</span> {T.android}</li>
            </ol>
          </div>
          <div className="g-pass-card">
            <div className="g-pass-top"><Wordmark /><span>{T.pass}</span></div>
            <b>{g.season}</b>
            <Strip colors={g.pass} />
          </div>
        </div>
        {r.refCode && (
          <div className="g-friend">
            {qr && <img src={qr} alt={T.qrAlt(site, r.refCode)} width={120} height={120} />}
            <div>
              <span className="g-kicker">{T.share}</span>
              <b className="g-code">{r.refCode}</b>
              <p>{T.shareText(site)}</p>
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
  const { config, voice, copy, ctx, locale } = useBrand();
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
        {failed && <p className="g-push-err">{TEXT[locale].pushFail}</p>}
      </div>
      {state === "off" && <button className="btn btn-sm" disabled={busy} onClick={on}>{t.cta}</button>}
      {state === "on" && <button className="link-btn" disabled={busy} onClick={off}>{t.off}</button>}
    </aside>
  );
}

function Page({ n, kicker, title, footer, children }: { n: string; kicker: string; title: string; footer: string; children: React.ReactNode }) {
  return (
    <section className="g-page">
      <header className="g-head">
        <div><span className="g-kicker">{kicker}</span><h2>{title}</h2></div>
        <span className="g-n">{n}</span>
      </header>
      <div className="g-content">{children}</div>
      <footer className="g-foot"><HouseMark /><span>{footer}</span></footer>
    </section>
  );
}

type ShopItem = { id: number; shop: string; title: string; image_url: string | null; price: number | null; old_price: number | null; category: string; colour: string; hex: string };
const SHOP_LABEL_EN: Record<string, string> = {
  overhemd: "Shirts", blouse: "Blouses", top: "Tops and tees", trui: "Knitwear", vest: "Cardigans", colbert: "Jackets and blazers", jas: "Coats",
  broek: "Trousers", jeans: "Jeans", rok: "Skirts", jurk: "Dresses", schoenen: "Shoes", sneakers: "Sneakers", riem: "Belts",
  horloge: "Watches", sieraden: "Jewellery", sjaal: "Scarves", tas: "Bags", das: "Ties",
};
const SHOP_LABEL: Record<string, string> = {
  overhemd: "Overhemden", blouse: "Blouses", top: "Tops en shirts", trui: "Truien", vest: "Vesten", colbert: "Colberts en blazers", jas: "Jassen",
  broek: "Broeken", jeans: "Jeans", rok: "Rokken", jurk: "Jurken", schoenen: "Schoenen", sneakers: "Sneakers", riem: "Riemen",
  horloge: "Horloges", sieraden: "Sieraden", sjaal: "Sjaals", tas: "Tassen", das: "Dassen",
};
const SHOP_ORDER = ["overhemd", "blouse", "top", "trui", "vest", "colbert", "jas", "jurk", "broek", "jeans", "rok", "sjaal", "das", "schoenen", "sneakers", "riem", "tas", "horloge", "sieraden"];

/** "Shop je kleuren": real products whose measured colour matches this palette (CLAUDE.md §7). */
function ShopPage({ brand, palette, avoid, T, locale }: { brand: string; palette: Swatch[]; avoid: string[]; T: Text; locale: Locale }) {
  const [items, setItems] = useState<ShopItem[] | null>(null);
  useEffect(() => {
    const a = loadAnswers();
    fetch("/api/shop", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ brand, palette, avoid, budget: a.budget, shops: a.shops }) })
      .then((r) => r.json())
      .then((d: { products?: ShopItem[] }) => setItems(d.products ?? []))
      .catch(() => setItems([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);
  if (!items?.length) return null;
  const cats = SHOP_ORDER.filter((c) => items.some((i) => i.category === c));
  return (
    <section className="g-page g-shop">
      <header className="g-head">
        <div><span className="g-kicker">{T.shopK}</span><h2>{T.shopT}</h2></div>
      </header>
      <div className="g-content">
        <p className="g-lede">{T.shopLede}</p>
        {cats.map((c) => (
          <div key={c} className="g-shop-cat">
            <b>{(locale === "en" ? SHOP_LABEL_EN : SHOP_LABEL)[c] ?? c}</b>
            <div className="g-shop-row">
              {items.filter((i) => i.category === c).map((i) => (
                <a key={i.id} className="g-shop-item" href={`/go/${i.id}`} target="_blank" rel="sponsored noopener nofollow" onClick={() => track("affiliate_click", { brand: brand as "kulort" | "nyanse", voice: "none" }, { shop: i.shop, category: i.category })}>
                  {i.image_url && <img src={i.image_url} alt="" loading="lazy" decoding="async" />}
                  <span className="g-shop-match"><i style={{ background: i.hex }} />{i.colour}</span>
                  <span className="g-shop-title">{i.title}</span>
                  <span className="g-shop-meta">{i.shop}{i.price != null && <> · {i.old_price ? <><s>€{i.old_price.toFixed(2).replace(".", ",")}</s> </> : null}€{i.price.toFixed(2).replace(".", ",")}</>}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
        <p className="g-caption">{T.shopNote}</p>
      </div>
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
/**
 * A real PDF file (founder, 18 Oct: no print dialog). Every page is drawn at A4 size (794 × 1123 px)
 * in an export mode, turned into an image and put on an A4 page. The browser then saves the file:
 * Downloads on a computer, "Save to Files" on an iPhone.
 */
async function downloadGuidePdf(filename: string): Promise<boolean> {
  const root = document.querySelector<HTMLElement>(".guide");
  if (!root) return false;
  root.classList.add("g-export");
  try {
    await document.fonts.ready;
    const [{ toJpeg }, { jsPDF }] = await Promise.all([import("html-to-image"), import("jspdf")]);
    // the shop page is live content with photos from other sites: it stays on screen only
    const pages = [...root.querySelectorAll<HTMLElement>(".g-page:not(.g-shop)")];
    const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    for (let i = 0; i < pages.length; i++) {
      const el = pages[i]!;
      const bg = getComputedStyle(el).backgroundColor || "#f8f5f0";
      const data = await toJpeg(el, { quality: 0.88, pixelRatio: 2, backgroundColor: bg, width: 794, height: 1123 });
      if (i) doc.addPage();
      doc.addImage(data, "JPEG", 0, 0, 210, 297, undefined, "FAST");
    }
    doc.save(filename);
    return true;
  } catch (e) {
    console.error("pdf", e);
    return false;
  } finally {
    root.classList.remove("g-export");
  }
}

function Scale({ label, word, value, left, right, what, mine }: { label: string; word: string; value: number; left: string; right: string; what: string; mine: string }) {
  return (
    <div className="g-scale">
      <div className="g-scale-head"><span>{label}</span><b>{word}</b></div>
      <div className="g-scale-track"><i style={{ left: `${Math.max(2, Math.min(98, value * 100))}%` }} /></div>
      <div className="g-scale-ends"><span>{left}</span><span>{right}</span></div>
      <p className="g-scale-what">{what}</p>
      <p className="g-scale-mine">{mine}</p>
    </div>
  );
}
function Locked({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <main className="screen">
      <div className="pad" style={{ justifyContent: "center", textAlign: "center", minHeight: "70svh" }}>
        <h1 className="disp sm">{title}</h1>
        <p className="sub" style={{ margin: "0 auto" }}>{text}</p>
        <Link className="btn" href={href}>{cta}</Link>
      </div>
    </main>
  );
}

/** The cover: a model dressed in this exact season (Gemini portrait) when we have one, else the flat-lay. */
function coverPhoto(season: SeasonKey, brand: string): string {
  const key = `${season}-${brand}`;
  return (HEROES as string[]).includes(key) ? `/brand/heroes/${key}.jpg` : `/brand/outfits/${key}.jpg`;
}
