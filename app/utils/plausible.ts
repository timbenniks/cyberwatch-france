/** Custom Plausible events. Pageviews are handled by the official script. */
export function trackPlausibleEvent(name: string, props?: Record<string, string | number | boolean | undefined>) {
  if (!import.meta.client) return
  const plausible = window.plausible
  if (typeof plausible !== 'function') return

  const clean: Record<string, string> = {}
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined) continue
      clean[key] = String(value)
    }
  }

  plausible(name, Object.keys(clean).length ? { props: clean } : undefined)
}
