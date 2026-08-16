import type { Bilingual } from '../../app/types/cyberwatch'

export interface ApiQueryParamDoc {
  name: string
  detail: Bilingual
}

export interface ApiEndpointDoc {
  path: string
  description: Bilingual
  query?: ApiQueryParamDoc[]
  examples: string[]
}

export interface ApiConventionDoc {
  id: string
  title: Bilingual
  body: Bilingual
}

export const apiConventions: ApiConventionDoc[] = [
  {
    id: 'affected',
    title: { en: 'Unknown is not zero', fr: 'Inconnu n’est pas zéro' },
    body: {
      en: 'A null `affected` means the number is unknown or unpublished. It is never 0. Do not sum it, do not plot it as none, and do not treat a missing CSV cell as an empty incident.',
      fr: 'Un `affected` null signifie que le chiffre est inconnu ou non publié. Ce n’est jamais 0. Ne le sommez pas, ne le représentez pas comme une absence, et ne traitez pas une cellule CSV vide comme un incident sans victime.',
    },
  },
  {
    id: 'disputed',
    title: { en: 'Disputed scope stays disputed', fr: 'Un périmètre contesté reste contesté' },
    body: {
      en: 'An incident with status "disputed" is a real breach whose headline scope is contested. Attacker-claimed figures live in `affectedLabel` text and never in the numeric field, and never in an aggregate.',
      fr: 'Un incident au statut "disputed" est une violation réelle dont l’ampleur annoncée est contestée. Les chiffres revendiqués par les attaquants restent dans le texte `affectedLabel`, jamais dans le champ numérique, jamais dans un agrégat.',
    },
  },
  {
    id: 'attribution',
    title: { en: 'No inferred attribution', fr: 'Pas d’attribution inférée' },
    body: {
      en: 'Attackers are only named where the cited source supports it. Do not infer a group from the method or the sector.',
      fr: 'Les attaquants ne sont nommés que lorsque la source citée le permet. N’inférez pas un groupe à partir de la méthode ou du secteur.',
    },
  },
  {
    id: 'scope',
    title: { en: 'Not an exhaustive register', fr: 'Pas un registre exhaustif' },
    body: {
      en: 'This is a curated set of major publicly reported incidents, not every French breach. Cite the original `sourceUrl` on each record.',
      fr: 'Il s’agit d’un ensemble curaté d’incidents majeurs rendus publics, pas de toutes les violations en France. Citez le `sourceUrl` original de chaque fiche.',
    },
  },
]

