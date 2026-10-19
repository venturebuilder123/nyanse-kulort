// One-time Instagram setup (docs/marketing/AUTOPOST.md, step 5). Reads IG_USER_TOKEN (a long-lived
// user token from the Graph API Explorer) from .env, finds the Facebook page and its linked Instagram
// business account, and writes IG_ACCESS_TOKEN (a page token that does not expire) and IG_USER_ID
// back into .env. Prints names only, never tokens.
// Run: node scripts/ig-setup.mjs
import { readFileSync, writeFileSync } from "node:fs";

const V = "v21.0";
let env = readFileSync(".env", "utf8");
const get = (k) => (env.match(new RegExp(`^${k}=(.*)$`, "m"))?.[1] ?? "").trim();
const set = (k, v) => { env = new RegExp(`^${k}=`, "m").test(env) ? env.replace(new RegExp(`^${k}=.*$`, "m"), `${k}=${v}`) : `${env.trimEnd()}\n${k}=${v}\n`; };
const user = get("IG_USER_TOKEN");
if (!user) { console.log("Zet eerst IG_USER_TOKEN=... in .env (zie AUTOPOST.md stap 4)."); process.exit(1); }

const api = async (path, token) => {
  const r = await fetch(`https://graph.facebook.com/${V}/${path}${path.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(token)}`);
  const j = await r.json();
  if (j.error) throw new Error(j.error.message);
  return j;
};

const pages = (await api("me/accounts?fields=id,name,access_token,instagram_business_account{id,username}", user)).data ?? [];
const page = pages.find((p) => p.instagram_business_account) ?? null;
if (!page) {
  console.log("Geen Facebook-pagina met gekoppeld Instagram-account gevonden. Pagina's:", pages.map((p) => p.name).join(", ") || "geen");
  console.log("Koppel Instagram aan de pagina (AUTOPOST.md stap 2) en kies bij de sleutel alle rechten uit stap 4.");
  process.exit(1);
}
// a page token taken from a long-lived user token does not expire
const debug = await api(`debug_token?input_token=${encodeURIComponent(page.access_token)}`, page.access_token).catch(() => null);
set("IG_ACCESS_TOKEN", page.access_token);
set("IG_USER_ID", page.instagram_business_account.id);
writeFileSync(".env", env);
console.log(`Klaar: pagina "${page.name}" → Instagram @${page.instagram_business_account.username}.`);
console.log(`Sleutel verloopt: ${debug?.data?.expires_at === 0 ? "nooit" : debug?.data?.expires_at ? new Date(debug.data.expires_at * 1000).toLocaleDateString("nl-NL") : "onbekend"}.`);
console.log("IG_ACCESS_TOKEN en IG_USER_ID staan nu in .env. Zet ze ook in Vercel (stap 6).");
