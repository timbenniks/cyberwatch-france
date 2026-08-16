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

const isRecord = (path: string) => /^\/(fr\/)?incident\//.test(path)
const samePath = (a: string, b: string) => a.replace(/\/$/, '') === b.replace(/\/$/, '')

/**
 * Four paths, one page component: `/` and `/incident/:id` in English, `/fr`
 * and `/fr/incident/:id` in French. Sharing the component means opening a
 * record is an overlay rather than a remount, and switching language keeps
 * the reader on the same record.
 *
 * These are real route records rather than aliases: an alias whose param the
 * original path lacks is unsupported by Vue Router and warns on every render.
 *
 * Providing scrollBehavior makes Vue Router take over scrolling, so hash
 * targets must be handled here. Query-only changes (timeline filters) must
 * keep the current position — Nuxt's default already does that, and
 * replacing scrollBehavior would otherwise drop it.
 */
export default <RouterConfig>{
  routes: (routes) => {
    const home = routes.find((route) => route.path === '/')
    const docs = routes.find((route) => route.path === '/docs')
    if (!home) return routes
    return [
      ...routes,
      { ...home, name: 'incident', path: '/incident/:id' },
      { ...home, name: 'home-fr', path: '/fr' },
      { ...home, name: 'incident-fr', path: '/fr/incident/:id' },
      ...(docs ? [{ ...docs, name: 'docs-fr', path: '/fr/docs' }] : []),
    ]
  },

  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, top: hashScrollOffset(to.hash), behavior: 'smooth' }
    }
    if (samePath(to.path, from.path)) return false
    if (isRecord(to.path) || isRecord(from.path)) return false
    return { left: 0, top: 0 }
  },
}
