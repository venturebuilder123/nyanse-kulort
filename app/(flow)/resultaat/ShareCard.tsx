"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand } from "../BrandProvider";

// "Deel je seizoen" (founder, 9 Nov 2026: nobody finds us; every free result should be able to bring
// the next visitor). A 9:16 story image drawn on the phone itself: the season, the first colours and
// the question back. The selfie goes on it only when the visitor ticks it, and only on their phone.
type Swatch = { name: string; hex: string };
const W = 1080, H = 1920;

const cssFont = (v: string, fallback: string) => {
  const f = typeof document === "undefined" ? "" : getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  return f ? `${f}, ${fallback}` : fallback;
};
const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });

async function draw(o: { season: string; colours: Swatch[]; photo: string | null; T: (typeof FLOW)["nl"]["share"] }): Promise<Blob> {
  await document.fonts.ready;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d")!;
  const body = cssFont("--font-manrope", "system-ui, sans-serif"), display = cssFont("--font-bodoni", "Georgia, serif");
  const top = 1120;
  // top: the selfie, or the colours themselves as tall stripes
  if (o.photo) {
    const img = await loadImg(o.photo);
    const s = Math.max(W / img.width, top / img.height);
    x.drawImage(img, (W - img.width * s) / 2, (top - img.height * s) / 2 * 0.6, img.width * s, img.height * s);
    // a band of the best colour across the bottom of the photo, like a drape
    x.fillStyle = o.colours[0]!.hex;
    x.fillRect(0, top - 150, W, 150);
  } else {
    const n = o.colours.length;
    o.colours.forEach((sw, i) => { x.fillStyle = sw.hex; x.fillRect(Math.floor((i * W) / n), 0, Math.ceil(W / n) + 1, top); });
  }
  // the logo on a soft shadow, so it reads on any colour
  x.fillStyle = "rgba(0,0,0,.28)";
  x.fillRect(0, 0, W, 140);
  x.fillStyle = "#fff";
  x.font = `500 38px ${display}`;
  x.textBaseline = "middle";
  x.fillText("KULØRT  |  NYANSE", 64, 78);
  // bottom: the claim and the question back
  x.fillStyle = "#141414";
  x.fillRect(0, top, W, H - top);
  x.fillStyle = "rgba(255,255,255,.7)";
  x.font = `800 40px ${body}`;
  x.textBaseline = "alphabetic";
  x.fillText(o.T.im, 64, top + 110);
  x.fillStyle = "#fff";
  x.font = `italic 400 136px ${display}`;
  const words = o.season.split(" ");
  words.forEach((w, i) => x.fillText(w, 60, top + 240 + i * 138));
  const sy = top + 240 + (words.length - 1) * 138 + 96;
  // the first six colours as dots
  o.colours.slice(0, 6).forEach((sw, i) => {
    x.beginPath(); x.arc(64 + 46 + i * 160, sy, 46, 0, Math.PI * 2); x.fillStyle = sw.hex; x.fill();
    x.lineWidth = 3; x.strokeStyle = "rgba(255,255,255,.25)"; x.stroke();
  });
  x.fillStyle = "#fff";
  x.font = `800 60px ${body}`;
  x.fillText(o.T.ask, 64, H - 190);
  x.fillStyle = "rgba(255,255,255,.75)";
  x.font = `600 36px ${body}`;
  x.fillText(`${o.T.sub} · kulort-nyanse.com`, 64, H - 120);
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
      const url = `https://www.kulort-nyanse.com${locale === "en" ? "/en" : ""}/?utm_source=share&utm_medium=story&utm_content=${encodeURIComponent(season.toLowerCase().replace(/\s+/g, "-"))}`;
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
      <div className="share-preview" aria-hidden="true">{colours.slice(0, 6).map((c) => <i key={c.hex} style={{ background: c.hex }} />)}</div>
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
