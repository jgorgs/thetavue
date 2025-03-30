import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portfolio</h2>
        <p className="text-muted-foreground">View and manage your active positions and strategies.</p>
      </div>

      <Tabs defaultValue="positions" className="space-y-4">
        <TabsList className="glass">
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="greeks">Greeks</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Active Positions</CardTitle>
              <CardDescription>Your current open positions and their performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left text-sm text-muted-foreground">
                      <th className="pb-2 font-medium">Symbol</th>
                      <th className="pb-2 font-medium">Strategy</th>
                      <th className="pb-2 font-medium">Expiration</th>
                      <th className="pb-2 font-medium">P&L</th>
                      <th className="pb-2 font-medium">Delta</th>
                      <th className="pb-2 font-medium">Theta</th>
                      <th className="pb-2 font-medium">Vega</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium">SPY</td>
                      <td className="py-3">
                        <Badge variant="outline">Iron Condor</Badge>
                      </td>
                      <td className="py-3">Jun 21, 2024</td>
                      <td className="py-3 value-positive">+$145.25</td>
                      <td className="py-3">-0.05</td>
                      <td className="py-3 value-positive">$12.45</td>
                      <td className="py-3 value-negative">-$85.20</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium">AAPL</td>
                      <td className="py-3">
                        <Badge variant="outline">Put Credit Spread</Badge>
                      </td>
                      <td className="py-3">Jun 14, 2024</td>
                      <td className="py-3 value-positive">+$78.50</td>
                      <td className="py-3">-0.12</td>
                      <td className="py-3 value-positive">$8.75</td>
                      <td className="py-3 value-negative">-$45.30</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium">TSLA</td>
                      <td className="py-3">
                        <Badge variant="outline">Covered Call</Badge>
                      </td>
                      <td className="py-3">Jun 28, 2024</td>
                      <td className="py-3 value-negative">-$32.75</td>
                      <td className="py-3">0.35</td>
                      <td className="py-3 value-positive">$15.20</td>
                      <td className="py-3 value-negative">-$120.50</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 font-medium">QQQ</td>
                      <td className="py-3">
                        <Badge variant="outline">Butterfly</Badge>
                      </td>
                      <td className="py-3">Jul 19, 2024</td>
                      <td className="py-3 value-positive">+$215.00</td>
                      <td className="py-3">-0.02</td>
                      <td className="py-3 value-positive">$18.90</td>
                      <td className="py-3 value-negative">-$65.75</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">AMD</td>
                      <td className="py-3">
                        <Badge variant="outline">Naked Put</Badge>
                      </td>
                      <td className="py-3">Jun 21, 2024</td>
                      <td className="py-3 value-positive">+$112.25</td>
                      <td className="py-3">-0.30</td>
                      <td className="py-3 value-positive">$22.15</td>
                      <td className="py-3 value-negative">-$78.40</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Positions</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Premium Collected</span>
                    <span className="font-medium value-positive">$1,245.50</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total P&L</span>
                    <span className="font-medium value-positive">$518.25</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Days to Expiration</span>
                    <span className="font-medium">24 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm">Buying Power Usage</div>
                      <div className="text-sm font-medium">45%</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm">Portfolio Beta-Weighted Delta</div>
                      <div className="text-sm font-medium">-0.45</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowDownRight className="h-3 w-3 text-destructive" />
                      <span className="text-destructive">-0.12</span> from yesterday
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm">Portfolio Theta</div>
                      <div className="text-sm font-medium value-positive">$245.78</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowUpRight className="h-3 w-3 text-success" />
                      <span className="text-success">+$12.45</span> from yesterday
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
              <CardDescription>Your closed positions and historical performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Historical trade data will appear here once synced from Tastytrade.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="greeks">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Greek Exposure</CardTitle>
              <CardDescription>Detailed breakdown of your portfolio's Greek metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Detailed Greek exposure charts will appear here.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

