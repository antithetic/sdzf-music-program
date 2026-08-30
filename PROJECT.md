# SDZF Music Program

Public music program and archive for **San Diego Zine Fest (SDZF)**. Editors manage artists, venues, contacts, and editions in Sanity; Astro will render the public schedule and archive.

## Status (2026-08-30)

Studio schema and reusable fields are in place. Editors can already create editions, artists, contacts, venues, pages, and tags. The public program UI and Astro ↔ Sanity fetch layer are **not built yet**. There is still no schedule row that ties an artist to a venue, edition, and time.

| Area                                   | State                                                                 |
| -------------------------------------- | --------------------------------------------------------------------- |
| Monorepo (pnpm + Turborepo)            | Done                                                                  |
| Sanity Studio host (`apps/studio`)     | Done — thin wrapper                                                   |
| Shared Sanity package (`@repo/sanity`) | Done — schema lives here                                              |
| Content model                          | In progress — core types exist; schedule type missing                 |
| Studio desk structure                  | Default Structure plugin only (`src/structure/` is empty)             |
| Astro ↔ Sanity                         | Not started                                                           |
| Public program / archive UI            | Stock Astro starter                                                   |
| Schema deploy / TypeGen                | Not set up                                                            |

Repo: [antithetic/sdzf-music-program](https://github.com/antithetic/sdzf-music-program). Sanity project `7mueck3w`, dataset `production`, workspace `default`.

The production dataset already has sample documents (2026 edition, artists, contacts, a venue, a page, and a tag). Schema changes are local until someone deploys the schema.

## Repo map

```text
apps/frontend              Astro 7 public site (localhost:4321)
apps/studio                Sanity Studio host (`pnpm --filter sdzf-music dev`)
packages/sanity            @repo/sanity — defineConfig, plugins, schema
packages/sanity/src/schemaTypes
  documents/               artist, contact, edition, venue, page, tag
  objects/                 blockContent
  blocks/                  empty (page-builder blocks later)
  definitions/             reusable fields, groups, presets
packages/sanity/src/structure   reserved for custom desk; unused
```

Root scripts: `pnpm dev` (Turbo), `pnpm build`, `pnpm format`, `pnpm lint`.

## Content model

Registered document types in `packages/sanity/src/schemaTypes/documents/index.ts`:

| Type      | Role                                                                                         | Maturity                                      |
| --------- | -------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `edition` | A festival year (title, year, date/time windows, slug)                                       | Usable                                        |
| `artist`  | Performer: name, pronouns, location, bio, images, web/social/music links, contact references | Usable; **no slug** yet                       |
| `contact` | Shared person/inbox: email/phone, affiliations, internal notes and media                     | Usable (internal CRM, not public)             |
| `venue`   | Named place (currently just `name`)                                                          | Stub                                          |
| `page`    | Generic CMS page: title, slug, Portable Text, image, SEO via `@sanity/presets`               | Usable; page-builder still TODO               |
| `tag`     | Genre/label: name, slug, description, image                                                  | Usable                                        |

`event.ts` exists as a title-only stub and is **not registered**. Do not treat it as the schedule type.

### Relationships

Use Sanity `reference` fields. Do not copy artist or venue names onto other documents.

```text
artist.contact[]  →  contact
contact.affiliations[]  →  venue | artist | contact
```

Nothing yet joins **artist + venue + edition + start/end**. That schedule document is the missing piece for a live program and archive.

### Reusable fields

Shared field modules live in `packages/sanity/src/schemaTypes/definitions/fields/`:

- `pronounsField`, `locationField`, `slugField` (lowercase invariant), `imageBlockField`
- `webLinksField`, `socialLinksField`, `musicLinksField`, `contactLinksField`
- `eventDatesField` — date plus 12-hour start/end (used on `edition`)
- Field groups for Profile / Content / Media / Contact / SEO / etc.

SEO on `page` uses `defineSeo` from `@sanity/presets`. Internal links in that registry currently point at `page` only.

### Studio plugins

Configured in `packages/sanity/src/index.ts`:

- `structureTool` — default desk (no custom Structure yet)
- `sanity-plugin-media` — media library
- `visionTool` — GROQ playground
- `sanity-plugin-asset-source-unsplash` — **dev only**; remove once the site is live

Do not store festival video in Sanity `file` assets. Use Mux or an embed URL (YouTube/Vimeo). Contact `media` files are internal docs, not public playback.

## Public site (not started)

`apps/frontend` is still the Astro 7 “Basics” starter (`Welcome.astro`, title “Astro Basics”). No `@sanity/client` or `@sanity/astro`. Intended surfaces:

- Schedule by day / venue for the current edition
- Artist pages (needs an artist slug)
- Archive of past editions
- Optional: tag pages, info pages from `page`

## Next work

1. Add the schedule document (artist + venue + edition + start/end). Decide whether that type is `set` or a finished `event` — do not ship the current stub as-is.
2. Add `slug` on `artist` (and expand `venue` if it is the public “stage”).
3. Custom Structure in `packages/sanity/src/structure/` (editions, schedule, artists, contacts).
4. Connect Astro with `@sanity/client` or `@sanity/astro`; add GROQ + TypeGen.
5. Replace the Welcome starter with schedule, artist, and archive routes.
6. Deploy schema when Studio types should be the source of truth in the dataset.
7. Clean leftovers: unused `apps/studio/src/schemaTypes/`, nested `apps/frontend` lockfile/workspace file, unused `event.ts` or finish it, unused `flexokiColors.ts`.

## Decisions already made

- Sanity is the CMS; Studio config and schema live in `@repo/sanity`, not in the Studio app.
- Public site is Astro 7, not Next.js.
- Production dataset is `production` from day one.
- `contact` is a reusable document, referenced from artists (and later venues), not inline contact strings.
- `venue` replaced the earlier “stage” name; a venue may still need stages if one place has more than one.
- Video for the public site is Mux or an embed URL, not Sanity `file`.
