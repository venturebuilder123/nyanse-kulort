import { describe, expect, it } from "vitest";
import { advance, resumeFor, visit, type Journey } from "./journey";

const DAY = 24 * 60 * 60 * 1000;
const j = (step: Journey["step"], lastAt = 0): Journey => ({ step, firstAt: 0, lastAt, visits: 1 });

describe("journey", () => {
  it("only moves forward", () => {
    expect(advance(j("selfie"), "stijl", 1).step).toBe("selfie");
    expect(advance(j("stijl"), "selfie", 1).step).toBe("selfie");
  });

  it("counts a new visit after 30 minutes", () => {
    expect(visit(j("landing", 0), 10 * 60 * 1000).isNew).toBe(false);
    const r = visit(j("landing", 0), 31 * 60 * 1000);
    expect(r.isNew).toBe(true);
    expect(r.journey.visits).toBe(2);
  });

  it("resumes at the selfie when someone stopped during or after it (the photo is never kept)", () => {
    expect(resumeFor(j("analyse"), false, false, DAY)).toMatchObject({ kind: "continue", href: "/selfie", stepsLeft: 3 });
    expect(resumeFor(j("stijl"), false, false, DAY)).toMatchObject({ kind: "continue", href: "/stijl", stepsLeft: 4 });
  });

  it("says nothing on a first visit or after 30 days", () => {
    expect(resumeFor(j("landing"), false, false, DAY)).toBeNull();
    expect(resumeFor(null, false, false, DAY)).toBeNull();
    expect(resumeFor(j("selfie", 0), false, false, 31 * DAY)).toBeNull();
  });

  it("sends people with a result or a guide straight there", () => {
    expect(resumeFor(j("resultaat"), true, false, DAY)).toEqual({ kind: "result" });
    expect(resumeFor(j("gids"), true, true, DAY)).toEqual({ kind: "guide" });
  });
});
