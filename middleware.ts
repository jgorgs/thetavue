import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes should require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  // Add any other protected routes here
]);

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/clerk-webhook",
  "/api/health",
]);

export default clerkMiddleware(async (auth, req) => {
  // For protected routes, require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|api|.*\\.).*)",
    "/dashboard(.*)",
    "/(api|trpc)(.*)",
  ],
};