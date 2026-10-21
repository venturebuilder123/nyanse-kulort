"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { profileForSeason } from "@/lib/color/declared";
import { familyOf } from "@/lib/color/describe";
import { paletteFor, showcase } from "@/lib/color/palette";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { flowSession } from "@/lib/flow/session";
import { FLOW } from "@/lib/i18n/flow";
import { familyName } from "@/lib/i18n/words";
import { useBrand } from "../BrandProvider";
import { AppBar, Display, Footer } from "../ui";

const GROUPS: SeasonKey[][] = [
  ["lightSpring", "warmSpring", "brightSpring"],
  ["lightSummer", "coolSummer", "softSummer"],
  ["softAutumn", "warmAutumn", "deepAutumn"],
  ["brightWinter", "coolWinter", "deepWinter"],
];

// "Ik weet mijn kleurtype al": the route for people who already had their colours done.
// Same guide, same price (no fake discount); the free selfie stays one tap away to check it.
export default function KnownType() {
  const { config, ctx, locale } = useBrand();
  const K = FLOW[locale].known;
  const router = useRouter();

  function pick(k: SeasonKey) {
    flowSession.setResult({ declared: k, lowConfidence: false, pipeline: "declared", at: Date.now() });
    track("type_declared", ctx, { season: k });
    router.push("/resultaat");
  }

  return (
    <main className="screen">
      <AppBar />
      <div className="pad stack-md">
        <Display text={K.title} />
        <p className="sub">{K.sub}</p>
        {GROUPS.map((g) => (
          <section key={g[0]} className="q known-group">
            <h2 className="eyebrow-h">{familyName(familyOf(g[0]!), locale)}</h2>
            <div className="known-list">
              {g.map((k) => (
                <button key={k} className="known" onClick={() => pick(k)}>
                  <b>{SEASONS[k].name}</b>
                  <span className="known-strip" aria-hidden="true">
                    {showcase(paletteFor(profileForSeason(k), config.key)).map((c) => <i key={c.id} style={{ background: c.hex }} />)}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
        <p className="small muted center">
          {K.doubt} <Link href="/selfie">{K.selfie}</Link>{K.doubtRest}
        </p>
      </div>
      <Footer />
    </main>
  );
}
