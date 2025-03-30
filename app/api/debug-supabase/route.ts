// Add a debug endpoint to check Supabase connection

import { NextResponse } from "next/server"
import { supabaseAdmin, checkSupabaseAdmin } from "@/lib/supabase"

export async function GET() {
  console.log("Debug Supabase endpoint called")

  // Check if supabaseAdmin is initialized
  const isInitialized = checkSupabaseAdmin()

  if (!isInitialized) {
    return NextResponse.json(
      {
        error: "Supabase admin client is not initialized",
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Not set",
        serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Not set",
      },
      { status: 500 },
    )
  }

  try {
    // Test the connection by querying the users table
    const { data, error } = await supabaseAdmin!.from("users").select("id, email").limit(5)

    if (error) {
      console.error("Error querying Supabase:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful",
      userCount: data.length,
    })
  } catch (error) {
    console.error("Unexpected error testing Supabase connection:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

