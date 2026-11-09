---
name: session-closing
description: Use when the founder wraps up a work session ("klaar voor vandaag", "tot morgen", "afsluiten", "wat staat er nog open") - checks, logs and hands over so the next session starts warm.
---

# Session closing (KULØRT · NYANSE)

Close a session in this order. Report in Dutch, short.

1. **Verify.** Run `npx tsc --noEmit -p . --incremental false` and `npx vitest run`. Say what failed, with the output; never claim green without running it.
2. **Uncommitted work.** `git status --short`. Commit what belongs together, with the attribution line from the system reminder. Push only when the founder has approved pushes for this work.
3. **Decisions.** Every new decision of this session goes on top of `docs/BESLISSINGEN.md` (what, why, cost).
4. **Memory.** Update `launch-status-*.md` in the memory folder with what changed (live, blocked, waiting on the founder). Absolute dates.
5. **Numbers, not feelings.** Orders since the last session (`orders` in Supabase: count, tier, amount, brand), social posts published or blocked (`social_posts`), and anything PostHog shows. Separate FACT / ASSUMPTION / OPINION.
6. **Hand-over.** One short list, two parts:
   - **Voor jou** (founder): only things only they can do, with dates.
   - **Volgende sessie** (Claude): the next one to three build steps, most valuable first.
7. Never publish, mail, pay or create accounts as part of closing.
