"use client";

import { Flat, FlatLay, type FlatKind } from "@/app/(flow)/Flats";
import { computeProfile, type Measurements } from "@/lib/color/profile";
import { nearestSeason, SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide } from "@/lib/guide/build";
import "@/app/(flow)/flow.css";

// Lab check: every drawing, and the four looks of a few seasons per brand.
const KINDS: FlatKind[] = ["tee", "shirt", "blouse", "wide", "polo", "knit", "blazer", "coat", "pants", "jeans", "skirt", "dress", "shoe", "scarf", "watch", "belt", "glasses", "necklace", "bag"];
const base = computeProfile({ skin: { lab: { L: 60, a: 12, b: 16 }, n: 3000, sdL: 3 }, faceWidthPx: 400, calibrated: true } as Measurements);
const at = (k: SeasonKey) => ({ ...base, ...SEASONS[k].centre, match: nearestSeason(SEASONS[k].centre) });

export default function FlatsCheck() {
  return (
    <main style={{ padding: 16, display: "grid", gap: 20, background: "#fff" }}>
      <section style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 8 }}>
        {KINDS.map((k, i) => (
          <figure key={k} style={{ margin: 0, background: "#F3EFE9", padding: 8 }}>
            <Flat kind={k} color={["#23305E", "#9A5B2E", "#C25B86", "#6B8E23", "#E9E2D6"][i % 5]!} second="#C9A24A" />
            <figcaption style={{ fontSize: 10 }}>{k}</figcaption>
          </figure>
        ))}
      </section>
      {(["kulort", "nyanse"] as const).flatMap((b) =>
        (["deepAutumn", "softSummer", "brightSpring"] as SeasonKey[]).map((s) => (
          <section key={b + s} data-brand={b} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {buildGuide(at(s), b).combos.map((c) => (
              <figure key={c.title} style={{ margin: 0 }}>
                <FlatLay pieces={c.pieces} extras={c.extras} brand={b} />
                <figcaption style={{ fontSize: 10 }}>{b} · {s} · {c.title}: {c.pieces.map((p) => p.item).join(", ")}</figcaption>
              </figure>
            ))}
          </section>
        )),
      )}
    </main>
  );
}
