import { describe, expect, it } from "vitest";
import type { PipelineAResult } from "@/lib/analysis/pipelineA";
import type { Lab } from "@/lib/color/convert";
import type { Measurements } from "@/lib/color/profile";
import { buildReport, runsToCsv } from "./report";
import { runId, type Light, type Person, type Run } from "./types";

const person = (code: string, monk: number, gender: Person["gender"] = "m"): Person => ({
  code, monk, gender, beard: false, consentDate: "2026-10-13", createdAt: "2026-10-13",
});

const measurements = (skin: Lab, calibrated: boolean): Measurements => ({
  skin: { lab: skin, n: 3000, sdL: 3 },
  hair: { lab: { L: 30, a: 3, b: 6 }, n: 2000, sdL: 5 },
  iris: { lab: { L: 40, a: 4, b: 12 }, n: 200, sdL: 5 },
  faceWidthPx: 400,
  calibrated,
});

function run(code: string, light: Light, withCard: boolean, skin: Lab, rawSkin?: Lab): Run {
  const result = {
    pipeline: "A",
    ok: true,
    measurements: measurements(skin, withCard),
    uncalibrated: rawSkin ? { measurements: measurements(rawSkin, false), profile: undefined as never } : undefined,
    card: { found: withCard, used: withCard, warnings: [] },
    quality: { faces: 1, faceWidthPx: 400, skinClipped: 0, beardFraction: 0, issues: [] },
    timings: { totalMs: 900, decodeMs: 0, cardMs: 0, faceMs: 0, segmentMs: 0, measureMs: 0 },
    image: { width: 1200, height: 1600 },
  } as PipelineAResult;
  return { id: runId(code, light, withCard), personCode: code, light, withCard, createdAt: "", result };
}

describe("buildReport", () => {
  const warm = { L: 65, a: 12, b: 22 };
  const cool = { L: 65, a: 16, b: 11 };

  it("scores a perfectly consistent person as 0% disagreement", () => {
    const runs = ([1, 2, 3] as Light[]).map((l) => run("TP-001", l, true, warm));
    const r = buildReport([person("TP-001", 3)], runs);
    expect(r.overall.card.pairs).toBe(3);
    expect(r.overall.card.different).toBe(0);
    expect(r.gate.checks[0]!.pass).toBe(true);
    expect(r.gate.provisional).toBe(true);
  });

  it("counts disagreement between selfies of the same person", () => {
    const runs = [run("TP-001", 1, true, warm), run("TP-001", 2, true, cool), run("TP-001", 3, true, warm)];
    const r = buildReport([person("TP-001", 3)], runs);
    expect(r.overall.card.different).toBe(2); // warm–cool twice, warm–warm once
    expect(r.gate.checks[0]!.pass).toBe(false);
  });

  it("separates conditions: card, no card, and uncorrected card photos", () => {
    const runs = [
      run("TP-001", 1, true, warm, cool),
      run("TP-001", 2, true, warm, warm),
      run("TP-001", 1, false, cool),
      run("TP-001", 2, false, warm),
    ];
    const r = buildReport([person("TP-001", 3)], runs);
    expect(r.overall.card.different).toBe(0);
    expect(r.overall.nocard.different).toBe(1);
    expect(r.overall.sameUncorrected.different).toBe(1);
  });

  it("flags a lack of spread when everyone gets the same season", () => {
    const people = ["A", "B", "C", "D"].map((c, i) => person(c, i + 1));
    const runs = people.flatMap((p) => ([1, 2] as Light[]).map((l) => run(p.code, l, true, warm)));
    const r = buildReport(people, runs);
    expect(r.seasonShare[0]!.share).toBe(1);
    expect(r.gate.checks[2]!.pass).toBe(false);
  });

  it("breaks down by Monk group", () => {
    const people = [person("A", 1), person("B", 2), person("C", 9)];
    const runs = [
      ...([1, 2] as Light[]).map((l) => run("A", l, true, warm)),
      ...([1, 2] as Light[]).map((l) => run("B", l, true, warm)),
      run("C", 1, true, warm), run("C", 2, true, cool),
    ];
    const r = buildReport(people, runs);
    expect(r.byMonk["1–2"]!.people).toBe(2);
    expect(r.byMonk["9–10"]!.stats.card.different).toBe(1);
  });
});

describe("runsToCsv", () => {
  it("writes one row per run plus a header, without image data", () => {
    const csv = runsToCsv([person("TP-001", 4)], [run("TP-001", 1, true, { L: 65, a: 12, b: 22 })]);
    const lines = csv.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[1]).toContain("TP-001");
    expect(csv).not.toMatch(/data:image/);
  });
});

describe("accuracy against experts", () => {
  const warm = { L: 65, a: 12, b: 22 };
  it("compares our season with the expert's and reports expert agreement", () => {
    const ours = buildReport([person("A1", 4)], [run("A1", 1, true, warm)]).accuracy;
    expect(ours.people).toBe(0); // no expert label yet

    const p = person("A1", 4);
    const withExperts: Person = { ...p, experts: [{ season: "warmAutumn", rater: "C1", date: "2026-10-20" }, { season: "warmSpring", rater: "C2", date: "2026-10-20" }] };
    const a = buildReport([withExperts], [run("A1", 1, true, warm), run("A1", 2, true, warm)]).accuracy;
    expect(a.people).toBe(1);
    expect(a.experts?.pairs).toBe(1);
    expect(a.experts?.exact).toBe(0);
    // one person is never enough to promise 80%
    expect(a.firm.family).toBeNull();
  });
});
