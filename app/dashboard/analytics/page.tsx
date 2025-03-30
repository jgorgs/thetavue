import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Analyze your trading performance and strategies.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold value-positive">2.4%</div>
            <p className="text-xs text-muted-foreground">Per trade</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.85</div>
            <p className="text-xs text-muted-foreground">Last 90 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-64 space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Select defaultValue="30days">
                  <SelectTrigger id="date-range">
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="strategy-type">Strategy Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="strategy-type">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Strategies</SelectItem>
                    <SelectItem value="iron-condor">Iron Condors</SelectItem>
                    <SelectItem value="credit-spread">Credit Spreads</SelectItem>
                    <SelectItem value="covered-call">Covered Calls</SelectItem>
                    <SelectItem value="butterfly">Butterflies</SelectItem>
                    <SelectItem value="naked-put">Naked Puts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="underlying">Underlying</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="underlying">
                    <SelectValue placeholder="Select underlying" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Underlyings</SelectItem>
                    <SelectItem value="spy">SPY</SelectItem>
                    <SelectItem value="qqq">QQQ</SelectItem>
                    <SelectItem value="aapl">AAPL</SelectItem>
                    <SelectItem value="tsla">TSLA</SelectItem>
                    <SelectItem value="amd">AMD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="benchmark">Benchmark</Label>
                <Select defaultValue="spy">
                  <SelectTrigger id="benchmark">
                    <SelectValue placeholder="Select benchmark" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spy">S&P 500 (SPY)</SelectItem>
                    <SelectItem value="qqq">Nasdaq 100 (QQQ)</SelectItem>
                    <SelectItem value="iwm">Russell 2000 (IWM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList className="glass">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>Your trading performance compared to the benchmark.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Performance chart will appear here once data is synced.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="strategies">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Strategy Performance</CardTitle>
                  <CardDescription>Performance breakdown by strategy type.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Strategy performance chart will appear here once data is synced.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                  <CardDescription>Detailed risk analysis of your trading strategies.</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    Risk metrics chart will appear here once data is synced.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
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
    </div>
  )
}

