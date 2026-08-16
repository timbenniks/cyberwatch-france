/**
 * Hover tooltips do not work on touch. First tap selects a bar and fills a
 * persistent readout; a second tap (or the readout button) runs the action.
 */
export function useChartInspect() {
  const inspect = useCoarsePointer()
  const selectedKey = ref<string | null>(null)

  function select(key: string) {
    selectedKey.value = key
  }

  function onSelect(key: string, act: () => void) {
    if (!inspect.value) {
      act()
      return
    }
    if (selectedKey.value === key) {
      act()
      return
    }
    selectedKey.value = key
  }

  return { inspect, selectedKey, select, onSelect }
}
