"use client";

import { prefixOf } from "@/lib/i18n/locale";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand } from "../BrandProvider";

// "Deel je seizoen" (founder, 9 Nov 2026: nobody finds us; every free result should be able to bring
// the next visitor). A 9:16 story image drawn on the phone itself, in the "Colour Aura" style: your
// palette as an aura, the season, the colours and the question back. The selfie goes on it only when the visitor ticks it, and only on their phone.
type Swatch = { name: string; hex: string };
const W = 1080, H = 1920;

const cssFont = (v: string, fallback: string) => {
  const f = typeof document === "undefined" ? "" : getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  return f ? `${f}, ${fallback}` : fallback;
};
const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

const rgb = (h: string) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255] as const; };
const mix = (a: string, b: string, w: number) => { const x = rgb(a), y = rgb(b); return "#" + x.map((v, i) => Math.round(v + (y[i]! - v) * w).toString(16).padStart(2, "0")).join(""); };
const lum = (h: string) => { const [r, g, b] = rgb(h); return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; };

/** The colour aura (as in the "Colour Aura" campaign, scripts/make-aura.ts): soft blobs of the palette, drawn small and scaled up. */
function aura(x: CanvasRenderingContext2D, colours: string[]) {
  const s = document.createElement("canvas"); s.width = W / 8; s.height = H / 8;
  const g = s.getContext("2d")!;
  g.fillStyle = mix(colours[colours.length - 1]!, "#ffffff", 0.35); g.fillRect(0, 0, s.width, s.height);
  colours.forEach((c, k) => {
    const a = k * 2.399 + 0.6, cx = s.width * (0.5 + 0.42 * Math.sin(a + 0.8)), cy = s.height * (0.5 + 0.44 * Math.cos(a * 1.3 + 0.6)), r = s.height * 0.46;
    const rg = g.createRadialGradient(cx, cy, 0, cx, cy, r); const m = mix(c, "#ffffff", 0.12);
    rg.addColorStop(0, m); rg.addColorStop(1, m + "00"); g.fillStyle = rg; g.fillRect(0, 0, s.width, s.height);
  });
  x.save(); x.imageSmoothingQuality = "high"; x.filter = "blur(18px)"; x.drawImage(s, -40, -40, W + 80, H + 80); x.restore();
  // film grain
  const n = document.createElement("canvas"); n.width = n.height = 256;
  const nd = n.getContext("2d")!, d = nd.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 22; }
  nd.putImageData(d, 0, 0);
  x.save(); x.globalCompositeOperation = "overlay"; x.fillStyle = x.createPattern(n, "repeat")!; x.fillRect(0, 0, W, H); x.restore();
}

