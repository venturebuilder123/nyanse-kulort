"use client";

import Link from "next/link";
import { useEffect } from "react";
import { VOICES } from "@/lib/brand/config";
import { PEOPLE } from "@/lib/brand/people";
import type { BrandKey } from "@/lib/brand/types";
import { track } from "@/lib/analytics";
import { Drape } from "./Drape";

const NONE = { brand: "none", voice: "none" };

const HALVES: { key: BrandKey; voice: "wingman" | "atelier"; label: string; cta: string }[] = [
  { key: "kulort", voice: "wingman", label: "Voor mannen", cta: "Start KULØRT" },
  { key: "nyanse", voice: "atelier", label: "Voor vrouwen", cta: "Start NYANSE" },
];

// The home page of the shared domain (decision 13 Oct 2026): one clear choice, then the
// brand's own flow. Ads skip this page via /kulort and /nyanse.
export default function Split() {
  useEffect(() => track("landing_view", NONE, { split: true }), []);

  return (
    <main className="split-home">
      <header className="sh-top">
        <p>Je kleurprofiel uit één selfie</p>
      </header>

      {HALVES.map((h) => {
        const copy = VOICES[h.voice].landing;
        const model = PEOPLE[h.key][0];
        return (
          // a full page load (not <Link>): the layout must re-render with the picked brand
          <a
            key={h.key}
            href={`/${h.key}`}
            className="app sh-half"
            data-brand={h.key}
            data-voice={h.voice}
            onClick={() => track("brand_switch", NONE, { to: h.key, from: "split" })}
          >
            {model && (
              <div className="sh-photo" aria-hidden="true">
                <Drape photo={model.src} face={{ ...model.face, mirrored: false }} color={model.good} fit={{ w: 0.42, cy: 0.36 }} />
              </div>
            )}
            <div className="sh-copy">
              {h.key === "kulort" ? (
                <span className="wordmark wm-kulort" role="img" aria-label="KULØRT">
                  <span aria-hidden="true">KUL<span className="wm-o">O</span>RT</span>
                </span>
              ) : (
                <span className="wordmark wm-nyanse" role="img" aria-label="NYANSE">NYANSE</span>
              )}
              <span className="sh-label">{h.label}</span>
              <span className="disp sh-head">{copy.headline[0]} <em>{copy.headline[1]}</em></span>
              <span className="btn sh-cta">{h.cta} →</span>
            </div>
          </a>
        );
      })}

      <footer className="sh-foot">
        <span>Je foto verlaat je telefoon niet</span>
        <Link href="/privacy">Privacy</Link>
      </footer>
    </main>
  );
}
