export function useReducedMotion() {
  const prefersReducedMotion = useState('prefers-reduced-motion', () => false)
  const bound = useState('prefers-reduced-motion-bound', () => false)

  onMounted(() => {
    if (bound.value) return
    bound.value = true
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = query.matches
    query.addEventListener('change', (event) => {
      prefersReducedMotion.value = event.matches
    })
  })

  return { prefersReducedMotion }
}
