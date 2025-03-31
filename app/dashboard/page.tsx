import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>You are signed in!</p>
    </div>
  )
}

