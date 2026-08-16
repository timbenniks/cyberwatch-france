/**
 * OS colour scheme. Charts are ClientOnly, so this never disagrees with
 * prerendered markup — the page itself follows `prefers-color-scheme` in CSS.
 */
export function useColorScheme() {
  const colorScheme = useState<ColorScheme>('color-scheme', () => 'dark')
  const bound = useState('color-scheme-bound', () => false)

  onMounted(() => {
    const query = matchMedia('(prefers-color-scheme: light)')
    const sync = () => {
      colorScheme.value = query.matches ? 'light' : 'dark'
    }
    sync()
    if (bound.value) return
    bound.value = true
    query.addEventListener('change', sync)
  })

  return { colorScheme }
}
