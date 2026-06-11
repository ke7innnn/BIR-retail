import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // In local dev the frontend (localhost) and the auth cookies (scoped to the
  // backend's domain, e.g. .nexonalabs.com) live on different domains, so this
  // server-side middleware can never see them and would wrongly bounce every
  // protected route to /login. Skip the cookie-based guard in development and
  // rely on the client-side guards (AuthContext + admin layout) instead.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  // Identify active auth cookies
  const hasAccessToken = request.cookies.has("access_token");
  const hasRefreshToken = request.cookies.has("refresh_token");

  // Route matches
  const isAdminRoute = path.startsWith("/admin");
  const isAuthRoute = path === "/login" || path === "/register";
  const isCheckoutRoute = path.startsWith("/checkout");

  // 1. User is unauthenticated (no tokens)
  if (!hasAccessToken && !hasRefreshToken) {
    if (isAdminRoute || isCheckoutRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Authenticated users should not see login/register pages
  if ((hasAccessToken || hasRefreshToken) && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/checkout/:path*", "/login", "/register"],
};
