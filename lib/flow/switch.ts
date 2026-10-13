import { BRANDS } from "@/lib/brand/config";
import type { BrandKey } from "@/lib/brand/types";
import { encodeToken, type Answers } from "./answers";

/**
 * Link to the other brand that keeps the answers (CLAUDE.md §2).
 * On a brand domain we go to the other brand's domain with the same TLD; elsewhere
 * (localhost, previews) we stay on the host and switch with ?brand=.
 */
export function switchUrl(from: BrandKey, answers: Answers, location: { hostname: string; protocol: string; port: string }): string {
  const to = BRANDS[from].other;
  const t = encodeToken(answers);
  const host = location.hostname.replace(/^www\./, "");
  const i = BRANDS[from].hosts.indexOf(host);
  if (i >= 0) return `https://${BRANDS[to].hosts[i]}/?t=${t}`;
  return `/?brand=${to}&t=${t}`;
}