export const apiEndpoints: ApiEndpointDoc[] = [
  {
    path: '/api/incidents',
    description: {
      en: 'List and search incidents. Unknown counts sort last when `sort=affected`, never as zero. CSV leaves the affected cell empty.',
      fr: 'Lister et rechercher les incidents. Les effectifs inconnus se trient en dernier avec `sort=affected`, jamais comme zéro. Le CSV laisse la cellule affected vide.',
    },
    query: [
      {
        name: 'q',
        detail: {
          en: 'Full-text across organisation, sector, method, data, risk, confidence, source and the longer incident-page fields.',
          fr: 'Recherche plein texte sur l’organisation, le secteur, la méthode, les données, le risque, la confiance, la source et les champs longs de la fiche.',
        },
      },
      { name: 'kind', detail: { en: 'government | company', fr: 'government | company' } },
      { name: 'severity', detail: { en: 'critical | high | medium | low', fr: 'critical | high | medium | low' } },
      { name: 'status', detail: { en: 'confirmed | disputed | unknown', fr: 'confirmed | disputed | unknown' } },
      {
        name: 'sector',
        detail: { en: 'Exact sector name, case-insensitive.', fr: 'Nom exact du secteur, insensible à la casse.' },
      },
      { name: 'year', detail: { en: 'e.g. 2026', fr: 'ex. 2026' } },
      { name: 'from', detail: { en: 'ISO date, inclusive lower bound.', fr: 'Date ISO, borne inférieure inclusive.' } },
      { name: 'to', detail: { en: 'ISO date, inclusive upper bound.', fr: 'Date ISO, borne supérieure inclusive.' } },
      { name: 'sort', detail: { en: 'date | affected | org (default date)', fr: 'date | affected | org (date par défaut)' } },
      { name: 'order', detail: { en: 'desc | asc (default desc)', fr: 'desc | asc (desc par défaut)' } },
      { name: 'limit', detail: { en: '1–200, default 100', fr: '1–200, 100 par défaut' } },
      { name: 'offset', detail: { en: 'default 0', fr: '0 par défaut' } },
      { name: 'format', detail: { en: 'json | csv', fr: 'json | csv' } },
      { name: 'lang', detail: { en: 'en | fr', fr: 'en | fr' } },
    ],
    examples: [
      '/api/incidents?kind=government&severity=critical',
      '/api/incidents?q=iban&lang=fr',
      '/api/incidents?year=2026&sort=affected&format=csv',
    ],
  },
  {
    path: '/api/incidents/{id}',
    description: {
      en: 'One incident with its localized `detail` (lead, timeline, how, taken, notTaken, impact, response, methodDisclosure, optional revision and quotes) plus `lastResearched`, `source` and `sources`. Each source has `kind` (primary | official | secondary), `publisher` and optional `published`. Unknown ids return 404 and list the valid ones. CSV is not offered here; list CSV stays compact and still leaves unknown `affected` empty.',
      fr: 'Un incident avec son `detail` localisé (lead, timeline, how, taken, notTaken, impact, response, methodDisclosure, revision et quotes optionnels) plus `lastResearched`, `source` et `sources`. Chaque source a un `kind` (primary | official | secondary), un `publisher` et un `published` optionnel. Un identifiant inconnu renvoie 404 et la liste des identifiants valides. Pas de CSV ici ; le CSV de la liste reste compact et laisse `affected` inconnu vide.',
    },
    query: [{ name: 'lang', detail: { en: 'en | fr', fr: 'en | fr' } }],
    examples: ['/api/incidents/ants'],
  },
  {
    path: '/api/summary',
    description: {
      en: 'ANSSI and CNIL national figures, plus counts derived from this list. Aggregates never include unknown or disputed attacker claims.',
      fr: 'Chiffres nationaux ANSSI et CNIL, plus les décomptes issus de cette liste. Les agrégats n’incluent jamais les inconnus ni les revendications d’attaquants contestées.',
    },
    query: [{ name: 'lang', detail: { en: 'en | fr', fr: 'en | fr' } }],
    examples: ['/api/summary', '/api/summary?lang=fr'],
  },
  {
    path: '/api/sources',
    description: {
      en: 'Every source, with `kind` (primary | official | secondary), `publisher`, optional `published` date, and the incidents that cite it.',
      fr: 'Toutes les sources, avec `kind` (primary | official | secondary), `publisher`, date `published` optionnelle, et les incidents qui les citent.',
    },
    examples: ['/api/sources'],
  },
  {
    path: '/api/patterns',
    description: {
      en: 'Recurring weaknesses and the priority control for each.',
      fr: 'Faiblesses récurrentes et la mesure prioritaire pour chacune.',
    },
    query: [{ name: 'lang', detail: { en: 'en | fr', fr: 'en | fr' } }],
    examples: ['/api/patterns?lang=fr'],
  },
  {
    path: '/api/recommendations',
    description: {
      en: 'Guidance for organisations and the public.',
      fr: 'Recommandations pour les organisations et le grand public.',
    },
    query: [
      { name: 'audience', detail: { en: 'organizations | public', fr: 'organizations | public' } },
      { name: 'lang', detail: { en: 'en | fr', fr: 'en | fr' } },
    ],
    examples: ['/api/recommendations?audience=public&lang=fr'],
  },
]
