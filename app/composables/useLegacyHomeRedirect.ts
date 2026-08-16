const HASH_TO_PATH: Record<string, '/incidents' | '/guidance' | '/numbers'> = {
  timeline: '/incidents',
  guidance: '/guidance',
  numbers: '/numbers',
  data: '/numbers',
  patterns: '/numbers',
}

const FILTER_KEYS = ['q', 'kind', 'severity', 'status', 'year', 'sector'] as const

/**
 * Old homepage hashes and filter queries used to scroll in place. Send them
 * to the real pages so existing links keep working.
 */
export function useLegacyHomeRedirect() {
  const route = useRoute()
  const { localePath } = useLocale()

  onMounted(() => {
    const destFromHash = HASH_TO_PATH[route.hash.replace(/^#/, '')]
    const filterQuery = Object.fromEntries(
      FILTER_KEYS.flatMap((key) => {
        const value = route.query[key]
        return typeof value === 'string' && value ? [[key, value]] : []
      }),
    )
    if (destFromHash) {
      void navigateTo({ path: localePath(destFromHash), query: filterQuery }, { replace: true })
      return
    }
    if (Object.keys(filterQuery).length) {
      void navigateTo({ path: localePath('/incidents'), query: filterQuery }, { replace: true })
    }
  })
}
