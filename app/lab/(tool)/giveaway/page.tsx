"use client";

import { useState } from "react";

type Draw = { entries: number; winners: string[]; reserves: string[]; drawnAt: string; error?: string };

// The giveaway draw (from 9 Nov 2026). Draw once and keep a screenshot: a new click draws again.
export default function GiveawayDraw() {
  const [d, setD] = useState<Draw | null>(null);
  const [busy, setBusy] = useState(false);
  const draw = async () => {
    if (d && !confirm("Opnieuw trekken? De vorige uitslag vervalt.")) return;
    setBusy(true);
    setD(await fetch("/api/lab/giveaway", { method: "POST" }).then((r) => r.json()).catch(() => ({ error: "mislukt" })));
    setBusy(false);
  };
  return (
    <div className="stack">
      <h1>Giveaway: trekking</h1>
      <p className="muted small">Alle unieke accounts die vóór zondag 8 november 23:59 reageerden onder de twee giveaway-posts doen één keer mee. Controleer daarna met de hand of de winnaars @kulortnyanse volgen. Maak een screenshot van de uitslag.</p>
      <button onClick={draw} disabled={busy}>{busy ? "Bezig…" : "Trek winnaars"}</button>
      {d?.error && <p className="pill small">{d.error}</p>}
      {d && !d.error && (
        <div className="small" style={{ display: "grid", gap: 8 }}>
          <p><b>{d.entries}</b> deelnemers · getrokken op {new Date(d.drawnAt).toLocaleString("nl-NL")}</p>
          <p><b>Winnaars:</b> {d.winners.map((w) => `@${w}`).join(", ") || "geen"}</p>
          <p><b>Reserves (in volgorde):</b> {d.reserves.map((w) => `@${w}`).join(", ") || "geen"}</p>
        </div>
      )}
    </div>
  );
}
