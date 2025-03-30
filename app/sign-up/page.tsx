import { SignUp } from "@clerk/nextjs"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">ThetaVue</span>
      </Link>
      <div className="glass-card w-full max-w-md p-8">
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none w-full",
              headerTitle: "text-2xl font-bold text-foreground",
              headerSubtitle: "text-muted-foreground",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              formFieldInput: "bg-background border-border text-foreground",
              formFieldLabel: "text-foreground",
              formFieldHintText: "text-muted-foreground",
              formFieldErrorText: "text-destructive",
              footerActionLink: "text-primary hover:text-primary/90",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              identityPreviewText: "text-foreground",
              identityPreviewEditButton: "text-primary hover:text-primary/90",
              otpCodeFieldInput: "text-foreground",
            },
          }}
          redirectUrl="/onboarding"
        />
      </div>
    </div>
  )
}

