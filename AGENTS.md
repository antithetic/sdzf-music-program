# Agent notes — SDZF Music Program

pnpm + Turborepo monorepo. Public site is Astro 7 (`apps/frontend`). CMS is Sanity (`apps/studio` hosts Studio; **all config, schema, and desk structure live in `packages/sanity`**).

Read `PROJECT.md` for product status and the intended artist / stage / set / edition model.

## Where to edit

- Schema, `defineConfig`, plugins, Structure: `packages/sanity/src/`
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
- Do not store festival video in Sanity `file` assets; use Mux or an embed URL
- Frontend is not wired to Sanity yet — add `@sanity/client` or `@sanity/astro` when you start fetching

## Conventions

- Do not add nested `pnpm-lock.yaml` / `pnpm-workspace.yaml` under apps
- Match existing Prettier in the file you touch (Studio app historically used no-semi / single quotes; `@repo/sanity` uses default Prettier)
- Do not commit `.env` or tokens
- Keep `PROJECT.md` current when you add types, routes, or change the content model
