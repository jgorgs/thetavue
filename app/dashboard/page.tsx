"use client"

import { useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { isLoaded, userId, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    console.log("Auth state:", {
      isLoaded,
      userId,
      isSignedIn
    })

    if (isLoaded && !isSignedIn) {
      console.log("Not signed in, redirecting to sign-in page")
      router.push("/sign-in")
    }
  }, [isLoaded, userId, isSignedIn, router])

  if (!isLoaded) {
    console.log("Auth is still loading...")
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <h2 className="text-xl font-semibold">Loading auth state...</h2>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    console.log("No signed in user found")
    return null
  }

  console.log("User is signed in, rendering dashboard")
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>You are signed in with ID: {userId}</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify({ isLoaded, userId, isSignedIn }, null, 2)}
      </pre>
    </div>
  )
}

