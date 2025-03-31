import { getServerUser } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await getServerUser()
  
  if (!user) {
    redirect('/auth/sign-in')
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <p>Welcome back, {user.email}</p>
    </div>
  )
}

