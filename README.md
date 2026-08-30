# SDZF Music Program

Public music program and archive for **San Diego Zine Fest**. Editors manage artists, venues, contacts, and festival editions in [Sanity](https://www.sanity.io). The public schedule will be an [Astro](https://astro.build) site.

This repo is a **pnpm + Turborepo** monorepo. Studio schema is underway; the public program UI and Astro ↔ Sanity connection are not built yet. Product status and the content model live in [`PROJECT.md`](./PROJECT.md). Agent conventions live in [`AGENTS.md`](./AGENTS.md).

## Requirements

- [Node.js](https://nodejs.org/) `>= 22.12.0` (required by the Astro app)
- [pnpm](https://pnpm.io/) `^11.5.1` (declared in root `package.json` `devEngines`)
- A Sanity account with access to project `7mueck3w`

## Quick start

```sh
pnpm install
pnpm dev
```

Turborepo starts every `dev` script:

| App           | Package name | URL                   | What you get today                                    |
| ------------- | ------------ | --------------------- | ----------------------------------------------------- |
| Public site   | `frontend`   | http://localhost:4321 | Stock Astro “Basics” starter                          |
| Sanity Studio | `sdzf-music` | http://localhost:3333 | Schema for edition, artist, contact, venue, page, tag |

Run one app:

```sh
pnpm --filter frontend dev
pnpm --filter sdzf-music dev
```

## Repository layout

```text
apps/frontend          Astro 7 public site
apps/studio            Sanity Studio host (re-exports shared config)
packages/sanity        @repo/sanity — defineConfig, plugins, schemaTypes
```

Studio config is **not** edited in `apps/studio`. That app is a thin wrapper:

```ts
// apps/studio/sanity.config.ts
export { config as default } from "@repo/sanity";
```

Add document types in `packages/sanity/src/schemaTypes/documents/` and register them in `packages/sanity/src/schemaTypes/documents/index.ts`. Shared fields live under `schemaTypes/definitions/`. Desk structure belongs in `packages/sanity/src/structure/` (empty today).

## Scripts (repo root)

| Command       | What it does                                    |
| ------------- | ----------------------------------------------- |
| `pnpm dev`    | Run all workspace `dev` tasks via Turbo         |
| `pnpm build`  | Run all workspace `build` tasks                 |
| `pnpm format` | Prettier (`prettier-plugin-astro` for `.astro`) |
| `pnpm lint`   | oxlint (`--fix`)                                |

Studio-only (from `apps/studio`, or via `pnpm --filter sdzf-music`):

| Command                     | What it does                      |
| --------------------------- | --------------------------------- |
| `pnpm dev`                  | Local Studio                      |
| `pnpm build` / `pnpm start` | Production Studio build and serve |
| `pnpm deploy`               | Deploy hosted Studio              |
| `pnpm deploy-graphql`       | Deploy GraphQL API                |

Frontend-only (`pnpm --filter frontend`):

| Command        | What it does                 |
| -------------- | ---------------------------- |
| `pnpm dev`     | Astro dev server             |
| `pnpm build`   | Production build to `dist/`  |
| `pnpm preview` | Preview the production build |

## Sanity

|              |                                                                  |
| ------------ | ---------------------------------------------------------------- |
| Project ID   | `7mueck3w`                                                       |
| Dataset      | `production`                                                     |
| Workspace    | `default`                                                        |
| Studio title | SDZF Music                                                       |
| Config       | [`packages/sanity/src/index.ts`](./packages/sanity/src/index.ts) |
| CLI          | [`apps/studio/sanity.cli.ts`](./apps/studio/sanity.cli.ts)       |

Plugins: Structure (default desk), [Media](https://www.sanity.io/plugins/sanity-plugin-media), Vision, and Unsplash as an image source (dev only — remove when the site is live).

Registered document types: `edition`, `artist`, `contact`, `venue`, `page`, `tag`. The schedule document that joins artist + venue + edition + time is not modeled yet. The Astro app is **not** connected to Sanity (`@sanity/client` / `@sanity/astro` are not installed).

Do not store festival video in Sanity `file` assets. Use Mux or an embed URL (YouTube/Vimeo) when that work starts.

## Content model

Implemented in Studio. Relationships are Sanity `reference` fields.

- **edition** — a festival year (live program + archive)
- **artist** — name, pronouns, location, bio, images, links; references `contact`
- **contact** — shared person or inbox (email/phone, affiliations, internal notes)
- **venue** — named place (name only for now)
- **page** — generic CMS page with Portable Text and SEO
- **tag** — genre or label

Still needed for the public program: a schedule row, artist slugs, and custom Studio structure. Details and next steps: [`PROJECT.md`](./PROJECT.md).

## Docs in this repo

| File                                                   | Audience                                |
| ------------------------------------------------------ | --------------------------------------- |
| [`PROJECT.md`](./PROJECT.md)                           | Status, content model, next work        |
| [`AGENTS.md`](./AGENTS.md)                             | Conventions for agents and contributors |
| [`apps/frontend/README.md`](./apps/frontend/README.md) | Stock Astro starter notes               |
| [`apps/studio/README.md`](./apps/studio/README.md)     | Stock Sanity Studio notes               |

## License

ISC (root). Studio is `UNLICENSED`.
