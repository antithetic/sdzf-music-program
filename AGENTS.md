# Agent notes — SDZF Music Program

pnpm + Turborepo monorepo. Public site is Astro 7 (`apps/frontend`). CMS is Sanity (`apps/studio` hosts Studio; **all config, schema, plugins, and desk structure live in `packages/sanity`**).

Read `PROJECT.md` for product status and the content model. Registered types: `edition`, `artist`, `contact`, `venue`, `page`, `tag`. There is no schedule document yet (artist + venue + edition + time). `event.ts` is an unregistered stub — do not treat it as that type.

## Where to edit

- Schema, `defineConfig`, plugins, Structure: `packages/sanity/src/`
- Document types: `packages/sanity/src/schemaTypes/documents/` — register in `documents/index.ts`
- Shared fields, groups, presets: `packages/sanity/src/schemaTypes/definitions/`
- Custom desk: `packages/sanity/src/structure/` (empty; default Structure plugin only)
- Studio is a re-export only: `apps/studio/sanity.config.ts` → `@repo/sanity`
- Public pages and components: `apps/frontend/src/`
- Do not add schema types under `apps/studio/` (leftover `src/schemaTypes` is unused)

## Commands

- From repo root: `pnpm dev`, `pnpm build`, `pnpm format`, `pnpm lint`
- Studio package name is `sdzf-music`. Frontend package name is `frontend`.

## Sanity

- Project ID `7mueck3w`, dataset `production`, workspace `default`
- Before schema or GROQ work, load Sanity rules: `schema`, `groq`, `astro`, plus `studio-structure` / `typegen` / `visual-editing` when relevant
- Let Sanity generate document `_id`s. Use `reference` fields; resolve with GROQ
- Prefer existing field modules (`slugField`, link fields, `eventDatesField`, field groups) over new one-off fields
- Slugs must stay lowercase (`slugField` already enforces this)
- Do not store festival video in Sanity `file` assets; use Mux or an embed URL. Contact `media` files are internal only
- Unsplash image source is **dev only** — do not treat it as a production asset pipeline
- Schema is local until deployed. Production already has sample documents; do not wipe or rewrite existing `_id`s
- Frontend is not wired to Sanity yet — add `@sanity/client` or `@sanity/astro` when you start fetching. TypeGen is not set up

## Conventions

- Do not add nested `pnpm-lock.yaml` / `pnpm-workspace.yaml` under apps (frontend still has leftovers — do not add more)
- Match existing Prettier in the file you touch (Studio app historically used no-semi / single quotes; `@repo/sanity` uses default Prettier)
- Do not commit `.env` or tokens
- Keep `PROJECT.md` current when you add types, routes, or change the content model
