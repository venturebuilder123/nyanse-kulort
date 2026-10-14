"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { flowSession } from "@/lib/flow/session";
import { MiniPass } from "../Hero";
import { AppBar, Footer } from "../ui";

type Status = "paid" | "open" | "failed";

/** Next weekly pass batch (Monday), CLAUDE.md §7. */
function nextBatch(from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
}

/** After payment: where the guide goes. Prefilled when the address is already known. */
function DeliveryMail() {
  const [mail, setMail] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const known = JSON.parse(sessionStorage.getItem("nk_email") ?? "null") as { email?: string } | null;
      if (known?.email) { setMail(known.email); setSaved(true); }
    } catch {}
  }, []);
  return saved ? (
    <p className="small">Je stijlgids komt naar {mail}.</p>
  ) : (
    <form
      className="row-inline mail-later"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const v = mail.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)) return;
        try {
          const prev = JSON.parse(sessionStorage.getItem("nk_email") ?? "{}") as { optin?: boolean };
          sessionStorage.setItem("nk_email", JSON.stringify({ email: v, optin: !!prev.optin }));
        } catch {}
        setSaved(true);
      }}
    >
      <input type="email" inputMode="email" autoComplete="email" autoCapitalize="none" placeholder="Waar sturen we je stijlgids heen?" value={mail} onChange={(e) => setMail(e.target.value)} aria-label="E-mailadres voor je stijlgids" />
      <button className="link-btn mail-send" type="submit">Stuur →</button>
    </form>
  );
}

// Confirmation after payment. Until Mollie is wired, the status comes from ?status= (paid|open|failed);
// later the page polls the order. No downsell on failure (CLAUDE.md §12).
export default function Done() {
  const [status, setStatus] = useState<Status>("open");
  const [card, setCard] = useState(false);
  const [tier, setTier] = useState<string | null>(null);
  const [order, setOrder] = useState<string | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const st = (q.get("status") as Status) ?? "open";
    setStatus(st);
    // TODO(payments): only after the server has confirmed the order
    if (st === "paid") flowSession.update({ paid: true });
    setCard(q.get("tier") === "card" || q.get("tier") === "session");
    setTier(q.get("tier"));
    const o = q.get("order");
    setOrder(o && /^KN-[A-Z2-9]{6}$/.test(o) ? o : null);
  }, []);

  return (
    <main className="screen">
      <AppBar pill={status === "paid" ? (order ? "Besteld" : "Betaald") : "Betaling"} />
      <div className="pad done-page">
        {status === "paid" && (
          <>
            <div className="done-pass"><MiniPass /></div>
            <h1 className="disp sm">{order ? "Dank je wel. Je gids staat klaar." : "Gelukt. Je gids staat klaar."}</h1>
            {order && <p className="small muted">Bestelnummer {order}</p>}
            {card && <p className="sub">Zodra je overschrijving binnen is, gaat je kleurenpas op de post (de eerstvolgende is {nextBatch()}). Je krijgt een mail als hij onderweg is.</p>}
            {tier === "session" && <p className="sub">We mailen je binnen twee werkdagen om je persoonlijke sessie in te plannen.</p>}
            <Link className="btn" href="/gids">Open mijn stijlgids</Link>
            <DeliveryMail />
            <p className="small muted">Tip: zet deze pagina op je beginscherm via Delen › Zet op beginscherm.</p>
          </>
        )}
        {status === "open" && (
          <>
            <h1 className="disp sm">We wachten op je bank…</h1>
            <p className="sub">Dit duurt meestal een paar seconden. Je hoeft niets te doen.</p>
          </>
        )}
        {status === "failed" && (
          <>
            <h1 className="disp sm">De betaling is niet gelukt.</h1>
            <p className="sub">Er is niets afgeschreven.</p>
            <Link className="btn" href="/resultaat">Probeer opnieuw</Link>
            <Link className="link-btn" href="/resultaat">Andere betaalmethode</Link>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
