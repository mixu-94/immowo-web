// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if the current path is the homepage ("/")
  if (url.pathname === "/") {
    // Add a custom header to indicate that we are on the home page
    request.headers.set("x-is-homepage", "true");
  } else {
    request.headers.set("x-is-homepage", "false");
  }

  // Proceed with the request
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

// Apply the middleware to all routes
export const config = {
  matcher: "/:path*", // Apply middleware to all paths
};
