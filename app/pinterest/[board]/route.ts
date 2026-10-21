import PINS from "@/lib/social/pins.json";

// Pinterest RSS feeds, one per board (founder, 21 Oct 2026: the CSV bulk upload refused even a single
// pin). Pinterest → Settings → Create Pins in bulk → Connect RSS feed, one feed per board:
//   /pinterest/spring  /pinterest/summer  /pinterest/autumn  /pinterest/winter
// A pin only appears once its planned time has passed, so they drip in at two a day, and new pins
// in lib/social/pins.json (scripts/make-pinterest.mjs) are picked up by themselves.
type Pin = { title: string; image: string; board: string; description: string; link: string; at: string };
const BOARDS: Record<string, string> = { spring: "Spring colour palettes", summer: "Summer colour palettes", autumn: "Autumn colour palettes", winter: "Winter colour palettes" };

const START_WITH = 6;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET(_req: Request, { params }: { params: Promise<{ board: string }> }) {
  const key = (await params).board.replace(/\.xml$/, "");
  const board = BOARDS[key];
  if (!board) return new Response("not found", { status: 404 });
  const now = Date.now();
  const all = (PINS as Pin[]).filter((p) => p.board === board).sort((a, b) => a.at.localeCompare(b.at));
  // the first six of every board at once (founder, 21 Oct 2026: full boards from day one), then the
  // rest when its time has come, two a day
  const due = all.filter((p) => new Date(p.at).getTime() <= now).length;
  const items = all.slice(0, Math.max(START_WITH, due)).reverse();
  const site = "https://www.kulort-nyanse.com";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>KULØRT · NYANSE: ${esc(board)}</title>
<link>${site}/kleuranalyse</link>
<description>${esc(board)} for her and for him, from KULØRT · NYANSE.</description>
<language>en</language>
${items.map((p) => `<item>
<title>${esc(p.title)}</title>
<link>${esc(p.link)}</link>
<guid isPermaLink="false">${esc(p.image)}</guid>
<pubDate>${new Date(p.at).toUTCString()}</pubDate>
<description><![CDATA[<img src="${p.image}" alt="${esc(p.title)}"/><p>${esc(p.description)}</p>]]></description>
<enclosure url="${esc(p.image)}" type="image/jpeg" length="0"/>
<media:content url="${esc(p.image)}" medium="image" type="image/jpeg"/>
</item>`).join("\n")}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=900" } });
}
