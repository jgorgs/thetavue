export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          email: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email?: string | null
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          display_name: string | null
          tastytrade_connected: boolean
          tastytrade_token: string | null
          tastytrade_refresh_token: string | null
          tastytrade_token_expires_at: string | null
          default_benchmark: string
          sync_frequency: number
          data_retention: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          display_name?: string | null
          tastytrade_connected?: boolean
          tastytrade_token?: string | null
          tastytrade_refresh_token?: string | null
          tastytrade_token_expires_at?: string | null
          default_benchmark?: string
          sync_frequency?: number
          data_retention?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          display_name?: string | null
          tastytrade_connected?: boolean
          tastytrade_token?: string | null
          tastytrade_refresh_token?: string | null
          tastytrade_token_expires_at?: string | null
          default_benchmark?: string
          sync_frequency?: number
          data_retention?: string
        }
      }
      positions: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          symbol: string
          strategy: string
          expiration: string
          open_date: string
          close_date: string | null
          status: string
          premium: number
          current_value: number
          pnl: number
          delta: number
          theta: number
          vega: number
          gamma: number
          details: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          symbol: string
          strategy: string
          expiration: string
          open_date: string
          close_date?: string | null
          status: string
          premium: number
          current_value: number
          pnl: number
          delta: number
          theta: number
          vega: number
          gamma: number
          details?: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          symbol?: string
          strategy?: string
          expiration?: string
          open_date?: string
          close_date?: string | null
          status?: string
          premium?: number
          current_value?: number
          pnl?: number
          delta?: number
          theta?: number
          vega?: number
          gamma?: number
          details?: Json
        }
      }
      trade_plans: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          name: string
          description: string | null
          target_monthly_return: number
          max_portfolio_delta: number
          target_daily_theta: Json
          strategy_allocations: Json
          adherence_score: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          name: string
          description?: string | null
          target_monthly_return: number
          max_portfolio_delta: number
          target_daily_theta: Json
          strategy_allocations: Json
          adherence_score?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          name?: string
          description?: string | null
          target_monthly_return?: number
          max_portfolio_delta?: number
          target_daily_theta?: Json
          strategy_allocations?: Json
          adherence_score?: number | null
        }
      }
      portfolio_metrics: {
        Row: {
          id: string
          created_at: string
          user_id: string
          date: string
          total_pnl: number
          total_delta: number
          total_theta: number
          total_vega: number
          total_gamma: number
          buying_power_usage: number
          win_rate: number | null
          average_return: number | null
          sharpe_ratio: number | null
          sortino_ratio: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          date: string
          total_pnl: number
          total_delta: number
          total_theta: number
          total_vega: number
          total_gamma: number
          buying_power_usage: number
          win_rate?: number | null
          average_return?: number | null
          sharpe_ratio?: number | null
          sortino_ratio?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          date?: string
          total_pnl?: number
          total_delta?: number
          total_theta?: number
          total_vega?: number
          total_gamma?: number
          buying_power_usage?: number
          win_rate?: number | null
          average_return?: number | null
          sharpe_ratio?: number | null
          sortino_ratio?: number | null
        }
      }
      sync_logs: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: string
          message: string | null
          details: Json | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status: string
          message?: string | null
          details?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: string
          message?: string | null
          details?: Json | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

