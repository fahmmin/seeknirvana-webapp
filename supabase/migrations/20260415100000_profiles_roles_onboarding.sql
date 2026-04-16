-- Member profiles: roles, nullable onboarding completion, phone, optional profile fields, connector placeholders.

alter table public.profiles
  alter column onboarding_completed_at drop default;

alter table public.profiles
  alter column onboarding_completed_at drop not null;

alter table public.profiles
  add column if not exists role text not null default 'member';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_role_check'
  ) then
    alter table public.profiles
      add constraint profiles_role_check check (role in ('member', 'admin'));
  end if;
end $$;

alter table public.profiles
  add column if not exists phone text;

alter table public.profiles
  add column if not exists timezone text;

alter table public.profiles
  add column if not exists date_of_birth date;

alter table public.profiles
  add column if not exists bio text;

alter table public.profiles
  add column if not exists google_health_connected_at timestamptz;

alter table public.profiles
  add column if not exists instagram_connected_at timestamptz;

comment on column public.profiles.role is 'member or admin; promote admin manually in Supabase.';
comment on column public.profiles.onboarding_completed_at is 'NULL until member finishes onboarding wizard.';
comment on column public.profiles.google_health_connected_at is 'Placeholder connector; set via app when integrated.';
comment on column public.profiles.instagram_connected_at is 'Placeholder connector; set via app when integrated.';
