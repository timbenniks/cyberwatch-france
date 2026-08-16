import type { UiKey } from '~/composables/useLocale'

export const navSections = [
  { id: 'overview', key: 'navOverview' },
  { id: 'timeline', key: 'navTimeline' },
  { id: 'patterns', key: 'navPatterns' },
  { id: 'guidance', key: 'navGuidance' },
  { id: 'data', key: 'navData' },
] as const satisfies readonly { id: string; key: UiKey }[]
