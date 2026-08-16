/** Shared ECharts chrome every dossier chart starts from. */
export function useChartBase() {
  const { prefersReducedMotion } = useReducedMotion()
  const { colorScheme } = useColorScheme()
  const theme = computed(() => chartTheme(colorScheme.value))
  return {
    prefersReducedMotion,
    colorScheme,
    theme,
    base: computed(() => ({
      backgroundColor: 'transparent' as const,
      animation: !prefersReducedMotion.value,
      animationDuration: 420,
    })),
  }
}
