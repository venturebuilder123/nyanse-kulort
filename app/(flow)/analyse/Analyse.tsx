"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SEASONS } from "@/lib/color/seasons";
import { flowSession } from "@/lib/flow/session";

// TEMPORARY: shows the raw result until the drape animation, e-mail step and free result are built.
export default function Analyse() {
  const [r, setR] = useState<ReturnType<typeof flowSession.result>>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    setR(flowSession.result());
    setPhoto(flowSession.photoUrl());
  }, []);
  if (!r) return <main className="screen"><div className="pad"><p>Nog geen analyse. <Link href="/selfie">Naar de selfie</Link></p></div></main>;
  const p = r.profile;
  return (
    <main className="screen">
      <div className="pad">
        <p className="label-sm">Tijdelijk scherm · kleurdoek-animatie en resultaat volgen</p>
        {photo && <img src={photo} alt="" style={{ width: "100%", borderRadius: 12, transform: "scaleX(-1)" }} />}
        <h1 className="disp sm">{SEASONS[p.match.season].name}{p.match.border && <em> · rand {SEASONS[p.match.second].name}</em>}</h1>
        <p className="small">
          Ondertoon {p.undertone.toFixed(2)} · diepte {p.depth.toFixed(2)} · helderheid {p.clarity.toFixed(2)} · betrouwbaarheid {p.confidence.overall.toFixed(2)}
          {r.lowConfidence && " · lage betrouwbaarheid"}
        </p>
        <Link className="btn" href="/selfie">Opnieuw</Link>
      </div>
    </main>
  );
}
