/**
 * Nested overlays (menu + record, drawer + modal) share one counter so
 * unlocking the first does not unlock the page while another is still open.
 */
export function useScrollLock(locked: MaybeRefOrGetter<boolean>) {
  const count = useState('scroll-lock-count', () => 0)
  const isLocked = toRef(() => toValue(locked))

  function apply(delta: number) {
    if (!import.meta.client) return
    count.value = Math.max(0, count.value + delta)
    document.body.style.overflow = count.value > 0 ? 'hidden' : ''
  }

  watch(isLocked, (next, prev) => {
    if (next === prev) return
    apply(next ? 1 : -1)
  })

  onMounted(() => {
    if (isLocked.value) apply(1)
  })

  onUnmounted(() => {
    if (isLocked.value) apply(-1)
  })
}
