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

describe("own shop names (22 Oct 2026)", () => {
  it("keeps typed brands, strips markup, caps length and count", () => {
    const a = sanitize({ shops: ["Ba&sh", "  Weekday  ", "<script>x</script>", "A".repeat(60), ...Array.from({ length: 40 }, (_, i) => `S${i}`)] });
    expect(a.shops[0]).toBe("Ba&sh");
    expect(a.shops[1]).toBe("Weekday");
    expect(a.shops[2]).toBe("scriptxscript");
    expect(a.shops[3]).toHaveLength(40);
    expect(a.shops.length).toBe(30);
  });
});
