/**
 * Injected into prerendered HTML so it runs before Vue boots. A client-only
 * plugin would flash the OS scheme first when a cookie override exists.
 */
export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        key: 'theme-detect',
        innerHTML: themeDetectInlineScript,
        tagPosition: 'head',
      },
    ],
  })
})
