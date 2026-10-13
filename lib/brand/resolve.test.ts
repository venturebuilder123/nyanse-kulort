import { describe, expect, it } from "vitest";
import { brandForHost, resolveBrand } from "./resolve";

describe("brandForHost", () => {
  it("recognises the brand domains, with or without www and port", () => {
    expect(brandForHost("kulort.nl")).toBe("kulort");
    expect(brandForHost("www.nyanse.com")).toBe("nyanse");
    expect(brandForHost("nyanse.app:443")).toBe("nyanse");
    expect(brandForHost("localhost:3000")).toBeNull();
  });
});

describe("resolveBrand", () => {
  it("lets the production domain win over ?brand=", () => {
    expect(resolveBrand({ host: "kulort.nl", brandParam: "nyanse" }).brand).toBe("kulort");
  });

  it("uses ?brand= locally, then the cookie, then KULØRT", () => {
    expect(resolveBrand({ host: "localhost", brandParam: "nyanse" }).brand).toBe("nyanse");
    expect(resolveBrand({ host: "localhost", brandCookie: "nyanse" }).brand).toBe("nyanse");
    expect(resolveBrand({ host: "localhost" }).brand).toBe("kulort");
    expect(resolveBrand({ host: "localhost", brandParam: "evil" }).brand).toBe("kulort");
  });

  it("picks the NYANSE voice from the ad (?s=gm|at), Atelier by default", () => {
    expect(resolveBrand({ host: "nyanse.nl", voiceParam: "gm" }).voice).toBe("girlmath");
    expect(resolveBrand({ host: "nyanse.nl" }).voice).toBe("atelier");
    expect(resolveBrand({ host: "nyanse.nl", voiceCookie: "girlmath" }).voice).toBe("girlmath");
  });

  it("never gives KULØRT a NYANSE voice", () => {
    expect(resolveBrand({ host: "kulort.nl", voiceParam: "gm" }).voice).toBe("wingman");
    expect(resolveBrand({ host: "kulort.nl", voiceCookie: "atelier" }).voice).toBe("wingman");
  });

  it("is undecided on the shared domain until someone picks a brand", () => {
    expect(resolveBrand({ host: "kulort-nyanse.com" }).chosen).toBe(false);
    expect(resolveBrand({ host: "kulort-nyanse.com", brandCookie: "nyanse" })).toMatchObject({ brand: "nyanse", chosen: true });
    expect(resolveBrand({ host: "kulort.nl" }).chosen).toBe(true);
  });

  it("lets an ad's voice pick the brand (?s=gm is NYANSE)", () => {
    expect(resolveBrand({ host: "kulort-nyanse.com", voiceParam: "gm" })).toMatchObject({ brand: "nyanse", voice: "girlmath", chosen: true });
    // an explicit brand still wins over the voice
    expect(resolveBrand({ host: "kulort-nyanse.com", brandParam: "kulort", voiceParam: "gm" }).voice).toBe("wingman");
  });
});
