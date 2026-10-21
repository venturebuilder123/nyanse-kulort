import { describe, expect, it } from "vitest";
import { dmText, isDutch, KEYWORD, publicText } from "./dm";

describe("comment SEASON → DM", () => {
  it("reacts to the word, in any case, also in Dutch, but not inside other words", () => {
    for (const t of ["SEASON", "season please!", "Season 🙏", "welk seizoen ben ik?"]) expect(KEYWORD.test(t)).toBe(true);
    for (const t of ["seasonal colours are nice", "love this", "reasons"]) expect(KEYWORD.test(t)).toBe(false);
  });
  it("answers in the commenter's language, always with the tracked link", () => {
    expect(isDutch("welk seizoen ben ik")).toBe(true);
    expect(isDutch("SEASON")).toBe(false);
    expect(dmText(false)).toContain("utm_medium=dm");
    expect(dmText(true)).toContain("seizoen");
    expect(publicText(true)).toBe("Staat in je DM 💌");
  });
});
