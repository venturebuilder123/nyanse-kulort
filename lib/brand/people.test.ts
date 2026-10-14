import { describe, expect, it } from "vitest";
import { PEOPLE, peopleFor } from "./people";

describe("peopleFor", () => {
  it("falls back to the core set when a segment has no images yet", () => {
    expect(peopleFor("nyanse", "40")).toEqual(PEOPLE.nyanse.filter((p) => !p.segment));
    expect(peopleFor("kulort", null).every((p) => !p.segment)).toBe(true);
  });
});
