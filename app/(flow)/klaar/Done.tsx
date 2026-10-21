"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { orderKey, verifyAccess, type Access, type OrderKey } from "@/lib/flow/access";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand } from "../BrandProvider";
import { MiniPass } from "../Hero";
import { AppBar, Footer } from "../ui";


/** Next weekly pass batch (Monday), CLAUDE.md §7. */
function nextBatch(from = new Date(), dateLocale = "nl-NL"): string {
  const d = new Date(from);
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return d.toLocaleDateString(dateLocale, { weekday: "long", day: "numeric", month: "long" });
}

// Confirmation after ordering (decision 15 Oct 2026): the page asks the server whether the
// transfer is confirmed and only then opens the guide. ?status=paid in the URL means nothing.
export default function Done() {
  const [order, setOrder] = useState<OrderKey | null>(null);
  const [access, setAccess] = useState<Access | null>(null);
  const [viaMollie, setViaMollie] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const { ctx, locale } = useBrand();
  const D = FLOW[locale].done;

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
      <AppBar pill={paid ? D.paid : D.ordered} />
      <div className="pad done-page">
        {access === null && <p className="muted">{FLOW[locale].checking}</p>}
        {access && access.state !== "none" && !paid && (
          <>
            <h1 className="disp sm">{D.thanks} <em>{D.checkingPay}</em></h1>
            {order && <p className="small muted">{D.orderNo(order.ref)}</p>}
            {viaMollie ? (
              <>
                <p className="sub">{D.seconds}</p>
                <p className="small muted">{D.failedQ}</p>
                <button className="btn btn-ghost" disabled={retrying} onClick={async () => {
                  if (!order) return;
                  setRetrying(true);
                  const r = await fetch("/api/order/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(order) }).catch(() => null);
                  const d = r?.ok ? ((await r.json()) as { checkoutUrl?: string | null }) : null;
                  if (d?.checkoutUrl) location.href = d.checkoutUrl;
                  else setRetrying(false);
                }}>{retrying ? FLOW[locale].wait : D.retry}</button>
              </>
            ) : (
              <>
                <p className="sub">{D.transfer}</p>
                <p className="small muted">{D.noRef}</p>
              </>
            )}
          </>
        )}
        {paid && (
          <>
            <div className="done-pass"><MiniPass /></div>
            <h1 className="disp sm">{D.ready} <em>{D.readyEm}</em></h1>
            {order && <p className="small muted">{D.orderNo(order.ref)}</p>}
            {physical && <p className="sub">{D.card(nextBatch(new Date(), D.dateLocale))}</p>}
            {access.tier === "session" && <p className="sub">{D.session}</p>}
            <Link className="btn" href="/gids">{FLOW[locale].openGuide}</Link>
            <p className="small muted">{D.mailed}</p>
            <p className="small muted">{D.homeTip}</p>
          </>
        )}
        {access?.state === "none" && (
          <>
            <h1 className="disp sm">{D.none}</h1>
            <p className="sub">{D.noneText}</p>
            <Link className="btn" href="/resultaat">{D.toResult}</Link>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
