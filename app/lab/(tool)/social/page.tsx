"use client";

import { useEffect, useState } from "react";

type Slot = { key: string; at: string; kind: string; images: string[]; caption: string; state: { status: string; media_id: string | null; error: string | null } | null };
type Data = { configured: boolean; account: { id?: string; username?: string; error?: string } | null; slots: Slot[] };

// The Instagram calendar: what goes out when, what went out, and a skip button per post.
export default function Social() {
  const [d, setD] = useState<Data | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const load = () => fetch("/api/lab/social").then((r) => r.json()).then(setD).catch(() => setMsg("Laden lukte niet"));
  useEffect(() => void load(), []);
  const act = async (action: string, slot: string, label: string) => {
    if (action === "post" && !confirm("Nu echt op Instagram plaatsen?")) return;
    setMsg(`${label}…`);
    const r = await fetch("/api/lab/social", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, slot }) });
    setMsg(`${label}: ${JSON.stringify(await r.json())}`);
    void load();
  };
  const now = Date.now();
  return (
    <div className="stack">
      <h1>Instagram, automatisch</h1>
      {d && (
        <p className="small">
          Koppeling: {!d.configured ? <b>nog niet ingesteld (zie docs/marketing/AUTOPOST.md)</b> : d.account && "username" in d.account ? <b>✓ @{d.account.username}</b> : <b style={{ color: "#b42318" }}>fout: {d.account?.error}</b>}
        </p>
      )}
      <p className="muted small">Elke maandag en (de eerste weken) donderdag om 19:00 gaat de post vanzelf online. De dag ervoor krijg je een mail. Overslaan kan tot het moment zelf.</p>
      {msg && <p className="pill small" style={{ wordBreak: "break-all" }}>{msg}</p>}
      <div style={{ display: "grid", gap: 14 }}>
        {d?.slots.map((s) => {
          const st = s.state?.status;
          return (
            <div key={s.key} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 12, border: "1px solid #ddd", padding: 10, opacity: st === "skipped" ? 0.5 : 1 }}>
              <img src={s.images[0]} alt="" style={{ width: 110, aspectRatio: "4/5", objectFit: "cover" }} loading="lazy" />
              <div className="small" style={{ display: "grid", gap: 6, alignContent: "start" }}>
                <b>{new Date(s.at).toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {s.kind === "carousel" ? `carrousel (${s.images.length})` : "beeld"}</b>
                <span>{st === "published" ? `✓ geplaatst (${s.state?.media_id})` : st === "skipped" ? "overgeslagen" : st === "failed" ? `✗ mislukt: ${s.state?.error}` : new Date(s.at).getTime() < now ? "niet geplaatst" : "gepland"}</span>
                <details><summary>Bijschrift</summary><pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{s.caption}</pre></details>
                <span>
                  {st !== "published" && st !== "skipped" && <button onClick={() => act("skip", s.key, "Overslaan")}>Overslaan</button>}{" "}
                  {(st === "skipped" || st === "failed") && <button onClick={() => act("unskip", s.key, "Terugzetten")}>Terugzetten</button>}{" "}
                  {st !== "published" && d.configured && <button onClick={() => act("post", s.key, "Nu plaatsen")}>Nu plaatsen</button>}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
