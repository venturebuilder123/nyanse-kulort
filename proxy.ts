import { NextResponse, type NextRequest } from "next/server";
import { BRAND_COOKIE, BRAND_HEADER, CHOSEN_HEADER, resolveBrand, VOICE_COOKIE, VOICE_HEADER } from "@/lib/brand/resolve";
import { resolveSegment, SEGMENT_COOKIE, SEGMENT_HEADER } from "@/lib/brand/segment";
import { isValidToken, LAB_COOKIE } from "@/lib/lab/auth";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Internal lab: password gate.
  if ((pathname.startsWith("/lab") || pathname.startsWith("/api/lab")) && pathname !== "/lab/login") {
    if (!isValidToken(request.cookies.get(LAB_COOKIE)?.value)) {
      if (pathname.startsWith("/api/")) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      const url = request.nextUrl.clone();
      url.pathname = "/lab/login";
      url.search = "";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2. Ad links on the shared domain: /kulort and /nyanse skip the split home page.
  if (pathname === "/kulort" || pathname === "/nyanse") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("brand", pathname.slice(1));
    return NextResponse.redirect(url);
  }

  // 3. Customer flow: the domain decides the brand (locally ?brand=), the ad decides the voice (?s=).
  const { brand, voice, chosen } = resolveBrand({
    host: request.headers.get("host"),
    brandParam: searchParams.get("brand"),
    voiceParam: searchParams.get("s"),
    brandCookie: request.cookies.get(BRAND_COOKIE)?.value,
    voiceCookie: request.cookies.get(VOICE_COOKIE)?.value,
  });
  const headers = new Headers(request.headers);
  headers.set(BRAND_HEADER, brand);
  headers.set(VOICE_HEADER, voice);
  headers.set(CHOSEN_HEADER, chosen ? "1" : "0");
  const gParam = searchParams.get("g");
  const segment = resolveSegment({ param: gParam, cookie: request.cookies.get(SEGMENT_COOKIE)?.value, voice });
  if (segment) headers.set(SEGMENT_HEADER, segment);
  const res = NextResponse.next({ request: { headers } });

  // Functional cookies: keep brand and voice for the rest of the visit.
  const opts = { path: "/", sameSite: "lax" as const };
  // only remember a brand someone actually picked, so the split stays until then
  if (chosen && request.cookies.get(BRAND_COOKIE)?.value !== brand) res.cookies.set(BRAND_COOKIE, brand, { ...opts, maxAge: 60 * 60 * 24 * 30 });
  // the voice comes from the ad: keep it for this visit only, so it is not ad attribution
  if (request.cookies.get(VOICE_COOKIE)?.value !== voice) res.cookies.set(VOICE_COOKIE, voice, opts);
  // the age segment, like the voice: from the ad, for this visit only
  if (gParam !== null && segment !== (request.cookies.get(SEGMENT_COOKIE)?.value ?? null)) {
    if (segment) res.cookies.set(SEGMENT_COOKIE, segment, opts);
    else res.cookies.delete(SEGMENT_COOKIE);
  }
  return res;
}

export const config = {
  // everything except static files, models and Next internals
  matcher: ["/((?!_next/|models/|mediapipe/|favicon|icons/|manifest|.*\\.(?:png|jpg|svg|ico|webmanifest|txt)$).*)"],
};
