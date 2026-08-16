/**
 * Resolved colour scheme. The page itself follows `prefers-color-scheme` in
 * CSS until the visitor locks a choice; that lock is a `data-theme` attribute
 * applied before paint. Charts are ClientOnly, so they can read this on the
 * client without disagreeing with prerendered markup.
 */
export function useColorScheme() {
  const colorScheme = useState<ColorScheme>('color-scheme', () => 'dark')
  const bound = useState('color-scheme-bound', () => false)

  function resolve(): ColorScheme {
    const attr = document.documentElement.getAttribute('data-theme')
    if (attr === 'light' || attr === 'dark') return attr
    const pref = readThemePref()
    if (pref) return pref
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  }

  function setColorScheme(scheme: ColorScheme) {
    writeThemePref(scheme)
    applyThemeToDocument(scheme)
    colorScheme.value = scheme
  }

  onMounted(() => {
    const scheme = resolve()
    colorScheme.value = scheme
    if (readThemePref()) applyThemeToDocument(scheme)
    if (bound.value) return
    bound.value = true
    const query = matchMedia('(prefers-color-scheme: light)')
    query.addEventListener('change', () => {
      if (readThemePref()) return
      colorScheme.value = query.matches ? 'light' : 'dark'
    })
  })

  return { colorScheme, setColorScheme }
}
