// Friend code (CLAUDE.md §2: €1 off, only after the friend has paid, max 10 per code).
// The code is created on the device; redemption is checked server-side once payments exist.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I confusion

export function makeReferralCode(name?: string, random: () => number = Math.random): string {
  const prefix = (name ?? "").normalize("NFD").replace(/[^A-Za-z]/g, "").slice(0, 6).toUpperCase() || "KLEUR";
  const tail = Array.from({ length: 4 }, () => ALPHABET[Math.floor(random() * ALPHABET.length)]).join("");
  return `${prefix}-${tail}`;
}

export const referralUrl = (origin: string, code: string) => `${origin}/?ref=${encodeURIComponent(code)}`;

/** The friend discount, in euros (CLAUDE.md §2). */
export const FRIEND_DISCOUNT = 1;

const CODE_RE = /^([A-Z]{1,6})-([A-HJ-NP-Z2-9]{4})$/;

/** A valid code from a link, with the friend's first name when the code carries one. */
export function parseReferral(raw: string | null | undefined): { code: string; friend?: string } | null {
  const code = (raw ?? "").trim().toUpperCase();
  const m = CODE_RE.exec(code);
  if (!m) return null;
  const prefix = m[1]!;
  return prefix === "KLEUR" ? { code } : { code, friend: prefix[0] + prefix.slice(1).toLowerCase() };
}

const REF_KEY = "nk_ref";

/** Keeps the friend code from ?ref= for this device, so the discount is there at checkout. */
export const invite = {
  capture(search: string): { code: string; friend?: string } | null {
    const fromUrl = parseReferral(new URLSearchParams(search).get("ref"));
    try {
      if (fromUrl) localStorage.setItem(REF_KEY, fromUrl.code);
      return fromUrl ?? parseReferral(localStorage.getItem(REF_KEY));
    } catch {
      return fromUrl;
    }
  },
  get(): { code: string; friend?: string } | null {
    try {
      return parseReferral(localStorage.getItem(REF_KEY));
    } catch {
      return null;
    }
  },
  clear() {
    try {
      localStorage.removeItem(REF_KEY);
    } catch {}
  },
};
