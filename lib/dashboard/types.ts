export type DashboardProfile = {
  wallet_address: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: "member" | "admin";
  onboarding_completed_at: string | null;
  timezone: string | null;
  date_of_birth: string | null;
  bio: string | null;
  google_fit_connected_at: string | null;
  google_fit_last_sync_at: string | null;
  google_health_connected_at: string | null;
  instagram_connected_at: string | null;
  /** HTTPS URL (e.g. Supabase Storage public URL) */
  avatar_url: string | null;
};

export type ProductUpdate = {
  id: string;
  title: string;
  body: string;
  published_at: string;
  sort_order: number;
};

export type FitnessDailyPoint = {
  metric_date: string;
  steps: number;
  active_minutes: number;
  calories_kcal: number;
};

export type FitnessSummary = {
  connected: boolean;
  last_sync_at: string | null;
  range_days: 7 | 30;
  totals: {
    steps: number;
    active_minutes: number;
    calories_kcal: number;
  };
  points: FitnessDailyPoint[];
};
