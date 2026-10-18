"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { amountFor, formatIban, orderRef, PAYEE } from "@/lib/flow/payment";
import { euro, type Tier } from "@/lib/flow/pricing";
import { orderKey } from "@/lib/flow/access";
import { flowSession } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";

/** Numbers only: what the guide needs to be rebuilt on another device (never the photo). */
function profileForOrder() {
  const r = flowSession.result();
  if (!r) return null;
  return { measurements: r.measurements, hair: r.hair, jewel: r.jewel, declared: r.declared };
}

type Props = { tier: Tier; season: string; friendCode?: string; note?: string | null; onClose: () => void };

// Bank-transfer checkout (pilot, NL first): details → order stored → QR + IBAN with a unique
// reference → "Ik heb betaald". The digital guide opens straight away; the card ships and the
// session is planned once the founder has seen the payment.
export function Checkout({ tier, season, friendCode, note, onClose }: Props) {
  const { config, voice, copy, ctx } = useBrand();
  const t = copy.result;
  const physical = tier !== "digital";
  const [code, setCode] = useState("");
  const [codeOpen, setCodeOpen] = useState(false);
  const [percent, setPercent] = useState(0);
  const [codeMsg, setCodeMsg] = useState<string | null>(null);
  const amount = amountFor(tier, !!friendCode, percent);
  const [f, setF] = useState({ email: "", name: "", street: "", postcode: "", city: "", country: "NL" });
  const [waiver, setWaiver] = useState(false);
  const [step, setStep] = useState<"form" | "pay">("form");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ref, setRef] = useState("");
  const [secret, setSecret] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    try {
      const known = JSON.parse(sessionStorage.getItem("nk_email") ?? "null") as { email?: string } | null;
      if (known?.email) setF((x) => ({ ...x, email: known.email! }));
    } catch {}
  }, []);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const valid =
    /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(f.email.trim()) &&
    waiver &&
    (!physical || (f.name.trim() && f.street.trim() && f.postcode.trim() && f.city.trim()));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || busy) return;
    setBusy(true);
    setError(null);
    const r = orderRef();
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: r, tier, brand: config.key, voice, season, friendCode, discountCode: percent ? code.trim() : undefined, waiver, ...f, profile: profileForOrder() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const d = (await res.json()) as { secret: string; checkoutUrl?: string | null; free?: boolean };
      setSecret(d.secret);
      orderKey.set({ ref: r, k: d.secret });
      try {
        sessionStorage.setItem("nk_email", JSON.stringify({ email: f.email.trim(), optin: false }));
      } catch {}
      setRef(r);
      // a 100% code: nothing to pay, the guide is ready
      if (d.free) {
        location.href = `/klaar?order=${r}&k=${encodeURIComponent(d.secret)}`;
        return;
      }
      // Mollie (iDEAL | Wero, Apple Pay, card): straight to the payment page; otherwise the transfer details
      if (d.checkoutUrl) {
        track("checkout_open", ctx, { tier, step: "mollie" });
        location.href = d.checkoutUrl;
        return;
      }
      setStep("pay");
      track("checkout_open", ctx, { tier, step: "pay" });
    } catch {
      setError("Dat lukte nu niet. Probeer het nog eens, of mail ons via de contactpagina.");
    }
    setBusy(false);
  }

  const copyText = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1600);
    } catch {}
  };

  // "Ik heb betaald" opens nothing by itself: the guide opens once the transfer is confirmed
  function paid() {
    track("transfer_claimed", ctx, { tier, amount });
    location.href = `/klaar?order=${ref}&k=${encodeURIComponent(secret)}`;
  }

  if (step === "pay") {
    const remittance = `${ref} ${config.key === "kulort" ? "KULORT" : "NYANSE"}`;
    return (
      <div className="sheet-body pay">
        <div className="grab" />
        <p className="eyebrow-h">Betaal {euro(amount)} per bankoverschrijving</p>
        {/* no QR: Dutch bank apps (Rabobank, ING, ABN AMRO) do not read the EPC transfer QR */}
        <p className="small muted">Open je bank-app, kies Overmaken en kopieer deze gegevens. Vermeld het kenmerk, dan koppelen we je betaling direct.</p>
        <dl className="pay-lines">
          {[
            ["Bedrag", euro(amount), amount.toFixed(2).replace(".", ",")],
            ["Naar", PAYEE.name, PAYEE.name],
            ["IBAN", formatIban(PAYEE.iban), PAYEE.iban],
            ["Kenmerk", remittance, remittance],
          ].map(([label, shown, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{shown}</dd>
              <button type="button" className="link-btn" onClick={() => copyText(label!, value!)}>{copied === label ? "Gekopieerd" : "Kopieer"}</button>
            </div>
          ))}
        </dl>
        <button className="btn" onClick={paid}>Ik heb betaald</button>
        <p className="small muted">
          Zodra je overschrijving binnen is, krijg je een mail met de link naar je stijlgids.
          {physical && " Je kleurenpas gaat dan op de post."}
          {tier === "session" && " We mailen je binnen twee werkdagen om je sessie in te plannen."}
        </p>
      </div>
    );
  }

  return (
    <form className="sheet-body" onSubmit={submit} noValidate>
      <div className="grab" />
      <div className="line"><span>{t.tiers[tier].name}</span><b>{euro(amount)}</b></div>
      {friendCode && !percent && <div className="line discount"><span>{copy.retention.friendLine} · {friendCode}</span><b>−€1</b></div>}
      {percent > 0 && <div className="line discount"><span>Code {code.trim().toUpperCase()} · {percent}%</span><b>{amount === 0 ? "Gratis" : `−${euro(Math.round((amountFor(tier, false) - amount) * 100) / 100)}`}</b></div>}
      {note && <p className="tier-math">{note}</p>}
      <label className="field">
        <span>Waar sturen we je stijlgids heen?</span>
        <input type="email" inputMode="email" autoComplete="email" autoCapitalize="none" placeholder="jij@voorbeeld.nl" value={f.email} onChange={set("email")} required />
      </label>
      {physical && (
        <fieldset className="address">
          <legend>{t.checkout.address}</legend>
          <input autoComplete="name" placeholder={t.checkout.name} aria-label={t.checkout.name} value={f.name} onChange={set("name")} required />
          <input autoComplete="address-line1" placeholder={t.checkout.street} aria-label={t.checkout.street} value={f.street} onChange={set("street")} required />
          <div className="row-inline">
            <input autoComplete="postal-code" placeholder={t.checkout.postcode} aria-label={t.checkout.postcode} value={f.postcode} onChange={set("postcode")} required />
            <input autoComplete="address-level2" placeholder={t.checkout.city} aria-label={t.checkout.city} value={f.city} onChange={set("city")} required />
          </div>
          <select value={f.country} onChange={set("country")} aria-label={t.checkout.country}>
            <option value="NL">Nederland</option>
            <option value="BE">België</option>
            <option value="DE">Duitsland</option>
          </select>
          <p className="small muted">{t.checkout.shipping}: {t.checkout.shippingWhen}</p>
        </fieldset>
      )}
      {!percent && (codeOpen ? (
        <div className="row-inline">
          <input value={code} onChange={(e) => { setCode(e.target.value); setCodeMsg(null); }} placeholder="Kortingscode" aria-label="Kortingscode" autoCapitalize="characters" autoComplete="off" />
          <button type="button" className="btn btn-sm btn-ghost" onClick={async () => {
            const r = await fetch("/api/order/code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) }).catch(() => null);
            const d = r?.ok ? ((await r.json()) as { ok: boolean; percent?: number }) : null;
            if (d?.ok && d.percent) setPercent(d.percent);
            else setCodeMsg("Deze code kennen we niet.");
          }}>Toepassen</button>
        </div>
      ) : (
        <button type="button" className="link-btn" onClick={() => setCodeOpen(true)}>Heb je een kortingscode?</button>
      ))}
      {codeMsg && <p className="small warn-text" role="alert">{codeMsg}</p>}
      <label className="check">
        <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)} />
        <span>{t.checkout.withdrawal}</span>
      </label>
      {error && <p className="small warn-text" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={!valid || busy}>{busy ? "Even geduld…" : amount === 0 ? "Open mijn stijlgids" : `Naar betalen · ${euro(amount)}`}</button>
      <p className="small muted center">Prijzen inclusief btw.</p>
      <button type="button" className="link-btn" onClick={onClose}>{t.checkout.close}</button>
    </form>
  );
}
