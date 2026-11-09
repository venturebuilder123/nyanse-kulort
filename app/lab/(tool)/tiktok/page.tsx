"use client";

import { useEffect, useState } from "react";

type Post = { key: string; day: string; video: string; cover: string; season: string; who: string; caption: string; campaign: string; posted: boolean };

// TikTok by hand (9 Nov 2026): today's video on top, download it, copy the text, post, tick it off.
export default function TikTok() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const load = () => fetch("/api/lab/tiktok").then((r) => r.json()).then((d) => setPosts(d.posts)).catch(() => setMsg("Laden lukte niet"));
  useEffect(() => void load(), []);
  const today = new Date().toISOString().slice(0, 10);
  const copy = async (t: string) => { try { await navigator.clipboard.writeText(t); setMsg("Tekst gekopieerd"); } catch { setMsg("Kopiëren lukte niet: selecteer de tekst zelf"); } };
  const mark = async (key: string, posted: boolean) => {
    await fetch("/api/lab/tiktok", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, posted }) });
    void load();
  };
  // open ones first: today's (or the oldest one still waiting) on top
  const list = posts ? [...posts.filter((p) => !p.posted), ...posts.filter((p) => p.posted)] : [];
  const done = posts?.filter((p) => p.posted).length ?? 0;
  return (
    <div className="stack">
      <h1>TikTok, met de hand</h1>
      <p className="muted small">
        Eén per dag, tussen 18:00 en 21:00. Per video: <b>Download video</b> → upload in TikTok → kies een geluid uit de Commercial Music Library → plak de tekst → zet <b>AI-generated content</b> aan → post → klik <b>Geplaatst</b>. Uitleg: docs/marketing/TIKTOK.md. De eerste 12 zijn de nieuwe <b>Colour Aura</b>-campagne (docs/marketing/AURA.md).
      </p>
      {posts && <p className="small"><b>{done} van {posts.length}</b> geplaatst</p>}
      {msg && <p className="pill small">{msg}</p>}
      <div style={{ display: "grid", gap: 14 }}>
        {list.map((p) => (
          <div key={p.key} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 12, border: p.day === today && !p.posted ? "2px solid #141414" : "1px solid #ddd", padding: 10, opacity: p.posted ? 0.5 : 1 }}>
            <video src={p.video} poster={p.cover} controls muted playsInline preload="none" style={{ width: 120, aspectRatio: "9/16", objectFit: "cover", background: "#eee" }} />
            <div className="small" style={{ display: "grid", gap: 8, alignContent: "start", minWidth: 0 }}>
              <b>{new Date(p.day).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" })}{p.day === today ? " · vandaag" : ""} · {p.season} · {p.who === "her" ? "voor haar" : "voor hem"}{p.campaign === "aura" ? " · ✦ Colour Aura" : ""}{p.posted ? " · ✓ geplaatst" : ""}</b>
              <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <a href={p.video} download>Download video</a>
                <button onClick={() => copy(p.caption)}>Kopieer tekst</button>
                {p.posted ? <button onClick={() => mark(p.key, false)}>Toch niet geplaatst</button> : <button onClick={() => mark(p.key, true)}>Geplaatst</button>}
              </span>
              <details><summary>Tekst</summary><p style={{ whiteSpace: "pre-wrap", margin: "6px 0 0" }}>{p.caption}</p></details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
