'use client'

import { createClientSupabaseClient } from '@/lib/supabase-client'
import { useEffect } from 'react'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize client-side Supabase
    const supabase = createClientSupabaseClient()
    
    // Set up real-time subscriptions or other client-side features here
    const subscription = supabase
      .channel('*')
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
        console.log('Change received!', payload)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return <>{children}</>
} 