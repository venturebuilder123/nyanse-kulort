"use client";

import { Drape } from "@/app/(flow)/Drape";
import { PEOPLE } from "@/lib/brand/people";
import "@/app/(flow)/flow.css";

// Lab check: every AI model with its good and bad cloth, at the crops the app uses.
const FITS = { hero: undefined, split: { w: 0.4, cy: 0.38 }, wide: { w: 0.42, cy: 0.36 } } as const;

export default function DrapeCheck() {
  return (
    <main style={{ padding: 16, display: "grid", gap: 24 }}>
      {(["kulort", "nyanse"] as const).flatMap((b) =>
        PEOPLE[b].map((p) => (
          <section key={p.src} style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
            {Object.entries(FITS).flatMap(([name, fit]) =>
              [p.bad, p.good].map((c) => (
                <figure key={name + c} style={{ margin: 0 }}>
                  <Drape photo={p.src} face={{ ...p.face, mirrored: false }} color={c} fit={fit} />
                  <figcaption style={{ fontSize: 11 }}>{p.src.split("/").pop()} · {name} · {c}</figcaption>
                </figure>
              )),
            )}
          </section>
        )),
      )}
    </main>
  );
}
