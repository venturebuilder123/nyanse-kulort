import { describe, expect, it } from "vitest";
import { resolveSegment } from "./segment";

describe("resolveSegment", () => {
  it("follows the link, then the visit, then the voice", () => {
    expect(resolveSegment({ param: "jong", voice: "girlmath" })).toBe("jong");
    expect(resolveSegment({ cookie: "40", voice: "wingman" })).toBe("40");
    expect(resolveSegment({ voice: "signature" })).toBe("40");
    expect(resolveSegment({ voice: "bosslady" })).toBeNull();
    expect(resolveSegment({ param: "evil", voice: "bosslady" })).toBeNull();
  });
});
