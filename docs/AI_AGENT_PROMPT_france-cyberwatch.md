# AI agent prompt: build France Cyberwatch locally

You are a senior frontend engineer and data-visualisation designer. Build a polished, production-quality local web application called **France Cyberwatch 2025-2026**.

The project explains major publicly reported cyberattacks and data breaches affecting French government bodies and French companies during 2025 and 2026. It is aimed at the general public, journalists, policy readers, security teams, and non-technical users.

## Primary goal

Turn the supplied `france-cyberwatch-data.json` file into a rich, interactive, bilingual cyber incident explorer. The application must make complicated cyber incidents easy to understand while preserving uncertainty and source quality.

The JSON file is the single source of truth. Do not copy incident content into Vue components. Do not invent missing facts. Do not turn `null` values into zero. Do not use disputed attacker claims as confirmed statistics.

## Required stack

Use:

- Vue 3
- Vite
- TypeScript
- Tailwind CSS
- ECharts or Chart.js for charts
- Lucide icons
- Vue Router only if useful for deep-linked incident pages
- No backend is required

Keep dependencies lean. The site must run with:

```bash
npm install
npm run dev
```

and build with:

```bash
npm run build
npm run preview
```

## Data

Place the supplied file at:

```text
public/data/france-cyberwatch-data.json
```

Load it at runtime. Create TypeScript interfaces for the schema.

Important rules from the dataset:

1. `affected: null` means unknown, not zero.
2. Only plot numeric `affected` values in victim-count charts.
3. Incidents with `status: "disputed"` must be clearly marked.
4. Never include disputed hacker-claimed victim counts in aggregate totals.
5. Official sources should be visually distinguished from press reporting.
6. Display the dataset's `reviewedThrough` date prominently.
7. Preserve the English and French text supplied in the JSON.
8. Do not attribute an attacker unless the JSON explicitly contains supported attribution.

## Visual direction

Create a premium investigative-data-journalism look, somewhere between a cyber threat intelligence dashboard and a high-end newspaper interactive.

The visual identity should feel:

- dark, sophisticated and technical
- information-dense without feeling cluttered
- readable by non-technical visitors
- responsive on phone, tablet and desktop
- visually distinctive, not a generic admin dashboard

Use a deep navy or near-black background, subtle grid/noise texture, glass-like cards only where useful, crisp typography, restrained neon accents for cyber-risk signals, and generous spacing.

Severity should have clear visual differentiation, but do not rely on color alone.

Avoid excessive animations. Use motion only to clarify state changes, reveal timelines, animate chart transitions, and improve navigation.

## Header

Create a sticky header with:

- France Cyberwatch wordmark
- Overview
- Timeline
- Patterns
- What people can do
- Data
- language toggle: EN / FR
- search button or inline search
- optional theme toggle

The default language is English.

Persist language selection in `localStorage`.

## Hero section

Create a strong opening section explaining that France's digital systems faced sustained pressure across 2025 and 2026.

Show four key statistic cards driven from the JSON:

- ANSSI security events handled in 2025
- CNIL personal-data breach notifications in 2025
- largest official numerical incident estimate in the dataset
- ANSSI confirmed leak rate from possible leak events

Add a visible methodology label such as:

`Data reviewed through 16 August 2026`

Also surface the scope warning from the JSON so users understand that the site is curated rather than exhaustive.

## Main interactive timeline

This is the centerpiece of the site.

Build a chronological vertical timeline grouped by year and month.

Each incident card should show:

- date
- organisation logo or favicon
- organisation name
- government/company badge
- sector
- severity
- confidence/status badge
- affected count or the bilingual affected label
- short summary of exposed data or service impact
- source type

Clicking an incident opens a rich side panel or modal containing:

- organisation and logo
- exact date
- severity
- status
- affected label
- data/systems affected
- known or suspected entry method
- why it matters to the public
- evidence/confidence note
- source name
- source link
- an explicit warning when scope is disputed or unknown

Support keyboard navigation and accessible modal behavior.

Add filters for:

- all incidents
- government
- companies
- critical severity
- year
- sector
- confirmed vs disputed

Add instant full-text search across organisation, sector, method, data, risk and confidence.

Show the number of matching incidents after filtering.

Add a `Reset filters` action.

## Charts and visualisations

All charts must be data-driven from the JSON.

### Chart 1: affected accounts / records

Horizontal bar chart of incidents where `affected` is numeric.

Requirements:

- values displayed in human-readable format
- sort descending
- severity visible
- tooltip with organisation, date and affected label
- never plot unknown values as zero

### Chart 2: government vs company incidents

Show incident counts split by kind and year.

A grouped bar chart or stacked chart works well.

### Chart 3: incidents by sector

Compute counts directly from `incidents[].sector`.

Use a bar chart rather than a pie chart if there are many sectors.

### Chart 4: severity distribution

Show critical vs high and any future values supported by the schema.

### Chart 5: ANSSI sector context

Render the `summaryStats.sectorDistributionPercent` values from the JSON as a doughnut, treemap or horizontal bars.

Make it visually clear that this chart represents broader ANSSI 2025 context and not just the curated incident list.

### Chart interactions

Clicking a chart segment should optionally apply the corresponding filter to the timeline.

