// Instagram publishing via the official Graph API (Content Publishing). No passwords: a token from
// the founder's own Meta app, in Vercel as IG_ACCESS_TOKEN, plus the account id IG_USER_ID.
// Images must be public JPEG URLs (ours live under /social/).

const V = () => process.env.IG_GRAPH_VERSION ?? "v21.0";
const base = () => `https://graph.facebook.com/${V()}`;
export const instagramConfigured = () => !!(process.env.IG_ACCESS_TOKEN && process.env.IG_USER_ID);

async function call(path: string, params: Record<string, string>, method: "GET" | "POST" = "POST") {
  const q = new URLSearchParams({ ...params, access_token: process.env.IG_ACCESS_TOKEN! });
  const res = await fetch(method === "GET" ? `${base()}/${path}?${q}` : `${base()}/${path}`, method === "GET" ? { cache: "no-store" } : { method, body: q, cache: "no-store" });
  const j = (await res.json().catch(() => ({}))) as { id?: string; error?: { message?: string }; [k: string]: unknown };
  if (!res.ok || j.error) throw new Error(`instagram: ${j.error?.message ?? res.status}`);
  return j;
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
  const user = process.env.IG_USER_ID!;
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

/** For the lab: is the token valid, and which account is it? */
export async function whoami(): Promise<{ id: string; username?: string }> {
  return (await call(process.env.IG_USER_ID!, { fields: "id,username" }, "GET")) as { id: string; username?: string };
}
