// Checks the Instagram token in .env (IG_ACCESS_TOKEN) and prints the account name, never the token.
// Run: node scripts/ig-check.mjs
import { readFileSync } from "node:fs";
const t = (readFileSync(".env", "utf8").match(/^IG_ACCESS_TOKEN=(.*)$/m)?.[1] ?? "").trim();
if (!t) { console.log("Geen IG_ACCESS_TOKEN in .env."); process.exit(1); }
const host = t.startsWith("IG") ? "https://graph.instagram.com" : "https://graph.facebook.com";
const r = await fetch(`${host}/v21.0/me?fields=user_id,username&access_token=${encodeURIComponent(t)}`);
const j = await r.json();
if (j.error) { console.log("Sleutel werkt niet:", j.error.message); process.exit(1); }
console.log(`Sleutel werkt: @${j.username ?? "?"} (account-id ${j.user_id ?? j.id}). Route: ${t.startsWith("IG") ? "Instagram-login (vernieuwt zichzelf)" : "Facebook-pagina"}.`);
