"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { connectTastytrade } from "@/app/actions/tastytrade"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [connecting, setConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleConnect = async () => {
    setConnecting(true)

    try {
      // In a real implementation, this would redirect to Tastytrade OAuth
      // For now, we'll simulate a successful connection
      const mockCode = "mock_auth_code"
      const result = await connectTastytrade(mockCode)

      if (result.success) {
        setConnected(true)
        toast({
          title: "Connected to Tastytrade",
          description: "Your account has been successfully linked.",
        })
      } else {
        toast({
          title: "Connection failed",
          description: result.error || "Failed to connect to Tastytrade.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setConnecting(false)
    }
  }

  const handleContinue = () => {
    if (step === 1 && !connected) {
      toast({
        title: "Connection required",
        description: "Please connect your Tastytrade account to continue.",
        variant: "destructive",
      })
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/90 p-4">
      <div className="mb-8 flex items-center gap-2">
        <TrendingUp className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold">ThetaVue</span>
      </div>

      <Card className="glass-card w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to ThetaVue</CardTitle>
          <CardDescription>Let's get your account set up in just a few steps.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    step === i
                      ? "bg-primary text-primary-foreground"
                      : step > i
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {step > i ? <Check className="h-4 w-4" /> : i}
                </div>
                <span className="mt-2 text-xs text-muted-foreground">
                  {i === 1 ? "Connect" : i === 2 ? "Preferences" : "Complete"}
                </span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Connect your Tastytrade account</h3>
              <p className="text-sm text-muted-foreground">
                ThetaVue needs to connect to your Tastytrade account to sync your positions and trading data.
              </p>
              <Button onClick={handleConnect} disabled={connecting || connected} className="w-full">
                {connecting ? "Connecting..." : connected ? "Connected ✓" : "Connect to Tastytrade"}
              </Button>
              {connected && <p className="text-sm text-success">Successfully connected to Tastytrade!</p>}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Set your preferences</h3>
              <p className="text-sm text-muted-foreground">
                Customize how ThetaVue works for you. You can always change these later.
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Sync frequency</label>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option>Every 15 minutes</option>
                    <option>Every 30 minutes</option>
                    <option>Every hour</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Default benchmark</label>
                  <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option>S&P 500</option>
                    <option>Nasdaq 100</option>
                    <option>Russell 2000</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">You're all set!</h3>
              <p className="text-sm text-muted-foreground">
                Your account is now configured and ready to use. Click below to go to your dashboard.
              </p>
              <div className="rounded-lg bg-secondary p-4">
                <h4 className="font-medium">What's next?</h4>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>View your portfolio overview</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Create your first trade plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success" />
                    <span>Explore analytics and performance metrics</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button onClick={handleContinue}>
            {step === 3 ? "Go to Dashboard" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

