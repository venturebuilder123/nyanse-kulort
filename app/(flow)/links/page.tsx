import { MaisonMark } from "../Split";

export const metadata = { title: "KULØRT · NYANSE · Links", robots: { index: false } };

// Link in bio for Instagram and TikTok (docs/marketing/GUERRILLA.md). One tap to the free check;
// ?src=instagram|tiktok carries the channel into the UTM tags, so we see which channel sells.
export default async function Links({ searchParams }: { searchParams: Promise<{ src?: string }> }) {
  const { src } = await searchParams;
  const source = src === "tiktok" ? "tiktok" : "instagram";
  const u = (path: string, content: string) => `${path}${path.includes("?") ? "&" : "?"}utm_source=${source}&utm_medium=bio&utm_content=${content}`;
  const links: [string, string, string, boolean?][] = [
    ["Gratis kleurcheck · voor hem", "KULØRT · één selfie, een paar minuten", u("/kulort", "check-him"), true],
    ["Gratis kleurcheck · voor haar", "NYANSE · één selfie, een paar minuten", u("/nyanse", "check-her"), true],
    ["Ik ken mijn kleurtype al", "Kies je seizoen en zie meteen je kleuren", u("/type", "known-type")],
    ["Welk seizoen ben jij?", "De 12 kleurtypen uitgelegd", u("/kleuranalyse", "seasons")],
  ];
  return (
    <main className="links">
      <div className="links-head">
        <MaisonMark />
        <p>Personal colour, made simple · Persoonlijk kleuradvies</p>
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
