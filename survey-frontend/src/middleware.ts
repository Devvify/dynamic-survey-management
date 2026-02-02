import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Public routes - no auth needed
  if (pathname === "/" || pathname === "/login") {
    return token ? NextResponse.redirect(new URL("/admin", request.url)) : NextResponse.next();
  }

  // No token - redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Get user roles
  const userCookie = request.cookies.get("user")?.value;
  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = JSON.parse(decodeURIComponent(userCookie));
    const isAdmin = user.roles?.includes("admin");
    const isOfficer = user.roles?.includes("officer");

    // Check admin routes
    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/surveys", request.url));
    }

    // Check officer routes
    if ((pathname.startsWith("/surveys") || pathname.startsWith("/officer")) && !isOfficer && !isAdmin) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    // Invalid user data - clear and redirect
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("token");
    response.cookies.delete("user");
    return response;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
