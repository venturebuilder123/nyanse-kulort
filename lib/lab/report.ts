// Phase A gate report (CLAUDE.md §3): consistency per person, with vs. without card,
// broken down by Monk group, gender and beard; plus spread and timing.
// Profiles are recomputed from stored measurements, so rule changes apply to old runs.

import { monkGroup } from "@/lib/color/monk";
import { computeProfile, type Profile } from "@/lib/color/profile";
import { profileDistance, SEASONS, type SeasonKey } from "@/lib/color/seasons";
import type { Person, Run } from "./types";

export const GATE = {
  /** max share of selfie pairs (same person, with card) that get a different season */
  maxDisagreement: 0.15,
  /** a Monk group is "substantially worse" when this many points above the overall rate */
  maxGroupGap: 0.1,
  /** no single season may hold more than this share of people (guards against a constant answer) */
  maxSeasonShare: 0.3,
  /** below this many people the verdict is provisional */
  minPeople: 20,
} as const;

export type Condition = "card" | "nocard" | "sameUncorrected";

export const CONDITION_LABEL: Record<Condition, string> = {
  card: "Met kaart (gecorrigeerd)",
  nocard: "Zonder kaart",
  sameUncorrected: "Kaartfoto's zonder correctie",
};

export type PairStats = {
  pairs: number;
  /** pairs with a different nearest season */
  different: number;
  /** pairs that differ and are not each other's border neighbour */
  differentStrict: number;
  meanDistance: number;
};

const empty = (): PairStats => ({ pairs: 0, different: 0, differentStrict: 0, meanDistance: 0 });

function addPairs(acc: PairStats, profiles: Profile[]): PairStats {
  let distSum = acc.meanDistance * acc.pairs;
  for (let i = 0; i < profiles.length; i++) {
    for (let j = i + 1; j < profiles.length; j++) {
      const p = profiles[i]!, q = profiles[j]!;
      acc.pairs++;
      distSum += profileDistance(p, q);
      if (p.match.season !== q.match.season) {
        acc.different++;
        const neighbours =
          (p.match.border && p.match.second === q.match.season) || (q.match.border && q.match.second === p.match.season);
        if (!neighbours) acc.differentStrict++;
      }
    }
  }
  acc.meanDistance = acc.pairs ? distSum / acc.pairs : 0;
  return acc;
}

export function profilesFor(runs: Run[], condition: Condition): Profile[] {
  const out: Profile[] = [];
  for (const r of runs) {
    const res = r.result;
    if (!res.ok || !res.measurements) continue;
    if (condition === "card" && r.withCard && res.card.used) out.push(computeProfile(res.measurements));
    if (condition === "nocard" && !r.withCard) out.push(computeProfile(res.measurements));
    if (condition === "sameUncorrected" && r.withCard && res.uncalibrated) out.push(computeProfile(res.uncalibrated.measurements));
  }
  return out;
}

export type Breakdown = Record<string, { people: number; stats: Record<Condition, PairStats> }>;

export type Report = {
  people: number;
  runs: number;
  overall: Record<Condition, PairStats>;
  byMonk: Breakdown;
  byGender: Breakdown;
  byBeard: Breakdown;
  /** modal season per person (card condition) */
  seasonShare: { season: SeasonKey; people: number; share: number }[];
  cardFoundRate: number;
  meanMs: number;
  confidence: { bucket: string; count: number }[];
  gate: { provisional: boolean; checks: { label: string; pass: boolean | null; detail: string }[] };
};

const CONDITIONS: Condition[] = ["card", "nocard", "sameUncorrected"];

