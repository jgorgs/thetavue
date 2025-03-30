import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, DollarSign, BarChart2, TrendingUp, AlertCircle } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio Overview</h2>
        <div className="glass-card flex items-center gap-2 px-3 py-1 text-sm">
          <AlertCircle className="h-4 w-4 text-primary" />
          <span>
            Plan Adherence: <span className="font-bold">92%</span>
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold value-positive">$2,350.75</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-success" />
              <span className="text-success">+5.2%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Delta</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-0.45</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowDownRight className="h-3 w-3 text-destructive" />
              <span className="text-destructive">-0.12</span> from yesterday
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Theta</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold value-positive">$245.78</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-success" />
              <span className="text-success">+$12.45</span> from yesterday
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Vega</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold value-negative">-$1,245</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowDownRight className="h-3 w-3 text-destructive" />
              <span className="text-destructive">-$320</span> from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="font-medium">SPY Iron Condor</div>
                <div className="text-sm value-positive">+$145.25</div>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="font-medium">AAPL Put Credit Spread</div>
                <div className="text-sm value-positive">+$78.50</div>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="font-medium">TSLA Covered Call</div>
                <div className="text-sm value-negative">-$32.75</div>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div className="font-medium">QQQ Butterfly</div>
                <div className="text-sm value-positive">+$215.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium">AMD Naked Put</div>
                <div className="text-sm value-positive">+$112.25</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Strategy Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-sm font-medium">Iron Condors</div>
                  <div className="text-sm font-medium">35%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "35%" }}></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-sm font-medium">Credit Spreads</div>
                  <div className="text-sm font-medium">25%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-sm font-medium">Covered Calls</div>
                  <div className="text-sm font-medium">20%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-sm font-medium">Butterflies</div>
                  <div className="text-sm font-medium">10%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "10%" }}></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <div className="text-sm font-medium">Naked Puts</div>
                  <div className="text-sm font-medium">10%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

