-- Public profile image URL (typically Supabase Storage public URL).

alter table public.profiles
  add column if not exists avatar_url text;

comment on column public.profiles.avatar_url is 'HTTPS URL to profile image; set via /api/dashboard/profile/avatar.';

-- Public bucket for avatars (Supabase Storage). Safe to run once; skips if storage not available.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
select 'avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
where exists (select 1 from information_schema.tables where table_schema = 'storage' and table_name = 'buckets')
  and not exists (select 1 from storage.buckets where id = 'avatars');