## Patterns section

Render every item from `patterns` as an explanatory card.

Each card should show:

- pattern title
- plain-language explanation
- priority control/remediation
- icon
- which incidents appear related, where it can be inferred directly from the text or structured fields without inventing facts

Examples include stolen credentials, supplier exposure, legacy/edge systems, post-breach phishing, excessive reachable data and detection gaps.

## Public guidance section

Create two visually distinct tabs or columns:

### For organisations and government

Render `recommendations.organizations`.

### For the general public

Render `recommendations.public`.

Make these actionable and easy to scan.

For public advice, highlight that knowledge of an address, IBAN, tax office, school, order or personal detail is not proof that a caller or message is genuine.

Do not add alarmist language.

## Data explorer

Create a sortable, filterable table that exposes the full underlying incident dataset.

Columns:

- date
- organisation
- kind
- sector
- severity
- status
- affected
- data/systems
- method
- confidence
- source

Allow:

- sorting
- filtering
- search
- expanding long cells
- opening source links
- downloading the currently filtered rows as JSON or CSV

Add a separate source ledger showing every object in `sources`.

## Bilingual behaviour

Every user-facing sentence should support EN and FR.

Use the bilingual strings already present in the JSON wherever possible.

Create a small translation dictionary for UI-only labels such as:

- Overview / Vue d'ensemble
- Timeline / Chronologie
- Government / Administration
- Companies / Entreprises
- Critical / Critique
- Confirmed / Confirme
- Disputed / Conteste
- Unknown / Inconnu
- Source / Source
- Search / Rechercher
- Reset filters / Reinitialiser les filtres

Switch languages instantly without reloading.

Dates and number formatting must follow the active locale using `Intl.DateTimeFormat` and `Intl.NumberFormat`.

## Logos

Use `incident.logo.domain` as the basis for an organisation favicon/logo.

Implement graceful fallbacks:

1. try a reliable domain favicon URL
2. if loading fails, show a polished initials tile

Do not let broken external images damage the layout.

Keep logos visually consistent inside fixed-size containers.

## Deep links

Give each incident a stable URL or hash, for example:

```text
/#/incident/ants
```

or

```text
/?incident=ants
```

Opening that URL should automatically reveal the incident detail panel.

## Source transparency

Every factual incident page/card must make its evidence status obvious.

Create a small legend explaining:

- Confirmed: supported by official or attributable disclosure
- Disputed: the breach is real but headline scope is contested or unverified
- Unknown: investigation has not established the final scope

Source links must open in a new tab with safe `rel` attributes.

## Accessibility

Meet WCAG-friendly standards where practical:

- semantic landmarks
- keyboard-operable filters and modal
- visible focus states
- sufficient contrast
- text alternatives for logos
- charts accompanied by a text/table equivalent
- respect `prefers-reduced-motion`

## Responsive behaviour

Desktop:

- wide editorial layout
- side-by-side charts
- timeline and filter rail

Tablet:

- two-column cards where space permits

Mobile:

- single-column timeline
- filter drawer
- bottom-sheet or full-screen incident details
- charts remain readable without horizontal page scrolling

## Code quality

Organise the project sensibly, for example:

```text
src/
  components/
    AppHeader.vue
    HeroStats.vue
    Timeline.vue
    IncidentCard.vue
    IncidentDetail.vue
    FilterBar.vue
    charts/
    PatternsGrid.vue
    Recommendations.vue
    DataExplorer.vue
    SourceLedger.vue
  composables/
    useCyberData.ts
    useFilters.ts
    useLocale.ts
  types/
    cyberwatch.ts
  utils/
    format.ts
    export.ts
  App.vue
  main.ts
public/
  data/
    france-cyberwatch-data.json
```

Use computed state rather than duplicating filtered arrays.

No giant monolithic component.

No hardcoded victim totals in chart components.

No placeholder lorem ipsum.

No fake source links.

No fabricated attacker attribution.

## Useful extras

If time permits, add:

- animated count-up stats that respect reduced-motion settings
- shareable incident links
- `Copy link` action
- CSV export
- print-friendly incident view
- a sticky reading-progress indicator
- a compact mobile filter drawer
- source-type badges
- a small methodology modal
- a `What does this mean?` tooltip for terms such as IBAN, MFA, phishing, exfiltration and SQL injection

## Acceptance criteria

The task is complete only when:

1. The app runs locally with `npm install && npm run dev`.
2. Production build succeeds without TypeScript errors.
3. All 14 incidents from the JSON appear.
4. EN/FR language switching works across the whole UI.
5. Search and filters work together correctly.
6. Unknown affected values never appear as zero in charts or totals.
7. Disputed scope is visually distinguished from confirmed scope.
8. Every incident has a working source link.
9. All major charts are responsive and driven from JSON.
10. The site is usable on a 390px-wide phone viewport.
11. Incident detail views are keyboard accessible.
12. No factual incident content is invented outside the supplied dataset.
13. The UI feels like a finished public information product, not a starter template.

## Final agent behaviour

Work autonomously. Inspect the JSON before implementing. Build the complete application, run it, fix build/runtime errors, and provide a short README with exact local commands and a description of the project structure.

Do not stop after scaffolding. Deliver the working experience.
