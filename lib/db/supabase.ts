// Server-only Supabase REST access with the service role (EU region). Shared by push and orders.

export const supabaseConfigured = () => !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function supabaseRest(path: string, init: RequestInit & { prefer?: string } = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  // accept both the project URL and the "API URL" with /rest/v1 that the dashboard also shows
  const base = process.env.SUPABASE_URL!.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const res = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      // legacy service_role keys are JWTs and go in Authorization too; new sb_secret_ keys only in apikey
      ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
      "Content-Type": "application/json",
      ...(init.prefer ? { Prefer: init.prefer } : {}),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`supabase ${res.status}`);
  return res;
}
