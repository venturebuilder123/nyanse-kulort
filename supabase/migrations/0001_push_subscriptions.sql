-- Weekly colour tip (opt-in web push). No name, no e-mail, no photo: the browser's push
-- address, brand, voice, season and time zone only. Deleted with "Verwijder mijn profiel".
create table if not exists public.push_subscriptions (
  endpoint     text primary key check (endpoint like 'https://%' and length(endpoint) <= 1000),
  p256dh       text not null check (length(p256dh) <= 200),
  auth         text not null check (length(auth) <= 100),
  brand        text not null check (brand in ('nyanse', 'kulort')),
  voice        text not null check (voice in ('wingman', 'atelier', 'girlmath')),
  season       text not null check (length(season) <= 20),
  time_zone    text not null default 'Europe/Amsterdam' check (length(time_zone) <= 60),
  created_at   timestamptz not null default now(),
  last_sent_at timestamptz,
  sent_count   integer not null default 0
);

-- Only the server (service role) reads and writes; no access from the browser.
alter table public.push_subscriptions enable row level security;

create index if not exists push_due on public.push_subscriptions (last_sent_at nulls first);
