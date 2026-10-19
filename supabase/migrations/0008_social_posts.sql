-- Automatic Instagram posts (decision 19 Oct 2026): one row per calendar slot, so nothing is
-- posted twice, and the founder can skip a slot from /lab/social.
create table if not exists public.social_posts (
  slot         text primary key,
  status       text not null check (status in ('published', 'skipped', 'failed', 'preview_sent')),
  media_id     text,
  error        text,
  updated_at   timestamptz not null default now()
);
alter table public.social_posts enable row level security;

-- The Instagram token renews itself (Instagram Login tokens last 60 days); the newest one lives here.
create table if not exists public.app_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);
alter table public.app_settings enable row level security;
