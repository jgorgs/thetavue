# Backend Structure Document

This document outlines the backend architecture, infrastructure, and components for ThetaVue—a modern portfolio management application for options traders. It explains the structure in everyday language so that anyone can understand the design and functionality.

## 1. Backend Architecture

The backend is designed with a modern, modular approach in mind. The key components are well separated so that each part handles a specific task:

- **Authentication & Authorization:** We use Clerk to manage user sign-up/sign-in. When users log in, Clerk issues a JSON Web Token (JWT) that governs the user’s access throughout the system.
- **Database Management:** The core data is stored in a PostgreSQL database managed by Supabase. Supabase also enforces Row Level Security so that every user accesses only their own data.
- **API Integration:** A dedicated API integration module handles Tastytrade API calls via OAuth. This module is responsible for securely storing API credentials, syncing accounts, and automatically updating trading data every 15 minutes.
- **Background Processing:** Background jobs run at regular intervals to keep position data fresh and calculate key metrics. These jobs implement automatic retries and caching to handle errors smoothly.
- **Scalability & Maintainability:** The system uses a serverless functions model via Vercel for backend deployment, ensuring high scalability and low maintenance overhead. The architecture is designed to evolve as more features are added in future releases.

## 2. Database Management

The project uses a managed PostgreSQL service provided by Supabase. Here’s an overview in everyday terms:

- **Type of Database:** SQL (PostgreSQL)
- **How Data is Managed:** All trade, portfolio, and user data is stored in specific tables. Data access is controlled by Row Level Security so that every user only sees their own information. The data is organized in a way that supports rapid queries for dashboards, historical metrics, and real-time metrics.
- **Benefits:** Using a cloud-managed solution like Supabase provides built-in scalability, security, and easy integration with our lightweight API design.

**Key Technologies in Backend Database Stack:**
- Supabase
- PostgreSQL (SQL database system)

## 3. Database Schema

Below is a human-readable description of our database schema, including the key tables used in ThetaVue:

- **users:** Contains user information tied to Clerk authentication.
  - clerk_id (Primary Key)
  - created_at
  - updated_at

- **portfolios:** Information about trading portfolios.
  - id (Primary Key)
  - user_id (Foreign Key to users.clerk_id)
  - name
  - account_type
  - broker_account_id
  - created_at
  - updated_at

- **positions:** Stores details on trading positions linked to a portfolio.
  - id (Primary Key)
  - portfolio_id (Foreign Key)
  - symbol
  - strategy_type
  - quantity
  - open_date
  - expiration_date
  - strike_price
  - premium_received
  - current_value
  - delta
  - theta
  - vega
  - created_at
  - updated_at

- **trade_plans:** Holds user-created trade plans and settings.
  - id (Primary Key)
  - user_id (Foreign Key)
  - name
  - monthly_income_target
  - risk_per_trade
  - max_overnight_exposure
  - created_at
  - updated_at

- **trade_plan_strategies:** Details specific strategies and allocations within a trade plan.
  - id (Primary Key)
  - trade_plan_id (Foreign Key)
  - strategy_type
  - allocation_percentage
  - max_positions
  - delta_range_min
  - delta_range_max
  - target_credit
  - created_at
  - updated_at

- **historical_metrics:** Stores daily snapshots of key performance metrics for portfolios.
  - id (Primary Key)
  - portfolio_id (Foreign Key)
  - date
  - net_liquidation_value
  - total_delta
  - total_theta
  - total_vega
  - beta_weighted_delta
  - created_at

For those familiar with SQL, here’s a sample snippet of what the SQL schema might look like for the 'users' table (similar patterns apply to the other tables):

/* Sample SQL Schema for the 'users' table */

-- CREATE TABLE users (
--   clerk_id VARCHAR PRIMARY KEY,
--   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
--   updated_at TIMESTAMP NOT NULL DEFAULT NOW()
-- );

The same approach is used to create other tables, connecting them with foreign keys and ensuring that the data remains consistent and secure.

## 4. API Design and Endpoints

The application uses RESTful APIs to allow the frontend and backend to communicate seamlessly. Key aspects include:

- **Authentication API:** Endpoints that manage sign-in and sign-up flows using Clerk; the JWT produced here is sent on every API request to ensure secure data access.
- **User Data Endpoints:** These endpoints handle user profile operations and portfolio management. They interact with the PostgreSQL database for data retrieval and updates.
- **Tastytrade Integration Endpoints:** Specific endpoints manage OAuth connection, portfolio synchronization, and data refresh from Tastytrade APIs. Background jobs also trigger endpoints to process and store this data.
- **Trade Plan and Metrics Endpoints:** Endpoints to create, view, and update trade plans, as well as to retrieve historical and real-time metrics.

