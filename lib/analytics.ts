// Funnel events (CLAUDE.md §10). Every event carries brand, voice and utm_source.
// Sent to PostHog EU when NEXT_PUBLIC_POSTHOG_KEY is set: no cookies (session storage only,
// gone when the tab closes), no IP stored, no autocapture or session replay. Never a photo,
// never an e-mail address or name in event properties.

import type { PostHog } from "posthog-js";

let ph: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;
const queue: [string, Record<string, unknown>][] = [];

function posthog(): Promise<PostHog | null> {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || typeof window === "undefined") return Promise.resolve(null);
  if (ph) return Promise.resolve(ph);
  loading ??= import("posthog-js")
    .then(({ default: p }) => {
      p.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
        persistence: "sessionStorage",
        ip: false,
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        disable_session_recording: true,
        person_profiles: "never",
      });
      ph = p;
      for (const [n, props] of queue.splice(0)) p.capture(n, props);
      return p;
    })
    .catch(() => null);
  return loading;
}

/** A page view, with the path only (no query string: it can hold order references). */
export function trackPage(path: string, ctx: Ctx): void {
  send("$pageview", { ...ctx, $current_url: location.origin + path });
}

function send(name: string, props: Record<string, unknown>) {
  if (ph) ph.capture(name, props);
  else {
    queue.push([name, props]);
    void posthog();
  }
}

export type EventName =
  | "landing_view" | "occasion_pick" | "style_done" | "brand_switch" | "selfie_start" | "selfie_ok"
  | "analysis_done" | "email_submit" | "optin_checked" | "paywall_view" | "tier_select" | "checkout_open"
  | "paid" | "transfer_claimed" | "guide_opened" | "reveal_video_created" | "share_clicked" | "affiliate_click" | "referral_used" | "waitlist_join"
  // coming back (retention): visits, resume, invitations, weekly tip
  | "type_declared" | "app_open" | "resume_shown" | "resume_click" | "invite_view" | "push_optin" | "push_optout";

type Ctx = { brand: string; voice: string };

declare global {
  interface Window {
    __nkEvents?: { name: EventName; props: Record<string, unknown>; at: number }[];
  }
}

export function track(name: EventName, ctx: Ctx, props: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  // storage can be blocked (private mode): tracking must never break the flow
  let utm_source: string | undefined;
  try {
    utm_source = new URLSearchParams(location.search).get("utm_source") ?? sessionStorage.getItem("nk_utm") ?? undefined;
    if (utm_source) sessionStorage.setItem("nk_utm", utm_source);
  } catch {}
  const event = { name, props: { ...ctx, utm_source, ...props }, at: Date.now() };
  (window.__nkEvents ??= []).push(event);
  send(name, event.props);
  if (process.env.NODE_ENV === "development") console.debug("[event]", name, event.props);
}
