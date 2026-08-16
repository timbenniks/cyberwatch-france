import type { RouterConfig } from '@nuxt/schema'

/** Clear the sticky header when jumping to an in-page target such as skip-to-content. */
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
 * File routes are English. French twins are real route records (not aliases)
 * so `/fr/incidents` keeps the same page component — language switch is a
 * navigation, not a client flip.
 *
 * Query-only changes (timeline filters) must keep the current position.
 * Opening another page scrolls to the top. Hash jumps are instant.
 */
export default <RouterConfig>{
  routes: (routes) => [
    ...routes,
    ...routes
      .filter((route) => route.path !== '/fr' && !route.path.startsWith('/fr/'))
      .map((route) => ({
        ...route,
        name: route.name != null ? `${String(route.name)}-fr` : undefined,
        path: frenchTwin(route.path),
      })),
  ],

  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, top: hashScrollOffset(to.hash) }
    }
    if (samePath(to.path, from.path)) return false
    return { left: 0, top: 0 }
  },
}
