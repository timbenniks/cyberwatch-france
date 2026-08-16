/** Shared ECharts chrome every dossier chart starts from. */
export function useChartBase() {
  const { prefersReducedMotion } = useReducedMotion()
  return {
    prefersReducedMotion,
    base: computed(() => ({
      backgroundColor: 'transparent' as const,
      animation: !prefersReducedMotion.value,
      animationDuration: 420,
    })),
  }
}
