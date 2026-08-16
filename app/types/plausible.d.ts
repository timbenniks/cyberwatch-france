export {}

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Record<string, string>; callback?: () => void },
    ) => void
    plausible_q?: unknown[]
  }
}
