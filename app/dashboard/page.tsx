"use client"

import { useAuth } from "@clerk/nextjs"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUser } from "@/lib/supabase-server"

export default async function DashboardPage() {
  const user = await getUser()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Welcome back, {user?.email}</h1>
      <p className="text-muted-foreground">
        This is your dashboard. You can view your positions, trades, and settings here.
      </p>
    </div>
  )
}

