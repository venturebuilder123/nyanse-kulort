import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { allComments, recentMedia, whoami } from "@/lib/social/instagram";
import { states } from "@/lib/social/run";

// Founder only (proxy guards /api/lab): the giveaway draw (terms on /winactie). Every unique account
// that commented on the giveaway posts before the closing time is one entry; 10 winners and 5 reserves
// are drawn with a cryptographic random number. Following must be checked by hand (the API has no follower list).
export const maxDuration = 60;
const CLOSES = new Date("2026-11-08T22:59:59Z"); // Sunday 8 Nov 2026, 23:59 Amsterdam

export async function POST() {
  const st = await states();
  const keys = ["giveaway-2026-11-02", "giveaway-last-2026-11-06"];
  const media = keys.map((k) => st.get(k)?.media_id).filter((x): x is string => !!x && x !== "manual");
  // placed by hand (Meta blocked the API): find them by their caption among the latest posts
  if (keys.some((k) => st.get(k)?.media_id === "manual")) {
    for (const m of await recentMedia(40)) {
      if (new Date(m.timestamp) >= new Date("2026-11-01") && /^(GIVEAWAY|Last chance)/i.test(m.caption ?? "") && !media.includes(m.id)) media.push(m.id);
    }
  }
  if (!media.length) return NextResponse.json({ error: "giveaway posts not published yet" }, { status: 404 });
  const me = (await whoami()).username;
  const seen = new Map<string, string>();
  for (const id of media) for (const c of await allComments(id)) {
    if (!c.username || c.username === me || new Date(c.timestamp) > CLOSES) continue;
    if (!seen.has(c.username)) seen.set(c.username, c.text);
  }
  const pool = [...seen.keys()];
  const picked: string[] = [];
  while (picked.length < Math.min(15, pool.length)) picked.push(pool.splice(randomInt(pool.length), 1)[0]!);
  return NextResponse.json({ entries: seen.size, winners: picked.slice(0, 10), reserves: picked.slice(10), drawnAt: new Date().toISOString() });
}
