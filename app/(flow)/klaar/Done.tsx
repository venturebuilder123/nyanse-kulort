"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MiniPass } from "../Hero";
import { AppBar, Footer } from "../ui";

type Status = "paid" | "open" | "failed";

/** Next weekly pass batch (Monday), CLAUDE.md §7. */
function nextBatch(from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
}

// Confirmation after payment. Until Mollie is wired, the status comes from ?status= (paid|open|failed);
// later the page polls the order. No downsell on failure (CLAUDE.md §12).
export default function Done() {
  const [status, setStatus] = useState<Status>("open");
  const [card, setCard] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    setStatus((q.get("status") as Status) ?? "open");
    setCard(q.get("tier") === "card");
  }, []);

  return (
    <main className="screen">
      <AppBar pill={status === "paid" ? "Betaald" : "Betaling"} />
      <div className="pad done">
        {status === "paid" && (
          <>
            <div className="done-pass"><MiniPass /></div>
            <h1 className="disp sm">Gelukt. Je gids staat klaar.</h1>
            {card && <p className="sub">Je kleurenpas gaat {nextBatch()} op de post. Je krijgt een mail als hij onderweg is.</p>}
            <Link className="btn" href="/resultaat">Open mijn gids</Link>
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
