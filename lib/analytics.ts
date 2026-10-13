// Funnel events (CLAUDE.md §10). Every event carries brand, voice and utm_source.
// Until PostHog EU is connected, events are kept in memory and logged in development.

export type EventName =
  | "landing_view" | "occasion_pick" | "style_done" | "brand_switch" | "selfie_start" | "selfie_ok"
  | "analysis_done" | "email_submit" | "optin_checked" | "paywall_view" | "tier_select" | "checkout_open"
  | "paid" | "reveal_video_created" | "share_clicked" | "affiliate_click" | "referral_used" | "waitlist_join"
  // coming back (retention): visits, resume, invitations, weekly tip
  | "app_open" | "resume_shown" | "resume_click" | "invite_view" | "push_optin" | "push_optout";

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
  if (process.env.NODE_ENV === "development") console.debug("[event]", name, event.props);
}
