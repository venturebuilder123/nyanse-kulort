-- Reels (19 Oct 2026): Instagram processes a video for up to a few minutes. Meanwhile the slot is
-- "processing" with the container id in media_id; the next hourly run publishes it.
alter table public.social_posts drop constraint if exists social_posts_status_check;
alter table public.social_posts add constraint social_posts_status_check
  check (status in ('published', 'skipped', 'failed', 'preview_sent', 'processing'));
