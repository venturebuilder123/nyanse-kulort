"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { profileForSeason } from "@/lib/color/declared";
import { familyOf } from "@/lib/color/describe";
import { paletteFor, showcase } from "@/lib/color/palette";
import { SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { flowSession } from "@/lib/flow/session";
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
  const { config, ctx } = useBrand();
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
        <Display text={["Welk kleurtype", "ben jij?"]} />
        <p className="sub">Kies je type, dan zie je meteen je kleuren, je look en wat je gids je geeft.</p>
        {GROUPS.map((g) => (
          <section key={g[0]} className="q known-group">
            <h2 className="eyebrow-h">{familyOf(g[0]!)}</h2>
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
          Twijfel je? <Link href="/selfie">Doe de gratis selfie</Link>: in 30 seconden weet je het, en je foto verlaat je telefoon niet.
        </p>
      </div>
      <Footer />
    </main>
  );
}
