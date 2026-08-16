/**
 * Escape closes the overlay; Tab cycles inside it. Pair with useRestoreFocus
 * and an initial .focus() on a control inside the dialog.
 *
 * Pass `active` when the trap lives in a parent that stays mounted (a drawer
 * toggled with v-if still works without it).
 */
export function useFocusTrap(
  target: Ref<HTMLElement | null>,
  onEscape: () => void,
  active: MaybeRefOrGetter<boolean> = true,
) {
  function onKeydown(event: KeyboardEvent) {
    if (!toValue(active)) return
    if (event.key === 'Escape') {
      event.stopPropagation()
      onEscape()
      return
    }
    if (event.key !== 'Tab' || !target.value) return

    const focusable = [...target.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )].filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')
    if (!focusable.length) return

    const first = focusable[0]!
    const last = focusable[focusable.length - 1]!
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  onMounted(() => document.addEventListener('keydown', onKeydown))
  onUnmounted(() => document.removeEventListener('keydown', onKeydown))
}
