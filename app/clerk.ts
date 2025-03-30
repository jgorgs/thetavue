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
    "/((?!api|trpc))(_next.*|.+.[w]+$)",
    "/favicon.ico",
  ],
  debug: process.env.NODE_ENV === "development",
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

