import { authMiddleware, clerkClient } from "@clerk/nextjs"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/clerk-webhook",
    "/api/health",
    "/api/debug-supabase",
  ],
  ignoredRoutes: [
    "/api/clerk-webhook",
    "/api/health",
    "/api/debug-supabase",
  ],
  debug: true, // Enable debug mode to see more detailed logs
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

