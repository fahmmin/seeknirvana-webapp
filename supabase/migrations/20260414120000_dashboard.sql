-- Member dashboard: profiles + product updates. Access via service role from Next.js Route Handlers only.

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  wallet_address text not null,
  email text not null,
  full_name text,
  onboarding_completed_at timestamptz not null default now(),
  member_hub_email_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_wallet_address_lower check (wallet_address = lower(wallet_address)),
  constraint profiles_wallet_address_unique unique (wallet_address)
);

create table if not exists public.product_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published_at timestamptz not null default now(),
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists product_updates_published_sort_idx
  on public.product_updates (is_published, sort_order desc, published_at desc);

alter table public.profiles enable row level security;
alter table public.product_updates enable row level security;

drop policy if exists "service_only_profiles" on public.profiles;
drop policy if exists "service_only_product_updates" on public.product_updates;

create policy "service_only_profiles"
  on public.profiles
  for all
  using (false)
  with check (false);

create policy "service_only_product_updates"
  on public.product_updates
  for all
  using (false)
  with check (false);

comment on table public.profiles is 'Preorder member profiles; use Supabase service role from app API only.';
comment on table public.product_updates is 'Dashboard notification feed; managed in Supabase Table Editor.';
