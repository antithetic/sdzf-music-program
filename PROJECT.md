# SDZF Music Program

Public music program and archive for **San Diego Zine Fest (SDZF)**. Editors manage artists, stages, time slots, and editions in Sanity; Astro renders the public schedule and archive.

## Status (2026-08-30)

Scaffolding is in place. Festival content types, Studio structure, and the public program UI are **not built yet**.

| Area                                   | State               |
| -------------------------------------- | ------------------- |
| Monorepo (pnpm + Turborepo)            | Done                |
| Sanity Studio host (`apps/studio`)     | Done — thin wrapper |
| Shared Sanity package (`@repo/sanity`) | Done — empty schema |
| Content model                          | Not started         |
| Astro ↔ Sanity                         | Not started         |
| Public program / archive UI            | Stock Astro starter |

Repo: [antithetic/sdzf-music-program](https://github.com/antithetic/sdzf-music-program). Sanity project `7mueck3w`, dataset `production`.

## Repo map

```text
apps/frontend     Astro 7 public site (localhost:4321)
apps/studio       Sanity Studio (`pnpm --filter sdzf-music dev`)
packages/sanity   @repo/sanity — config, schema, future structure
```

Root scripts: `pnpm dev` (Turbo), `pnpm build`, `pnpm format`, `pnpm lint`.

## Intended content model (not implemented)

Keep editions first so the site can be both a live program and an archive.

- **edition** — a festival year (e.g. 2026). Singleton-per-year, not a hard-coded ID unless it is a true singleton.
- **artist** — performer: name, slug, photo, bio, links.
- **stage** — named stage/venue for an edition (or reused across years).
- **set** (timeslot) — artist + stage + edition + start/end. This is the schedule row.

Use Sanity `reference` fields for those relationships. Do not duplicate artist/stage names onto the set.

Optional later: genre/tags, announcements, sponsors, after-movie embeds (Mux or YouTube/Vimeo URL — not Sanity `file` video).

## Next work

1. Define schema in `packages/sanity/src/schema/` and register types in `schema/index.ts`.
2. Add Studio structure in `packages/sanity/src/structure/` (editions, schedule, artists).
3. Connect Astro with `@sanity/client` or `@sanity/astro`; add GROQ + TypeGen.
4. Replace the Welcome starter with schedule (by day/stage) and artist pages.
5. Clean leftovers: unused `apps/studio/src/schemaTypes/`, nested frontend lockfile/workspace file, empty structure dir if still unused.

## Decisions already made

- Sanity is the CMS; Studio config lives in `@repo/sanity`, not in the Studio app.
- Public site is Astro 7, not Next.js.
- Production dataset is `production` from day one.
