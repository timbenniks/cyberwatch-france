import type { Bilingual, Locale } from '~/types/cyberwatch'

/** UI chrome only. All incident content comes from the dataset. */
const dictionary = {
  brand: { en: 'France Cyberwatch', fr: 'France Cyberwatch' },
  brandYears: { en: '2025—2026', fr: '2025—2026' },
  navOverview: { en: 'Overview', fr: "Vue d'ensemble" },
  navIncidents: { en: 'Incidents', fr: 'Incidents' },
  navTimeline: { en: 'Timeline', fr: 'Chronologie' },
  navPatterns: { en: 'Patterns', fr: 'Tendances' },
  navGuidance: { en: 'What people can do', fr: 'Que peut-on faire' },
  navNumbers: { en: 'Numbers', fr: 'Chiffres' },
  navData: { en: 'Data', fr: 'Données' },
  skipToContent: { en: 'Skip to content', fr: 'Aller au contenu' },
  openMenu: { en: 'Open menu', fr: 'Ouvrir le menu' },
  closeMenu: { en: 'Close menu', fr: 'Fermer le menu' },
  language: { en: 'Language', fr: 'Langue' },

  seoTagline: {
    en: 'French cyberattacks and data breaches, explained',
    fr: 'cyberattaques et fuites de données en France, expliquées',
  },
  seoRecordSuffix: { en: 'incident record', fr: 'fiche d’incident' },
  heroEyebrow: { en: 'Public incident dossier', fr: 'Dossier public d’incidents' },
  heroTitle: {
    en: 'Publicly reported cyberattacks on French institutions and companies.',
    fr: 'Les cyberattaques rendues publiques contre des institutions et entreprises françaises.',
  },
  heroLead: {
    en: '{n} incidents from 2025 and 2026, each linked to its source. Open a record to see what happened and what was exposed.',
    fr: '{n} incidents en 2025 et 2026, chacun relié à sa source. Ouvrez une fiche pour voir ce qui s’est passé et ce qui a été exposé.',
  },
  stripHint: {
    en: 'Bar height shows severity · select one to open its record',
    fr: 'La hauteur des barres indique la gravité · sélectionnez-en une pour ouvrir sa fiche',
  },
  reviewedThrough: { en: 'Data reviewed through', fr: 'Données vérifiées jusqu’au' },
  scopeNote: { en: 'Scope', fr: 'Périmètre' },
  methodology: { en: 'Methodology', fr: 'Méthodologie' },
  readMethodology: { en: 'Read the methodology', fr: 'Lire la méthodologie' },
  heroLatest: { en: 'Latest record', fr: 'Dernière fiche' },
  seeAllIncidents: { en: 'See all {n} incidents', fr: 'Voir les {n} incidents' },
  close: { en: 'Close', fr: 'Fermer' },

  statAnssiEvents: { en: 'ANSSI security events handled', fr: 'Événements de sécurité traités par l’ANSSI' },
  statAnssiEventsNote: { en: 'Reports and incidents, 2025', fr: 'Signalements et incidents, 2025' },
  statCnil: { en: 'CNIL data breach notifications', fr: 'Notifications de violation à la CNIL' },
  statCnilNote: { en: 'Around half involved hacking, 2025', fr: 'Environ la moitié liées à un piratage, 2025' },
  statLargest: { en: 'Largest official estimate', fr: 'Plus grande estimation officielle' },
  statLargestNote: { en: 'accounts, single incident', fr: 'comptes, un seul incident' },
  statLeakRate: { en: 'Confirmed leak rate', fr: 'Taux de fuite confirmée' },
  statLeakRateNote: {
    en: 'of ANSSI’s possible leak events, 2025',
    fr: 'des événements de fuite possible suivis par l’ANSSI, 2025',
  },

  chartsTitle: { en: 'What the numbers show', fr: 'Ce que disent les chiffres' },
  chartsLead: {
    en: '{n} incidents on this page have no published count, so they are left out of the chart totals rather than counted as zero.',
    fr: '{n} incidents de cette page n’ont pas de chiffre publié : ils restent hors des totaux plutôt que d’être comptés comme zéro.',
  },
  nationalFiguresTitle: {
    en: 'France-wide figures, not this list',
    fr: 'Chiffres nationaux, pas cette liste',
  },
  forResearchers: { en: 'For researchers', fr: 'Pour les chercheurs' },
  forResearchersLead: {
    en: 'The full table, repeating weaknesses, and every cited source.',
    fr: 'Le tableau complet, les faiblesses récurrentes, et chaque source citée.',
  },
  tapToInspect: { en: 'Tap a bar to see the figure', fr: 'Touchez une barre pour voir le chiffre' },
  filterInTimeline: { en: 'Show these in the timeline', fr: 'Voir dans la chronologie' },
  chartAffectedTitle: { en: 'Published account and record counts', fr: 'Comptes et enregistrements publiés' },
  chartAffectedSub: {
    en: 'Only incidents with a released figure',
    fr: 'Uniquement les incidents avec un chiffre communiqué',
  },
  chartKindTitle: { en: 'Government and companies by year', fr: 'Administrations et entreprises par année' },
  chartSectorTitle: { en: 'Incidents by sector', fr: 'Incidents par secteur' },
  chartSeverityTitle: { en: 'Severity of the incidents tracked', fr: 'Gravité des incidents suivis' },
  chartAnssiTitle: { en: 'Where ANSSI saw incidents in 2025', fr: 'Où l’ANSSI a constaté des incidents en 2025' },
  chartAnssiSub: {
    en: 'France-wide figures, not this list — all ANSSI 2025 incidents',
    fr: 'Chiffres nationaux, pas cette liste — tous les incidents ANSSI 2025',
  },
  contextBadge: { en: 'National context', fr: 'Contexte national' },
  showTable: { en: 'Show data table', fr: 'Afficher le tableau' },
  hideTable: { en: 'Hide data table', fr: 'Masquer le tableau' },
  clickToFilter: { en: 'Select a bar to filter the timeline', fr: 'Sélectionnez une barre pour filtrer la chronologie' },
  noCountPublished: {
    en: 'incidents have no published figure and are not plotted here',
    fr: 'incidents sans chiffre publié ne sont pas représentés ici',
  },
  incidentsCount: { en: 'incidents', fr: 'incidents' },
  share: { en: 'Share', fr: 'Part' },
  count: { en: 'Count', fr: 'Nombre' },

  timelineTitle: { en: 'Incidents', fr: 'Incidents' },
  timelineLead: {
    en: 'Newest first. Open any card for the full record.',
    fr: 'Du plus récent au plus ancien. Ouvrez une fiche pour le dossier complet.',
  },
  filters: { en: 'Filters', fr: 'Filtres' },
  search: { en: 'Search', fr: 'Rechercher' },
  searchPlaceholder: {
    en: 'Search organisation, sector, method, data…',
    fr: 'Rechercher organisation, secteur, méthode, données…',
  },
  all: { en: 'All', fr: 'Tous' },
  allIncidents: { en: 'All incidents', fr: 'Tous les incidents' },
  government: { en: 'Government', fr: 'Administration' },
  companies: { en: 'Companies', fr: 'Entreprises' },
  company: { en: 'Company', fr: 'Entreprise' },
  criticalOnly: { en: 'Critical only', fr: 'Critique uniquement' },
  year: { en: 'Year', fr: 'Année' },
  sector: { en: 'Sector', fr: 'Secteur' },
  severity: { en: 'Severity', fr: 'Gravité' },
  status: { en: 'Evidence status', fr: 'Niveau de preuve' },
  kind: { en: 'Type', fr: 'Type' },
  resetFilters: { en: 'Reset filters', fr: 'Réinitialiser les filtres' },
  matching: { en: 'matching', fr: 'correspondants' },
  matchingOne: { en: 'matching incident', fr: 'incident correspondant' },
  matchingMany: { en: 'matching incidents', fr: 'incidents correspondants' },
  noResults: { en: 'No incidents match these filters.', fr: 'Aucun incident ne correspond à ces filtres.' },
  noResultsHint: { en: 'Try clearing the search or resetting the filters.', fr: 'Essayez d’effacer la recherche ou de réinitialiser les filtres.' },

  critical: { en: 'Critical', fr: 'Critique' },
  high: { en: 'High', fr: 'Élevée' },
  medium: { en: 'Medium', fr: 'Moyenne' },
  low: { en: 'Low', fr: 'Faible' },
  confirmed: { en: 'Confirmed', fr: 'Confirmé' },
  disputed: { en: 'Disputed', fr: 'Contesté' },
  unknown: { en: 'Unknown', fr: 'Inconnu' },

  legendTitle: { en: 'How to read the evidence labels', fr: 'Comment lire les niveaux de preuve' },
  legendConfirmed: {
    en: 'Supported by official or attributable disclosure.',
    fr: 'Appuyé par une communication officielle ou attribuable.',
  },
  legendDisputed: {
    en: 'The breach is real, but the headline scope is contested or unverified.',
    fr: 'La violation est réelle, mais l’ampleur annoncée est contestée ou non vérifiée.',
  },
  legendUnknown: {
    en: 'The investigation has not established the final scope.',
    fr: 'L’enquête n’a pas établi le périmètre définitif.',
  },
  disputedWarning: {
    en: 'The scope of this incident is contested. Attacker claims are shown as claims and are never counted in the charts or totals on this site.',
    fr: 'L’ampleur de cet incident est contestée. Les revendications des attaquants sont présentées comme telles et ne sont jamais comptées dans les graphiques ni les totaux de ce site.',
  },
  unknownWarning: {
    en: 'The final scope of this incident has not been established.',
    fr: 'Le périmètre définitif de cet incident n’a pas été établi.',
  },

  affected: { en: 'People or records affected', fr: 'Personnes ou enregistrements concernés' },
  dataAffected: { en: 'Data and systems affected', fr: 'Données et systèmes concernés' },
  method: { en: 'Known or suspected entry method', fr: 'Méthode d’entrée connue ou supposée' },
  risk: { en: 'Why it matters to the public', fr: 'Pourquoi cela concerne le public' },
  confidence: { en: 'Evidence note', fr: 'Note sur les preuves' },
  source: { en: 'Source', fr: 'Source' },
  citedSources: { en: 'Sources', fr: 'Sources' },
  backToDossier: { en: 'Back to the dossier', fr: 'Retour au dossier' },
  howItHappened: { en: 'How it happened', fr: 'Comment cela s’est passé' },
  whatWasTaken: { en: 'What was exposed', fr: 'Ce qui a été exposé' },
  whatWasNotTaken: { en: 'What was not in scope', fr: 'Ce qui n’était pas dans le périmètre' },
  officialResponse: { en: 'What was done next', fr: 'Ce qui a suivi' },
  recordTimeline: { en: 'Dated facts in the public record', fr: 'Faits datés dans le dossier public' },
  methodDisclosure: { en: 'What is known about the entry method', fr: 'Ce que l’on sait de la méthode d’entrée' },
  methodDisclosed: { en: 'Disclosed', fr: 'Publiée' },
  methodPartial: { en: 'Partially disclosed', fr: 'Partiellement publiée' },
  methodUndisclosed: { en: 'Not published', fr: 'Non publiée' },
  attackerClaim: { en: 'Attacker claim (not a confirmed count)', fr: 'Revendication d’attaquant (pas un décompte confirmé)' },
  openSource: { en: 'Open source', fr: 'Ouvrir la source' },
  copyLink: { en: 'Copy link', fr: 'Copier le lien' },
  linkCopied: { en: 'Link copied', fr: 'Lien copié' },
  print: { en: 'Print', fr: 'Imprimer' },
  incidentRecord: { en: 'Incident record', fr: 'Fiche d’incident' },
  previousIncident: { en: 'Previous incident', fr: 'Incident précédent' },
  nextIncident: { en: 'Next incident', fr: 'Incident suivant' },
  openRecord: { en: 'Open record', fr: 'Ouvrir la fiche' },

  patternsTitle: { en: 'Repeating patterns', fr: 'Tendances récurrentes' },
  patternsLead: {
    en: 'The same handful of weaknesses shows up across these incidents. Each card names the weakness and the control that addresses it first.',
    fr: 'Les mêmes faiblesses reviennent d’un incident à l’autre. Chaque fiche nomme la faiblesse et la mesure à traiter en priorité.',
  },
  priorityControl: { en: 'Priority control', fr: 'Mesure prioritaire' },
  relatedIncidents: { en: 'Named in this dossier', fr: 'Cités dans ce dossier' },

  guidanceTitle: { en: 'What people can do', fr: 'Que peut-on faire' },
  guidanceLead: {
    en: 'Two sets of practical steps: one for the organisations holding the data, one for the people whose data it is.',
    fr: 'Deux séries d’actions concrètes : l’une pour les organisations qui détiennent les données, l’autre pour les personnes concernées.',
  },
  forOrganisations: { en: 'For organisations and government', fr: 'Pour les organisations et l’administration' },
  forPublic: { en: 'For the general public', fr: 'Pour le grand public' },
  publicKeyPoint: {
    en: 'Knowing your address, IBAN, tax office, school, order or date of birth does not make a caller or message genuine. Those details are exactly what leaks.',
    fr: 'Connaître votre adresse, IBAN, centre des impôts, établissement scolaire, commande ou date de naissance ne rend pas un appel ou un message légitime. Ce sont précisément ces informations qui fuitent.',
  },

  dataTitle: { en: 'The full dataset', fr: 'Le jeu de données complet' },
  dataLead: {
    en: 'Every field behind the cards above. Sort, filter, and export what you see.',
    fr: 'Tous les champs derrière les fiches ci-dessus. Triez, filtrez et exportez ce que vous voyez.',
  },
  date: { en: 'Date', fr: 'Date' },
  organisation: { en: 'Organisation', fr: 'Organisation' },
  dataColumn: { en: 'Data / systems', fr: 'Données / systèmes' },
  downloadCsv: { en: 'Download CSV', fr: 'Télécharger le CSV' },
  downloadJson: { en: 'Download JSON', fr: 'Télécharger le JSON' },
  rowsShown: { en: 'rows shown', fr: 'lignes affichées' },
  expand: { en: 'Expand', fr: 'Développer' },
  collapse: { en: 'Collapse', fr: 'Réduire' },
  sortBy: { en: 'Sort by', fr: 'Trier par' },

  sourcesTitle: { en: 'Source ledger', fr: 'Registre des sources' },
  sourcesLead: {
    en: 'Every source referenced by this dossier, in full.',
    fr: 'Toutes les sources citées par ce dossier, en intégralité.',
  },
  officialSource: { en: 'Official', fr: 'Officielle' },
  pressSource: { en: 'Press', fr: 'Presse' },
  usedBy: { en: 'Cited by', fr: 'Citée par' },
  opensNewTab: { en: 'opens in a new tab', fr: 'ouvre un nouvel onglet' },

  loading: { en: 'Loading the dossier…', fr: 'Chargement du dossier…' },
  loadError: {
    en: 'The dataset could not be loaded. Check that data/france-cyberwatch-data.json is in place, then reload.',
    fr: 'Le jeu de données n’a pas pu être chargé. Vérifiez que data/france-cyberwatch-data.json est présent, puis rechargez.',
  },
  apiLink: { en: 'Public API', fr: 'API publique' },
  jsonApi: { en: 'JSON index', fr: 'Index JSON' },
  apiDocsEyebrow: { en: 'Public API', fr: 'API publique' },
  apiDocsTitle: { en: 'Read-only API over the dossier.', fr: 'API en lecture seule sur le dossier.' },
  apiDocsLead: {
    en: 'Open CORS, cached at the edge, no key. The same rules as the site: unknown is not zero, and disputed claims stay in the label.',
    fr: 'CORS ouvert, mise en cache à la périphérie, sans clé. Les mêmes règles que le site : l’inconnu n’est pas zéro, et les revendications contestées restent dans le libellé.',
  },
  apiDocsNoAuth: { en: 'No key · CORS open · GET only', fr: 'Sans clé · CORS ouvert · GET uniquement' },
  apiDocsConventionsTitle: { en: 'How to use the numbers', fr: 'Comment utiliser les chiffres' },
  apiDocsEndpoints: { en: 'Endpoints', fr: 'Points d’accès' },
  apiDocsQuery: { en: 'Query', fr: 'Paramètres' },
  apiDocsExamples: { en: 'Examples', fr: 'Exemples' },
  apiDocsMachineIndex: { en: 'Machine index', fr: 'Index machine' },
  apiDocsMachineIndexLead: {
    en: 'The same catalogue as JSON, with live example URLs.',
    fr: 'Le même catalogue en JSON, avec des URL d’exemple.',
  },
  apiDocsRawFile: { en: 'Raw dataset', fr: 'Jeu de données brut' },
  apiDocsRawFileLead: {
    en: 'The complete source file this site and the API are built from.',
    fr: 'Le fichier source complet dont ce site et l’API sont construits.',
  },
  apiDocsEndpointCount: { en: 'endpoints', fr: 'points d’accès' },
  apiDocsKeyLabel: { en: 'API key', fr: 'Clé d’API' },
  machineReadable: { en: 'For machines', fr: 'Pour les machines' },
  footerNote: {
    en: 'Built from public disclosures. No incident content on this site was written outside the dataset.',
    fr: 'Construit à partir de communications publiques. Aucun contenu d’incident de ce site n’a été rédigé en dehors du jeu de données.',
  },
  whatDoesThisMean: { en: 'What does this mean?', fr: 'Qu’est-ce que cela veut dire ?' },

  learnNav: { en: 'Learn', fr: 'Comprendre' },
  learnEyebrow: { en: 'Public explainers', fr: 'Guides grand public' },
  learnTitle: { en: 'What criminals do with leaked data', fr: 'Ce que les criminels font des données divulguées' },
  learnLead: {
    en: 'These guides explain the scams that follow a breach, in plain language. They do not replace official notices. They do not guess unpublished numbers.',
    fr: 'Ces guides expliquent, en langage simple, les arnaques qui suivent une fuite. Ils ne remplacent pas les notifications officielles. Ils n’inventent pas les chiffres non publiés.',
  },
  learnGuides: { en: 'guides', fr: 'guides' },
  learnTakeaways: { en: 'What to do', fr: 'Quoi faire' },
  learnRelated: { en: 'Named in this dossier', fr: 'Cités dans ce dossier' },
  learnHelp: { en: 'Official help', fr: 'Aide officielle' },
  learnHelpLead: {
    en: 'Cybermalveillance.gouv.fr is the public service for advice after a cyber incident or scam.',
    fr: 'Cybermalveillance.gouv.fr est le service public d’aide après un incident ou une arnaque.',
  },
  learnHelpLink: { en: 'Open Cybermalveillance.gouv.fr', fr: 'Ouvrir Cybermalveillance.gouv.fr' },
  learnBack: { en: 'All explainers', fr: 'Tous les guides' },
  learnCtaLead: {
    en: 'Want the longer version of why a leak is dangerous?',
    fr: 'Pour comprendre plus en détail pourquoi une fuite est dangereuse :',
  },
  learnCta: { en: 'Read the public explainers', fr: 'Lire les guides grand public' },
  learnOpen: { en: 'Read this guide', fr: 'Lire ce guide' },

  errorNotFound: { en: 'This page could not be found.', fr: 'Cette page est introuvable.' },
  errorGeneric: { en: 'Something went wrong.', fr: 'Une erreur s’est produite.' },
  errorBack: { en: 'Back to the dossier', fr: 'Retour au dossier' },
} satisfies Record<string, Bilingual>

