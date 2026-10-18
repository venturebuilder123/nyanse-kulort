-- Inner-circle discount codes (decision 18 Oct 2026): a 100% code makes an order of €0.
alter table public.orders drop constraint if exists orders_amount_cents_check;
alter table public.orders add constraint orders_amount_cents_check check (amount_cents >= 0);
