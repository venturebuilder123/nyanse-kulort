import { describe, expect, it } from "vitest";
import { decodeToken, encodeToken, sanitize } from "./answers";

describe("brand-switch token", () => {
  const answers = { occasions: ["date" as const, "werk" as const], budget: "mid" as const, shops: ["COS", "Uniqlo"] };

  it("round-trips the answers", () => {
    expect(decodeToken(encodeToken(answers))).toEqual(answers);
  });

  it("expires after an hour", () => {
    const t = encodeToken(answers, 0);
    expect(decodeToken(t, 59 * 60 * 1000)).not.toBeNull();
    expect(decodeToken(t, 61 * 60 * 1000)).toBeNull();
  });

  it("rejects garbage", () => {
    expect(decodeToken("not-a-token")).toBeNull();
  });
});

describe("sanitize", () => {
  it("drops unknown values and duplicates", () => {
    expect(sanitize({ occasions: ["date", "hack", "date"], budget: "huge", shops: ["COS", 3, "COS"] })).toEqual({
      occasions: ["date"],
      budget: undefined,
      shops: ["COS"],
    });
  });
});
