import { describe, expect, it } from "vitest";
import { resolveLocale } from "./locale";

describe("resolveLocale", () => {
  const on = ["nl", "en"] as const;
  it("reads /en URLs and strips the prefix", () => {
    expect(resolveLocale({ pathname: "/en", enabled: [...on] })).toEqual({ locale: "en", path: "/", prefixed: true });
    expect(resolveLocale({ pathname: "/en/kleuranalyse", enabled: [...on] })).toEqual({ locale: "en", path: "/kleuranalyse", prefixed: true });
    expect(resolveLocale({ pathname: "/english", enabled: [...on] }).locale).toBe("nl");
  });
  it("then ?lang=, then the cookie", () => {
    expect(resolveLocale({ pathname: "/stijl", param: "en", enabled: [...on] }).locale).toBe("en");
    expect(resolveLocale({ pathname: "/stijl", cookie: "en", enabled: [...on] }).locale).toBe("en");
    expect(resolveLocale({ pathname: "/stijl", param: "nl", cookie: "en", enabled: [...on] }).locale).toBe("nl");
  });
  it("stays Dutch while English is switched off", () => {
    expect(resolveLocale({ pathname: "/en", enabled: ["nl"] })).toEqual({ locale: "nl", path: "/en", prefixed: false });
    expect(resolveLocale({ pathname: "/", cookie: "en", enabled: ["nl"] }).locale).toBe("nl");
  });
});
