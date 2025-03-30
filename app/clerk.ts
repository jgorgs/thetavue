import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  // Ensure the user is redirected to the correct page after sign in
  afterSignInUrl: "/dashboard",
  afterSignUpUrl: "/onboarding",
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/clerk-webhook",
    "/api/health",
  ],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}

