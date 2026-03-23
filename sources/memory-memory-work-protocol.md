# Memory work protocol (v1)

Goal: keep the workspace navigable and reduce “orphan” files.

Principles:
- **Micro changes** (≤1 file per run), commit often.
- **Add an inbound link** from an index/hub so the file can be found later.
- Prefer **existing hubs**; create a new hub only if needed.

## Orphan-fix loop (15 min)
1) Pick the first unfixed item from `memory/orphans.md`.
2) Read it and write a **micro-annotation** (1–2 lines): what it is + when to open.
3) Add an inbound link:
   - `INDEX.md` (top-level) or
   - a thematic index (e.g. `memory/journal-index.md`, `memory/concepts/INDEX.md`, `projects/INDEX.md`, `docs/INDEX.md`, `content/INDEX.md`).
4) Mark as Fixed in `memory/orphans.md` (date + where linked).
5) Commit.

## Safety
- Do not publish/forward private content; prefer 1–2 line summaries.
- Never commit secrets or `*.session`.
