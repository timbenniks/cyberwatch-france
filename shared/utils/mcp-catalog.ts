import type { Bilingual } from '../../app/types/cyberwatch'

export interface McpPrimitiveDoc {
  name: string
  description: Bilingual
  input?: Bilingual
}

export const mcpToolDocs: McpPrimitiveDoc[] = [
  {
    name: 'list_incidents',
    description: {
      en: 'Search and filter incidents. Returns compact rows; unknown `affected` stays null, never 0. Unknown counts sort last when sort is affected.',
      fr: 'Rechercher et filtrer les incidents. Lignes compactes ; un `affected` inconnu reste null, jamais 0. Les décomptes inconnus se trient en dernier si sort vaut affected.',
    },
    input: {
      en: 'q, kind, severity, status, sector, year, from, to, sort (date|affected|org), order, limit (≤200), offset, lang (en|fr). Same filters as GET /api/incidents.',
      fr: 'q, kind, severity, status, sector, year, from, to, sort (date|affected|org), order, limit (≤200), offset, lang (en|fr). Mêmes filtres que GET /api/incidents.',
    },
  },
  {
    name: 'get_incident',
    description: {
      en: 'One incident with localized detail, lastResearched, and every cited source. Unknown ids list the valid ones.',
      fr: 'Un incident avec son détail localisé, lastResearched, et toutes les sources citées. Un identifiant inconnu liste les identifiants valides.',
    },
    input: { en: 'id (required), lang (en|fr).', fr: 'id (obligatoire), lang (en|fr).' },
  },
  {
    name: 'get_summary',
    description: {
      en: 'ANSSI and CNIL national figures, plus counts from this list. Aggregates never include unknown or disputed attacker claims.',
      fr: 'Chiffres nationaux ANSSI et CNIL, plus les décomptes issus de cette liste. Les agrégats n’incluent jamais les inconnus ni les revendications d’attaquants contestées.',
    },
    input: { en: 'lang (en|fr).', fr: 'lang (en|fr).' },
  },
  {
    name: 'list_sources',
    description: {
      en: 'Every source, with kind (primary | official | secondary), publisher, optional published date, and the incidents that cite it.',
      fr: 'Toutes les sources, avec kind (primary | official | secondary), publisher, date published optionnelle, et les incidents qui les citent.',
    },
  },
  {
    name: 'list_patterns',
    description: {
      en: 'Recurring weaknesses and the priority control for each.',
      fr: 'Faiblesses récurrentes et la mesure prioritaire pour chacune.',
    },
    input: { en: 'lang (en|fr).', fr: 'lang (en|fr).' },
  },
  {
    name: 'list_recommendations',
    description: {
      en: 'Guidance for organisations and the public. Public items include explainerSlug when a matching /learn guide exists.',
      fr: 'Recommandations pour les organisations et le grand public. Les fiches grand public incluent explainerSlug lorsqu’un guide /learn existe.',
    },
    input: {
      en: 'audience (organizations | public), lang (en|fr).',
      fr: 'audience (organizations | public), lang (en|fr).',
    },
  },
]

export const mcpResourceDocs: McpPrimitiveDoc[] = [
  {
    name: 'cyberwatch://conventions',
    description: {
      en: 'How to use the numbers: unknown is not zero, disputed scope stays disputed, no inferred attribution.',
      fr: 'Comment utiliser les chiffres : l’inconnu n’est pas zéro, un périmètre contesté reste contesté, pas d’attribution inférée.',
    },
  },
  {
    name: 'cyberwatch://incident/{id}',
    description: {
      en: 'Full localized record for one incident, same payload as get_incident.',
      fr: 'Fiche localisée complète d’un incident, même contenu que get_incident.',
    },
  },
]

export const mcpPromptDocs: McpPrimitiveDoc[] = [
  {
    name: 'explain_incident',
    description: {
      en: 'Ask the model to explain one record without inventing counts or attackers.',
      fr: 'Demander au modèle d’expliquer une fiche sans inventer de chiffres ni d’attaquants.',
    },
    input: { en: 'id, lang (en|fr).', fr: 'id, lang (en|fr).' },
  },
  {
    name: 'brief_the_dossier',
    description: {
      en: 'A short briefing of the curated list, with the data rules stated first.',
      fr: 'Un briefing court de la liste choisie, avec les règles de données en tête.',
    },
    input: { en: 'lang (en|fr).', fr: 'lang (en|fr).' },
  },
]

export const webmcpToolDocs: McpPrimitiveDoc[] = [
  {
    name: 'get_page_context',
    description: {
      en: 'Where the reader is: path, locale, page kind, and the open incident id if any.',
      fr: 'Où se trouve le lecteur : chemin, langue, type de page, et l’identifiant d’incident ouvert le cas échéant.',
    },
  },
  {
    name: 'list_incidents',
    description: {
      en: 'Search the dataset already loaded in this page. Unknown affected stays null.',
      fr: 'Chercher dans le jeu déjà chargé sur cette page. Un affected inconnu reste null.',
    },
    input: {
      en: 'q, kind, severity, status, sector, year, limit, lang.',
      fr: 'q, kind, severity, status, sector, year, limit, lang.',
    },
  },
  {
    name: 'get_incident',
    description: {
      en: 'One record from the in-page dataset, in the current (or requested) language.',
      fr: 'Une fiche du jeu chargé sur la page, dans la langue courante (ou demandée).',
    },
    input: { en: 'id (required), lang.', fr: 'id (obligatoire), lang.' },
  },
  {
    name: 'get_summary',
    description: {
      en: 'National ANSSI/CNIL figures and curated counts from the in-page dataset.',
      fr: 'Chiffres nationaux ANSSI/CNIL et décomptes curatés issus du jeu chargé sur la page.',
    },
  },
  {
    name: 'open_incident',
    description: {
      en: 'Navigate this tab to the incident article.',
      fr: 'Ouvrir la fiche d’incident dans cet onglet.',
    },
    input: { en: 'id (required).', fr: 'id (obligatoire).' },
  },
  {
    name: 'open_page',
    description: {
      en: 'Navigate this tab to a site section (home, incidents, guidance, numbers, docs, learn, quiz).',
      fr: 'Aller à une section du site (accueil, incidents, conseils, chiffres, docs, guides, quiz).',
    },
    input: { en: 'page: home | incidents | guidance | numbers | docs | learn | quiz.', fr: 'page : home | incidents | guidance | numbers | docs | learn | quiz.' },
  },
  {
    name: 'filter_timeline',
    description: {
      en: 'Apply timeline filters and open /incidents (or /fr/incidents) with a shareable query string.',
      fr: 'Appliquer les filtres de la chronologie et ouvrir /incidents (ou /fr/incidents) avec une URL partageable.',
    },
    input: {
      en: 'q, kind, severity, status, sector, year.',
      fr: 'q, kind, severity, status, sector, year.',
    },
  },
  {
    name: 'reset_filters',
    description: {
      en: 'Clear timeline filters and open the full incident list.',
      fr: 'Effacer les filtres et ouvrir la liste complète des incidents.',
    },
  },
]
