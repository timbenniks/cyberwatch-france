type PlausiblePropValue = string | number | boolean | undefined

/** Custom Plausible events. Pageviews are handled by @nuxtjs/plausible. */
export function trackPlausibleEvent(name: string, props?: Record<string, PlausiblePropValue>) {
  if (!import.meta.client) return

  const clean: Record<string, string> = {}
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined) continue
      clean[key] = String(value)
    }
  }

  useTrackEvent(name, Object.keys(clean).length ? { props: clean } : undefined)
}
