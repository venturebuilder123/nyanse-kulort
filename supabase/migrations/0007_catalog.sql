-- Catalogue (CLAUDE.md §7): affiliate feeds and the products we recommend on colour.
-- Server-only (service role); RLS on with no policies, so the public keys can't read or write.

create table if not exists public.feeds (
  id           bigserial primary key,
  network      text not null check (network in ('daisycon', 'awin', 'tradetracker', 'partnerize', 'other')),
  program_id   text,
  shop         text not null check (length(shop) <= 60),
  url          text not null,
  brands       text[] not null default '{kulort,nyanse}',
  active       boolean not null default true,
  max_products integer not null default 3000,
  last_import  timestamptz,
  last_count   integer,
  last_error   text,
  created_at   timestamptz not null default now()
);

create table if not exists public.products (
  id          bigserial primary key,
  feed_id     bigint not null references public.feeds (id) on delete cascade,
  external_id text not null,
  shop        text not null,
  title       text not null,
  brand_name  text,
  url         text not null,
  image_url   text,
  price       numeric(10, 2),
  old_price   numeric(10, 2),
  currency    text not null default 'EUR',
  gender      text check (gender in ('men', 'women', 'unisex')),
  category    text not null,
  in_stock    boolean not null default true,
  hex         text,
  lab_l       real,
  lab_a       real,
  lab_b       real,
  chroma      real,
  tagged_at   timestamptz,
  tag_error   text,
  seen_at     timestamptz not null default now(),
  unique (feed_id, external_id)
);

create index if not exists products_match on public.products (category, gender) where hex is not null and in_stock;
create index if not exists products_untagged on public.products (id) where tagged_at is null;

alter table public.feeds enable row level security;
alter table public.products enable row level security;
