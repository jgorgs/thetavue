import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      redirect("/sign-in?reason=unauthorized")
    }

    return (
      <div className="flex h-screen bg-gradient-to-b from-background to-background/90">
        <Sidebar className="w-64 hidden md:flex" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Dashboard auth error:", error)
    redirect("/sign-in?error=auth_failed")
  }
}

