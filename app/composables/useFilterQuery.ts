import { filterQueryKeys, filtersToQuery, queryToFilters } from '~/utils/filter-query'

/**
 * Mirrors the filter state into the URL, so a filtered view can be shared,
 * bookmarked and linked to — which is also what makes the schema.org
 * SearchAction on this site honest.
 *
 * Applied on mount rather than during setup: these pages are prerendered
 * without a query string, so reading it any earlier would make the client's
 * first render disagree with the server's markup.
 */
export function useFilterQuery() {
  const route = useRoute()
  const router = useRouter()
  const { filters } = useFilters()

  function applyFromUrl() {
    const next = queryToFilters(route.query)
    if (Object.keys(next).length) Object.assign(filters.value, next)
  }

  function syncToUrl() {
    const next = filtersToQuery(filters.value)

    const current = filterQueryKeys.map((key) => `${key}=${route.query[key] ?? ''}`).join('&')
    const target = filterQueryKeys.map((key) => `${key}=${next[key] ?? ''}`).join('&')
    if (current === target) return

    const preserved = Object.fromEntries(
      Object.entries(route.query).filter(([key]) => !filterQueryKeys.includes(key as (typeof filterQueryKeys)[number])),
    )
    router.replace({ path: route.path, query: { ...preserved, ...next }, hash: route.hash })
  }

  onMounted(() => {
    applyFromUrl()
    watch(filters, syncToUrl, { deep: true })
  })
}
