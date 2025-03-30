import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="glass">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general application preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Preferences</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">The application will always use dark mode.</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked disabled />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Preferences</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Sync Frequency</Label>
                    <Select defaultValue="15">
                      <SelectTrigger id="sync-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">Every 15 minutes</SelectItem>
                        <SelectItem value="30">Every 30 minutes</SelectItem>
                        <SelectItem value="60">Every hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-benchmark">Default Benchmark</Label>
                    <Select defaultValue="spy">
                      <SelectTrigger id="default-benchmark">
                        <SelectValue placeholder="Select benchmark" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spy">S&P 500 (SPY)</SelectItem>
                        <SelectItem value="qqq">Nasdaq 100 (QQQ)</SelectItem>
                        <SelectItem value="iwm">Russell 2000 (IWM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention</Label>
                    <Select defaultValue="2years">
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      How long to keep detailed trading data. Aggregated data is kept for 5+ years.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Information</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" placeholder="Your Name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" disabled />
                    <p className="text-xs text-muted-foreground">
                      To change your email, please update it in your Clerk account settings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Security</h3>
                <div className="space-y-2">
                  <Button variant="outline">Manage Account Security</Button>
                  <p className="text-xs text-muted-foreground">
                    Manage your password, two-factor authentication, and other security settings.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Danger Zone</h3>
                <div className="space-y-2">
                  <Button variant="destructive">Delete Account</Button>
                  <p className="text-xs text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Tastytrade Integration</CardTitle>
              <CardDescription>Manage your connection to Tastytrade.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-base font-medium">Connection Status</h3>
                  <p className="text-sm text-muted-foreground">Your Tastytrade account is currently connected.</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-success/20 px-3 py-1 text-xs text-success">
                  <span className="h-2 w-2 rounded-full bg-success"></span>
                  Connected
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium">Last Sync</h3>
                <p className="text-sm">15 minutes ago</p>
                <Button variant="outline" size="sm">
                  Sync Now
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-medium">Sync Logs</h3>
                <div className="max-h-40 overflow-y-auto rounded-md border border-border p-2 text-xs">
                  <div className="space-y-2">
                    <div>
                      <span className="text-muted-foreground">[2024-03-30 09:45:12]</span> Sync completed successfully
                    </div>
                    <div>
                      <span className="text-muted-foreground">[2024-03-30 09:30:10]</span> Sync completed successfully
                    </div>
                    <div>
                      <span className="text-muted-foreground">[2024-03-30 09:15:08]</span> Sync completed successfully
                    </div>
                    <div>
                      <span className="text-muted-foreground">[2024-03-30 09:00:11]</span> Sync completed successfully
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Reconnect Tastytrade
                </Button>
                <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                  Disconnect
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sync-notifications">Sync Status</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about sync status and errors.
                      </p>
                    </div>
                    <Switch id="sync-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="plan-notifications">Trade Plan Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when your portfolio deviates from your trade plan.
                      </p>
                    </div>
                    <Switch id="plan-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="position-notifications">Position Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about significant changes to your positions.
                      </p>
                    </div>
                    <Switch id="position-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Future Notification Channels</h3>
                <p className="text-sm text-muted-foreground">
                  These notification channels will be available in future updates.
                </p>
                <div className="space-y-4 opacity-50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive important notifications via email.</p>
                    </div>
                    <Switch id="email-notifications" disabled />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mobile-notifications">Mobile Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your mobile device.</p>
                    </div>
                    <Switch id="mobile-notifications" disabled />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

