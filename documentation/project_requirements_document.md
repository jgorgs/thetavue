# ThetaVue Project Requirements Document

---

## 1. Project Overview

ThetaVue is a modern portfolio management application built specifically for options traders who follow a premium-selling strategy inspired by Tastytrade. It is designed to replace outdated manual tracking methods with an intuitive, data-rich interface. By directly integrating with Tastytrade, ThetaVue automates the synchronization of real-time options positions, calculates key metrics (such as Delta, Theta, and Vega), and visually presents complex trading data in a clear, actionable format. This application acts as a central hub for creating disciplined trade plans and monitoring performance, helping traders focus on generating consistent, alpha-driven results.

The purpose of ThetaVue is to simplify the execution of trade strategies and promote disciplined trading among intermediate and advanced options traders. The app is being built to offer an organized, efficient, and secure way to manage trade plans, visualize key performance metrics, and automate routine tasks such as data synchronization and error handling. Key objectives include offering a sleek dark mode interface with glassmorphism elements, delivering reliable real-time updates even during API disruptions, and providing robust analytical tools for evaluating both current and historical trading performance.

---

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**
- User onboarding and authentication via Clerk.
- Direct integration with Tastytrade via its official API, including OAuth-based account linking.
- Real-time synchronization of trading positions, historical data import, and routine updates (every 15 minutes) with robust error-handling and caching.
- A comprehensive portfolio dashboard displaying key Greeks, P&L metrics, and strategy-specific details.
- Trade plan creation and monitoring with an intuitive wizard-based interface, including real-time adherence scoring and rebalancing suggestions.
- Detailed analytics module offering interactive graphs, customizable comparisons (beyond the S&P 500), advanced filtering, and a GitHub-style heatmap for trade activity.
- A modern dark mode design using glassmorphism elements, vibrant accent colors, and modern typography (Inter).
- Secure backend implementation using Supabase and PostgreSQL, with Row Level Security and proper token-based authentication.
- Basic account settings for managing data retention and viewing synchronization logs.

**Out-of-Scope (for MVP):**
- Advanced notification channels (email, SMS, mobile push, browser push). Only in-app notifications will be considered as future enhancements.
- Additional integrations such as calendar sync (Google/Outlook), economic calendars, and earnings announcements.
- Monetization features like subscription management or premium tiers. Future plans may include a freemium model.
- Role-based access control beyond a single user accessing their own portfolio data. Sharing and collaboration features are reserved for future phases.
- Multi-platform support (e.g., native mobile iOS/Android apps) outside the desktop-first responsive design.
- Extensive customization options for alerts and additional API connectivity beyond core Tastytrade integration.

---

## 3. User Flow

When a user opens ThetaVue, they are greeted by a sleek, dark-themed login screen where they can easily sign up or sign in using Clerk authentication. New users are taken through an intuitive onboarding process that collects basic information and securely links their Tastytrade account via OAuth. After successful authentication, the system issues a JSON Web Token (JWT) which, in combination with Supabase’s secured policies, ensures that every subsequent action is tied to the user’s private data.

Once logged in, the user lands on the main portfolio dashboard that immediately displays real-time metrics for their options positions. They navigate through different sections including detailed dashboards for current and historical performance, an interactive trade planning module where they can set goals and risk parameters, and an analytics area featuring interactive graphs and a GitHub-style trade activity heatmap. Throughout the journey, the interface uses interactive tooltips, subtle animations, and clear visual feedback to guide users and help them stay on track with their trade strategies.

---

## 4. Core Features

- **Tastytrade Integration:**
  - Direct connection via official Tastytrade API with OAuth account linking.
  - Real-time synchronization of positions, historical transactions, and key Greek metrics.
  - Robust error handling with retry logic, caching of critical data, and manual refresh options.

- **Comprehensive Portfolio Dashboard:**
  - Displays position-level and portfolio-level metrics (Delta, Theta, Vega, P&L).
  - Visualize risk exposure, strategy-specific performance, and a side-by-side S&P 500 benchmark.
  - Dark mode design with glassmorphism cards and vibrant accent colors for positive and negative metrics.

- **Actionable Trade Plan Creation & Monitoring:**
  - Wizard-based plan setup for defining portfolio goals, risk profiles, and strategy allocations.
  - Continuous adherence tracking with a visual score and real-time alerts for plan deviations.
  - Suggestions for rebalancing and risk management using current portfolio data.

