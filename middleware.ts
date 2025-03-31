import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes should require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)"
  // Add other protected routes if needed
]);

// Define public routes that don't need authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api(.*)",
  "/_next(.*)",
  "/favicon.ico",
  "/assets(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  console.log("Middleware processing path:", req.nextUrl.pathname);
  
  // Only protect routes that aren't public
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    console.log("Protecting route:", req.nextUrl.pathname);
    await auth.protect();
  } else {
    console.log("Public route access:", req.nextUrl.pathname);
  }
}, { debug: true });

// Use a simpler matcher pattern that Next.js will accept
export const config = {
  matcher: [
    // Skip Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Include API routes
    "/(api|trpc)(.*)"
  ],
};