**Main API Endpoints Include:**
- /api/auth – For login, signup, and token management
- /api/portfolio – For managing portfolios and positions
- /api/trade-plans – For creating and updating trade plans
- /api/tastytrade – For connecting and syncing Tastytrade account data

## 5. Hosting Solutions

ThetaVue’s backend is hosted in a cost-effective, scalable, and reliable environment:

- **Primary Hosting Platform:** Vercel
  - Vercel hosts serverless functions which handle API requests and background job processing.
- **Cloud-Managed Database Hosting:** Supabase provides a secure and scalable PostgreSQL database with built-in features like Row Level Security.

**Benefits:**
- Highly scalable infrastructure to support real-time data updates and concurrent user access.
- Cost-effective management with pay-as-you-grow models.
- Simplified deployment process and reduced maintenance overhead.

## 6. Infrastructure Components

Several infrastructure components work together to ensure smooth performance and an enhanced user experience:

- **Load Balancers:** Automatically distributes incoming API requests across serverless functions to ensure consistent response times.
- **Caching Mechanisms:** Helps reduce database load and speeds up frequently requested data, especially for dashboard metrics.
- **Content Delivery Network (CDN):** Vercel’s CDN serves static assets quickly, ensuring that dashboards and other frontend components load swiftly.
- **Background Job Scheduler:** Periodically runs tasks to sync data from Tastytrade and perform real-time calculations, with a graduated retry strategy to handle errors.

## 7. Security Measures

Security is a crucial aspect of ThetaVue. Several layers are in place to protect user data and ensure the overall system remains secure:

- **Authentication & Authorization:**
  - Clerk handles user authentication, issuing JWTs that carry necessary claims for secure API access.
  - Supabase enforces Row Level Security so that data access is controlled at the database level.
- **Data Encryption:**
  - All data is encrypted in transit using HTTPS protocols.
  - Data stored in the database is encrypted at rest, protecting sensitive financial information.
- **Secure API Credential Storage:**
  - API credentials and secrets are stored securely using environment variables and managed key vaults.
- **Error Handling and Fail-safes:**
  - Automatic retry logic with exponential backoff in case of API failures.
  - Detailed error logging and user notifications are implemented.
- **Compliance:**
  - The system conforms to GDPR and CCPA standards, ensuring transparency and user consent for data usage.

## 8. Monitoring and Maintenance

To keep the system reliable and responsive, the following monitoring and maintenance tools are in place:

- **Performance Monitoring:** Integrated tools automatically track system performance, API response times, and background job statuses.
- **Error Logging:** Detailed logging is provided for troubleshooting and ensuring issues are resolved quickly. Tools like Sentry may be used to capture exceptions and performance metrics.
- **Regular Backups and Security Audits:**
  - Scheduled backups ensure that data is safe.
  - Regular security audits and compliance checks to maintain high security standards.
- **Maintenance Strategies:**
  - Continuous integration and deployment pipelines make it easier to push updates.
  - Periodic reviews of scaling and performance metrics to ensure the backend remains up-to-date with growing user demands.

## 9. Conclusion and Overall Backend Summary

ThetaVue’s backend is thoughtfully designed to provide an automated, secure, and scalable platform for modern portfolio management. Recapping the key points:

- **Modular Architecture:** Separates concerns like user authentication, data management, API integration, and background job processing.
- **Secure & Compliant:** Uses Clerk and Supabase with robust security measures including JWT, encryption, and Row Level Security for data protection.
- **Efficient Data Management:** PostgreSQL via Supabase provides a reliable and scalable solution for both real-time and historical data.
- **Responsive API Design:** RESTful endpoints handle everything from user authentication to trade plan management and external API integrations with Tastytrade.
- **Optimized Hosting & Infrastructure:** Vercel and Supabase combine for a cost-effective, scalable, and performant hosting environment.

In summary, the ThetaVue backend is built to meet the demands of active options traders, ensuring that data is securely handled, reliably synchronized, and readily available for in-depth analysis. This robust backend serves as the backbone of ThetaVue, aligning perfectly with the project’s goals of providing a smart, automated, and user-friendly portfolio management tool.
