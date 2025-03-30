import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/clerk-webhook",
    "/api/health",
  ],
  ignoredRoutes: [
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
    "/api/clerk-webhook",
  ],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

