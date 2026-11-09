import AURA from "@/lib/social/aura-posts.json";
import { calendar } from "@/lib/social/calendar";
import { tiktokPosts } from "@/lib/social/tiktok";
import { Copy } from "./Copy";

// The Colour Aura campaign in one place (founder, 9 Nov 2026: "staat alles in lab? ik zie het niet").
// Per model: the reel, the Instagram carousel, the feed post, both captions and when each goes out.
// Posting itself stays on /lab/social (Instagram) and /lab/tiktok (TikTok), where the ticks live.
type Aura = { slug: string; brand: "nyanse" | "kulort"; season: string; dir: string };

const when = (d: Date | string) => new Date(d).toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
const thumb = { width: "100%", display: "block", background: "#eee" } as const;

export default function AuraLab() {
  const slots = calendar();
  const tiktok = tiktokPosts();
  const grid = slots.find((s) => s.key.startsWith("aura-grid"));
  return (
    <div className="stack">
      <h1>✦ Colour Aura</h1>
      <p className="muted small">
        De campagne voor 18–25. Hier staat alles bij elkaar. <b>Instagram</b> gaat vanzelf volgens het schema (afvinken op <a href="/lab/social">Instagram</a>); <b>TikTok</b> plaats je zelf (afvinken op <a href="/lab/tiktok">TikTok</a>). Uitleg: docs/marketing/AURA.md.
      </p>

      {grid && (
        <section style={{ border: "1px solid #ddd", padding: 12, display: "grid", gap: 8 }}>
          <b>&quot;Which aura are you?&quot;: Instagram {when(grid.at)}</b>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 200px))", gap: 8 }}>
            {grid.images.map((u) => <a key={u} href={u} download target="_blank" rel="noreferrer"><img src={u} alt="" style={thumb} loading="lazy" /></a>)}
          </div>
          <span className="small" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Copy text={grid.caption} label="Kopieer Instagram-tekst" /></span>
        </section>
      )}

      {(AURA as Aura[]).map((a) => {
        const reel = slots.find((s) => s.key === `aura-reel-${a.slug}`);
        const car = slots.find((s) => s.key === `aura-carousel-${a.slug}`);
        const tt = tiktok.find((t) => t.key === `tiktok-aura-${a.slug}`);
        return (
          <section key={a.slug} style={{ border: "1px solid #ddd", padding: 12, display: "grid", gap: 10 }}>
            <b>{a.season} · {a.brand === "nyanse" ? "NYANSE (haar)" : "KULØRT (hem)"} · {a.slug}</b>
            <div style={{ display: "grid", gridTemplateColumns: "120px repeat(4, minmax(0, 120px)) 120px", gap: 8, overflowX: "auto" }}>
              <video src={`${a.dir}/reel.mp4`} poster={`${a.dir}/cover.jpg`} controls muted playsInline preload="none" style={{ ...thumb, aspectRatio: "9/16", objectFit: "cover" }} />
              {[1, 2, 3, 4].map((n) => <a key={n} href={`${a.dir}/slide-${n}.jpg`} target="_blank" rel="noreferrer"><img src={`${a.dir}/slide-${n}.jpg`} alt={`slide ${n}`} style={thumb} loading="lazy" /></a>)}
              <a href={`${a.dir}/post.jpg`} target="_blank" rel="noreferrer"><img src={`${a.dir}/post.jpg`} alt="feedpost" style={thumb} loading="lazy" /></a>
            </div>
            <div className="small" style={{ display: "grid", gap: 6 }}>
              <span>
                <b>Reel</b>: Instagram {reel ? when(reel.at) : "–"} · TikTok {tt ? new Date(tt.day).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short" }) : "–"}{" "}
                · <a href={`${a.dir}/reel.mp4`} download>Download video</a> · <a href={`${a.dir}/cover.jpg`} download>Cover / story</a>
              </span>
              <span><b>Carrousel</b>: Instagram {car ? when(car.at) : "–"} · <a href={`${a.dir}/slide-1.jpg`} download>1</a> <a href={`${a.dir}/slide-2.jpg`} download>2</a> <a href={`${a.dir}/slide-3.jpg`} download>3</a> <a href={`${a.dir}/slide-4.jpg`} download>4</a></span>
              <span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {reel && <Copy text={reel.caption} label="Kopieer tekst reel (Instagram)" />}
                {car && <Copy text={car.caption} label="Kopieer tekst carrousel" />}
                {tt && <Copy text={tt.caption} label="Kopieer tekst TikTok" />}
              </span>
            </div>
          </section>
        );
      })}
    </div>
  );
}
