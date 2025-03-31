"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signOut } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/sign-in')
  }

  return (
    <div className="flex h-16 items-center border-b px-4">
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        ThetaVue
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="sr-only">Sign out</span>
        </Button>
      </div>
    </div>
  )
}

