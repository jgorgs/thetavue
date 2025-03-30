import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"

export default function ActivityPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Activity</h2>
        <p className="text-muted-foreground">Track your trading activity and history.</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Trade Activity Heatmap</CardTitle>
          <CardDescription>GitHub-style visualization of your trading activity.</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Trade activity heatmap will appear here once data is synced.
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent trades and account activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Opened SPY Iron Condor</div>
                  <Badge variant="outline">Iron Condor</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Sold SPY 500/505 - 450/445 Iron Condor for $1.25 credit
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Today, 10:15 AM</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <ArrowDownRight className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Closed AAPL Put Credit Spread</div>
                  <Badge variant="outline">Credit Spread</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Bought to close AAPL 170/165 Put Credit Spread for $0.15 (85% profit)
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Yesterday, 3:45 PM</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Opened QQQ Butterfly</div>
                  <Badge variant="outline">Butterfly</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Bought QQQ 380/400/420 Butterfly for $1.85 debit</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>March 28, 2024, 11:30 AM</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <ArrowUpRight className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Opened AMD Naked Put</div>
                  <Badge variant="outline">Naked Put</Badge>
                </div>
                <div className="text-sm text-muted-foreground">Sold AMD 150 Put for $2.25 credit</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>March 27, 2024, 2:15 PM</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <ArrowDownRight className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Closed TSLA Covered Call</div>
                  <Badge variant="outline">Covered Call</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Bought to close TSLA 250 Call for $0.35 (82% profit)
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>March 26, 2024, 9:45 AM</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

