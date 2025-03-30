# ThetaVue

A modern portfolio management application for options traders using a Tastytrade-inspired approach.

## Overview

ThetaVue helps options traders create and adhere to trading plans, track performance, and gain insights into their strategies with a focus on premium-selling options strategies.

### Key Features

- 📊 Portfolio Dashboard
- 📈 Trade Plan Management
- 📉 Performance Analytics
- 🔄 Real-time Integration with Tastytrade
- 📱 Responsive Design
- 🌙 Dark Mode Support

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with Shadcn/UI
- **Authentication**: Clerk
- **Database**: Supabase
- **Charts**: Tremor
- **State Management**: React Server Components + Server Actions

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm (recommended) or npm
- Supabase account
- Clerk account
- Tastytrade account (for live trading features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jgorgs/thetavue.git
cd thetavue
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your credentials

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
thetavue/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Main application pages
├── components/            # Reusable components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
└── styles/              # Global styles
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Contact

For any questions or feedback, please reach out to the repository owner. 