export function useSiteUrl() {
  const siteUrl = useRuntimeConfig().public.siteUrl
  return {
    siteUrl,
    absolute: (path: string) => new URL(path, siteUrl).href,
  }
}
