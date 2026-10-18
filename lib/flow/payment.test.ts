import { describe, expect, it } from "vitest";
import { amountFor, epcPayload, formatIban, orderRef, PAYEE } from "./payment";

describe("bank-transfer checkout", () => {
  it("makes unambiguous order references", () => {
    expect(orderRef(() => 0)).toBe("KN-AAAAAA");
    expect(orderRef()).toMatch(/^KN-[A-HJ-NP-Z2-9]{6}$/);
  });
  it("applies the friend discount to the amount", () => {
    expect(amountFor("card", false)).toBe(39.99);
    expect(amountFor("card", true)).toBe(38.99);
    expect(amountFor("session", false)).toBe(110);
  });
  it("builds a valid EPC QR payload", () => {
    const lines = epcPayload(9.99, "KN-ABC123 KULORT").split("\n");
    expect(lines.slice(0, 4)).toEqual(["BCD", "002", "1", "SCT"]);
    expect(lines[5]).toBe(PAYEE.name);
    expect(lines[6]).toBe(PAYEE.iban);
    expect(lines[7]).toBe("EUR9.99");
    expect(lines[10]).toBe("KN-ABC123 KULORT");
  });
  it("formats the IBAN for reading", () => {
    expect(formatIban(PAYEE.iban)).toBe("NL24 RABO 3152 4583 98");
  });
});
