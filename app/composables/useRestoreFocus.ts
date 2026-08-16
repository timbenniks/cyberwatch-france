/** Return focus to whoever opened a dialog when it unmounts. */
export function useRestoreFocus() {
  let previouslyFocused: HTMLElement | null = null

  onMounted(() => {
    previouslyFocused = document.activeElement as HTMLElement | null
  })

  onUnmounted(() => {
    previouslyFocused?.focus()
  })
}
