// Where someone is in the flow and how often they come back. Numbers and step names only,
// on this device (CLAUDE.md §5). Used for an honest "je bent er bijna" and for the
// usage events (app_open); cleared together with the profile.

export const JOURNEY_STEPS = ["landing", "stijl", "selfie", "analyse", "email", "resultaat", "betaald", "gids"] as const;
export type JourneyStep = (typeof JOURNEY_STEPS)[number];

export type Journey = {
  /** furthest step reached */
  step: JourneyStep;
  firstAt: number;
  lastAt: number;
  /** visits, counted as a new visit after 30 minutes of absence */
  visits: number;
};

const KEY = "nk_journey";
const VISIT_GAP_MS = 30 * 60 * 1000;
const RESUME_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
/** rough seconds still needed from each step to the free result (measured end-to-end ≤60 s) */
const SECONDS_LEFT: Partial<Record<JourneyStep, number>> = { landing: 45, stijl: 40, selfie: 25, analyse: 10, email: 5 };

const rank = (s: JourneyStep) => JOURNEY_STEPS.indexOf(s);

export function advance(j: Journey | null, step: JourneyStep, now: number): Journey {
  if (!j) return { step, firstAt: now, lastAt: now, visits: 1 };
  return { ...j, step: rank(step) > rank(j.step) ? step : j.step, lastAt: now };
}

/** Counts a visit; returns the updated journey and whether this is a new visit. */
export function visit(j: Journey | null, now: number): { journey: Journey; isNew: boolean } {
  if (!j) return { journey: { step: "landing", firstAt: now, lastAt: now, visits: 1 }, isNew: true };
  const isNew = now - j.lastAt > VISIT_GAP_MS;
  return { journey: { ...j, visits: j.visits + (isNew ? 1 : 0), lastAt: now }, isNew };
}

export type Resume =
  | { kind: "continue"; href: string; stepsLeft: number; seconds: number }
  | { kind: "result" }
  | { kind: "guide" };

/**
 * What a returning visitor sees. Only true statements: the steps that are really left,
 * and only when they really stopped halfway (not on the first visit, not after 30 days).
 */
export function resumeFor(j: Journey | null, hasResult: boolean, paid: boolean, now: number): Resume | null {
  if (paid) return { kind: "guide" };
  if (hasResult) return { kind: "result" };
  if (!j || now - j.lastAt > RESUME_MAX_AGE_MS) return null;
  // the photo is never stored, so anything after the selfie restarts at the selfie
  const at = rank(j.step) >= rank("selfie") ? "selfie" : j.step === "stijl" ? "stijl" : null;
  if (!at) return null;
  const stepsLeft = rank("resultaat") - rank(at);
  return { kind: "continue", href: `/${at}`, stepsLeft, seconds: SECONDS_LEFT[at] ?? 30 };
}

function read(): Journey | null {
  try {
    const j = JSON.parse(localStorage.getItem(KEY) ?? "null") as Journey | null;
    return j && JOURNEY_STEPS.includes(j.step) && typeof j.lastAt === "number" ? j : null;
  } catch {
    return null;
  }
}
function write(j: Journey) {
  try {
    localStorage.setItem(KEY, JSON.stringify(j));
  } catch {}
}

export const journey = {
  get: read,
  reach(step: JourneyStep) {
    write(advance(read(), step, Date.now()));
  },
  visit() {
    const r = visit(read(), Date.now());
    write(r.journey);
    return r;
  },
  clear() {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  },
};
