// ───────────────────────────────────────────────────────────────────────────
// i18n helpers
// ───────────────────────────────────────────────────────────────────────────

import { defaultLang, languages, locales, type Lang } from './config';
import { ui, type UIKey } from './ui';

/** Translate a UI string for the given language, falling back to English. */
export function t(lang: Lang, key: UIKey): string {
  return ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;
}

/** Detect the active language from a pathname (e.g. /zh-hant/about/ → 'zh-hant'). */
export function getLangFromUrl(pathname: string): Lang {
  const [, seg] = pathname.split('/');
  return locales.includes(seg as Lang) ? (seg as Lang) : defaultLang;
}

/**
 * Localize a path for a language. EN paths are returned unchanged (root-locale),
 * other languages are prefixed. "/about/" + zh-hant → "/zh-hant/about/".
 */
export function localizePath(path: string, lang: Lang = defaultLang): string {
  let clean = path.startsWith('/') ? path : `/${path}`;
  if (!clean.endsWith('/')) clean += '/';
  if (lang === defaultLang) return clean;
  // strip any existing locale prefix first
  for (const l of locales) {
    if (l === defaultLang) continue;
    if (clean === `/${l}/`) clean = '/';
    else if (clean.startsWith(`/${l}/`)) clean = clean.slice(`/${l}`.length);
  }
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/**
 * Build the list of hreflang alternates for the current pathname.
 * Assumes slugs are consistent across languages (the scaffold convention).
 */
export function alternatesFor(pathname: string): { lang: Lang; hreflang: string; href: string }[] {
  const lang = getLangFromUrl(pathname);
  // strip the current language prefix to get the language-neutral part
  let rest = pathname;
  if (lang !== defaultLang) {
    rest = rest.replace(`/${lang}`, '') || '/';
  }
  if (!rest.endsWith('/')) rest += '/';

  return locales.map((l) => {
    const href = l === defaultLang ? rest : `/${l}${rest === '/' ? '' : rest}`;
    return { lang: l, hreflang: languages[l].hreflang, href };
  });
}
