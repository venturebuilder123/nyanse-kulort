import { headers } from "next/headers";
import { MaisonMark } from "../Split";

export const metadata = { title: "KULØRT · NYANSE · Links", robots: { index: false } };

// Link in bio for Instagram and TikTok (docs/marketing/GUERRILLA.md). One tap to the free check;
// ?src=instagram|tiktok carries the channel into the UTM tags, so we see which channel sells.
export default async function Links({ searchParams }: { searchParams: Promise<{ src?: string }> }) {
  const { src } = await searchParams;
  const source = src === "tiktok" ? "tiktok" : "instagram";
  // the bio is seen by Dutch and English speakers alike: the browser language picks, and the flow follows (lang=)
  const dutch = /^(nl|fy|li)\b/i.test((await headers()).get("accept-language") ?? "");
  const lang = dutch ? "nl" : "en";
  const u = (path: string, content: string) => `${path}${path.includes("?") ? "&" : "?"}lang=${lang}&utm_source=${source}&utm_medium=bio&utm_content=${content}`;
  const links: [string, string, string, boolean?][] = dutch
    ? [
        ["Gratis kleurcheck · voor hem", "KULØRT · één selfie, een paar minuten", u("/kulort", "check-him"), true],
        ["Gratis kleurcheck · voor haar", "NYANSE · één selfie, een paar minuten", u("/nyanse", "check-her"), true],
        ["Ik ken mijn kleurtype al", "Kies je seizoen en zie meteen je kleuren", u("/type", "known-type")],
        ["Welk seizoen ben jij?", "De 12 kleurtypen uitgelegd", u("/kleuranalyse", "seasons")],
      ]
    : [
        ["Free colour check · for him", "KULØRT · one selfie, a few minutes", u("/kulort", "check-him"), true],
        ["Free colour check · for her", "NYANSE · one selfie, a few minutes", u("/nyanse", "check-her"), true],
        ["I already know my colour type", "Pick your season and see your colours", u("/type", "known-type")],
        ["Which season are you?", "The 12 colour types explained", u("/kleuranalyse", "seasons")],
        ["Ready-made season guides", "Our Etsy shop", "https://kulortnyanse.etsy.com"],
      ];
  return (
    <main className="links">
      <div className="links-head">
        <MaisonMark />
        <p>{dutch ? "Persoonlijk kleuradvies, eenvoudig" : "Personal colour, made simple"}</p>
      </div>
      <nav className="links-list">
        {links.map(([title, sub, href, main]) => (
          <a key={href} href={href} className={main ? "is-main" : ""}>
            <b>{title}</b>
            <span>{sub}</span>
          </a>
        ))}
      </nav>
      <p className="links-foot">
        <a href="https://www.instagram.com/kulortnyanse/" rel="me noopener">Instagram</a> · <a href="https://www.tiktok.com/@kulortnyanse" rel="me noopener">TikTok</a> · <a href="/">kulort-nyanse.com</a>
      </p>
    </main>
  );
}
