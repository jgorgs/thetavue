# Implementation plan

## Phase 1: Environment Setup

1. **Prevalidation**: Check if the current directory is already a project. If a Next.js project exists (check for package.json and .next folder), skip initialization. *(Project Overview & Tech Stack: Frontend)*
2. **Node.js & Next.js Version Check**: Run `node -v` to ensure Node.js v20.2.1 is installed. If not, install it. *(Tech Stack: Core Tools)*
3. **Initialize Next.js Project**: If starting fresh, run `npx create-next-app@14 --typescript` to set up a Next.js 14 project with TypeScript. *(Tech Stack: Frontend)*
4. **Install Tailwind & Tremor**: Follow Tailwind CSS and Tremor installation guides. Configure Tailwind for dark mode (background color #121826) and frosted glass card styles. *(UI/UX Design Approach)*
5. **Prevalidation for MCP Config**: Check if a `.cursor` directory exists in the project root. If not, create it. *(AI Assisted DevTools: Cursor)
6. **Create MCP Configuration for Cursor (macOS)**: Inside the `.cursor` directory, create (or open if exists) a file named `mcp.json` and add the following configuration for macOS:
   ```json
   { "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
   ```
   *(Tech Stack: Backend & AI Tools: Cursor)*
7. **Create MCP Configuration for Cursor (Windows)**: If using Windows, update the configuration in `.cursor/mcp.json` with:
   ```json
   { "mcpServers": { "supabase": { "command": "cmd", "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
   ```
   *(Tech Stack: Backend & AI Tools: Cursor)*
8. **Display Connection String Link**: Inform the user to get the Supabase connection string from [this link](https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp). Once obtained, replace `<connection-string>` with the actual value in the config file. *(Environment Setup)*
9. **Optional – Configure Windsurf**: If also using Windsurf:
   - Navigate to the Cascade assistant.
   - Tap on the hammer (MCP) icon and select **Configure** to open its configuration file.
   - Add the same configurations as in steps 6 and 7 for macOS or Windows.
   - Display the connection string link as above and then save and reload by tapping **Refresh** in the Cascade assistant. *(Environment Setup)*
10. **Validation**: Open Cursor Settings/MCP and verify that the server shows a green active status.

## Phase 2: Frontend Development

11. **Structure App Router**: Organize the project using Next.js App Router (in the `/app` directory) with TypeScript. *(Tech Stack: Frontend)
12. **Create Global Layout**: In `/app/layout.tsx`, set up the dark mode theme with the background color #121826 and configure Tailwind’s dark mode settings. *(UI/UX Design Approach)*
13. **Implement Frosted Glass Card Component**: Create `/app/components/FrostedCard.tsx` using glassmorphism styles (15-20% opacity, 1px light borders with 10% opacity). *(UI/UX Design Approach)*
14. **Build Dashboard Page**: Create `/app/dashboard/page.tsx` to serve as the Portfolio Dashboard with sections for Greeks (Delta, Theta, Vega), performance metrics, and position management. *(Project Overview: Portfolio Dashboard)
15. **Integrate Data Visualizations**: Add components for charts using Recharts/D3.js in `/app/components/Charts/` and implement a trade frequency heatmap calendar using Cal-Heatmap. *(Project Overview: Trade Frequency Heatmap Calendar)
16. **Develop Trade Plan Wizard**: Create a multi-step form in `/app/components/TradePlanWizard.tsx` for trade plan creation, including fields for goals, risk profile, strategy allocation, Greek targets, and risk management rules. *(Project Overview: Trade Plan Creation & Monitoring)
17. **Implement User Authentication Flows**: Ensure Clerk’s sign-up/sign-in flows are integrated in the frontend. Create a page at `/app/auth/page.tsx` that interacts with Clerk. *(Authentication Flow)*
18. **Validation**: Run tests (e.g., using Jest or Vercel’s integrated testing tool) to ensure components render correctly and dark mode styles are applied.

## Phase 3: Backend Development

19. **Set Up Supabase Connection**: Confirm that your Supabase connection string in the MCP configuration is active. *(Phase 1 validation)
20. **Define Database Schema**: In Supabase, set up the following tables with the given schema:
    - `users` (clerk_id (PK), created_at, updated_at)
    - `portfolios` (id (PK), user_id (FK), name, account_type, broker_account_id, created_at, updated_at)
    - `positions` (id (PK), portfolio_id (FK), symbol, strategy_type, quantity, open_date, expiration_date, strike_price, premium_received, current_value, delta, theta, vega, created_at, updated_at)
    - `trade_plans` (id (PK), user_id (FK), name, monthly_income_target, risk_per_trade, max_overnight_exposure, created_at, updated_at)
    - `trade_plan_strategies` (id (PK), trade_plan_id (FK), strategy_type, allocation_percentage, max_positions, delta_range_min, delta_range_max, target_credit, created_at, updated_at)
    - `historical_metrics` (id (PK), portfolio_id (FK), date, net_liquidation_value, total_delta, total_theta, total_vega, beta_weighted_delta, created_at, updated_at)
    *(Database Schema)*
21. **Implement Row Level Security**: Configure RLS policies on Supabase tables so that JWTs issued by Clerk can enforce data access based on the user. *(Security Considerations)*
22. **Design API Endpoints for Tastytrade Integration**: Create backend API routes (e.g., in `/pages/api/`) to handle OAuth integration and data sync with Tastytrade. *(Project Overview: Tastytrade Integration)
23. **Set Up Background Jobs**: Implement background tasks (using tools like cron, serverless functions, or Vercel cron jobs) to refresh positions and account data every 15 minutes from the Tastytrade API. Include error handling, exponential backoff, and caching critical data locally. *(Error Handling for Tastytrade API)*
24. **Implement Clerk Authentication**: Ensure backend API routes validate JWTs from Clerk to secure endpoints. *(Authentication Flow)*
25. **Validation**: Test the API endpoints using tools like Postman or curl, and check Supabase’s logs to verify RLS enforcement and data syncing.

## Phase 4: Integration

26. **Integrate Frontend with Backend APIs**: In the frontend, create service files (e.g., `/app/services/api.ts`) that use the fetched JWT from Clerk to authenticate against the Supabase API endpoints. *(Authentication Flow & API Integration Architecture)*
27. **Connect Dashboard Data**: Wire up the Portfolio Dashboard to display real-time Greeks and performance metrics by fetching data from the Supabase endpoints and Tastytrade sync jobs. *(Core Features: Portfolio Dashboard)
28. **Test Full User Flow**: From signing in via Clerk, connecting a Tastytrade account via OAuth, to viewing the dashboard and trade plan wizard – validate the complete flow. *(Project Overview & Q&A: Integration)*

## Phase 5: Deployment

29. **Configure Vercel Deployment**: Push the project to a new repository and connect it to Vercel for continuous deployment. Ensure environment variables for Supabase, Clerk, and Tastytrade API credentials are set in Vercel’s dashboard. *(Deployment)*
30. **Set Up Build & CI/CD**: Verify that your Next.js project builds using Vercel (review the build logs). Use Vercel’s built-in CI/CD to streamline deployment. *(Deployment)*
31. **Performance Validation**: After deployment, test that the dashboard load time is less than 2 seconds and that position updates occur within 15 minutes. Also, ensure historical data queries return in under 1 second. *(Performance Targets)*
32. **Final End-to-End Test**: Run a series of end-to-end tests that simulate user authentication (via Clerk), Tastytrade API integration, and real-time data display. Confirm all error handling paths and retry logic work as intended. *(Q&A: Pre-Launch Checklist)*