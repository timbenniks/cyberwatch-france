/** Loads the official script when a domain is configured; pageviews are automatic. */
export default defineNuxtPlugin(() => {
  const { plausibleDomain, plausibleSrc, plausibleApiHost } = useRuntimeConfig().public
  if (!plausibleDomain) return

  const api = typeof plausibleApiHost === 'string' ? plausibleApiHost.replace(/\/$/, '') : ''

  useHead({
    script: [
      {
        key: 'plausible-queue',
        innerHTML:
          'window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}',
        tagPosition: 'head',
      },
      {
        key: 'plausible',
        src: typeof plausibleSrc === 'string' ? plausibleSrc : 'https://plausible.io/js/script.outbound-links.tagged-events.js',
        defer: true,
        'data-domain': plausibleDomain,
        ...(api ? { 'data-api': `${api}/api/event` } : {}),
        tagPosition: 'head',
      },
    ],
  })
})
