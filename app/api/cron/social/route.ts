import { NextResponse } from "next/server";
import { supabaseConfigured } from "@/lib/db/supabase";
import { runSocial } from "@/lib/social/run";

// Hourly from GitHub Actions ("Authorization: Bearer $CRON_SECRET"): post what is due on Instagram.
export const maxDuration = 60;

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!supabaseConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  return NextResponse.json(await runSocial());
}
