"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/positions", label: "Positions" },
  { href: "/dashboard/trades", label: "Trades" },
  { href: "/dashboard/settings", label: "Settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[200px] flex-col border-r">
      <nav className="flex-1 space-y-1 p-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-sm font-medium",
              pathname === link.href
                ? "bg-secondary text-secondary-foreground"
                : "hover:bg-secondary/50"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

