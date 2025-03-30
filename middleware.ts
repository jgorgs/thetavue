import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api/clerk-webhook", "/api/debug-supabase", "/api/health", "/test-page"],
  ignoredRoutes: ["/api/clerk-webhook", "/api/debug-supabase", "/api/health"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

