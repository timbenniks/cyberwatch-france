import type { Locale } from '~/types/cyberwatch'

/** Remember an explicit EN/FR click so auto-detect does not override it. */
export const LOCALE_PREF_COOKIE = 'cw_locale'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export function readLocalePref(): Locale | null {
  if (!import.meta.client) return null
  const match = document.cookie.match(/(?:^|;\s*)cw_locale=(en|fr)(?:;|$)/)
  return (match?.[1] as Locale | undefined) ?? null
}

export function writeLocalePref(locale: Locale) {
  if (!import.meta.client) return
  document.cookie = `${LOCALE_PREF_COOKIE}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`
}

/**
 * Runs in <head> before paint. French browsers (or a remembered `fr` pref)
 * are sent to the French URL; everyone else stays on English. The displayed
 * language still comes from the path — this only chooses which prerendered
 * page to load.
 */
export const localeDetectInlineScript = `(function(){
  try {
    var path = location.pathname;
    if (path === '/fr' || path.indexOf('/fr/') === 0) return;
    var pref = '';
    var parts = document.cookie.split(';');
    for (var i = 0; i < parts.length; i++) {
      var bit = parts[i].trim();
      if (bit.indexOf('cw_locale=') === 0) { pref = bit.slice(10); break; }
    }
    if (pref === 'en') return;
    var french = pref === 'fr';
    if (!french) {
      var langs = [navigator.language].concat(navigator.languages || []);
      for (var j = 0; j < langs.length; j++) {
        if (String(langs[j] || '').toLowerCase().indexOf('fr') === 0) { french = true; break; }
      }
    }
    if (!french) return;
    var dest = path === '/' ? '/fr' : '/fr' + path;
    location.replace(dest + location.search + location.hash);
  } catch (e) {}
})()`
