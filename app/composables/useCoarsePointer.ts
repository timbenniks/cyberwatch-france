/**
 * True when the user cannot hover, or the viewport is below the `sm` breakpoint.
 * Starts false so prerendered markup matches a desktop first paint; charts are
 * ClientOnly, so the later sync never disagrees with SSR HTML.
 */
export function useCoarsePointer() {
  const coarse = useState('coarse-pointer', () => false)
  const bound = useState('coarse-pointer-bound', () => false)

  onMounted(() => {
    const hover = window.matchMedia('(hover: none)')
    const narrow = window.matchMedia('(max-width: 639px)')
    const sync = () => {
      coarse.value = hover.matches || narrow.matches
    }
    sync()
    if (bound.value) return
    bound.value = true
    hover.addEventListener('change', sync)
    narrow.addEventListener('change', sync)
  })

  return coarse
}
