-- Create tables for ThetaVue

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  email TEXT NOT NULL,
  display_name TEXT,
  tastytrade_connected BOOLEAN DEFAULT FALSE NOT NULL,
  tastytrade_token TEXT,
  tastytrade_refresh_token TEXT,
  tastytrade_token_expires_at TIMESTAMP WITH TIME ZONE,
  default_benchmark TEXT DEFAULT 'spy' NOT NULL,
  sync_frequency INTEGER DEFAULT 15 NOT NULL,
  data_retention TEXT DEFAULT '2years' NOT NULL
);

-- Positions table
CREATE TABLE IF NOT EXISTS public.positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  strategy TEXT NOT NULL,
  expiration DATE NOT NULL,
  open_date TIMESTAMP WITH TIME ZONE NOT NULL,
  close_date TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL,
  premium DECIMAL NOT NULL,
  current_value DECIMAL NOT NULL,
  pnl DECIMAL NOT NULL,
  delta DECIMAL NOT NULL,
  theta DECIMAL NOT NULL,
  vega DECIMAL NOT NULL,
  gamma DECIMAL NOT NULL,
  details JSONB DEFAULT '{}'::JSONB NOT NULL
);

-- Trade Plans table
CREATE TABLE IF NOT EXISTS public.trade_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  target_monthly_return DECIMAL NOT NULL,
  max_portfolio_delta DECIMAL NOT NULL,
  target_daily_theta JSONB NOT NULL,
  strategy_allocations JSONB NOT NULL,
  adherence_score DECIMAL
);

-- Portfolio Metrics table
CREATE TABLE IF NOT EXISTS public.portfolio_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_pnl DECIMAL NOT NULL,
  total_delta DECIMAL NOT NULL,
  total_theta DECIMAL NOT NULL,
  total_vega DECIMAL NOT NULL,
  total_gamma DECIMAL NOT NULL,
  buying_power_usage DECIMAL NOT NULL,
  win_rate DECIMAL,
  average_return DECIMAL,
  sharpe_ratio DECIMAL,
  sortino_ratio DECIMAL
);

-- Sync Logs table
CREATE TABLE IF NOT EXISTS public.sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  message TEXT,
  details JSONB
);

-- Set up Row Level Security policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_logs ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Positions policies
CREATE POLICY "Users can view their own positions" ON public.positions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own positions" ON public.positions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own positions" ON public.positions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own positions" ON public.positions
  FOR DELETE USING (auth.uid() = user_id);

-- Trade Plans policies
CREATE POLICY "Users can view their own trade plans" ON public.trade_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own trade plans" ON public.trade_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trade plans" ON public.trade_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trade plans" ON public.trade_plans
  FOR DELETE USING (auth.uid() = user_id);

-- Portfolio Metrics policies
CREATE POLICY "Users can view their own portfolio metrics" ON public.portfolio_metrics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own portfolio metrics" ON public.portfolio_metrics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolio metrics" ON public.portfolio_metrics
  FOR UPDATE USING (auth.uid() = user_id);

-- Sync Logs policies
CREATE POLICY "Users can view their own sync logs" ON public.sync_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sync logs" ON public.sync_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS positions_user_id_idx ON public.positions (user_id);
CREATE INDEX IF NOT EXISTS positions_symbol_idx ON public.positions (symbol);
CREATE INDEX IF NOT EXISTS positions_status_idx ON public.positions (status);
CREATE INDEX IF NOT EXISTS trade_plans_user_id_idx ON public.trade_plans (user_id);
CREATE INDEX IF NOT EXISTS portfolio_metrics_user_id_idx ON public.portfolio_metrics (user_id);
CREATE INDEX IF NOT EXISTS portfolio_metrics_date_idx ON public.portfolio_metrics (date);
CREATE INDEX IF NOT EXISTS sync_logs_user_id_idx ON public.sync_logs (user_id);

-- Create functions for automatic updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updated_at timestamp
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_positions_updated_at
BEFORE UPDATE ON public.positions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trade_plans_updated_at
BEFORE UPDATE ON public.trade_plans
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

