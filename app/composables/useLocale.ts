import type { Bilingual, Locale } from '~/types/cyberwatch'

/** UI chrome only. All incident content comes from the dataset. */
const dictionary = {
  brand: { en: 'France Cyberwatch', fr: 'France Cyberwatch' },
  brandYears: { en: '2025—2026', fr: '2025—2026' },
  navIncidents: { en: 'Incidents', fr: 'Incidents' },
  navPatterns: { en: 'Patterns', fr: 'Tendances' },
  navGuidance: { en: 'What people can do', fr: 'Que peut-on faire' },
  navNumbers: { en: 'Numbers', fr: 'Chiffres' },
  navData: { en: 'Data', fr: 'Données' },
  skipToContent: { en: 'Skip to content', fr: 'Aller au contenu' },
  openMenu: { en: 'Open menu', fr: 'Ouvrir le menu' },
  closeMenu: { en: 'Close menu', fr: 'Fermer le menu' },
  language: { en: 'Language', fr: 'Langue' },
  theme: { en: 'Appearance', fr: 'Apparence' },
  themeLight: { en: 'Light', fr: 'Clair' },
  themeDark: { en: 'Dark', fr: 'Sombre' },

  seoTagline: {
    en: 'French cyberattacks and data breaches, explained',
    fr: 'Cyberattaques et fuites de données en France, expliquées',
  },
  seoRecordSuffix: { en: 'incident record', fr: 'fiche d’incident' },
  heroEyebrow: { en: 'Public incident dossier', fr: 'Dossier public d’incidents' },
  heroTitle: {
    en: 'Publicly reported cyberattacks on French institutions and companies.',
    fr: 'Les cyberattaques rendues publiques contre des institutions et entreprises françaises.',
  },
  heroLead: {
    en: '{n} incidents from 2025 and 2026, each linked to its source. This is a curated public dossier, not a complete register of every French breach. Open a record to see what happened, what was exposed, and what the cited source actually said.',
    fr: '{n} incidents en 2025 et 2026, chacun relié à sa source. C’est un dossier public choisi, pas un registre de toutes les fuites en France. Ouvrez une fiche pour voir ce qui s’est passé, ce qui a été exposé, et ce que dit vraiment la source citée.',
  },
  homeHowTitle: { en: 'How to read this dossier', fr: 'Comment lire ce dossier' },
  homeHowLead: {
    en: 'A few rules sit under every page, so a missing figure never turns into a fake total.',
    fr: 'Quelques règles tiennent sous chaque page, pour qu’un chiffre manquant ne devienne jamais un faux total.',
  },
  homeRuleUnknownTitle: { en: 'A missing count is not zero', fr: 'Un décompte manquant n’est pas zéro' },
  homeRuleUnknown: {
    en: 'If a record has no published figure, it is never shown as 0, never added into a total, and never plotted on a chart.',
    fr: 'Si une fiche n’a pas de chiffre publié, ce chiffre n’est jamais affiché comme 0, jamais ajouté à un total, et jamais tracé sur un graphique.',
  },
  homeRuleDisputedTitle: { en: 'A contested figure stays a claim', fr: 'Un chiffre contesté reste une revendication' },
  homeRuleDisputed: {
    en: 'When the breach is real but the headline number is contested, that claim stays in the text. It does not enter a chart or a sum.',
    fr: 'Quand la fuite est réelle mais que le chiffre annoncé est contesté, cette revendication reste dans le texte. Elle n’entre ni dans un graphique ni dans un total.',
  },
  homeRuleCiteTitle: { en: 'The source is the source', fr: 'La source reste la source' },
  homeRuleCite: {
    en: 'No attacker is named unless the cited disclosure supports it. Each record links out to that disclosure.',
    fr: 'Aucun attaquant n’est nommé sans que la communication citée le permette. Chaque fiche renvoie vers cette communication.',
  },
  homeContinueTitle: { en: 'Where to go next', fr: 'Où aller ensuite' },
  homePathIncidentsLead: {
    en: 'The full timeline, newest first. Filter by organisation, sector, severity or year.',
    fr: 'La chronologie complète, du plus récent au plus ancien. Filtrez par organisation, secteur, gravité ou année.',
  },
  homePathGuidanceLead: {
    en: 'Practical steps if your data was in a leak, and for the organisations that hold this kind of file.',
    fr: 'Des actions concrètes si vos données figuraient dans une fuite, et pour les organisations qui détiennent ce type de fichiers.',
  },
  homePathNumbersLead: {
    en: 'Charts from this list, plus the France-wide ANSSI and CNIL figures. Unknown counts stay out of the totals.',
    fr: 'Les graphiques de cette liste, plus les chiffres nationaux de l’ANSSI et de la CNIL. Les décomptes inconnus restent hors des totaux.',
  },
  homePathLearnLead: {
    en: 'Plain-language guides on the scams that follow a leak. They do not replace official notices.',
    fr: 'Des guides en langage simple sur les arnaques qui suivent une fuite. Ils ne remplacent pas les notifications officielles.',
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
  clearSearch: { en: 'Clear search', fr: 'Effacer la recherche' },

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
    en: 'These charts are built from this curated list, not from every breach in France. {n} incidents here have no published count, so they are left out of the totals rather than counted as zero. Select a bar to open the matching incidents.',
    fr: 'Ces graphiques viennent de cette liste choisie, pas de toutes les fuites en France. {n} incidents ici n’ont pas de chiffre publié : ils restent hors des totaux plutôt que d’être comptés comme zéro. Sélectionnez une barre pour ouvrir les incidents correspondants.',
  },
  chartsRulesTitle: { en: 'How the charts are drawn', fr: 'Comment les graphiques sont tracés' },
  chartsRulesLead: {
    en: 'The same rules the API applies. That is why a bar can be missing for an incident you just read.',
    fr: 'Les mêmes règles que l’API. C’est pourquoi une barre peut manquer pour un incident que vous venez de lire.',
  },
  listMix: {
    en: '{gov} concern government systems, {co} concern companies. {published} have a published count. {unknown} do not.',
    fr: '{gov} concernent des systèmes publics, {co} des entreprises. {published} ont un chiffre publié. {unknown} n’en ont pas.',
  },
  listMixDisputed: {
    en: 'Disputed scope: {n}. Attacker-claimed figures stay in the label and are never summed.',
    fr: 'Ampleur contestée : {n}. Les chiffres revendiqués restent dans le libellé et ne sont jamais additionnés.',
  },
  nationalFiguresTitle: {
    en: 'France-wide figures, not this list',
    fr: 'Chiffres nationaux, pas cette liste',
  },
  nationalFiguresLead: {
    en: 'ANSSI and the CNIL publish country-wide figures. They cover far more than this curated list, so they sit in their own block.',
    fr: 'L’ANSSI et la CNIL publient des chiffres pour toute la France. Ils couvrent bien plus que cette liste, donc ils ont leur propre bloc.',
  },
  forResearchers: { en: 'For researchers', fr: 'Pour les chercheurs' },
  forResearchersLead: {
    en: 'The repeating weaknesses named in the dataset, every field in a sortable table, and the full source ledger. The table uses the same filters as the incident list.',
    fr: 'Les faiblesses récurrentes nommées dans le jeu de données, tous les champs dans un tableau triable, et le registre complet des sources. Le tableau utilise les mêmes filtres que la liste des incidents.',
  },
  tapToInspect: { en: 'Tap a bar to see the figure', fr: 'Touchez une barre pour voir le chiffre' },
  filterInTimeline: { en: 'Show these incidents', fr: 'Voir ces incidents' },
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
  clickToFilter: { en: 'Select a bar to open the matching incidents', fr: 'Sélectionnez une barre pour ouvrir les incidents correspondants' },
  noCountPublished: {
    en: 'incidents have no published figure and are not plotted here',
    fr: 'incidents sans chiffre publié ne sont pas représentés ici',
  },
  incidentsCount: { en: 'incidents', fr: 'incidents' },
  share: { en: 'Share', fr: 'Part' },
  count: { en: 'Count', fr: 'Nombre' },

  timelineTitle: { en: 'Incidents', fr: 'Incidents' },
  timelineLead: {
    en: 'Newest first. Use the filters if you are looking for a sector, a year, or a kind of organisation. Open a card for the full record: what happened, what was exposed, and the sources behind it.',
    fr: 'Du plus récent au plus ancien. Utilisez les filtres pour un secteur, une année ou un type d’organisation. Ouvrez une fiche pour le dossier complet : ce qui s’est passé, ce qui a été exposé, et les sources.',
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
  backToDossier: { en: 'Back to the incidents', fr: 'Retour aux incidents' },
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
    en: 'The same handful of weaknesses shows up across these incidents. Each card names the weakness, the control that addresses it first, and the records whose own wording mentions the organisation.',
    fr: 'Les mêmes faiblesses reviennent d’un incident à l’autre. Chaque fiche nomme la faiblesse, la mesure à traiter en priorité, et les dossiers dont le texte cite l’organisation.',
  },
  priorityControl: { en: 'Priority control', fr: 'Mesure prioritaire' },
  relatedIncidents: { en: 'Named in this dossier', fr: 'Cités dans ce dossier' },

  guidanceTitle: { en: 'What people can do', fr: 'Que peut-on faire' },
  guidanceLead: {
    en: 'If your details were in one of these incidents, or you hold files like these, start here. The first list is for people. The second is for the organisations and administrations that keep the data.',
    fr: 'Si vos informations figuraient dans l’un de ces incidents, ou si vous détenez ce type de fichiers, commencez ici. La première liste est pour les personnes. La seconde est pour les organisations et administrations qui gardent les données.',
  },
  guidancePublicLead: {
    en: 'These steps do not replace an official notice from the organisation that held your data. They are the habits that still help after a leak, including months later.',
    fr: 'Ces actions ne remplacent pas une notification officielle de l’organisation qui détenait vos données. Ce sont les réflexes qui restent utiles après une fuite, y compris des mois plus tard.',
  },
  guidanceOrgLead: {
    en: 'The same weaknesses keep showing up in the public record: phishing, over-broad access, suppliers, and extraction that nobody noticed in time.',
    fr: 'Les mêmes faiblesses reviennent dans le dossier public : hameçonnage, accès trop larges, fournisseurs, et extractions que personne n’a vues à temps.',
  },
  forOrganisations: { en: 'For organisations and government', fr: 'Pour les organisations et l’administration' },
  forPublic: { en: 'For the general public', fr: 'Pour le grand public' },
  publicKeyPoint: {
    en: 'Knowing your address, IBAN, tax office, school, order or date of birth does not make a caller or message genuine. Those details are exactly what leaks.',
    fr: 'Connaître votre adresse, IBAN, centre des impôts, établissement scolaire, commande ou date de naissance ne rend pas un appel ou un message légitime. Ce sont précisément ces informations qui fuitent.',
  },

  dataTitle: { en: 'The full dataset', fr: 'Le jeu de données complet' },
  dataLead: {
    en: 'Every field from the incident records. Sort, filter, and export the rows you see.',
    fr: 'Tous les champs des fiches d’incident. Triez, filtrez et exportez les lignes affichées.',
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
    en: 'Every source this dossier cites, including follow-up reporting. Primary disclosures, official records and press are marked. Each entry lists the records that point to it.',
    fr: 'Toutes les sources citées par ce dossier, y compris les suites. Les communications primaires, les documents officiels et la presse sont signalés. Chaque entrée liste les fiches qui s’y réfèrent.',
  },
  usedBy: { en: 'Cited by', fr: 'Citée par' },
  sourceKindPrimary: { en: 'Primary', fr: 'Primaire' },
  sourceKindOfficial: { en: 'Official', fr: 'Officielle' },
  sourceKindSecondary: { en: 'Press', fr: 'Presse' },
  operationalImpact: { en: 'What it meant in practice', fr: 'Ce que cela a changé concrètement' },
  laterRevision: { en: 'What later reporting changed', fr: 'Ce que les suites ont modifié' },
  pressQuotes: { en: 'In their words', fr: 'Dans leurs mots' },
  quoteOriginal: { en: 'Original', fr: 'Original' },
  lastResearched: { en: 'Last researched', fr: 'Dernière recherche' },
  opensNewTab: { en: 'opens in a new tab', fr: 'ouvre un nouvel onglet' },

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
  apiTryTitle: { en: 'Try this request', fr: 'Essayer cette requête' },
  apiTrySend: { en: 'Send GET', fr: 'Envoyer GET' },
  apiTrySending: { en: 'Sending…', fr: 'Envoi…' },
  apiTryReset: { en: 'Reset fields', fr: 'Réinitialiser' },
  apiTryOmit: { en: 'Unset', fr: 'Non défini' },
  apiTryIdle: {
    en: 'Set the fields, then send. This calls the live API.',
    fr: 'Réglez les champs, puis envoyez. Cela interroge l’API réelle.',
  },
  apiTryMissingId: {
    en: 'Choose an incident id before sending.',
    fr: 'Choisissez un identifiant d’incident avant d’envoyer.',
  },
  apiTryError: {
    en: 'The request did not complete. Check the network, then send again.',
    fr: 'La requête n’a pas abouti. Vérifiez le réseau, puis renvoyez.',
  },
  apiTryResponse: { en: 'Response', fr: 'Réponse' },
  apiTryCopyUrl: { en: 'Copy URL', fr: 'Copier l’URL' },
  apiTryCopyResponse: { en: 'Copy response', fr: 'Copier la réponse' },
  apiTryCopied: { en: 'Copied', fr: 'Copié' },
  apiTryOpen: { en: 'Open URL', fr: 'Ouvrir l’URL' },
  apiTryLimitHint: {
    en: 'The playground starts at 5 so this panel stays readable. The API default is 100.',
    fr: 'L’essai commence à 5 pour garder ce panneau lisible. La valeur par défaut de l’API est 100.',
  },
  apiTryPath: { en: 'Path', fr: 'Chemin' },
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
  docsOnThisPage: { en: 'On this page', fr: 'Sur cette page' },
  docsContents: { en: 'Page contents', fr: 'Sommaire' },
  docsFiles: { en: 'Files', fr: 'Fichiers' },
  docsExpandSection: { en: 'Show subsections', fr: 'Afficher les sous-sections' },
  docsCollapseSection: { en: 'Hide subsections', fr: 'Masquer les sous-sections' },
  mcpTitle: { en: 'Streamable HTTP MCP', fr: 'MCP Streamable HTTP' },
  mcpLead: {
    en: 'The same read-only dataset, as a remote MCP server. No key. Stateless JSON over Streamable HTTP, so it runs on ordinary serverless functions and still speaks to 2025-era clients.',
    fr: 'Le même jeu en lecture seule, exposé comme serveur MCP distant. Sans clé. JSON sans état en Streamable HTTP, donc il tourne sur des fonctions serverless ordinaires et parle encore aux clients de 2025.',
  },
  mcpEndpoint: { en: 'Endpoint', fr: 'Point d’accès' },
  mcpInstallTitle: { en: 'How to install', fr: 'Comment l’installer' },
  mcpInstallLead: {
    en: 'Point any MCP host at this URL. No token. After adding it, reload the host and confirm the tools appear.',
    fr: 'Pointez n’importe quel hôte MCP vers cette URL. Pas de jeton. Après l’ajout, rechargez l’hôte et vérifiez que les outils apparaissent.',
  },
  mcpInstallCursor: {
    en: 'Cursor — save as .cursor/mcp.json in a project, or ~/.cursor/mcp.json for every workspace. Then Cursor Settings → Tools & MCP, enable the server.',
    fr: 'Cursor — enregistrez comme .cursor/mcp.json dans un projet, ou ~/.cursor/mcp.json pour tous les espaces de travail. Puis Cursor Settings → Tools & MCP, activez le serveur.',
  },
  mcpInstallCursorClick: { en: 'Add to Cursor', fr: 'Ajouter à Cursor' },
  mcpInstallClaude: {
    en: 'Claude Desktop — merge into claude_desktop_config.json (Claude → Settings → Developer). Claude.ai custom connectors can use the same URL.',
    fr: 'Claude Desktop — fusionnez dans claude_desktop_config.json (Claude → Réglages → Développeur). Les connecteurs Claude.ai peuvent utiliser la même URL.',
  },
  mcpInstallVscode: {
    en: 'VS Code — save as .vscode/mcp.json, or add the server in MCP: Add Server.',
    fr: 'VS Code — enregistrez comme .vscode/mcp.json, ou ajoutez le serveur via MCP: Add Server.',
  },
  mcpToolsTitle: { en: 'Tools', fr: 'Outils' },
  mcpResourcesTitle: { en: 'Resources', fr: 'Ressources' },
  mcpPromptsTitle: { en: 'Prompts', fr: 'Invites' },
  mcpInput: { en: 'Input', fr: 'Entrée' },
  webmcpTitle: { en: 'WebMCP on this site', fr: 'WebMCP sur ce site' },
  webmcpLead: {
    en: 'When a browser agent is already on a page, these tools run in the tab: they can filter the timeline, open a record, and read the dataset that was prerendered into the page. No extra server call.',
    fr: 'Quand un agent navigateur est déjà sur une page, ces outils s’exécutent dans l’onglet : ils peuvent filtrer la chronologie, ouvrir une fiche, et lire le jeu prérendu dans la page. Pas d’appel serveur de plus.',
  },
  webmcpEnableTitle: { en: 'How to enable it', fr: 'Comment l’activer' },
  webmcpEnableBody: {
    en: 'WebMCP is a proposed web standard. Chrome exposes it behind a flag (and an origin trial). A WebMCP bridge or the Model Context Tool Inspector extension can also see tools registered on this page.',
    fr: 'WebMCP est une proposition de standard web. Chrome l’expose derrière un flag (et une origin trial). Un pont WebMCP ou l’extension Model Context Tool Inspector peut aussi voir les outils enregistrés sur cette page.',
  },
  webmcpEnableSteps: {
    en: 'In Chrome 146+, open chrome://flags/#enable-webmcp-testing, set it to Enabled, and relaunch. Open this site, then inspect navigator.modelContext (or document.modelContext) in DevTools, or use the inspector extension.',
    fr: 'Dans Chrome 146+, ouvrez chrome://flags/#enable-webmcp-testing, passez à Enabled, puis relancez. Ouvrez ce site, puis inspectez navigator.modelContext (ou document.modelContext) dans DevTools, ou utilisez l’extension inspector.',
  },
  webmcpFlag: { en: 'chrome://flags/#enable-webmcp-testing', fr: 'chrome://flags/#enable-webmcp-testing' },
  webmcpInspector: {
    en: 'Model Context Tool Inspector (Chrome Web Store) lists the tools, lets you call them, and can chat against them.',
    fr: 'Model Context Tool Inspector (Chrome Web Store) liste les outils, permet de les appeler, et peut discuter avec eux.',
  },
  webmcpBridge: {
    en: 'If you use a WebMCP bridge (for example Cursor talking to the open tab), pin this origin and the page tools show up as web.* tools.',
    fr: 'Si vous utilisez un pont WebMCP (par exemple Cursor parlant à l’onglet ouvert), épinglez cette origine et les outils de la page apparaissent comme outils web.*.',
  },
  webmcpToolsTitle: { en: 'Page tools', fr: 'Outils de page' },
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
  learnListen: { en: 'Listen', fr: 'Écouter' },
  learnPlay: { en: 'Play', fr: 'Lecture' },
  learnPause: { en: 'Pause', fr: 'Pause' },
  learnSeek: { en: 'Position in the recording', fr: 'Position dans l’enregistrement' },
  learnSpeed: { en: 'Playback speed', fr: 'Vitesse de lecture' },
  learnAudioUnavailable: {
    en: 'This recording could not be loaded.',
    fr: 'Cet enregistrement n’a pas pu être chargé.',
  },

  quizEyebrow: { en: 'Leak-awareness quiz', fr: 'Quiz de vigilance' },
  quizTitle: {
    en: 'Test what the guides taught you',
    fr: 'Vérifiez ce que les guides vous ont appris',
  },
  quizLead: {
    en: 'Sixteen questions from the public explainers. After each answer you will see why it is right or wrong. A score of 80 percent opens a pass screen you can share on LinkedIn.',
    fr: 'Seize questions tirées des guides grand public. Après chaque réponse, vous verrez pourquoi elle est juste ou fausse. Un score de 80 pour cent ouvre un écran de réussite que vous pouvez partager sur LinkedIn.',
  },
  quizMeta: {
    en: '{total} questions · pass mark {pass}%',
    fr: '{total} questions · seuil de réussite {pass} %',
  },
  quizStart: { en: 'Start the quiz', fr: 'Commencer le quiz' },
  quizProgress: { en: 'Question {n} of {total}', fr: 'Question {n} sur {total}' },
  quizCorrect: { en: 'Correct', fr: 'Correct' },
  quizIncorrect: { en: 'Incorrect', fr: 'Incorrect' },
  quizRightAnswer: { en: 'Right answer', fr: 'Bonne réponse' },
  quizWhyCorrect: { en: 'Why this is correct. ', fr: 'Pourquoi c’est correct. ' },
  quizWhyIncorrect: { en: 'Why this is incorrect. ', fr: 'Pourquoi c’est incorrect. ' },
  quizNext: { en: 'Next question', fr: 'Question suivante' },
  quizSeeResults: { en: 'See your result', fr: 'Voir le résultat' },
  quizPassed: { en: 'Passed', fr: 'Réussi' },
  quizNotYet: { en: 'Not yet', fr: 'Pas encore' },
  quizPassTitle: { en: 'You know how the follow-up scam works.', fr: 'Vous savez comment l’arnaque de second rideau fonctionne.' },
  quizFailTitle: { en: 'Read the guides, then try again.', fr: 'Lisez les guides, puis réessayez.' },
  quizPassLead: {
    en: 'You reached the pass mark. Share that result on LinkedIn if you want others to take the same test — the questions come from the public explainers, not from unpublished incident figures.',
    fr: 'Vous avez atteint le seuil. Partagez ce résultat sur LinkedIn si vous voulez que d’autres passent le même test — les questions viennent des guides grand public, pas de chiffres d’incidents non publiés.',
  },
  quizFailLead: {
    en: 'The pass mark is 80 percent. The explainers cover each of these points in plain language. Try again when you are ready.',
    fr: 'Le seuil est de 80 pour cent. Les guides couvrent chacun de ces points en langage simple. Réessayez quand vous le souhaitez.',
  },
  quizScoreLine: { en: '{percent}% correct', fr: '{percent} % de bonnes réponses' },
  quizShareLinkedIn: { en: 'Share on LinkedIn', fr: 'Partager sur LinkedIn' },
  quizCopyShare: { en: 'Copy share text', fr: 'Copier le texte de partage' },
  quizShareCopied: { en: 'Copied', fr: 'Copié' },
  quizShareText: {
    en: 'I scored {score}/{total} on the France Cyberwatch quiz on leak-driven scams — a short test on what stolen data is used for, and how not to get caught by the follow-up message.',
    fr: 'J’ai obtenu {score}/{total} au quiz France Cyberwatch sur les arnaques qui suivent une fuite — un test court sur l’usage des données volées, et comment ne pas se faire prendre par le message qui suit.',
  },
  quizRetry: { en: 'Try again', fr: 'Réessayer' },
  quizOpen: { en: 'Take the quiz', fr: 'Passer le quiz' },
  quizCtaLead: {
    en: 'Check what these guides taught you.',
    fr: 'Vérifiez ce que ces guides vous ont appris.',
  },
  quizAsideWait: {
    en: 'Choose an answer. The explanation will appear here.',
    fr: 'Choisissez une réponse. L’explication apparaîtra ici.',
  },

  errorNotFound: { en: 'This page could not be found.', fr: 'Cette page est introuvable.' },
  errorNotFoundTitle: { en: 'Page not found', fr: 'Page introuvable' },
  errorNotFoundLead: {
    en: 'That address is not a page in this dossier.',
    fr: 'Cette adresse n’est pas une page de ce dossier.',
  },
  errorGeneric: { en: 'Something went wrong.', fr: 'Une erreur s’est produite.' },
  errorGenericTitle: { en: 'Something went wrong', fr: 'Une erreur s’est produite' },
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
 * and `/fr/incident/:id` are French. `/incidents`, `/guidance`, `/numbers`,
 * `/learn`, `/learn/quiz` and `/docs` follow the same pattern. MCP is `/mcp`.
 * Both languages are prerendered,
 * both are indexable, and switching is a navigation — so there is no
 * client-side flip to disagree with the server's markup.
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
