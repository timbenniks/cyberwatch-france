import type { UiKey } from '~/composables/useLocale'

export type NavPage = {
  path: '/incidents' | '/guidance' | '/numbers'
  key: UiKey
}

export const navPages: readonly NavPage[] = [
  { path: '/incidents', key: 'navIncidents' },
  { path: '/guidance', key: 'navGuidance' },
  { path: '/numbers', key: 'navNumbers' },
]
