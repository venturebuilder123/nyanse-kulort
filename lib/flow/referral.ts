// Friend code (CLAUDE.md §2: €1 off, only after the friend has paid, max 10 per code).
// The code is created on the device; redemption is checked server-side once payments exist.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion

export function makeReferralCode(name?: string, random: () => number = Math.random): string {
  const prefix = (name ?? "").normalize("NFD").replace(/[^A-Za-z]/g, "").slice(0, 6).toUpperCase() || "KLEUR";
  const tail = Array.from({ length: 4 }, () => ALPHABET[Math.floor(random() * ALPHABET.length)]).join("");
  return `${prefix}-${tail}`;
}

export const referralUrl = (origin: string, code: string) => `${origin}/?ref=${encodeURIComponent(code)}`;
