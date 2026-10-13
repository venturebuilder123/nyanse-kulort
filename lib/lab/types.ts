import type { PipelineAResult } from "@/lib/analysis/pipelineA";
import type { SeasonKey } from "@/lib/color/seasons";

export type Gender = "v" | "m" | "x";

export type Person = {
  /** pseudonymous code, never a name */
  code: string;
  /** Monk tone 1–10 as judged by the researcher (ground truth for the breakdown) */
  monk: number;
  gender: Gender;
  beard: boolean;
  /** date the written consent form was signed (ISO) */
  consentDate: string;
  notes?: string;
  createdAt: string;
  /**
   * The ground truth: up to two independent, blind expert analyses (in person, with drapes),
   * done without seeing our result. See docs/fase-a/BETROUWBAARHEID.md.
   */
  experts?: ExpertLabel[];
};

export type ExpertLabel = { season: SeasonKey; rater: string; date: string };

export type Light = 1 | 2 | 3;

export const LIGHTS: Record<Light, string> = {
  1: "Daglicht (raam)",
  2: "Binnenlamp",
  3: "Anders (avond, buiten, tl)",
};

export type Run = {
  /** `${personCode}:${light}:${withCard ? "card" : "nocard"}` — one run per slot, re-upload replaces */
  id: string;
  personCode: string;
  light: Light;
  withCard: boolean;
  createdAt: string;
  result: PipelineAResult;
};

export const runId = (personCode: string, light: Light, withCard: boolean) =>
  `${personCode}:${light}:${withCard ? "card" : "nocard"}`;
