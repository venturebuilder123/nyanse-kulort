"use client";

import { useEffect, useState } from "react";

type Feed = { id: number; network: string; program_id: string | null; shop: string; url: string; brands: string[]; active: boolean; last_import: string | null; last_count: number | null; last_error: string | null };
type Item = { id: number; shop: string; title: string; image_url: string | null; hex: string; category: string; gender: string | null; price: number | null; old_price: number | null };
type Data = { feeds: Feed[]; stats: { total: number; tagged: number; failed: number }; latest: Item[] };

// The catalogue desk: paste a feed URL once; the daily cron imports it and colour-tags the photos.
// Here you can also run a step by hand and eyeball whether the measured colours look right.
export default function Catalog() {
  const [d, setD] = useState<Data | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ shop: "", network: "daisycon", program_id: "", url: "", kulort: true, nyanse: true });

  const load = () => fetch("/api/lab/catalog").then((r) => r.json()).then(setD).catch(() => setMsg("Laden lukte niet (staat migratie 0007 in Supabase?)"));
  useEffect(() => void load(), []);

  async function act(body: Record<string, unknown>, label: string) {
    setBusy(true);
    setMsg(`${label}…`);
    const r = await fetch("/api/lab/catalog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : { error: "network" };
    setMsg(`${label}: ${JSON.stringify(j)}`);
    setBusy(false);
    void load();
  }

  return (
    <div className="stack">
      <h1>Catalogus</h1>
      <p className="muted small">Plak per goedgekeurd programma de productfeed-URL (bij voorkeur CSV, gefilterd op kleding). Elke nacht importeert de site alle feeds; elk uur meet hij de kleur van nieuwe productfoto&apos;s.</p>
      {d && <p><b>{d.stats.total}</b> producten · <b>{d.stats.tagged}</b> met kleur · {d.stats.failed} zonder (foto onleesbaar)</p>}
      {msg && <p className="pill small" style={{ wordBreak: "break-all" }}>{msg}</p>}

      <section className="stack" style={{ border: "1px solid #ccc", padding: 12 }}>
        <b>Feed toevoegen</b>
        <input placeholder="Winkelnaam (zo ziet de klant hem)" value={f.shop} onChange={(e) => setF({ ...f, shop: e.target.value })} />
        <select value={f.network} onChange={(e) => setF({ ...f, network: e.target.value })}>
          {["daisycon", "awin", "tradetracker", "partnerize", "other"].map((n) => <option key={n}>{n}</option>)}
        </select>
        <input placeholder="Programma-ID (optioneel)" value={f.program_id} onChange={(e) => setF({ ...f, program_id: e.target.value })} />
        <input placeholder="https://… productfeed-URL" value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} />
        <label className="small"><input type="checkbox" checked={f.kulort} onChange={(e) => setF({ ...f, kulort: e.target.checked })} /> KULØRT (heren)</label>
        <label className="small"><input type="checkbox" checked={f.nyanse} onChange={(e) => setF({ ...f, nyanse: e.target.checked })} /> NYANSE (dames)</label>
        <button disabled={busy || !f.shop || !f.url} onClick={() => act({ action: "add", shop: f.shop, network: f.network, program_id: f.program_id, url: f.url, brands: [f.kulort && "kulort", f.nyanse && "nyanse"].filter(Boolean) }, "Toevoegen").then(() => setF({ ...f, shop: "", url: "", program_id: "" }))}>Toevoegen</button>
      </section>

      <table>
        <thead><tr><th>Winkel</th><th>Netwerk</th><th>Voor</th><th>Laatste import</th><th /></tr></thead>
        <tbody>
          {d?.feeds.map((x) => (
            <tr key={x.id}>
              <td><b>{x.shop}</b>{!x.active && <span className="muted"> (uit)</span>}</td>
              <td className="small">{x.network}{x.program_id ? ` · ${x.program_id}` : ""}</td>
              <td className="small">{x.brands.join(", ")}</td>
              <td className="small">{x.last_import ? `${new Date(x.last_import).toLocaleString("nl-NL")} · ${x.last_count ?? 0} producten` : "nog niet"}{x.last_error && <><br /><span style={{ color: "#b42318" }}>{x.last_error}</span></>}</td>
              <td className="small">
                <button disabled={busy} onClick={() => act({ action: "import", id: x.id }, `Import ${x.shop}`)}>Importeer nu</button>{" "}
                <button disabled={busy} onClick={() => act({ action: "toggle", id: x.id, active: !x.active }, x.active ? "Uitzetten" : "Aanzetten")}>{x.active ? "Uit" : "Aan"}</button>{" "}
                <button disabled={busy} onClick={() => confirm(`Feed ${x.shop} en al zijn producten verwijderen?`) && act({ action: "delete", id: x.id }, "Verwijderen")}>Verwijder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="small">
        <button disabled={busy} onClick={() => act({ action: "tag" }, "Kleur meten (150)")}>Meet kleur van 150 producten</button>{" "}
        <button disabled={busy} onClick={() => confirm("Alle kleuren opnieuw meten?") && act({ action: "retag" }, "Opnieuw meten")}>Alles opnieuw meten</button>{" "}
        <button onClick={() => void load()}>Vernieuwen</button>
      </p>

      <b>Laatst gemeten: klopt het vlakje met de foto?</b>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
        {d?.latest.map((p) => (
          <div key={p.id} className="small" style={{ border: "1px solid #ddd", padding: 6 }}>
            {p.image_url && <img src={p.image_url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "contain", background: "#fff" }} loading="lazy" />}
            <div style={{ height: 18, background: p.hex, margin: "4px 0" }} title={p.hex} />
            <div>{p.shop} · {p.category} · {p.gender ?? "?"}</div>
            <div className="muted">{p.title.slice(0, 50)}</div>
            <div>{p.price != null ? `€${p.price}` : ""}{p.old_price ? <s className="muted"> €{p.old_price}</s> : null}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
