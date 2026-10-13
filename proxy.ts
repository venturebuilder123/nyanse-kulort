import { NextResponse, type NextRequest } from "next/server";
import { isValidToken, LAB_COOKIE } from "@/lib/lab/auth";

// Optimistic gate for the internal lab. Brand detection by host (CLAUDE.md §4) lands here in phase B.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/lab/login") return NextResponse.next();

  if (!isValidToken(request.cookies.get(LAB_COOKIE)?.value)) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    const url = request.nextUrl.clone();
    url.pathname = "/lab/login";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/lab/:path*", "/api/lab/:path*"],
};
