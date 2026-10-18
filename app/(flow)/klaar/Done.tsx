"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { orderKey, verifyAccess, type Access, type OrderKey } from "@/lib/flow/access";
import { useBrand } from "../BrandProvider";
import { MiniPass } from "../Hero";
import { AppBar, Footer } from "../ui";


/** Next weekly pass batch (Monday), CLAUDE.md §7. */
function nextBatch(from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
}

// Confirmation after ordering (decision 15 Oct 2026): the page asks the server whether the
// transfer is confirmed and only then opens the guide. ?status=paid in the URL means nothing.
export default function Done() {
  const [order, setOrder] = useState<OrderKey | null>(null);
  const [access, setAccess] = useState<Access | null>(null);
  const [viaMollie, setViaMollie] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const { ctx } = useBrand();

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const ref = q.get("order");
    const k = q.get("k");
    const key = ref && k ? { ref, k } : orderKey.get();
    const mollie = q.get("via") === "mollie";
    setViaMollie(mollie);
    const started = Date.now();
    if (ref && k) orderKey.set({ ref, k });
    setOrder(key);
    if (!key) return setAccess({ state: "none" });
    let stop = false;
    const check = async () => {
      const a = await verifyAccess(key);
      if (stop) return;
      setAccess(a);
      if (a.state === "paid") track("guide_opened", ctx, { from: "confirmation" });
      // Mollie confirms within seconds: look every 3 s for the first two minutes; a bank transfer is
      // confirmed by hand, so every 20 s is enough
      else setTimeout(check, mollie && Date.now() - started < 120000 ? 3000 : 20000);
    };
    void check();
    return () => { stop = true; };
  }, []);

  const paid = access?.state === "paid";
  const physical = paid && access.tier !== "digital";
  return (
    <main className="screen">
      <AppBar pill={paid ? "Betaald" : "Besteld"} />
      <div className="pad done-page">
        {access === null && <p className="muted">Even kijken…</p>}
        {access && access.state !== "none" && !paid && (
          <>
            <h1 className="disp sm">Dank je wel. <em>We controleren je betaling.</em></h1>
            {order && <p className="small muted">Bestelnummer {order.ref}</p>}
            {viaMollie ? (
              <>
                <p className="sub">Dit duurt meestal een paar seconden. Deze pagina opent je stijlgids vanzelf, en je krijgt de link ook per mail.</p>
                <p className="small muted">Betaling afgebroken of niet gelukt?</p>
                <button className="btn btn-ghost" disabled={retrying} onClick={async () => {
                  if (!order) return;
                  setRetrying(true);
                  const r = await fetch("/api/order/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) }).catch(() => null);
                  const d = r?.ok ? ((await r.json()) as { checkoutUrl?: string | null }) : null;
                  if (d?.checkoutUrl) location.href = d.checkoutUrl;
                  else setRetrying(false);
                }}>{retrying ? "Even geduld…" : "Opnieuw betalen"}</button>
              </>
            ) : (
              <>
                <p className="sub">Zodra je overschrijving binnen is (meestal dezelfde of de volgende werkdag), krijg je een mail met de link naar je stijlgids. Deze pagina opent hem ook vanzelf.</p>
                <p className="small muted">Overgemaakt zonder het kenmerk in de omschrijving? Mail ons via de contactpagina, dan zoeken we het op.</p>
              </>
            )}
          </>
        )}
        {paid && (
          <>
            <div className="done-pass"><MiniPass /></div>
            <h1 className="disp sm">Je stijlgids <em>staat klaar.</em></h1>
            {order && <p className="small muted">Bestelnummer {order.ref}</p>}
            {physical && <p className="sub">Je kleurenpas gaat {nextBatch()} op de post. Je krijgt een mail als hij onderweg is.</p>}
            {access.tier === "session" && <p className="sub">Voor je persoonlijke advies: beantwoord de mail die je net kreeg met 3 foto&apos;s bij daglicht. Binnen 3 werkdagen krijg je je video.</p>}
            <Link className="btn" href="/gids">Open mijn stijlgids</Link>
            <p className="small muted">We hebben de link ook gemaild, zodat je je gids op elk apparaat opent. Niet gezien? Kijk bij Reclame of Spam.</p>
            <p className="small muted">Tip: zet je gids op je beginscherm via Delen › Zet op beginscherm.</p>
          </>
        )}
        {access?.state === "none" && (
          <>
            <h1 className="disp sm">Geen bestelling gevonden.</h1>
            <p className="sub">Open de link uit je bevestigingsmail, of kies je stijlgids op je resultaatpagina.</p>
            <Link className="btn" href="/resultaat">Naar mijn resultaat</Link>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
