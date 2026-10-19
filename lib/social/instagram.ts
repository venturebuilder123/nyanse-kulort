// Instagram publishing via the official API (Content Publishing). No passwords.
// Two ways to connect, chosen by the token itself:
//   - Instagram Login (no Facebook page needed): token starts with "IG…", host graph.instagram.com.
//     It lasts 60 days; we renew it ourselves and keep the newest one in app_settings.
//   - Facebook Login (via a Facebook page): host graph.facebook.com, a page token that does not expire.
// IG_USER_ID is optional with Instagram Login (we ask the API who we are).

import { supabaseConfigured, supabaseRest } from "@/lib/db/supabase";

const V = () => process.env.IG_GRAPH_VERSION ?? "v21.0";
export const instagramConfigured = () => !!process.env.IG_ACCESS_TOKEN?.trim();

type Token = { token: string; host: string };
let cached: (Token & { userId?: string }) | null = null;

async function storedToken(): Promise<{ value: string; updated_at: string } | null> {
  if (!supabaseConfigured()) return null;
  const r = await supabaseRest("app_settings?key=eq.ig_token&select=value,updated_at").then((x) => x.json()).catch(() => []);
  return (r as { value: string; updated_at: string }[])[0] ?? null;
}

async function token(): Promise<Token> {
  if (cached) return cached;
  const env = process.env.IG_ACCESS_TOKEN!.trim();
  const stored = env.startsWith("IG") ? await storedToken() : null;
  const t = stored?.value ?? env;
  cached = { token: t, host: t.startsWith("IG") ? "https://graph.instagram.com" : "https://graph.facebook.com" };
  return cached;
}

async function call(path: string, params: Record<string, string>, method: "GET" | "POST" = "POST") {
  const { token: t, host } = await token();
  const q = new URLSearchParams({ ...params, access_token: t });
  const url = `${host}/${V()}/${path}`;
  const res = await fetch(method === "GET" ? `${url}?${q}` : url, method === "GET" ? { cache: "no-store" } : { method, body: q, cache: "no-store" });
  const j = (await res.json().catch(() => ({}))) as { id?: string; error?: { message?: string }; [k: string]: unknown };
  if (!res.ok || j.error) throw new Error(`instagram: ${j.error?.message ?? res.status}`);
  return j;
}

async function userId(): Promise<string> {
  if (process.env.IG_USER_ID) return process.env.IG_USER_ID;
  if (cached?.userId) return cached.userId;
  const me = (await call("me", { fields: "user_id,username" }, "GET")) as { user_id?: string; id?: string };
  const id = String(me.user_id ?? me.id);
  if (cached) cached.userId = id;
  return id;
}

/** Instagram Login tokens: renew when older than 30 days, keep the new one (runs with every cron). */
export async function refreshToken(): Promise<string> {
  const env = process.env.IG_ACCESS_TOKEN?.trim() ?? "";
  if (!env.startsWith("IG") || !supabaseConfigured()) return "not needed";
  const stored = await storedToken();
  if (stored && Date.now() - new Date(stored.updated_at).getTime() < 30 * 864e5) return "fresh";
  const current = stored?.value ?? env;
  const r = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(current)}`, { cache: "no-store" });
  const j = (await r.json().catch(() => ({}))) as { access_token?: string; error?: { message?: string } };
  if (!j.access_token) return `refresh failed: ${j.error?.message ?? r.status}`;
  await supabaseRest("app_settings?on_conflict=key", { method: "POST", body: JSON.stringify({ key: "ig_token", value: j.access_token, updated_at: new Date().toISOString() }), prefer: "resolution=merge-duplicates,return=minimal" });
  cached = null;
  return "renewed";
}

/** Wait until a media container is ready to publish (carousels take a few seconds). */
async function ready(id: string) {
  for (let i = 0; i < 20; i++) {
    const s = (await call(id, { fields: "status_code" }, "GET")) as { status_code?: string };
    if (s.status_code === "FINISHED") return;
    if (s.status_code === "ERROR" || s.status_code === "EXPIRED") throw new Error(`instagram: container ${s.status_code}`);
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("instagram: container not ready in time");
}

export async function publish(kind: "carousel" | "image", images: string[], caption: string): Promise<string> {
  const user = await userId();
  let creation: string;
  if (kind === "image") {
    creation = (await call(`${user}/media`, { image_url: images[0]!, caption })).id!;
  } else {
    const children: string[] = [];
    for (const url of images.slice(0, 10)) children.push((await call(`${user}/media`, { image_url: url, is_carousel_item: "true" })).id!);
    creation = (await call(`${user}/media`, { media_type: "CAROUSEL", children: children.join(","), caption })).id!;
  }
  await ready(creation);
  return (await call(`${user}/media_publish`, { creation_id: creation })).id!;
}

/** For the lab and the setup check: is the token valid, and which account is it? */
export async function whoami(): Promise<{ id: string; username?: string }> {
  const id = await userId();
  return (await call(id, { fields: "id,username" }, "GET")) as { id: string; username?: string };
}
