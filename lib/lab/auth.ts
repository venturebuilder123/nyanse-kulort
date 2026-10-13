// Password gate for /lab. The cookie holds an HMAC derived from the password, never the
// password itself; changing LAB_PASSWORD logs everyone out. Missing password = locked.

import { createHmac, timingSafeEqual } from "node:crypto";

export const LAB_COOKIE = "nk_lab";
export const LAB_COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

export function labToken(): string | null {
  const pw = process.env.LAB_PASSWORD;
  if (!pw) return null;
  return createHmac("sha256", pw).update("nk-lab-session-v1").digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function isValidToken(token: string | undefined): boolean {
  const expected = labToken();
  return !!expected && !!token && safeEqual(token, expected);
}

export function isValidPassword(candidate: string): boolean {
  const pw = process.env.LAB_PASSWORD;
  if (!pw) return false;
  // compare digests so lengths always match
  const h = (s: string) => createHmac("sha256", "nk-lab-compare").update(s).digest("hex");
  return safeEqual(h(candidate), h(pw));
}
