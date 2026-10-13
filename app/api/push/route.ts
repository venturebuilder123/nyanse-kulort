import { NextResponse } from "next/server";
import { parseSubscription, pushConfigured, pushStore } from "@/lib/push/store";

// Opt in (POST) and out (DELETE) of the weekly colour tip.

export async function POST(req: Request) {
  if (!pushConfigured()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  const row = parseSubscription(await req.json().catch(() => null));
  if (!row) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await pushStore.upsert(row);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!pushConfigured()) return NextResponse.json({ ok: true });
  const body = (await req.json().catch(() => null)) as { endpoint?: unknown } | null;
  const endpoint = typeof body?.endpoint === "string" && body.endpoint.length <= 1000 ? body.endpoint : null;
  if (!endpoint) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await pushStore.remove(endpoint);
  return NextResponse.json({ ok: true });
}
