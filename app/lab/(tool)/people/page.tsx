"use client";

import { useEffect, useState } from "react";
import { colorName, mostDifferent, paletteFor, showcase } from "@/lib/color/palette";
import type { BrandKey } from "@/lib/brand/types";

// Lab tool used by scripts/measure-people.mjs: runs pipeline A on the landing images and prints
// the face box and drape colours as JSON. Lab-only (password protected).
export default function PeopleTool() {
  const [out, setOut] = useState("running");
  useEffect(() => {
    (async () => {
      const files = (new URLSearchParams(location.search).get("files") ?? "").split(",").filter(Boolean);
      const { runPipelineA } = await import("@/lib/analysis/pipelineA");
      const result: Record<BrandKey, unknown[]> = { kulort: [], nyanse: [] };
      const errors: string[] = [];
      for (const f of files) {
        const brand: BrandKey = f.startsWith("nyanse") ? "nyanse" : "kulort";
        const blob = await (await fetch(`/brand/people/${f}`)).blob();
        const { result: r, debug, canvas } = await runPipelineA(blob);
        if (!r.ok || !r.profile || !debug.regions) {
          errors.push(`${f}: ${r.error ?? "no profile"}`);
          continue;
        }
        const xs = debug.regions.faceOval.map((p) => p.x), ys = debug.regions.faceOval.map((p) => p.y);
        const pal = paletteFor(r.profile, brand);
        const good = showcase(pal, 1)[0]!;
        const bad = mostDifferent(good, pal.avoid)!;
        result[brand].push({
          src: `/brand/people/${f}`,
          face: {
            cx: (Math.min(...xs) + Math.max(...xs)) / 2 / canvas.width,
            cy: (Math.min(...ys) + Math.max(...ys)) / 2 / canvas.height,
            w: (Math.max(...xs) - Math.min(...xs)) / canvas.width,
            aspect: canvas.width / canvas.height,
          },
          good: good.hex,
          bad: bad.hex,
          season: r.profile.match.season,
          confidence: r.profile.confidence.overall,
          note: `${colorName(good, brand)} / ${colorName(bad, brand)} · conf ${r.profile.confidence.overall.toFixed(2)} (u ${r.profile.confidence.undertone.toFixed(2)} d ${r.profile.confidence.depth.toFixed(2)} c ${r.profile.confidence.clarity.toFixed(2)}) · scales ${r.profile.undertone.toFixed(2)}/${r.profile.depth.toFixed(2)}/${r.profile.clarity.toFixed(2)} · skin ${r.measurements!.skin.lab.L.toFixed(0)},${r.measurements!.skin.lab.a.toFixed(1)},${r.measurements!.skin.lab.b.toFixed(1)} · cheeks ${r.measurements!.cheekLeft ? r.measurements!.cheekLeft.lab.L.toFixed(0)+'/'+r.measurements!.cheekRight?.lab.L.toFixed(0) : '-'} · hair ${r.measurements!.hair ? r.measurements!.hair.lab.L.toFixed(0)+','+r.measurements!.hair.lab.a.toFixed(1)+','+r.measurements!.hair.lab.b.toFixed(1) : 'none'} · iris ${r.measurements!.iris ? 'ok' : 'none'} · ${r.quality.issues.join(' | ')}`,
        });
      }
      setOut(JSON.stringify({ result, errors }, null, 2));
    })().catch((e) => setOut(`error: ${e}`));
  }, []);
  return <pre id="out" style={{ whiteSpace: "pre-wrap", fontSize: 12 }}>{out}</pre>;
}
