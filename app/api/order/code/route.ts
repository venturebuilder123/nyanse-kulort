import { NextResponse } from "next/server";
import { discountFor } from "@/lib/flow/discount";

// Checks a discount code for the checkout and returns only its percentage. The order API checks
// the code again; this answer only drives what the buyer sees.
export async function POST(req: Request) {
  const b = (await req.json().catch(() => null)) as { code?: unknown } | null;
  const percent = discountFor(b?.code);
  return NextResponse.json(percent ? { ok: true, percent } : { ok: false }, { headers: { "Cache-Control": "no-store" } });
}
