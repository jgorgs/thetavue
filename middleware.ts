import { authMiddleware } from "@clerk/nextjs"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  debug: true, // Enable debug mode
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
    "/_next(.*)",
    "/favicon.ico",
    "/assets(.*)",
  ],
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+.[w]+$)",
    "/api/health",
    "/_next/static(.*)",
  ],
})

export const config = {
  matcher: [
    "/((?!api|_next|.*\\.).*)/?$",
    "/dashboard(.*)",
  ],
}

