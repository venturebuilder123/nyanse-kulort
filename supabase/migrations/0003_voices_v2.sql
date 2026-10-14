-- Voices v2 (14 Oct 2026): Wingman/Director (KULØRT), Girl Math/Boss Lady/Signature (NYANSE).
update public.push_subscriptions set voice = 'bosslady' where voice = 'atelier';
alter table public.push_subscriptions drop constraint if exists push_subscriptions_voice_check;
alter table public.push_subscriptions add constraint push_subscriptions_voice_check
  check (voice in ('wingman', 'director', 'bosslady', 'girlmath', 'signature'));
