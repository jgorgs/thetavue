import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const user = await currentUser()
    
    if (!user) {
      console.log("No user found, redirecting to sign-in")
      return redirect("/sign-in?reason=unauthorized")
    }

    console.log("User authenticated:", user.id)

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
    console.error("Dashboard layout error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">We're having trouble loading your dashboard</p>
          <a 
            href="/sign-in" 
            className="text-blue-500 hover:text-blue-600"
          >
            Try signing in again
          </a>
        </div>
      </div>
    )
  }
}

