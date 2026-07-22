// ───────────────────────────────────────────────────────────────────────────
// Language configuration
// ───────────────────────────────────────────────────────────────────────────
// Add or remove languages here. `hreflang` maps to the ISO code used in the
// <link rel="alternate" hreflang> tags. `dir` is the text direction.

export const languages = {
  en: { label: 'English', hreflang: 'en', dir: 'ltr' },
  'zh-hant': { label: '繁體中文', hreflang: 'zh-HK', dir: 'ltr' },
  'zh-hans': { label: '简体中文', hreflang: 'zh-CN', dir: 'ltr' },
  ms: { label: 'Bahasa Melayu', hreflang: 'ms', dir: 'ltr' },
} as const;

export type Lang = keyof typeof languages;

export const locales = Object.keys(languages) as Lang[];
export const defaultLang: Lang = 'en';

/** true = the default language (en) is served at the site root with no prefix */
export const showDefaultLang = false;
