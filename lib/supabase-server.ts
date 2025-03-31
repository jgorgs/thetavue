import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/supabase'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookie = cookieStore.get(name)
          return cookie?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value,
            ...options,
            path: '/',
          })
        },
        async remove(name: string, options: CookieOptions) {
          cookieStore.delete({
            name,
            ...options,
            path: '/',
          })
        },
      },
    }
  )
} 