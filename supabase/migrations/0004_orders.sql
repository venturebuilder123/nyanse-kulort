-- Orders for the bank-transfer pilot (14 Oct 2026). The founder matches incoming transfers by
-- reference, then sets status to 'paid' (and 'shipped' for the colour card).
create table if not exists public.orders (
  ref          text primary key check (ref ~ '^KN-[A-Z2-9]{6}$'),
  created_at   timestamptz not null default now(),
  status       text not null default 'awaiting_payment' check (status in ('awaiting_payment', 'paid', 'shipped', 'done', 'cancelled')),
  tier         text not null check (tier in ('digital', 'card', 'session')),
  amount_cents integer not null check (amount_cents > 0),
  brand        text not null check (brand in ('nyanse', 'kulort')),
  voice        text,
  season       text,
  email        text not null check (length(email) <= 200),
  name         text check (length(name) <= 120),
  street       text check (length(street) <= 160),
  postcode     text check (length(postcode) <= 16),
  city         text check (length(city) <= 80),
  country      text check (country in ('NL', 'BE', 'DE')),
  friend_code  text check (length(friend_code) <= 20),
  waiver       boolean not null default false
);
alter table public.orders enable row level security;
create index if not exists orders_status on public.orders (status, created_at);