async function draw(o: { season: string; colours: Swatch[]; photo: string | null; T: (typeof FLOW)["nl"]["share"] }): Promise<Blob> {
  const body = cssFont("--font-bricolage", "system-ui, sans-serif"), display = cssFont("--font-bodoni", "Georgia, serif");
  await Promise.all([`800 60px ${body}`, `500 40px ${body}`, `italic 400 60px ${display}`, `500 40px ${display}`].map((f) => document.fonts.load(f).catch(() => null)));
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d")!;
  const hexes = o.colours.slice(0, 7).map((sw) => sw.hex);
  aura(x, hexes);
  const dark = hexes.reduce((a, h) => a + lum(h), 0) / hexes.length < 0.36;
  const ink = dark ? "#FBF8F3" : "#141414", paper = dark ? "#141414" : "#FBF8F3";
  x.textAlign = "center"; x.textBaseline = "alphabetic"; x.fillStyle = ink;
  x.font = `500 40px ${display}`;
  x.fillText("KULØRT  |  NYANSE", W / 2, 130);
  x.font = `800 64px ${body}`;
  x.fillText(o.T.aura, W / 2, 300);
  let y = 0;
  if (o.photo) {
    // a polaroid with the selfie, only when the visitor ticked it (made on the phone)
    const img = await loadImg(o.photo);
    const PW = 720, PH = 900, pad = 30, CW = PW + 2 * pad, CH = PH + pad + 150, top = 380;
    x.save(); x.translate(W / 2, top + CH / 2); x.rotate(-0.03);
    x.shadowColor = "rgba(0,0,0,.28)"; x.shadowBlur = 60; x.shadowOffsetY = 24;
    x.fillStyle = "#FBF8F3"; x.fillRect(-CW / 2, -CH / 2, CW, CH); x.shadowColor = "transparent";
    x.save(); x.beginPath(); x.rect(-PW / 2, -CH / 2 + pad, PW, PH); x.clip();
    const s = Math.max(PW / img.width, PH / img.height);
    x.drawImage(img, -img.width * s / 2, -CH / 2 + pad + (PH - img.height * s) * 0.4, img.width * s, img.height * s);
    x.restore();
    x.fillStyle = "#2a2622"; x.font = `italic 400 64px ${display}`; x.fillText(o.season.toLowerCase(), 0, CH / 2 - 52);
    x.restore();
    y = top + CH + 110;
  } else {
    x.font = `italic 400 190px ${display}`;
    const words = o.season.toLowerCase().split(" ");
    words.forEach((w, i) => x.fillText(w, W / 2, 640 + i * 200));
    y = 640 + (words.length - 1) * 200 + 260;
  }
  // the colours as dots
  const r = 52, gap = 18, n = hexes.length, w = n * 2 * r + (n - 1) * gap;
  hexes.forEach((h, i) => {
    x.beginPath(); x.arc(W / 2 - w / 2 + r + i * (2 * r + gap), y, r, 0, Math.PI * 2); x.fillStyle = h; x.fill();
    x.lineWidth = 6; x.strokeStyle = "#FBF8F3"; x.stroke();
  });
  // the question back, and where to find out
  x.fillStyle = ink; x.font = `800 72px ${body}`;
  x.fillText(o.T.ask, W / 2, H - 400);
  x.font = `500 40px ${body}`;
  x.fillText(o.T.sub, W / 2, H - 330);
  x.font = `800 44px ${body}`;
  const pill = "kulort-nyanse.com", pw = x.measureText(pill).width + 80;
  x.beginPath(); x.roundRect((W - pw) / 2, H - 250, pw, 92, 46); x.fill();
  x.fillStyle = paper; x.fillText(pill, W / 2, H - 189);
  return new Promise((res) => c.toBlob((b) => res(b!), "image/png"));
}

export function ShareCard({ season, colours, photo }: { season: string; colours: Swatch[]; photo: string | null }) {
  const { ctx, locale } = useBrand();
  const T = FLOW[locale].share;
  const [withPhoto, setWithPhoto] = useState(false);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const share = async () => {
    setBusy(true); setNote(null);
    try {
      const blob = await draw({ season, colours, photo: withPhoto ? photo : null, T });
      const file = new File([blob], `${season.toLowerCase().replace(/\s+/g, "-")}.png`, { type: "image/png" });
      const url = `https://www.kulort-nyanse.com${prefixOf(locale)}/?utm_source=share&utm_medium=story&utm_content=${encodeURIComponent(season.toLowerCase().replace(/\s+/g, "-"))}`;
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: `${T.text(season)} ${url}` });
        track("share_clicked", ctx, { season, photo: withPhoto, method: "share" });
      } else {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob); a.download = file.name; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
        setNote(T.saved);
        track("share_clicked", ctx, { season, photo: withPhoto, method: "download" });
      }
    } catch (e) {
      // closing the share sheet is not an error
      if ((e as Error)?.name !== "AbortError") setNote(T.failed);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="share-card" aria-labelledby="share-h">
      <div className="share-preview" aria-hidden="true" style={{ background: colours.slice(0, 5).map((c, i) => `radial-gradient(circle at ${[20, 80, 30, 75, 50][i]}% ${[15, 30, 60, 85, 45][i]}%, ${c.hex} 0, transparent 62%)`).join(", ") + `, ${colours[0]?.hex ?? "#ddd"}` }} />
      <div className="share-copy">
        <h2 id="share-h">{T.title}</h2>
        <p>{T.lede}</p>
        {photo && (
          <label className="share-photo">
            <input type="checkbox" id="share-photo" checked={withPhoto} onChange={(e) => setWithPhoto(e.target.checked)} />
            <span>{T.withPhoto}</span>
          </label>
        )}
        <button type="button" className="btn" onClick={share} disabled={busy}>{busy ? FLOW[locale].wait : T.btn}</button>
        {note && <p className="small muted" role="status">{note}</p>}
      </div>
    </section>
  );
}
