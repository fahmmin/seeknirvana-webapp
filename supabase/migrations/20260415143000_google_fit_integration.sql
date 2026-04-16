-- Google Fit production integration: token storage + normalized daily analytics.

create table if not exists public.google_fit_connections (
  wallet_address text primary key references public.profiles(wallet_address) on delete cascade,
  google_user_id text,
  scope text not null,
  access_token_encrypted text not null,
  refresh_token_encrypted text not null,
  token_expiry timestamptz not null,
  connected_at timestamptz not null default now(),
  last_sync_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint google_fit_connections_wallet_lower check (wallet_address = lower(wallet_address))
);

create table if not exists public.fitness_daily_metrics (
  wallet_address text not null references public.profiles(wallet_address) on delete cascade,
  metric_date date not null,
  steps integer not null default 0,
  active_minutes integer not null default 0,
  calories_kcal numeric(10,2) not null default 0,
  source text not null default 'google_fit',
  synced_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (wallet_address, metric_date),
  constraint fitness_daily_metrics_wallet_lower check (wallet_address = lower(wallet_address)),
  constraint fitness_daily_metrics_steps_nonneg check (steps >= 0),
  constraint fitness_daily_metrics_active_minutes_nonneg check (active_minutes >= 0),
  constraint fitness_daily_metrics_calories_nonneg check (calories_kcal >= 0)
);

create index if not exists fitness_daily_metrics_wallet_date_idx
  on public.fitness_daily_metrics (wallet_address, metric_date desc);

alter table public.google_fit_connections enable row level security;
alter table public.fitness_daily_metrics enable row level security;

drop policy if exists "service_only_google_fit_connections" on public.google_fit_connections;
drop policy if exists "service_only_fitness_daily_metrics" on public.fitness_daily_metrics;

create policy "service_only_google_fit_connections"
  on public.google_fit_connections
  for all
  using (false)
  with check (false);

create policy "service_only_fitness_daily_metrics"
  on public.fitness_daily_metrics
  for all
  using (false)
  with check (false);

comment on table public.google_fit_connections is 'Google Fit OAuth tokens for member dashboards. Service role access only.';
comment on table public.fitness_daily_metrics is 'Normalized per-day activity metrics synced from Google Fit for dashboard analytics.';
