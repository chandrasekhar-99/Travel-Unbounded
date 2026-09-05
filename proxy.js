import { NextResponse } from "next/server";

import { verifyAdminToken } from "@/lib/auth";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Login page is public
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    const admin = verifyAdminToken(token);

    if (!admin || admin.role !== "admin") {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};