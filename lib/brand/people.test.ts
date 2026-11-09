import { describe, expect, it } from "vitest";
import { PEOPLE, peopleFor } from "./people";

describe("peopleFor", () => {
  it("shows the segment's own models when there are any, else the young models (default since 9 Nov 2026)", () => {
    for (const brand of ["kulort", "nyanse"] as const) {
      for (const seg of ["jong", "40"] as const) {
        const own = PEOPLE[brand].filter((p) => p.segment === seg);
        const young = PEOPLE[brand].filter((p) => p.segment === "jong");
        const expected = own.length ? own : young.length ? young : PEOPLE[brand].filter((p) => !p.segment);
        expect(peopleFor(brand, seg)).toEqual(expected);
      }
      expect(peopleFor(brand, null).every((p) => p.segment === "jong")).toBe(true);
    }
  });
});
