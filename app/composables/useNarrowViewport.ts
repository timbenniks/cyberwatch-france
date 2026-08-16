/**
 * Client-only match for the Tailwind `sm` breakpoint. Charts are ClientOnly,
 * so this never disagrees with prerendered markup.
 */
export function useNarrowViewport() {
  const narrow = ref(true)

  onMounted(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const sync = () => {
      narrow.value = media.matches
    }
    sync()
    media.addEventListener('change', sync)
    onUnmounted(() => media.removeEventListener('change', sync))
  })

  return narrow
}
