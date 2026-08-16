/**
 * Injected into prerendered HTML so it runs before Vue boots. A client-only
 * plugin would flash the English page first.
 */
export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        key: 'locale-detect',
        innerHTML: localeDetectInlineScript,
        tagPosition: 'head',
      },
    ],
  })
})
