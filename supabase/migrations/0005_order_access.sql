-- Verified access to the style guide (15 Oct 2026): the guide opens only for a paid order.
-- secret: unguessable token the buyer holds (link in the mail); profile: numbers only, so the
-- guide can be rebuilt on any device; paid_at: when the founder confirmed the transfer.
alter table public.orders add column if not exists secret text;
alter table public.orders add column if not exists profile jsonb;
alter table public.orders add column if not exists paid_at timestamptz;
alter table public.orders add column if not exists mailed_at timestamptz;
create unique index if not exists orders_secret on public.orders (secret);
