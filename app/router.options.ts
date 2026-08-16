import type { RouterConfig } from '@nuxt/schema'

/** Clear the sticky header. Prefer the larger of scroll-margin / scroll-padding — both exist for the same job. */
function hashScrollOffset(hash: string) {
  if (!import.meta.client) return 0
  try {
    const element = document.querySelector(hash)
    const margin = element ? Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0 : 0
    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    return Math.max(margin, padding, 88)
  } catch {
    return 88
  }
}

const samePath = (a: string, b: string) => a.replace(/\/$/, '') === b.replace(/\/$/, '')

/** Nuxt may emit `/incident/:id()`; keep the same param syntax on the French twin. */
function frenchTwin(path: string) {
  return path === '/' ? '/fr' : `/fr${path}`
}

/**
 * File routes cover `/`, `/docs` and `/incident/:id`. French twins are real
 * route records (not aliases) so `/fr/incident/:id` keeps the same page
 * component — language switch is a navigation, not a client flip.
 *
 * Query-only changes (timeline filters) must keep the current position.
 * Opening an incident page is a real navigation and scrolls to the top.
 */
export default <RouterConfig>{
  routes: (routes) => {
    const home = routes.find((route) => route.path === '/')
    const docs = routes.find((route) => route.path === '/docs')
    const incident = routes.find((route) => route.path === '/incident/:id' || route.path.startsWith('/incident/:id'))
    if (!home) return routes
    return [
      ...routes,
      { ...home, name: 'home-fr', path: frenchTwin(home.path) },
      ...(incident ? [{ ...incident, name: 'incident-fr', path: frenchTwin(incident.path) }] : []),
      ...(docs ? [{ ...docs, name: 'docs-fr', path: frenchTwin(docs.path) }] : []),
    ]
  },

  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, top: hashScrollOffset(to.hash), behavior: 'smooth' }
    }
    if (samePath(to.path, from.path)) return false
    return { left: 0, top: 0 }
  },
}
