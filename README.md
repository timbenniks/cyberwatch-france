# France Cyberwatch 2025—2026

A bilingual (EN/FR) public dossier of major publicly reported cyberattacks and data breaches affecting French public institutions and companies in 2025 and 2026, read alongside the national figures published by ANSSI and the CNIL — plus a read-only public API over the same data.

Live language is in the URL: [`/`](/) is English, [`/fr`](/fr) is French. Human-readable API docs live at [`/docs`](/docs) and [`/fr/docs`](/fr/docs).

`data/france-cyberwatch-data.json` is the single source of truth. No incident content is written outside it, unknown victim counts stay unknown, and disputed attacker claims never enter a chart, a total, or an API aggregate.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # prerenders / , /fr , /docs , /fr/docs and every incident page in both languages
npm run preview
npm run typecheck
```

CI runs typecheck and the production build on every push to `main`.

## Deploying to Vercel

Push the repo and import it — Vercel detects Nuxt and needs no extra configuration. The build prerenders the site to static HTML and deploys `server/api` as serverless functions.

| Variable | Required | Purpose |
|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | recommended | Canonical and `og:` URLs baked into prerendered HTML |
| `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` | for analytics | Site domain as registered in Plausible (not a secret) |
| `NUXT_PUBLIC_PLAUSIBLE_SRC` | optional | Script URL if you proxy or self-host Plausible |
| `NUXT_PUBLIC_PLAUSIBLE_API_HOST` | optional | Event API host if you proxy or self-host |

Without `NUXT_PUBLIC_SITE_URL` the build falls back to Vercel’s `VERCEL_PROJECT_PRODUCTION_URL`, then to `http://localhost:3000`.

Plausible is off until `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. After that, pageviews fire on every load and client navigation; outbound source links are tracked automatically. Custom events cover language switch, nav, incident open/close, filters, chart clicks, downloads, copy link, print, methodology, and API example clicks.

## Language

The displayed language always comes from the path — never from `localStorage`, and never flipped on the client, which would disagree with the prerendered markup.

- `/`, `/incident/:id`, `/docs` — English
- `/fr`, `/fr/incident/:id`, `/fr/docs` — French

If the browser language starts with `fr`, a tiny inline script sends the reader to the matching French URL **before paint**. Everyone else stays on English. An explicit EN/FR click is remembered in a cookie so auto-detect does not bounce people who chose English.

Dates and numbers follow the active locale via `Intl`. The API takes `?lang=en|fr`.

## The API

Read-only, no key, CORS open to any origin, cached at the edge (`s-maxage=3600, stale-while-revalidate=86400`). Human docs: `/docs`. Machine index: `GET /api` (self-describing, with parameters and worked examples). Anything non-GET returns 405.

| Endpoint | What it returns |
|---|---|
| `GET /api/incidents` | List and search. `q`, `kind`, `severity`, `status`, `sector`, `year`, `from`, `to`, `sort` (`date`/`affected`/`org`), `order`, `limit` (≤200), `offset`, `format=json\|csv`, `lang=en\|fr` |
| `GET /api/incidents/{id}` | One record plus its full source entry; 404 lists the valid ids |
| `GET /api/summary` | ANSSI/CNIL national figures plus counts derived from the curated list |
| `GET /api/sources` | Every source, with the incidents citing it |
| `GET /api/patterns` | Recurring weaknesses and each one’s priority control |
| `GET /api/recommendations` | Guidance, `?audience=organizations\|public` |

```bash
curl "$SITE/api/incidents?kind=government&severity=critical"
curl "$SITE/api/incidents?q=iban&lang=fr"
curl "$SITE/api/incidents?year=2026&sort=affected&format=csv"
```

The raw dataset is also served verbatim at `/data/france-cyberwatch-data.json`. In that file, `org` and `confidence` are `{en, fr}` objects; the HTTP API flattens them to strings for the requested `?lang=`.

Every JSON response carries a `meta` block with the project name, `reviewedThrough`, scope, methodology and the dataset’s own charting rules, so a consumer cannot use the numbers without seeing the caveats.

## Stack

Nuxt 4 (Vue 3, TypeScript) with Nitro for the API · Tailwind CSS v4 · ECharts via `vue-echarts`, loaded only when a chart nears the viewport · `@lucide/vue` icons · Plausible (optional).

The site itself does not call the API: the dataset is read on the server and arrives in the page payload, so a visit costs zero function invocations. The API exists for external consumers.

## Project structure

```
data/france-cyberwatch-data.json   source of truth; served at /data, imported by the API
app/
  pages/index.vue        the dossier (/ and /fr)
  pages/incident/[id].vue article page for /incident/:id and /fr/incident/:id
  pages/docs.vue         human-readable API reference (/docs and /fr/docs)
  router.options.ts      French twins of those file routes
  components/            dossier, timeline, charts, incident article
  composables/           data, filters, locale, focus trap, reduced motion
  plugins/               locale detect (inline, before paint) and Plausible
  utils/                 format.ts is the only path for displaying an affected count
server/
  api/                   the endpoints above
  middleware/api-headers.ts   CORS, caching, read-only enforcement
  routes/                robots.txt, sitemap.xml, feed.xml, llms.txt, llms-full.txt
  utils/dataset.ts       localisation and CSV, sharing the site’s filter matcher
shared/utils/
  incident-match.ts      one matcher for the timeline and GET /api/incidents
  api-catalog.ts         endpoint catalogue shared by /docs and GET /api
```

## How the data rules are enforced

- `affected: null` means unknown. `formatAffected()` returns the dataset’s bilingual label instead of a number, charts filter those incidents out rather than plotting 0, CSV exports leave the cell empty on both the site and the API, and sorting pins them last in either direction.
- The “largest official estimate” tile and `summary.curated.largestConfirmedAffected` read only **confirmed** incidents with a numeric figure. Disputed attacker claims never enter a plot or an aggregate.
- Disputed records carry a dashed stamp and an explicit warning; the API documents the same rule in `/api` and `/docs`.
- Severity and evidence status always ship with a label and a mark, never colour alone.
- Every source link opens in a new tab with `rel="noopener noreferrer"`.
- No attacker is attributed unless the dataset’s cited source supports it.

If a task seems to require a fact the dataset does not contain, stop rather than inventing one. See `AGENTS.md` for the conventions that keep the UI and the API in step.

## Charts

Five, all computed from the JSON: published account/record counts (confirmed numeric figures only, coloured by severity), government vs companies by year, incidents by sector, severity split, and ANSSI’s 2025 national sector distribution — the last visually set apart as national context rather than part of this dossier. Clicking a bar filters the timeline; each chart has a “Show data table” text equivalent that is rendered server-side.

Chart colours come from a palette validated for colour-vision deficiency and contrast against the chart surface `#111726`.

## Deep links

Every record is a real, prerendered, indexable article: `/incident/ants` and `/fr/incident/ants`, each with its own title, description and canonical tag. Opening one is a navigation (scroll to top). Language switch stays on the same record. Filter buttons on the dossier write query params (`/?kind=company&severity=critical`) without jumping the page. `Copy link` copies the absolute article URL.

## Accessibility

Semantic landmarks, a skip link, keyboard-operable filters and modals with focus trapping and focus restore, visible focus rings, text equivalents for every chart, initials fallbacks for organisation marks, and `prefers-reduced-motion` respected in count-ups, transitions and chart animation. On small screens: larger tap targets, a horizontally scrollable incident spine, and a card layout for the data table.
