"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { paletteFor, showcase } from "@/lib/color/palette";
import { track } from "@/lib/analytics";
import { flowSession } from "@/lib/flow/session";
import { useBrand } from "../BrandProvider";
import { Drape } from "../Drape";
import { AppBar, Crumbs, Display } from "../ui";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export default function Email() {
  const { config, copy, ctx } = useBrand();
  const t = copy.email;
  const router = useRouter();
  const [r, setR] = useState<ReturnType<typeof flowSession.result>>(null);
  const [loaded, setLoaded] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [optin, setOptin] = useState(false); // never pre-checked (CLAUDE.md §2)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setR(flowSession.result());
    setPhoto(flowSession.photoUrl());
    setLoaded(true);
  }, []);

  if (!loaded) return <main className="screen" />;
  if (!r) return <main className="screen"><div className="pad"><p>Nog geen analyse. <Link href="/selfie">Naar de selfie</Link></p></div></main>;

  const six = showcase(paletteFor(r.profile, config.key));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) return setError(t.invalid);
    // TODO(phase B): send to Brevo with double opt-in. Until then the address stays in this session.
    try {
      sessionStorage.setItem("nk_email", JSON.stringify({ email: v, optin }));
    } catch {}
    track("email_submit", ctx, { hair: r?.hair, jewel: r?.jewel });
    if (optin) track("optin_checked", ctx);
    router.push("/resultaat");
  }

  return (
    <main className="screen">
      <AppBar pill={t.pill} />
      <Crumbs step={4} />
      <div className="pad">
        <Display text={t.headline} />
        <div className="teaser">
          <Drape photo={photo} face={r.face} color={six[0]?.hex ?? "#888"} className="teaser-face" />
          <div className="teaser-body">
            <b>{t.teaser}</b>
            <span className="strip">{six.map((c) => <i key={c.id} style={{ background: c.hex }} />)}</span>
          </div>
        </div>
        <form className="stack-md" onSubmit={submit} noValidate>
          <label className="field">
            <span>{t.lead}</span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              enterKeyHint="go"
              placeholder={t.placeholder}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              aria-invalid={!!error}
            />
          </label>
          {error && <p className="small warn-text" role="alert">{error}</p>}
          <label className="check">
            <input type="checkbox" checked={optin} onChange={(e) => setOptin(e.target.checked)} />
            <span>{t.optin}</span>
          </label>
          <button className="btn" type="submit">{t.submit}</button>
          <p className="small muted center">Je krijgt eerst een mail om je adres te bevestigen. <Link href="/privacy">Privacy</Link></p>
        </form>
        <button className="link-btn" onClick={() => router.push("/resultaat")}>{t.skip}</button>
      </div>
    </main>
  );
}
