-- Store complete 5-day cohort applications for signed-in users.

create table if not exists public.cohort_applications (
  id uuid primary key default gen_random_uuid(),
  wallet_address text not null,
  full_name text not null,
  email text not null,
  phone text not null default '',
  age_range text not null,
  location text not null,
  timezone text not null,
  personality_type text not null,
  occupation text not null default '',
  dream_experience text not null,
  wearable_experience text not null,
  preferred_session_window text not null,
  sleep_goal text not null,
  current_challenge text not null,
  intentions text not null,
  notes text not null default '',
  accept_program_terms boolean not null default true,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cohort_applications_wallet_address_lower check (wallet_address = lower(wallet_address)),
  constraint cohort_applications_wallet_address_unique unique (wallet_address)
);

create index if not exists cohort_applications_submitted_idx
  on public.cohort_applications (submitted_at desc);

alter table public.cohort_applications enable row level security;

drop policy if exists "service_only_cohort_applications" on public.cohort_applications;

create policy "service_only_cohort_applications"
  on public.cohort_applications
  for all
  using (false)
  with check (false);

comment on table public.cohort_applications is 'Cohort intake responses; write via server-side service role only.';
