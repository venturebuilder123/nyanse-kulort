"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { amountFor, formatIban, orderRef, PAYEE } from "@/lib/flow/payment";
import { euro, type Tier } from "@/lib/flow/pricing";
import { orderKey } from "@/lib/flow/access";
import { flowSession } from "@/lib/flow/session";
import { FLOW } from "@/lib/i18n/flow";
import { useBrand } from "../BrandProvider";

/** Numbers only: what the guide needs to be rebuilt on another device (never the photo). */
function profileForOrder(locale: string) {
  const r = flowSession.result();
  if (!r) return null;
  // the language goes along so the mails speak it too
  return { measurements: r.measurements, hair: r.hair, jewel: r.jewel, confirm: r.confirm, declared: r.declared, locale };
}

type Props = { tier: Tier; season: string; friendCode?: string; note?: string | null; onClose: () => void };

// Bank-transfer checkout (pilot, NL first): details → order stored → QR + IBAN with a unique
// reference → "Ik heb betaald". The digital guide opens straight away; the card ships and the
// session is planned once the founder has seen the payment.
export function Checkout({ tier, season, friendCode, note, onClose }: Props) {
  const { config, voice, copy, ctx, locale } = useBrand();
  const F = FLOW[locale].checkout;
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
        body: JSON.stringify({ ref: r, tier, brand: config.key, voice, season, friendCode, discountCode: percent ? code.trim() : undefined, waiver, ...f, profile: profileForOrder(locale) }),
      });
      // a giveaway code that was used in the meantime: drop it, say so, let them pay or try another
      if (res.status === 409) {
        setPercent(0);
        setCodeMsg(F.codeUsed);
        setBusy(false);
        return;
      }
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
      setError(F.failed);
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
        <p className="eyebrow-h">{F.transferTitle(euro(amount, locale))}</p>
        {/* no QR: Dutch bank apps (Rabobank, ING, ABN AMRO) do not read the EPC transfer QR */}
        <p className="small muted">{F.transferText}</p>
        <dl className="pay-lines">
          {[
            [F.amount, euro(amount, locale), locale === "en" ? amount.toFixed(2) : amount.toFixed(2).replace(".", ",")],
            [F.to, PAYEE.name, PAYEE.name],
            ["IBAN", formatIban(PAYEE.iban), PAYEE.iban],
            [F.reference, remittance, remittance],
          ].map(([label, shown, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{shown}</dd>
              <button type="button" className="link-btn" onClick={() => copyText(label!, value!)}>{copied === label ? F.copied : F.copy}</button>
            </div>
          ))}
        </dl>
        <button className="btn" onClick={paid}>{F.iPaid}</button>
        <p className="small muted">
          {F.afterTransfer}
          {physical && F.cardPost}
          {tier === "session" && F.sessionPhotos}
        </p>
      </div>
    );
  }

  return (
    <form className="sheet-body" onSubmit={submit} noValidate>
      <div className="grab" />
      <div className="line"><span>{t.tiers[tier].name}</span><b>{percent > 0 ? <><s className="muted">{euro(amountFor(tier, false), locale)}</s> {amount === 0 ? F.free : euro(amount, locale)}</> : euro(amount, locale)}</b></div>
      {friendCode && !percent && <div className="line discount"><span>{copy.retention.friendLine} · {friendCode}</span><b>−€1</b></div>}
      {percent > 0 && <div className="line discount"><span>Code {code.trim().toUpperCase()} · {percent}%</span><b>{`−${euro(Math.round((amountFor(tier, false) - amount) * 100) / 100, locale)}`}</b></div>}
      {/* the Girl Math sum is about the full price; with a code it no longer adds up */}
      {note && !percent && <p className="tier-math">{note}</p>}
      <label className="field">
        <span>{F.where}</span>
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
          <input value={code} onChange={(e) => { setCode(e.target.value); setCodeMsg(null); }} placeholder={F.codePh} aria-label={F.codePh} autoCapitalize="characters" autoComplete="off" />
          <button type="button" className="btn btn-sm btn-ghost" onClick={async () => {
            const r = await fetch("/api/order/code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, tier }) }).catch(() => null);
            const d = r?.ok ? ((await r.json()) as { ok: boolean; percent?: number; reason?: string }) : null;
            if (d?.ok && d.percent) setPercent(d.percent);
            else setCodeMsg(d?.reason === "digital_only" ? F.codeDigitalOnly : d?.reason === "used" ? F.codeUsed : F.codeUnknown);
          }}>{F.apply}</button>
        </div>
      ) : (
        <button type="button" className="link-btn" onClick={() => setCodeOpen(true)}>{F.haveCode}</button>
      ))}
      {codeMsg && <p className="small warn-text" role="alert">{codeMsg}</p>}
      <label className="check">
        <input type="checkbox" checked={waiver} onChange={(e) => setWaiver(e.target.checked)} />
        <span>{(() => { const terms = locale === "en" ? "the terms" : "de voorwaarden"; return t.checkout.withdrawal.replace(terms, "\u0000").split("\u0000").flatMap((part, i) => (i ? [<a key="t" href="/voorwaarden" target="_blank">{terms}</a>, part] : [part])); })()}</span>
      </label>
      {error && <p className="small warn-text" role="alert">{error}</p>}
      <button className="btn" type="submit" disabled={!valid || busy}>{busy ? FLOW[locale].wait : amount === 0 ? FLOW[locale].openGuide : F.toPay(euro(amount, locale))}</button>
      <p className="small muted center">Prijzen inclusief btw.</p>
      <button type="button" className="link-btn" onClick={onClose}>{t.checkout.close}</button>
    </form>
  );
}
