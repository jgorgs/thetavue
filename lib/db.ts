import { supabase } from "./supabase"
import { auth } from "@clerk/nextjs/server"
import type { Database } from "@/types/supabase"

type User = Database["public"]["Tables"]["users"]["Row"]
type Position = Database["public"]["Tables"]["positions"]["Row"]
type TradePlan = Database["public"]["Tables"]["trade_plans"]["Row"]
type PortfolioMetric = Database["public"]["Tables"]["portfolio_metrics"]["Row"]
type SyncLog = Database["public"]["Tables"]["sync_logs"]["Row"]

// User operations
export async function getUser() {
  const { userId } = auth()
  if (!userId || !supabase) return null

  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching user:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Unexpected error in getUser:", error)
    return null
  }
}

// Simplified version of createOrUpdateUser
export async function createOrUpdateUser(userData: Partial<User>) {
  const { userId } = auth()
  if (!userId || !supabase) return null

  try {
    // Check if user exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("id", userId).single()

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from("users")
        .update({ ...userData, updated_at: new Date().toISOString() })
        .eq("id", userId)
        .select()
        .single()

      if (error) {
        console.error("Error updating user:", error)
        return null
      }

      return data
    } else {
      // Create new user
      const { data, error } = await supabase
        .from("users")
        .insert([{ id: userId, ...userData }])
        .select()
        .single()

      if (error) {
        console.error("Error creating user:", error)
        return null
      }

      return data
    }
  } catch (error) {
    console.error("Unexpected error in createOrUpdateUser:", error)
    return null
  }
}

// Position operations
export async function getPositions(status?: string): Promise<Position[]> {
  const { userId } = auth()
  if (!userId) return []

  let query = supabase.from("positions").select("*").eq("user_id", userId).order("updated_at", { ascending: false })

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching positions:", error)
    return []
  }

  return data || []
}

export async function getPosition(id: string): Promise<Position | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase.from("positions").select("*").eq("id", id).eq("user_id", userId).single()

  if (error) {
    console.error("Error fetching position:", error)
    return null
  }

  return data
}

export async function createPosition(
  position: Omit<Position, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<Position | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase
    .from("positions")
    .insert([{ ...position, user_id: userId }])
    .select()
    .single()

  if (error) {
    console.error("Error creating position:", error)
    return null
  }

  return data
}

export async function updatePosition(id: string, position: Partial<Position>): Promise<Position | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase
    .from("positions")
    .update({ ...position, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating position:", error)
    return null
  }

  return data
}

// Trade Plan operations
export async function getTradePlans(): Promise<TradePlan[]> {
  const { userId } = auth()
  if (!userId) return []

  const { data, error } = await supabase
    .from("trade_plans")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Error fetching trade plans:", error)
    return []
  }

  return data || []
}

export async function getTradePlan(id: string): Promise<TradePlan | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase.from("trade_plans").select("*").eq("id", id).eq("user_id", userId).single()

  if (error) {
    console.error("Error fetching trade plan:", error)
    return null
  }

  return data
}

export async function createTradePlan(
  tradePlan: Omit<TradePlan, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<TradePlan | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase
    .from("trade_plans")
    .insert([{ ...tradePlan, user_id: userId }])
    .select()
    .single()

  if (error) {
    console.error("Error creating trade plan:", error)
    return null
  }

  return data
}

export async function updateTradePlan(id: string, tradePlan: Partial<TradePlan>): Promise<TradePlan | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase
    .from("trade_plans")
    .update({ ...tradePlan, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating trade plan:", error)
    return null
  }

  return data
}

// Portfolio Metrics operations
export async function getPortfolioMetrics(days = 30): Promise<PortfolioMetric[]> {
  const { userId } = auth()
  if (!userId) return []

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  const startDateStr = startDate.toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("portfolio_metrics")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDateStr)
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching portfolio metrics:", error)
    return []
  }

  return data || []
}

export async function createPortfolioMetric(
  metric: Omit<PortfolioMetric, "id" | "created_at" | "user_id">,
): Promise<PortfolioMetric | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase
    .from("portfolio_metrics")
    .insert([{ ...metric, user_id: userId }])
    .select()
    .single()

  if (error) {
    console.error("Error creating portfolio metric:", error)
    return null
  }

  return data
}

// Sync Logs operations
export async function getSyncLogs(limit = 10): Promise<SyncLog[]> {
  const { userId } = auth()
  if (!userId) return []

  const { data, error } = await supabase
    .from("sync_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching sync logs:", error)
    return []
  }

  return data || []
}

export async function createSyncLog(log: Omit<SyncLog, "id" | "created_at" | "user_id">): Promise<SyncLog | null> {
  const { userId } = auth()
  if (!userId) return null

  const { data, error } = await supabase
    .from("sync_logs")
    .insert([{ ...log, user_id: userId }])
    .select()
    .single()

  if (error) {
    console.error("Error creating sync log:", error)
    return null
  }

  return data
}

// Portfolio Summary
export async function getPortfolioSummary() {
  const { userId } = auth()
  if (!userId) return null

  const positions = await getPositions("open")

  if (!positions.length) {
    return {
      totalPositions: 0,
      totalPremiumCollected: 0,
      totalPnL: 0,
      averageDaysToExpiration: 0,
      totalDelta: 0,
      totalTheta: 0,
      totalVega: 0,
      totalGamma: 0,
      buyingPowerUsage: 0,
    }
  }

  const totalPositions = positions.length
  const totalPremiumCollected = positions.reduce((sum, pos) => sum + Number(pos.premium), 0)
  const totalPnL = positions.reduce((sum, pos) => sum + Number(pos.pnl), 0)

  // Calculate days to expiration for each position
  const now = new Date()
  const daysToExpiration = positions.map((pos) => {
    const expDate = new Date(pos.expiration)
    const diffTime = expDate.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  })

  const averageDaysToExpiration = daysToExpiration.reduce((sum, days) => sum + days, 0) / totalPositions

  const totalDelta = positions.reduce((sum, pos) => sum + Number(pos.delta), 0)
  const totalTheta = positions.reduce((sum, pos) => sum + Number(pos.theta), 0)
  const totalVega = positions.reduce((sum, pos) => sum + Number(pos.vega), 0)
  const totalGamma = positions.reduce((sum, pos) => sum + Number(pos.gamma), 0)

  // This is a placeholder - in a real app, you'd calculate this based on account value
  const buyingPowerUsage = 45 // Percentage

  return {
    totalPositions,
    totalPremiumCollected,
    totalPnL,
    averageDaysToExpiration,
    totalDelta,
    totalTheta,
    totalVega,
    totalGamma,
    buyingPowerUsage,
  }
}

