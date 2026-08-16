# AGENTS.md

Instructions for coding agents working in this repository. (This is the *repo* convention — the web-facing equivalent for language models reading the deployed site is served at `/llms.txt`.)

## What this project is

A bilingual public dossier of publicly reported cyberattacks and data breaches affecting French public institutions and companies in 2025–2026, plus a read-only public API over the same data. Nuxt 4, prerendered to static HTML, deployed on Vercel.

## The rule that matters most

`data/france-cyberwatch-data.json` is the single source of truth. **Never write incident content anywhere else**, and never soften these invariants:

- `affected: null` means *unknown*, not zero. It must never be plotted as 0, summed into a total, or rendered as "0". `formatAffected()` in `app/utils/format.ts` is the only path for displaying a count; the API leaves the CSV cell empty.
- Incidents with `status: "disputed"` are real breaches with contested scope. Attacker-claimed figures live in `affectedLabel` text, never in the numeric field, and never in an aggregate.
- No attacker is attributed unless the dataset's cited source supports it.
- Severity and evidence status are never communicated by colour alone.
- Source links open in a new tab with `rel="noopener noreferrer"`.

If a task seems to require a fact the dataset does not contain, stop and ask rather than inventing one.

## Layout

```
data/                  source of truth for incidents; served at /data, imported by the API
                       explainers.json is educational copy only (no incident facts)
app/                   Nuxt app (pages, components, composables, utils, types)
server/api/            the public API
server/routes/         robots.txt, sitemap.xml, feed.xml, llms.txt, llms-full.txt
shared/utils/          code used by both the app and the API (the filter matcher, the API catalogue)
```

## Conventions

- **Auto-imports are on.** `app/composables/**`, `app/utils/**` and `shared/utils/**` are global in the app; `shared/utils/**` is also global in `server/`. Because of that, exported names must be specific — `chartTheme`, not `theme`. Do not export a bare `series`, `format`, `data` or similar.
- **Theme follows the OS.** Light and dark are CSS custom properties under `prefers-color-scheme`. Do not store a theme in `localStorage`, and do not toggle a class on `<html>` — that would disagree with prerendered markup. Charts read the same scheme on the client via `useColorScheme()`.
- **Avoid inline tuple/complex type annotations on exported consts** in auto-imported files. Nuxt's import scanner mis-parses them and emits broken globals; use a named type alias instead.
- **The language lives in the URL.** `/` and `/incident/:id` are English, `/fr` and `/fr/incident/:id` are French, `/docs` and `/fr/docs` are the API reference, `/learn` and `/learn/:slug` (and `/fr/learn…`) are public explainers, and all of those patterns are prerendered. Locale is derived from the route — never from `localStorage`, and never flipped on the client, which would break hydration on prerendered pages. Build internal links with `localePath()` from `useLocale()`. A French browser language may *navigate* to the French URL before paint; it must not rewrite the page in place.
- **Nothing locale-dependent may hydrate late.** Deferred hydration (`hydrate-on-visible`) on text that comes from the UI dictionary will fight the prerendered markup. `content-visibility` is fine; deferred hydration is not.
- **State is `useState`**, never module-level `ref`/`reactive` — those leak across requests during SSR.
- **One filter matcher.** `shared/utils/incident-match.ts` backs both the timeline and `GET /api/incidents`; change it once, and both stay in step.
- Prefer computed state over duplicated arrays. Keep components focused; no giant monolith.

## Charts

ECharts via `vue-echarts`, client-side only, in `app/components/charts/`. The palettes in `app/utils/echarts.ts` (and the matching CSS tokens) were validated for colour-vision deficiency and contrast against the chart surfaces `#111726` (dark) and `#fffcf7` (light). If you change a colour, re-validate it rather than picking by eye. Every chart ships a "Show data table" text equivalent, and unknown values are excluded from the plot rather than zeroed.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build        # prerenders / , /fr and every incident page in both languages
npm run preview
npm run typecheck    # vue-tsc; must be clean
```

`nuxt typecheck` prints an `ERR_PACKAGE_PATH_NOT_EXPORTED` stack trace from vue-tsc's own tsconfig resolution. It is upstream noise: the check still runs and exits 0.

## Before you call it done

- `npm run build` succeeds and prerenders 44 routes.
- `npm run typecheck` reports no errors.
- Load `/` and `/fr` in a browser and confirm the console is free of hydration mismatches.
- If you touched the API, re-check that `GET /api/incidents?sort=affected` returns the published figures first and the unknown ones last — never zeros.
