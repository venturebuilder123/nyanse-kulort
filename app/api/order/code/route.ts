import { NextResponse } from "next/server";
import { checkCode } from "@/lib/flow/discount";
import type { Tier } from "@/lib/flow/pricing";
import { giftUsed } from "@/lib/flow/gift";

// Checks a discount code for the checkout and returns only its percentage (or why it does not apply).
// The order API checks the code again; this answer only drives what the buyer sees.
export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as { code?: unknown; tier?: unknown } | null;
  const tier: Tier = b?.tier === "card" || b?.tier === "session" ? b.tier : "digital";
  const c = checkCode(b?.code, tier);
  if (!c.ok) return NextResponse.json({ ok: false, reason: c.reason }, { headers: { "Cache-Control": "no-store" } });
  if (c.single && (await giftUsed(c.code))) return NextResponse.json({ ok: false, reason: "used" }, { headers: { "Cache-Control": "no-store" } });
  return NextResponse.json({ ok: true, percent: c.percent }, { headers: { "Cache-Control": "no-store" } });
}
