import type { ColorScheme } from '~/utils/echarts'

/** Remember an explicit light/dark click so the OS scheme does not override it. */
export const THEME_PREF_COOKIE = 'cw_theme'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export const THEME_COLOR_LIGHT = '#f3ece1'
export const THEME_COLOR_DARK = '#080b14'

export function readThemePref(): ColorScheme | null {
  if (!import.meta.client) return null
  const match = document.cookie.match(/(?:^|;\s*)cw_theme=(light|dark)(?:;|$)/)
  return (match?.[1] as ColorScheme | undefined) ?? null
}

export function writeThemePref(scheme: ColorScheme) {
  if (!import.meta.client) return
  document.cookie = `${THEME_PREF_COOKIE}=${scheme}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

export function applyThemeToDocument(scheme: ColorScheme) {
  if (!import.meta.client) return
  document.documentElement.setAttribute('data-theme', scheme)
  const color = scheme === 'light' ? THEME_COLOR_LIGHT : THEME_COLOR_DARK
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute('content', color)
  })
}

/**
 * Runs in <head> before paint. Without a remembered choice the page keeps
 * following `prefers-color-scheme` in CSS; with one, `data-theme` is set so
 * the first frame already matches and Vue never has to restyle prerendered
 * markup.
 */
export const themeDetectInlineScript = `(function(){
  try {
    var pref = '';
    var parts = document.cookie.split(';');
    for (var i = 0; i < parts.length; i++) {
      var bit = parts[i].trim();
      if (bit.indexOf('cw_theme=') === 0) { pref = bit.slice(9); break; }
    }
    if (pref !== 'light' && pref !== 'dark') return;
    document.documentElement.setAttribute('data-theme', pref);
    var color = pref === 'light' ? '${THEME_COLOR_LIGHT}' : '${THEME_COLOR_DARK}';
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var j = 0; j < metas.length; j++) metas[j].setAttribute('content', color);
  } catch (e) {}
})()`
