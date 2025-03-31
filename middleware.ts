import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/supabase'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
            path: '/',
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.delete({
            name,
            ...options,
            path: '/',
          })
        },
      },
    }
  )

  try {
    // Refresh session if expired
    await supabase.auth.getSession()

    // Optional: Get user data
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If user is not signed in and the current path is not /auth,
    // redirect the user to /auth/sign-in
    if (!user && !request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    }

    return response
  } catch (e) {
    // Handle any errors
    console.error('Auth middleware error:', e)
    return response
  }
}

// Specify which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - auth routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public|auth).*)',
  ],
} 