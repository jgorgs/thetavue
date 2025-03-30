import { clerkMiddleware } from "@clerk/nextjs/server"

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/clerk-webhook",
  "/api/health",
]

// Define routes that should be ignored by the middleware
const ignoredRoutes = [
  "/_next(.*)",
  "/favicon.ico",
  "/api/health",
  "/((?!api|trpc))(_next.*|.+.[w]+$)",
]

export default clerkMiddleware({
  publicRoutes,
  ignoredRoutes,
  debug: process.env.NODE_ENV === "development",
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}