export function buildReport(people: Person[], runs: Run[]): Report {
  const byPerson = new Map<string, Run[]>();
  for (const r of runs) byPerson.set(r.personCode, [...(byPerson.get(r.personCode) ?? []), r]);

  const overall = Object.fromEntries(CONDITIONS.map((c) => [c, empty()])) as Record<Condition, PairStats>;
  const byMonk: Breakdown = {}, byGender: Breakdown = {}, byBeard: Breakdown = {};
  const add = (b: Breakdown, key: string, personRuns: Run[]) => {
    b[key] ??= { people: 0, stats: Object.fromEntries(CONDITIONS.map((c) => [c, empty()])) as Record<Condition, PairStats> };
    b[key].people++;
    for (const c of CONDITIONS) addPairs(b[key].stats[c], profilesFor(personRuns, c));
  };

  const modal = new Map<SeasonKey, number>();
  for (const person of people) {
    const pr = byPerson.get(person.code) ?? [];
    if (pr.length === 0) continue;
    for (const c of CONDITIONS) addPairs(overall[c], profilesFor(pr, c));
    add(byMonk, monkGroup(person.monk), pr);
    add(byGender, { v: "Vrouw", m: "Man", x: "Anders" }[person.gender], pr);
    if (person.gender === "m") add(byBeard, person.beard ? "Man met baard" : "Man zonder baard", pr);

    const seasons = profilesFor(pr, "card").map((p) => p.match.season);
    if (seasons.length) {
      const counts = new Map<SeasonKey, number>();
      seasons.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1));
      const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]![0];
      modal.set(top, (modal.get(top) ?? 0) + 1);
    }
  }

  const tested = people.filter((p) => (byPerson.get(p.code) ?? []).length > 0).length;
  const withModal = [...modal.values()].reduce((a, b) => a + b, 0);
  const seasonShare = [...modal.entries()]
    .map(([season, n]) => ({ season, people: n, share: n / withModal }))
    .sort((a, b) => b.people - a.people);

  const ok = runs.filter((r) => r.result.ok);
  const cardRuns = runs.filter((r) => r.withCard);
  const buckets = ["<0,4", "0,4–0,6", "0,6–0,8", "≥0,8"];
  const confidence = buckets.map((bucket) => ({ bucket, count: 0 }));
  for (const r of ok) {
    const c = r.result.profile?.confidence.overall ?? 0;
    confidence[c < 0.4 ? 0 : c < 0.6 ? 1 : c < 0.8 ? 2 : 3]!.count++;
  }

  const rate = (s: PairStats) => (s.pairs ? s.different / s.pairs : NaN);
  const overallRate = rate(overall.card);
  const groupRates = Object.entries(byMonk)
    .filter(([, g]) => g.people >= 2 && g.stats.card.pairs > 0)
    .map(([k, g]) => ({ k, r: rate(g.stats.card) }));
  const worst = groupRates.sort((a, b) => b.r - a.r)[0];
  const topSeason = seasonShare[0];
  const pct = (v: number) => `${Math.round(v * 100)}%`;

  const gate = {
    provisional: tested < GATE.minPeople,
    checks: [
      {
        label: `Met kaart ≤ ${pct(GATE.maxDisagreement)} andere uitslag`,
        pass: overall.card.pairs ? overallRate <= GATE.maxDisagreement : null,
        detail: overall.card.pairs ? `${pct(overallRate)} van ${overall.card.pairs} paren` : "nog geen paren",
      },
      {
        label: `Geen Monk-groep > ${Math.round(GATE.maxGroupGap * 100)} punten slechter`,
        pass: worst ? worst.r - overallRate <= GATE.maxGroupGap : null,
        detail: worst ? `slechtste: ${worst.k} met ${pct(worst.r)}` : "nog geen groep met ≥2 personen",
      },
      {
        label: `Spreiding: geen seizoen > ${pct(GATE.maxSeasonShare)} van de mensen`,
        pass: topSeason ? topSeason.share <= GATE.maxSeasonShare : null,
        detail: topSeason ? `grootste: ${SEASONS[topSeason.season].name} met ${pct(topSeason.share)}` : "nog geen uitslagen",
      },
    ],
  };

  return {
    people: tested,
    runs: runs.length,
    overall,
    byMonk,
    byGender,
    byBeard,
    seasonShare,
    cardFoundRate: cardRuns.length ? cardRuns.filter((r) => r.result.card.used).length / cardRuns.length : NaN,
    meanMs: ok.length ? ok.reduce((s, r) => s + r.result.timings.totalMs, 0) / ok.length : NaN,
    confidence,
    gate,
  };
}

/** One row per run, for spreadsheets. Numbers only, no images. */
export function runsToCsv(people: Person[], runs: Run[]): string {
  const personBy = new Map(people.map((p) => [p.code, p]));
  const header = [
    "person", "monk", "gender", "beard", "light", "with_card", "ok", "error", "card_used", "card_rejected",
    "season", "second", "border", "undertone", "depth", "clarity", "conf_overall",
    "uncal_season", "skin_L", "skin_a", "skin_b", "hair_L", "hair_a", "hair_b", "iris_L", "iris_a", "iris_b",
    "monk_estimate", "face_px", "total_ms", "rules_version", "issues",
  ];
  const f = (v: number | undefined) => (v === undefined || Number.isNaN(v) ? "" : v.toFixed(3));
  const rows = runs.map((r) => {
    const p = personBy.get(r.personCode);
    const res = r.result;
    const m = res.measurements;
    const prof = m ? computeProfile(m) : undefined;
    const uncal = res.uncalibrated ? computeProfile(res.uncalibrated.measurements) : undefined;
    return [
      r.personCode, p?.monk, p?.gender, p?.beard, r.light, r.withCard, res.ok, res.error ?? "", res.card.used, res.card.rejected ?? "",
      prof?.match.season ?? "", prof?.match.second ?? "", prof?.match.border ?? "", f(prof?.undertone), f(prof?.depth), f(prof?.clarity), f(prof?.confidence.overall),
      uncal?.match.season ?? "", f(m?.skin.lab.L), f(m?.skin.lab.a), f(m?.skin.lab.b), f(m?.hair?.lab.L), f(m?.hair?.lab.a), f(m?.hair?.lab.b),
      f(m?.iris?.lab.L), f(m?.iris?.lab.a), f(m?.iris?.lab.b),
      res.monkEstimate ?? "", f(res.quality.faceWidthPx), f(res.timings.totalMs), prof?.rulesVersion ?? "", res.quality.issues.join(" | "),
    ].map((v) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",");
  });
  return [header.join(","), ...rows].join("\n");
}
