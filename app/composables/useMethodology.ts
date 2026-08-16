/** Shared so the modal can live outside <main>, above the sticky header. */
export function useMethodology() {
  const open = useState('methodology-open', () => false)
  return { open }
}
