import type { UiKey } from '~/composables/useLocale'

export const navSections = [
  { id: 'timeline', key: 'navIncidents' },
  { id: 'guidance', key: 'navGuidance' },
  { id: 'numbers', key: 'navNumbers' },
] as const satisfies readonly { id: string; key: UiKey }[]
