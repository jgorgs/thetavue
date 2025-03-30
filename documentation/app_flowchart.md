flowchart TD
  Start[Start]
  Auth[User Authentication using Clerk]
  JWT[Issue JWT with Supabase claims]
  RLS[Enforce Row Level Security in Supabase]
  Connect[Tastytrade Account Connection OAuth]
  Sync[Sync Positions & Metrics every 15 minutes]
  Dashboard[Portfolio Dashboard]
  Viz[Data Visualization using Charts and Heatmap Calendar]
  Plan[Trade Plan Creation and Monitoring]
  Analytics[Strategy Analytics and Filtering]
  Error[Error Handling with Retry, Cache, and Manual Refresh]
  Notify[Notifications and Alerts]

  Start --> Auth
  Auth --> JWT
  JWT --> RLS
  JWT --> Connect
  Connect --> Sync
  Sync --> Dashboard
  Dashboard --> Viz
  Dashboard --> Plan
  Plan --> Analytics
  Dashboard --> Error
  Dashboard --> Notify