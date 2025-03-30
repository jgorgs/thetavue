import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function TradePlansPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trade Plans</h2>
          <p className="text-muted-foreground">Create and manage your trading strategies and goals.</p>
        </div>
        <Link href="/dashboard/trade-plans/create">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            New Trade Plan
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Monthly Income Plan
            </CardTitle>
            <CardDescription>Created on March 15, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Target Monthly Return</span>
                <span className="font-medium">2.5%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Max Portfolio Delta</span>
                <span className="font-medium">±0.30</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Target Daily Theta</span>
                <span className="font-medium">$150-$250</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-secondary p-2 text-sm">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>
                  Adherence Score: <span className="font-bold">92%</span>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Earnings Season Strategy
            </CardTitle>
            <CardDescription>Created on April 2, 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Target Monthly Return</span>
                <span className="font-medium">3.0%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Max Portfolio Delta</span>
                <span className="font-medium">±0.45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Target Daily Theta</span>
                <span className="font-medium">$200-$300</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-secondary p-2 text-sm">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span>
                  Adherence Score: <span className="font-bold">78%</span>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </CardFooter>
        </Card>

        <Card className="glass-card border-dashed border-2 border-border hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-muted-foreground">Create New Plan</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <PlusCircle className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Define a new trading strategy with goals and risk parameters
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/trade-plans/create" className="w-full">
              <Button variant="outline" className="w-full">
                Create Plan
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

