import { describe, expect, it } from "vitest";
import { clarityWord, depthWord, familyOf, undertoneWord } from "./describe";

describe("describe", () => {
  it("names the scales in plain words", () => {
    expect(undertoneWord(-0.9)).toBe("koel");
    expect(undertoneWord(0)).toBe("neutraal");
    expect(undertoneWord(0.9)).toBe("warm");
    expect(depthWord(0.1)).toBe("licht");
    expect(depthWord(0.95)).toBe("diep");
    expect(clarityWord(0.1)).toBe("zacht");
    expect(clarityWord(0.95)).toBe("helder");
  });

  it("maps seasons to their Dutch family", () => {
    expect(familyOf("brightWinter")).toBe("Winter");
    expect(familyOf("softAutumn")).toBe("Herfst");
    expect(familyOf("lightSpring")).toBe("Lente");
    expect(familyOf("coolSummer")).toBe("Zomer");
  });
});
