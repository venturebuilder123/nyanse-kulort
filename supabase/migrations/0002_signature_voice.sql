-- NYANSE Signature voice (40+), 14 Oct 2026: allow it for the weekly colour tip.
alter table public.push_subscriptions drop constraint if exists push_subscriptions_voice_check;
alter table public.push_subscriptions add constraint push_subscriptions_voice_check
  check (voice in ('wingman', 'atelier', 'girlmath', 'signature'));
