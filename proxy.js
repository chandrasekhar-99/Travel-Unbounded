import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.AUTH_SECRET;

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // -----------------------------------------
  // Allow admin login page
  // -----------------------------------------

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // -----------------------------------------
  // Protect admin dashboard pages
  // -----------------------------------------

  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;

    // No token
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    // Missing JWT secret
    if (!JWT_SECRET) {
      console.error("AUTH_SECRET is missing.");

      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Only admin role is allowed
      if (
        !decoded ||
        typeof decoded !== "object" ||
        decoded.role !== "admin"
      ) {
        return NextResponse.redirect(
          new URL("/admin/login", request.url)
        );
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Invalid admin token:", error);

      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};