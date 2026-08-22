# Shellbound

An independent, spoiler-aware field guide for **Mortal Shell II**. The launch edition includes an opening route, confirmed game-system intel, searchable strategy notes, and a zoomable interactive map for Shells, weapons, Tarstones, fragments, keys, gates, and bosses.

## Local development

Requires Node.js `>=22.13.0`.

```bash
npm install
npm run dev
npm run build
```

## Production

- Primary URL: [https://mortalshell2guide.org](https://mortalshell2guide.org)
- Hosting: Cloudflare Workers with Static Assets
- Source branch: `main`
- Worker name: `mortal-shell-ii-guide`

The `www.mortalshell2guide.org` custom domain is also attached to the Worker and returns a permanent `308` redirect to the root domain.

## Cloudflare deployment architecture

The site is a Vinext application built with Vite and the Cloudflare Vite plugin.

```text
Local source
    │
    ├── npm run build
    │     ├── dist/server/index.js  → Cloudflare Worker entry
    │     └── dist/client/          → CSS, JavaScript, images, and icons
    │
    └── wrangler deploy
          └── Cloudflare Worker + Static Assets
                    ├── mortalshell2guide.org
                    └── www.mortalshell2guide.org → 308 redirect
```

Cloudflare configuration lives in [`wrangler.jsonc`](./wrangler.jsonc). Important settings include:

- `main`: deploys the generated Worker from `dist/server/index.js`.
- `assets.directory`: uploads static files from `dist/client`.
- `ASSETS`: exposes static files to the Worker through an asset binding.
- `routes`: attaches the root and `www` custom domains.
- `observability`: enables Cloudflare Worker observability.
- `assets.run_worker_first`: sends `/llms.txt` and `/llms-full.txt` to the Worker before static-asset handling so they can be generated from current guide data.

## Deployment workflow

Prerequisites:

- Node.js `>=22.13.0`
- Dependencies installed with `npm install`
- Wrangler authenticated locally (`wrangler whoami`)
- The domain active in Cloudflare DNS

Validate the complete site before publishing:

```bash
npm test
```

This command builds the production bundle, tests every route and metadata endpoint, and validates guide word counts, SEO metadata, source coverage, and internal links.

Commit and push the validated source:

```bash
git add -A
git commit -m "Describe the change"
git push origin main
```

Build and deploy to Cloudflare:

```bash
npm run deploy:cf
```

The deployment script runs:

```bash
npm run build
wrangler deploy
```

After Wrangler reports success, verify the production site and machine-readable endpoints:

```bash
curl -I https://mortalshell2guide.org
curl https://mortalshell2guide.org/sitemap.xml
curl https://mortalshell2guide.org/llms.txt
curl https://mortalshell2guide.org/llms-full.txt
```

## Content-driven discovery files

Guide content is stored in `app/guides/articles/`. The following outputs are generated automatically from the same `guideArticles` data:

- `/guides` — complete human-readable guide index
- `/sitemap.xml` — canonical URLs and per-article `lastmod` values
- `/llms.txt` — concise LLM-friendly Markdown index
- `/llms-full.txt` — full Markdown guide corpus
- related-guide internal links

Interactive map content is stored in `app/map/map-data.ts`. Its shared metadata, marker list, editorial copy, source log, and update date automatically feed:

- `/map` — zoomable, searchable, filterable world map with device-local found progress
- `/sitemap.xml` — canonical map URL and map-data `lastmod`
- `/llms.txt` — concise map discovery entry
- `/llms-full.txt` — map methodology and the complete curated marker list

When adding or moving a marker, update its source IDs and `MAP_UPDATED_AT`, run `npm test`, and deploy. Do not maintain separate copies of the marker list in sitemap or LLM files.

When adding or updating a guide, set its ISO `updatedAt` value and deploy. The sitemap and both LLM files will update automatically; they should not be maintained by hand.

## Current automation status

GitHub stores the source, but pushing to `main` does **not** currently trigger a Cloudflare deployment. Production releases are performed manually with Wrangler using the authenticated local Cloudflare session.

Wrangler OAuth credentials are stored locally and must never be committed, embedded in a remote URL, or added to environment files tracked by Git.

Mortal Shell II and related names and marks belong to Cold Symmetry, Playstack, and their respective owners. This project is not affiliated with or endorsed by them.
