/**
 * Clipboard confirmation with a polite live region and timer cleanup.
 * Pair `announcement` with an sr-only aria-live="polite" element.
 */
export function useCopyFeedback(ms = 2000) {
  const copied = ref<string | boolean>(false)
  const announcement = ref('')
  let timer: ReturnType<typeof setTimeout> | undefined

  async function copy(text: string, doneLabel: string, key: string | true = true) {
    await navigator.clipboard.writeText(text)
    copied.value = key
    announcement.value = doneLabel
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
      announcement.value = ''
    }, ms)
  }

  onUnmounted(() => clearTimeout(timer))

  return { copied, announcement, copy }
}
