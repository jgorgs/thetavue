import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, BarChart2, TrendingUp, Shield, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background/90">
      <header className="sticky top-0 z-50 w-full glass">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ThetaVue</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 md:py-32">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Plan Smart. <span className="text-primary">Profit Consistently.</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ThetaVue is a modern portfolio management application built specifically for options traders who
                  follow premium-selling strategies.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Link href="/sign-up">
                  <Button size="lg" className="gap-2">
                    Get Started <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="glass-card p-6 w-full max-w-md pulse-glow">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Portfolio Overview</h3>
                    <span className="text-sm text-muted-foreground">Last updated: Just now</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Delta</p>
                      <p className="text-2xl font-bold">-0.45</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Theta</p>
                      <p className="text-2xl font-bold value-positive">$245.78</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Vega</p>
                      <p className="text-2xl font-bold value-negative">-$1,245</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Plan Adherence</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="container py-16 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed">
              ThetaVue offers a comprehensive suite of tools designed specifically for options traders.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="glass-card-hover p-6 space-y-4">
              <BarChart2 className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Real-time Analytics</h3>
              <p className="text-muted-foreground">
                Track your portfolio's performance with comprehensive analytics and visualizations.
              </p>
            </div>
            <div className="glass-card-hover p-6 space-y-4">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Trade Planning</h3>
              <p className="text-muted-foreground">
                Create and monitor detailed trade plans with real-time adherence scoring.
              </p>
            </div>
            <div className="glass-card-hover p-6 space-y-4">
              <Shield className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Tastytrade Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly connect with your Tastytrade account for real-time position updates.
              </p>
            </div>
            <div className="glass-card-hover p-6 space-y-4">
              <Zap className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Strategy Analytics</h3>
              <p className="text-muted-foreground">
                Analyze performance by strategy type, underlying asset, and time period.
              </p>
            </div>
            <div className="glass-card-hover p-6 space-y-4">
              <BarChart2 className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Activity Heatmap</h3>
              <p className="text-muted-foreground">
                Visualize your trading activity with a GitHub-style calendar heatmap.
              </p>
            </div>
            <div className="glass-card-hover p-6 space-y-4">
              <Shield className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security and encryption.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="glass py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">ThetaVue</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ThetaVue. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

