import { describe, expect, it } from "vitest";
import { PEOPLE, peopleFor } from "./people";

describe("peopleFor", () => {
  it("shows the segment's own models when there are any, else the core set", () => {
    for (const brand of ["kulort", "nyanse"] as const) {
      for (const seg of ["jong", "40"] as const) {
        const own = PEOPLE[brand].filter((p) => p.segment === seg);
        const expected = own.length ? own : PEOPLE[brand].filter((p) => !p.segment);
        expect(peopleFor(brand, seg)).toEqual(expected);
      }
      expect(peopleFor(brand, null).every((p) => !p.segment)).toBe(true);
    }
  });
});
