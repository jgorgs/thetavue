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

  const supabase = createServerClient<Database>(
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
    const { data: { session } } = await supabase.auth.getSession()

    // If user is not signed in and the current path is not /auth,
    // redirect the user to /auth/sign-in
    if (!session && !request.nextUrl.pathname.startsWith('/auth')) {
      const redirectUrl = new URL('/auth/sign-in', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If user is signed in and trying to access auth pages,
    // redirect them to the dashboard
    if (session && request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
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
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 