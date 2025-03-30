import { SignIn } from "@clerk/nextjs"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">ThetaVue</span>
      </Link>
      <div className="glass-card w-full max-w-md p-8">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none w-full",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-purple-500 hover:bg-purple-600",
              formFieldInput: "bg-background border-border",
              footerActionLink: "text-purple-500 hover:text-purple-600",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
            },
          }}
          routing="hash"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  )
} 