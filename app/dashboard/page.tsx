import { getServerUser } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getServerUser()
  
  if (!user) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="space-y-4 p-8">
      <h1 className="text-2xl font-bold">Welcome back, {user.email}</h1>
      <p className="text-muted-foreground">
        This is your dashboard. You can view your positions, trades, and settings here.
      </p>
    </div>
  )
}

