// Browser side of the weekly colour tip. Permission is only asked after a tap on our own
// button (never on page load), and switching off is one tap.

import type { BrandKey, VoiceKey } from "@/lib/brand/types";
import type { SeasonKey } from "@/lib/color/seasons";

export type PushState = "unsupported" | "ios-install" | "denied" | "off" | "on";

const FLAG = "nk_push";
const standalone = () => matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true;
const isIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent);

export function pushState(): PushState {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) return "unsupported";
  // iOS only offers web push to apps on the home screen
  if (isIos() && !standalone()) return "ios-install";
  if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) return "unsupported";
  if (Notification.permission === "denied") return "denied";
  try {
    return localStorage.getItem(FLAG) ? "on" : "off";
  } catch {
    return "off";
  }
}

function keyBytes(base64url: string): Uint8Array<ArrayBuffer> {
  const b64 = (base64url + "=".repeat((4 - (base64url.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export async function pushOn(p: { brand: BrandKey; voice: VoiceKey; season: SeasonKey }): Promise<PushState> {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return permission === "denied" ? "denied" : "off";
  const reg = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;
  const subscription =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!) }));
  const res = await fetch("/api/push", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription: subscription.toJSON(), ...p, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
  });
  if (!res.ok) {
    await subscription.unsubscribe();
    throw new Error(`push ${res.status}`);
  }
  try {
    localStorage.setItem(FLAG, "1");
  } catch {}
  return "on";
}

/** Off on this device and on the server. Safe to call when it was never on. */
export async function pushOff(): Promise<void> {
  try {
    localStorage.removeItem(FLAG);
  } catch {}
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  if (!sub) return;
  await fetch("/api/push", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: sub.endpoint }) }).catch(() => {});
  await sub.unsubscribe();
}
