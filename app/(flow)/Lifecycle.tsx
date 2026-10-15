"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track, trackPage } from "@/lib/analytics";
import { journey, type JourneyStep } from "@/lib/flow/journey";
import { invite } from "@/lib/flow/referral";
import { flowSession } from "@/lib/flow/session";
import { useBrand } from "./BrandProvider";

const STEP_BY_PATH: Record<string, JourneyStep> = {
  "/": "landing", "/stijl": "stijl", "/selfie": "selfie", "/analyse": "analyse",
  "/email": "email", "/resultaat": "resultaat", "/gids": "gids",
};

// Runs on every page of the flow: how far someone got, how often they come back
// (app_open, also from the home screen), and a friend code from the link.
export function Lifecycle() {
  const { ctx } = useBrand();
  const path = usePathname();

  useEffect(() => {
    const { journey: j, isNew } = journey.visit();
    const ref = invite.capture(location.search);
    if (isNew) {
      const r = flowSession.result();
      track("app_open", ctx, {
        visit: j.visits,
        days_since_first: Math.floor((Date.now() - j.firstAt) / 86_400_000),
        standalone: matchMedia("(display-mode: standalone)").matches,
        stage: r?.paid ? "paid" : r ? "result" : j.step,
        invited: !!ref,
      });
    }
  }, []);

  useEffect(() => {
    const step = STEP_BY_PATH[path];
    if (step) journey.reach(step);
    trackPage(path, ctx);
  }, [path]);

  return null;
}
