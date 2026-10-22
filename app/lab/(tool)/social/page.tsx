"use client";

import { useEffect, useState } from "react";

type Slot = { key: string; at: string; kind: string; images: string[]; caption: string; title?: string; state: { status: string; media_id: string | null; error: string | null } | null };
type Data = { configured: boolean; account: { id?: string; username?: string; error?: string } | null; youtubeConfigured: boolean; youtube: { id?: string; title?: string; error?: string } | null; slots: Slot[] };

// The Instagram calendar: what goes out when, what went out, and a skip button per post.
export default function Social() {
  const [d, setD] = useState<Data | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const load = () => fetch("/api/lab/social").then((r) => r.json()).then(setD).catch(() => setMsg("Laden lukte niet"));
  useEffect(() => void load(), []);
  const act = async (action: string, slot: string, label: string) => {
    if (action === "post" && !confirm("Nu echt plaatsen?")) return;
    if (action === "manual" && !confirm("Heb je deze post zelf geplaatst? Dan plaatst het systeem hem niet meer.")) return;
    setMsg(`${label}…`);
    const r = await fetch("/api/lab/social", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, slot }) });
    setMsg(`${label}: ${JSON.stringify(await r.json())}`);
    void load();
  };
  const now = Date.now();
  const blocked = /API access blocked/i.test(d?.account?.error ?? "");
  const copy = async (text: string) => { try { await navigator.clipboard.writeText(text); setMsg("Bijschrift gekopieerd"); } catch { setMsg("Kopiëren lukte niet: open 'Bijschrift' en selecteer de tekst"); } };
  return (
    <div className="stack">
      <h1>Instagram en YouTube, automatisch</h1>
      {d && (
        <p className="small">
          YouTube: {!d.youtubeConfigured ? <b>nog niet ingesteld (zie docs/marketing/YOUTUBE.md)</b> : d.youtube && "title" in d.youtube ? <b>✓ {d.youtube.title}</b> : <b style={{ color: "#b42318" }}>fout: {d.youtube?.error}</b>}
          <br />
          Instagram: {!d.configured ? <b>nog niet ingesteld (zie docs/marketing/AUTOPOST.md)</b> : d.account && "username" in d.account ? <b>✓ @{d.account.username}</b> : <b style={{ color: "#b42318" }}>{blocked ? "Meta blokkeert de API (tijdelijk)" : `fout: ${d.account?.error}`}</b>}
        </p>
      )}
      {blocked && (
        <div className="small" style={{ border: "1px solid #f0c36d", background: "#fff8e6", padding: 12, display: "grid", gap: 6 }}>
          <b>Zo gaat er toch niets verloren</b>
          <span>Geplande posts blijven klaarstaan en gaan vanzelf online zodra Meta de blokkade opheft (tot 2 dagen na het geplande moment).</span>
          <span>Wil je niet wachten? Per post hieronder: <b>Download beelden</b> → <b>Kopieer bijschrift</b> → plaats hem in de Instagram-app of plan hem in Meta Business Suite → klik <b>Met de hand geplaatst</b>. Dan plaatst het systeem hem niet nog een keer.</span>
        </div>
      )}
      <p className="muted small">Dinsdag 19:00 een reel (en dezelfde video als YouTube Short), woensdag 18:30 de seizoenscarrousel, donderdag 12:00 een beeld: alles gaat vanzelf online. De dag ervoor krijg je een mail. Overslaan kan tot het moment zelf.</p>
      {msg && <p className="pill small" style={{ wordBreak: "break-all" }}>{msg}</p>}
      <div style={{ display: "grid", gap: 14 }}>
        {d?.slots.map((s) => {
          const st = s.state?.status;
          return (
            <div key={s.key} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 12, border: "1px solid #ddd", padding: 10, opacity: st === "skipped" ? 0.5 : 1 }}>
              <img src={s.kind === "reel" || s.kind === "short" ? s.images[1] : s.images[0]} alt="" style={{ width: 110, aspectRatio: "4/5", objectFit: "cover" }} loading="lazy" />
              <div className="small" style={{ display: "grid", gap: 6, alignContent: "start" }}>
                <b>{new Date(s.at).toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {s.kind === "carousel" ? `carrousel (${s.images.length})` : s.kind === "short" ? <>YouTube Short · <a href={s.images[0]} target="_blank" rel="noreferrer">bekijk video</a></> : s.kind === "reel" ? <>reel · <a href={s.images[0]} target="_blank" rel="noreferrer">bekijk video</a></> : "beeld"}</b>
                <span>{st === "published" && s.state?.media_id === "manual" ? "✓ met de hand geplaatst" : st === "published" ? `✓ geplaatst (${s.kind === "short" ? `youtube.com/shorts/${s.state?.media_id}` : s.state?.media_id})` : st === "skipped" ? "overgeslagen" : st === "processing" ? "⏳ Instagram verwerkt de video; het volgende uur gaat hij online" : st === "failed" ? `✗ mislukt: ${s.state?.error}` : new Date(s.at).getTime() < now ? "niet geplaatst" : "gepland"}</span>
                {s.kind !== "short" && st !== "published" && st !== "skipped" && (
                  <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(s.kind === "reel" ? [s.images[0]!] : s.images).map((u, i) => (
                      <a key={u} href={u} download target="_blank" rel="noreferrer">{s.kind === "reel" ? "Download video" : s.images.length > 1 ? `Beeld ${i + 1}` : "Download beeld"}</a>
                    ))}
                    <button onClick={() => copy(s.caption)}>Kopieer bijschrift</button>
                    <button onClick={() => act("manual", s.key, "Met de hand geplaatst")}>Met de hand geplaatst</button>
                  </span>
                )}
                <details><summary>Bijschrift</summary><pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{s.caption}</pre></details>
                <span>
                  {st !== "published" && st !== "skipped" && <button onClick={() => act("skip", s.key, "Overslaan")}>Overslaan</button>}{" "}
                  {(st === "skipped" || st === "failed") && <button onClick={() => act("unskip", s.key, "Terugzetten")}>Terugzetten</button>}{" "}
                  {st !== "published" && (s.kind === "short" ? d.youtubeConfigured : d.configured) && <button onClick={() => act("post", s.key, "Nu plaatsen")}>Nu plaatsen</button>}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