export type UiKey = keyof typeof dictionary

export const LOCALES = ['en', 'fr'] as const

/** Strips a leading /fr so paths can be re-prefixed for either language. */
function bare(path: string): string {
  return path.replace(/^\/fr(?=\/|$)/, '') || '/'
}

/**
 * The language lives in the URL: `/` and `/incident/:id` are English, `/fr`
 * and `/fr/incident/:id` are French. `/learn` and `/docs` follow the same
 * pattern. Both languages are prerendered, both are indexable, and switching
 * is a navigation — so there is no client-side flip to disagree with the
 * server's markup.
 */
export function useLocale() {
  const route = useRoute()
  const locale = computed<Locale>(() => (route.path === '/fr' || route.path.startsWith('/fr/') ? 'fr' : 'en'))

  const t = (key: UiKey, vars?: Record<string, string | number>): string => {
    const template = dictionary[key][locale.value]
    if (!vars) return template
    return template.replace(/\{(\w+)\}/g, (token, name: string) => (name in vars ? String(vars[name]) : token))
  }
  const L = (value: Bilingual | undefined): string => (value ? value[locale.value] : '')

  /** The same page in the given language, defaulting to the current one. */
  function localePath(path: string, target: Locale = locale.value): string {
    const rest = bare(path)
    if (target !== 'fr') return rest
    return rest === '/' ? '/fr' : `/fr${rest}`
  }

  return {
    locale,
    isFrench: computed(() => locale.value === 'fr'),
    t,
    L,
    localePath,
    /** For hreflang and the language switcher. */
    alternates: computed(() => LOCALES.map((code) => ({ code, path: localePath(route.path, code) }))),
  }
}
