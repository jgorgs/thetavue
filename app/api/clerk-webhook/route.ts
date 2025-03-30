import { Webhook } from "svix"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { createAdminClient } from "@/lib/supabase"

export async function POST(req: Request) {
  console.log("Webhook received from Clerk")

  try {
    // Get the headers from the request directly
    const svix_id = req.headers.get("svix-id")
    const svix_timestamp = req.headers.get("svix-timestamp")
    const svix_signature = req.headers.get("svix-signature")

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

    // Create a new Supabase admin client
    const supabase = createAdminClient()

    // Create a new SVIX instance with your Clerk webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

    let evt: WebhookEvent

    // Verify the webhook
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
      const { id, email_addresses, first_name, last_name, ...attributes } = evt.data
      const primaryEmail = email_addresses?.[0]?.email_address

      if (!id || !primaryEmail) {
        console.error("Error: Missing user data", evt.data)
        return new Response("Error: Missing user data", {
          status: 400,
        })
      }

      console.log("Processing user:", id, primaryEmail)

      const { error } = await supabase.from("users").upsert({
        id,
        email: primaryEmail,
        first_name,
        last_name,
        clerk_data: attributes,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "id"
      })

      if (error) {
        console.error("Error syncing user to Supabase:", error)
        return new Response("Error syncing user", { status: 500 })
      }

      return new Response("User synced with Supabase", {
        status: 200,
      })
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

      const { error } = await supabase.from("users").delete().match({ id })

      if (error) {
        console.error("Error deleting user from Supabase:", error)
        return new Response("Error deleting user", { status: 500 })
      }

      return new Response("User deleted from Supabase", {
        status: 200,
      })
    }

    return new Response("Webhook processed successfully", { status: 200 })
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error)
    return new Response("Internal server error", { status: 500 })
  }
}

