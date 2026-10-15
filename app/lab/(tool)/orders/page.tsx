"use client";

import { useEffect, useState } from "react";

type Order = {
  ref: string; created_at: string; status: string; tier: string; amount_cents: number; brand: string; season: string | null;
  email: string; name: string | null; street: string | null; postcode: string | null; city: string | null; country: string | null;
  friend_code: string | null; paid_at: string | null; mailed_at: string | null;
};

const TIER: Record<string, string> = { digital: "Stijlgids", card: "Gids + pas", session: "Sessie" };
const euro = (c: number) => `€${(c / 100).toFixed(2).replace(".", ",")}`;

// The founder's order desk: match a transfer by reference, click Betaald → the buyer gets the
// guide link by mail. Then Verzonden for the card.
export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [filter, setFilter] = useState<"open" | "all">("open");

  const load = () => fetch("/api/lab/orders").then((r) => r.json()).then((d) => setOrders(Array.isArray(d) ? d : [])).catch(() => setOrders([]));
  useEffect(() => void load(), []);

  async function set(ref: string, status: string) {
    if (status === "paid" && !confirm(`Is de overschrijving voor ${ref} binnen? Dan krijgt de klant zijn stijlgids.`)) return;
    const r = await fetch("/api/lab/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref, status }) });
    const d = (await r.json()) as { ok?: boolean; link?: string; mailed?: boolean; mailConfigured?: boolean };
    if (!d.ok) setMsg("Dat lukte niet.");
    else if (status === "paid") {
      setMsg(d.mailed ? `${ref}: betaald, de klant heeft de link gemaild gekregen.` : `${ref}: betaald. Mail is nog niet ingesteld: stuur deze link zelf → ${d.link}`);
      if (!d.mailed && d.link) void navigator.clipboard?.writeText(d.link).catch(() => {});
    } else setMsg(`${ref}: ${status}`);
    void load();
  }

  const list = (orders ?? []).filter((o) => filter === "all" || ["awaiting_payment", "paid"].includes(o.status));
  return (
    <div className="stack">
      <h1>Bestellingen</h1>
      <p className="muted small">Zoek het kenmerk (KN-…) in de omschrijving van de overschrijving, controleer het bedrag en klik op Betaald. Bij Betaald krijgt de klant de link naar zijn stijlgids.</p>
      <p className="small">
        <button onClick={() => setFilter("open")} disabled={filter === "open"}>Open</button>{" "}
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>Alles</button>{" "}
        <button onClick={() => void load()}>Vernieuwen</button>
      </p>
      {msg && <p className="pill">{msg}</p>}
      {orders === null ? <p className="muted">Laden…</p> : list.length === 0 ? <p className="muted">Geen bestellingen.</p> : (
        <table>
          <thead><tr><th>Kenmerk</th><th>Datum</th><th>Wat</th><th>Bedrag</th><th>Klant</th><th>Adres</th><th>Status</th><th /></tr></thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.ref}>
                <td><b>{o.ref}</b><br /><span className="muted small">{o.brand}{o.season ? ` · ${o.season}` : ""}</span></td>
                <td className="small">{new Date(o.created_at).toLocaleString("nl-NL", { dateStyle: "short", timeStyle: "short" })}</td>
                <td>{TIER[o.tier] ?? o.tier}{o.friend_code ? <><br /><span className="small muted">code {o.friend_code}</span></> : null}</td>
                <td><b>{euro(o.amount_cents)}</b></td>
                <td className="small">{o.email}</td>
                <td className="small">{o.tier !== "digital" ? <>{o.name}<br />{o.street}<br />{o.postcode} {o.city} · {o.country}</> : "–"}</td>
                <td className="small">{o.status}{o.mailed_at ? " · gemaild" : ""}</td>
                <td>
                  {o.status === "awaiting_payment" && <button onClick={() => set(o.ref, "paid")}>Betaald</button>}
                  {o.status === "paid" && o.tier !== "digital" && <button onClick={() => set(o.ref, "shipped")}>Verzonden</button>}
                  {o.status === "awaiting_payment" && <> <button onClick={() => set(o.ref, "cancelled")}>Annuleren</button></>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
