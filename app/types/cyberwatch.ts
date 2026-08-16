export type Locale = 'en' | 'fr'

/** Every content string in the dataset ships in both supported locales. */
export type Bilingual = Record<Locale, string>

export type Severity = 'critical' | 'high' | 'medium' | 'low'
export type IncidentStatus = 'confirmed' | 'disputed' | 'unknown'
export type IncidentKind = 'government' | 'company'

export interface Project {
  name: string
  defaultLocale: Locale
  supportedLocales: Locale[]
  /** ISO date the curation was last reviewed through. */
  reviewedThrough: string
  scope: Bilingual
  methodology: Bilingual
}

export interface SectorShare {
  id: string
  value: number
  label: Bilingual
}

export interface SummaryStats {
  anssi2025: {
    securityEventsHandled: number
    reports: number
    incidents: number
    possibleDataLeakEvents: number
    confirmedLeakRatePercent: number
    sourceId: string
  }
  cnil2025: {
    personalDataBreachNotifications: number
    approxShareInvolvingHackingPercent: number
    sourceId: string
  }
  sectorDistributionPercent: SectorShare[]
}

export interface Source {
  id: string
  name: string
  url: string
}

export interface Incident {
  id: string
  /** ISO date, YYYY-MM-DD. */
  date: string
  year: number
  org: Bilingual
  domain: string
  kind: IncidentKind
  sector: string
  severity: Severity
  status: IncidentStatus
  /** null means unknown — never render or aggregate this as zero. */
  affected: number | null
  affectedLabel: Bilingual
  data: Bilingual
  method: Bilingual
  risk: Bilingual
  sourceName: string
  confidence: Bilingual
  sourceId: string
  sourceUrl: string
  logo: {
    domain: string
    strategy: string
  }
}

export interface Pattern {
  id: string
  title: Bilingual
  description: Bilingual
  priority: Bilingual
}

export interface Recommendation {
  id: string
  title: Bilingual
  description: Bilingual
}

export interface CyberwatchData {
  schemaVersion: string
  project: Project
  summaryStats: SummaryStats
  sources: Source[]
  incidents: Incident[]
  patterns: Pattern[]
  recommendations: {
    organizations: Recommendation[]
    public: Recommendation[]
  }
  ui: {
    severityOrder: Severity[]
    statusValues: IncidentStatus[]
    kindValues: IncidentKind[]
    chartRules: Record<string, Bilingual>
    sectorLabels: Record<string, Bilingual>
  }
}
