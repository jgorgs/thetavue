import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: Request) {
  console.log("Webhook received from Clerk")

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Error: Missing svix headers")
    return new Response("Error: Missing svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  console.log("Webhook payload:", JSON.stringify(payload))
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
    console.log("Webhook verified successfully")
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error: Invalid signature", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type
  console.log("Event type:", eventType)

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses, ...attributes } = evt.data

    if (!id || !email_addresses || email_addresses.length === 0) {
      console.error("Error: Missing user data", evt.data)
      return new Response("Error: Missing user data", {
        status: 400,
      })
    }

    const primaryEmail = email_addresses.find((email) => email.id === attributes.primary_email_address_id)

    if (!primaryEmail) {
      console.error("Error: No primary email found", email_addresses)
      return new Response("Error: No primary email found", {
        status: 400,
      })
    }

    console.log("Processing user:", id, primaryEmail.email_address)

    // Check if supabaseAdmin is initialized
    if (!supabaseAdmin) {
      console.error("Error: supabaseAdmin is not initialized")
      return new Response("Error: supabaseAdmin is not initialized", {
        status: 500,
      })
    }

    // Check if user exists in Supabase
    try {
      const { data: existingUser, error: fetchError } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching user from Supabase:", fetchError)
        return new Response(`Error fetching user: ${fetchError.message}`, {
          status: 500,
        })
      }

      if (existingUser) {
        // Update existing user
        console.log("Updating existing user:", id)
        const { error } = await supabaseAdmin
          .from("users")
          .update({
            email: primaryEmail.email_address,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)

        if (error) {
          console.error("Error updating user in Supabase:", error)
          return new Response(`Error updating user: ${error.message}`, {
            status: 500,
          })
        }

        console.log("User updated successfully")
      } else {
        // Create new user
        console.log("Creating new user:", id)
        const { error } = await supabaseAdmin.from("users").insert([
          {
            id,
            email: primaryEmail.email_address,
            display_name: attributes.first_name
              ? `${attributes.first_name} ${attributes.last_name || ""}`
              : primaryEmail.email_address.split("@")[0],
          },
        ])

        if (error) {
          console.error("Error creating user in Supabase:", error)
          return new Response(`Error creating user: ${error.message}`, {
            status: 500,
          })
        }

        console.log("User created successfully")
      }

      return new Response("User synced with Supabase", {
        status: 200,
      })
    } catch (error) {
      console.error("Unexpected error in webhook handler:", error)
      return new Response(`Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`, {
        status: 500,
      })
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data

    if (!id) {
      console.error("Error: Missing user ID")
      return new Response("Error: Missing user ID", {
        status: 400,
      })
    }

    console.log("Deleting user:", id)

    // Check if supabaseAdmin is initialized
    if (!supabaseAdmin) {
      console.error("Error: supabaseAdmin is not initialized")
      return new Response("Error: supabaseAdmin is not initialized", {
        status: 500,
      })
    }

    // Delete user from Supabase
    try {
      const { error } = await supabaseAdmin.from("users").delete().eq("id", id)

      if (error) {
        console.error("Error deleting user from Supabase:", error)
        return new Response(`Error deleting user: ${error.message}`, {
          status: 500,
        })
      }

      console.log("User deleted successfully")
    } catch (error) {
      console.error("Unexpected error deleting user:", error)
      return new Response(`Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`, {
        status: 500,
      })
    }

    return new Response("User deleted from Supabase", {
      status: 200,
    })
  }

  return new Response("Webhook received", {
    status: 200,
  })
}