- **Detailed Strategy Analytics:**
  - Interactive charts and graphs using Recharts and D3.js for multi-timeframe performance.
  - Customizable filters for strategy type, underlying asset, date range, and comparative benchmarks (e.g., Russell 2000, Nasdaq 100).
  - Advanced metrics such as Sharpe ratio, Sortino ratio, and volatility analysis.

- **Trade Activity Heatmap:**
  - GitHub-style calendar heatmap showing daily trade frequency, P&L changes, and premium collected.
  - Interactive tooltips with detailed metrics on hover, with multi-level historical comparisons.

- **Robust Technical Architecture:**
  - Secure user authentication with Clerk and JWT for Supabase API calls.
  - Comprehensive background jobs handling Tastytrade API sync with graduated retry and logging.
  - Well-structured database schema with tables for users, portfolios, positions, trade plans, and historical metrics.

---

## 5. Tech Stack & Tools

- **Frontend:**
  - Framework: Next.js with App Router and TypeScript.
  - UI Components: Tremor, Tailwind CSS featuring a glassmorphism design.
  - Data Visualization: Recharts and D3.js for interactive charts, Cal-Heatmap for the activity heatmap.
  - IDE & Component Builders: V0 by Vercel, Cursor, Lovable for modern, AI-powered coding and design.

- **Backend:**
  - Database: Supabase backed by PostgreSQL with Row Level Security.
  - Authentication: Clerk for secure user authentication and session management.
  - API Integration: Direct integration with Tastytrade API via OAuth, with secure storage of API credentials.
  - Background Jobs: Scheduled tasks for data synchronization every 15 minutes with robust error-handling.

- **Deployment & Additional Tools:**
  - Deployment Platform: Vercel.
  - AI Models & Libraries: GPT-4o, Gemini 2.5 Pro, and Claude 3.7 Sonnet to assist in development and troubleshooting processes.

---

## 6. Non-Functional Requirements

- **Performance:**
  - Dashboard load times should be under 2 seconds.
  - Real-time position updates to occur within 15 minutes.
  - Historical data queries are expected to return results in under 1 second.
  
- **Security:**
  - Use of Clerk for secure authentication with support for multi-factor authentication.
  - Data encryption in transit and at rest, with secure JWT handling.
  - Enforcement of Row Level Security in Supabase to ensure only authorized data access.
  
- **Usability & Compliance:**
  - An intuitive, dark-mode interface with minimal yet effective animations.
  - Compliance with GDPR, CCPA, and other data protection standards.
  - Accessible design ensuring clear information hierarchy and seamless navigation for financial data visualization.

---

## 7. Constraints & Assumptions

- The application assumes that Tastytrade API integration remains stable with minimal downtime. In case of outages, local caching and retry mechanisms will be in place.
- All users are assumed to only access and manage their individual data. No role-based access control is implemented in this MVP.
- The MVP does not include advanced notification channels (email, SMS, mobile push) or deep integrations like calendar syncing.
- Data retention policies include granular daily data for 2 years and aggregated data for 5+ years, with premium users potentially having extended access.
- Third-party tools and APIs (Clerk, Supabase, Tastytrade API) must remain available and compliant with their expected response times and security guidelines.

---

## 8. Known Issues & Potential Pitfalls

- **Tastytrade API Dependency:**  
  - Relying on the Tastytrade API might pose challenges such as rate limits, intermittent downtimes, or unexpected data format changes.  
  - Mitigation: Implement caching of critical data, robust error-handling with exponential backoff, and clear user notifications regarding sync issues.

- **Real-Time Synchronization:**  
  - Ensuring that background jobs run reliably every 15 minutes might face performance bottlenecks or network issues, affecting data freshness.  
  - Mitigation: Monitor background job performance closely, use differential syncing to minimize load, and offer a manual refresh option.

- **Data Security and Compliance:**  
  - Handling sensitive financial data requires strict adherence to GDPR, CCPA, and industry best practices.  
  - Mitigation: Regular security audits, clear data retention policies, and built-in mechanisms for consent management and breach notifications.

- **Scalability Concerns:**  
  - As user data and historical trade data grow, performance issues may arise related to query speeds and database storage.  
  - Mitigation: Optimize database queries, plan for scalable cloud storage, and use efficient data aggregation techniques.

This document is intended to serve as the primary reference for building ThetaVue. Each section has been carefully crafted to leave no room for guesswork in subsequent technical documents. The AI model generating further technical details will rely on this clear, comprehensive PRD to produce future development-guidelines documents accurately.