// One-time YouTube login (docs/marketing/YOUTUBE.md). Reads YT_CLIENT_ID and YT_CLIENT_SECRET
// from .env, opens Google's consent page, and writes YT_REFRESH_TOKEN into .env. The token is
// never printed. Run: node scripts/youtube-auth.mjs
import { createServer } from "node:http";
import { readFileSync, writeFileSync } from "node:fs";
import { execFile } from "node:child_process";

process.loadEnvFile(".env");
const id = process.env.YT_CLIENT_ID?.trim(), secret = process.env.YT_CLIENT_SECRET?.trim();
if (!id || !secret) {
  console.error("Zet eerst YT_CLIENT_ID en YT_CLIENT_SECRET in .env (stap 3 in docs/marketing/YOUTUBE.md).");
  process.exit(1);
}
const PORT = 8765, redirect = `http://127.0.0.1:${PORT}/`;
const scope = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube.readonly"].join(" ");
const url = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({ client_id: id, redirect_uri: redirect, response_type: "code", scope, access_type: "offline", prompt: "consent" })}`;

const server = createServer(async (req, res) => {
  const code = new URL(req.url ?? "/", redirect).searchParams.get("code");
  if (!code) return res.end("Geen code ontvangen. Probeer het opnieuw.");
  const r = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body: new URLSearchParams({ code, client_id: id, client_secret: secret, redirect_uri: redirect, grant_type: "authorization_code" }) });
  const j = await r.json();
  if (!j.refresh_token) {
    res.end("Er ging iets mis. Kijk in de terminal.");
    console.error("Geen refresh token:", j.error_description ?? j.error ?? r.status);
    return server.close();
  }
  let env = readFileSync(".env", "utf8");
  env = /^YT_REFRESH_TOKEN=.*$/m.test(env) ? env.replace(/^YT_REFRESH_TOKEN=.*$/m, `YT_REFRESH_TOKEN=${j.refresh_token}`) : env.replace(/\n?$/, `\nYT_REFRESH_TOKEN=${j.refresh_token}\n`);
  writeFileSync(".env", env);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end("<p style='font-family:sans-serif'>Klaar! Je kunt dit tabblad sluiten.</p>");
  console.log("✓ YT_REFRESH_TOKEN staat in .env. Zet hem nu ook in Vercel (stap 5).");
  server.close();
});
server.listen(PORT, "127.0.0.1", () => {
  console.log("De browser opent nu. Log in met het Google-account van het YouTube-kanaal en klik op Toestaan.");
  execFile("open", [url]);
});
