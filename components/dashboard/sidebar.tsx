"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Home, LineChart, Settings, TrendingUp, Calendar, BookOpen, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SignOutButton } from "@clerk/nextjs"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Portfolio",
      icon: BarChart2,
      href: "/dashboard/portfolio",
      active: pathname === "/dashboard/portfolio",
    },
    {
      label: "Trade Plans",
      icon: BookOpen,
      href: "/dashboard/trade-plans",
      active: pathname === "/dashboard/trade-plans",
    },
    {
      label: "Analytics",
      icon: LineChart,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      label: "Activity",
      icon: Calendar,
      href: "/dashboard/activity",
      active: pathname === "/dashboard/activity",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className={cn("glass flex h-screen flex-col justify-between p-4", className)}>
      <div className="space-y-8">
        <div className="flex items-center gap-2 px-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ThetaVue</span>
        </div>
        <nav className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                route.active ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <SignOutButton>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </div>
  )
}

