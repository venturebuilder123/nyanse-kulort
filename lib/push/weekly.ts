// The weekly colour tip (opt-in web push). The rules are the product here:
// at most one notification a week, only in the daytime in the person's own time zone,
// content from their own palette (no sales pressure, no "last chance").

import { VOICES, BRANDS } from "@/lib/brand/config";
import type { BrandKey, VoiceKey } from "@/lib/brand/types";
import { computeProfile, type Measurements } from "@/lib/color/profile";
import { nearestSeason, SEASONS, type SeasonKey } from "@/lib/color/seasons";
import { buildGuide } from "@/lib/guide/build";

export const MIN_GAP_MS = 6.5 * 24 * 60 * 60 * 1000;
export const QUIET = { from: 20, to: 10 } as const; // local hours: nothing before 10:00 or from 20:00

export function localHour(now: Date, timeZone: string): number {
  try {
    return Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone }).format(now));
  } catch {
    return Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Europe/Amsterdam" }).format(now));
  }
}

export function canSend(sub: { lastSentAt: number | null; timeZone: string }, now: Date): boolean {
  if (sub.lastSentAt && now.getTime() - sub.lastSentAt < MIN_GAP_MS) return false;
  const h = localHour(now, sub.timeZone);
  return h >= QUIET.to && h < QUIET.from;
}

/** Week number since 2026-01-05 (a Monday): the same tip for everyone of a type in a week. */
export const weekIndex = (now: Date) => Math.floor((now.getTime() - Date.UTC(2026, 0, 5)) / (7 * 24 * 60 * 60 * 1000));

const BASE = computeProfile({ skin: { lab: { L: 60, a: 12, b: 16 }, n: 3000, sdL: 3 }, faceWidthPx: 400, calibrated: true } as Measurements);

export function weeklyMessage(input: { brand: BrandKey; voice: VoiceKey; season: SeasonKey }, now: Date) {
  const centre = SEASONS[input.season].centre;
  const guide = buildGuide({ ...BASE, ...centre, match: nearestSeason(centre) }, input.brand);
  const w = Math.max(0, weekIndex(now));
  const colour = guide.summary.core[w % guide.summary.core.length]!;
  const copy = (BRANDS[input.brand].voices.includes(input.voice) ? VOICES[input.voice] : VOICES[BRANDS[input.brand].voices[0]!]).retention.weekly;
  const fill = (s: string) => s.replace("{type}", SEASONS[input.season].name).replace("{kleur}", colour.name);
  return {
    title: fill(copy.title),
    body: fill(copy.bodies[w % copy.bodies.length]!),
    url: "/gids?utm_source=push",
    color: colour.hex,
  };
}
