import { describe, expect, it } from "vitest";
import { suggestEmail } from "./email";

describe("suggestEmail", () => {
  it("fixes common domain typos", () => {
    expect(suggestEmail("daan@gmial.com")).toBe("daan@gmail.com");
    expect(suggestEmail("Sanne@Hotmial.com")).toBe("sanne@hotmail.com");
    expect(suggestEmail("mark@outlook.con")).toBe("mark@outlook.com");
  });
  it("leaves correct addresses alone", () => {
    expect(suggestEmail("daan@gmail.com")).toBeNull();
    expect(suggestEmail("daan")).toBeNull();
  });
});
