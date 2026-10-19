// YouTube Shorts via the official YouTube Data API v3 (videos.insert). A vertical video under
// 3 minutes becomes a Short by itself; there is no separate Shorts endpoint.
// Auth: an OAuth client (Google Cloud) plus a refresh token from scripts/youtube-auth.mjs.
// Until Google has audited the API project, uploads are forced to "private": the founder then
// sets them to public in YouTube Studio (docs/marketing/YOUTUBE.md).

export const youtubeConfigured = () => !!(process.env.YT_CLIENT_ID?.trim() && process.env.YT_CLIENT_SECRET?.trim() && process.env.YT_REFRESH_TOKEN?.trim());

let cached: { token: string; until: number } | null = null;

async function accessToken(): Promise<string> {
  if (cached && cached.until > Date.now() + 60e3) return cached.token;
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: new URLSearchParams({ client_id: process.env.YT_CLIENT_ID!.trim(), client_secret: process.env.YT_CLIENT_SECRET!.trim(), refresh_token: process.env.YT_REFRESH_TOKEN!.trim(), grant_type: "refresh_token" }),
    cache: "no-store",
  });
  const j = (await r.json().catch(() => ({}))) as { access_token?: string; expires_in?: number; error?: string; error_description?: string };
  if (!j.access_token) throw new Error(`youtube auth: ${j.error_description ?? j.error ?? r.status}`);
  cached = { token: j.access_token, until: Date.now() + (j.expires_in ?? 3600) * 1000 };
  return j.access_token;
}

export type ShortMeta = { title: string; description: string; tags: string[] };

/** Uploads a video (fetched from its public URL) as a Short; returns the video id. */
export async function uploadShort(videoUrl: string, meta: ShortMeta): Promise<string> {
  const video = await fetch(videoUrl, { cache: "no-store" });
  if (!video.ok) throw new Error(`youtube: video not found (${video.status})`);
  const bytes = new Uint8Array(await video.arrayBuffer());
  const token = await accessToken();
  // resumable upload, step 1: the metadata; YouTube answers with an upload URL
  const init = await fetch("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json; charset=UTF-8", "X-Upload-Content-Type": "video/mp4", "X-Upload-Content-Length": String(bytes.length) },
    body: JSON.stringify({
      snippet: { title: meta.title.slice(0, 100), description: meta.description.slice(0, 5000), tags: meta.tags, categoryId: "26", defaultLanguage: "en", defaultAudioLanguage: "en" },
      // the models are AI-generated: YouTube's "altered or synthetic content" label
      status: { privacyStatus: "public", selfDeclaredMadeForKids: false, containsSyntheticMedia: true },
    }),
    cache: "no-store",
  });
  const where = init.headers.get("location");
  if (!init.ok || !where) throw new Error(`youtube: ${((await init.json().catch(() => ({}))) as { error?: { message?: string } }).error?.message ?? init.status}`);
  // step 2: the video itself (a 7-second reel is under 1 MB, so one request)
  const up = await fetch(where, { method: "PUT", headers: { Authorization: `Bearer ${token}`, "Content-Type": "video/mp4" }, body: bytes, cache: "no-store" });
  const j = (await up.json().catch(() => ({}))) as { id?: string; error?: { message?: string } };
  if (!up.ok || !j.id) throw new Error(`youtube: ${j.error?.message ?? up.status}`);
  return j.id;
}

/** For the lab: is the connection valid, and which channel is it? */
export async function youtubeChannel(): Promise<{ id: string; title?: string }> {
  const r = await fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true", { headers: { Authorization: `Bearer ${await accessToken()}` }, cache: "no-store" });
  const j = (await r.json().catch(() => ({}))) as { items?: { id: string; snippet?: { title?: string } }[]; error?: { message?: string } };
  if (!r.ok || !j.items?.[0]) throw new Error(`youtube: ${j.error?.message ?? "no channel on this account"}`);
  return { id: j.items[0].id, title: j.items[0].snippet?.title };
}
