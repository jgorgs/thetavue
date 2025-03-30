"use client"

import { useState } from "react"
import { UserButton } from "@clerk/nextjs"
import { Bell, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { syncTastytrade } from "@/app/actions/tastytrade"

interface HeaderProps {
  lastSyncTime?: string
}

export function Header({ lastSyncTime = "15 minutes ago" }: HeaderProps) {
  const [isSyncing, setIsSyncing] = useState(false)
  const { toast } = useToast()

  const handleRefresh = async () => {
    setIsSyncing(true)

    toast({
      title: "Syncing data",
      description: "Fetching the latest data from Tastytrade...",
    })

    try {
      const result = await syncTastytrade()

      if (result.success) {
        toast({
          title: "Sync completed",
          description: "Your data has been updated successfully.",
        })
      } else {
        toast({
          title: "Sync failed",
          description: result.error || "Failed to sync data from Tastytrade.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <header className="glass flex h-16 items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last synced: {lastSyncTime}</span>
          <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isSyncing}>
            <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-8 h-8",
            },
          }}
        />
      </div>
    </header>
  )
}

