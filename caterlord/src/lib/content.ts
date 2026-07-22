// ───────────────────────────────────────────────────────────────────────────
// Content helpers
// ───────────────────────────────────────────────────────────────────────────

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/config';
import { defaultLang } from '../i18n/config';

export type AnyEntry = CollectionEntry<
  'pages' | 'products' | 'posts' | 'successStories' | 'testimonials' | 'restaurantTypes' | 'solutions'
>;

/** The URL slug for an entry: explicit `slug` field, else the filename. */
export function slugOf(entry: AnyEntry): string {
  const explicit = (entry.data as { slug?: string }).slug;
  if (explicit) return explicit;
  // glob-loader id looks like "en/home" → take the last segment
  return entry.id.split('/').pop()!;
}

/** The href (pathname) for an entry, localized. */
export function hrefForEntry(entry: AnyEntry, sectionBase = ''): string {
  const lang = (entry.data as { lang: Lang }).lang;
  const slug = slugOf(entry);
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const base = sectionBase ? `/${sectionBase}` : '';
  if (!sectionBase && slug === 'home') {
    return lang === defaultLang ? '/' : `/${lang}/`;
  }
  return `${prefix}${base}/${slug}/`;
}

/** All translations of one logical entry, keyed by language. */
export async function translationsOf(
  collection: AnyEntry['collection'],
  translationKey: string
): Promise<Record<Lang, AnyEntry | undefined>> {
  const all = await getCollection(collection);
  const out = {} as Record<Lang, AnyEntry | undefined>;
  for (const e of all) {
    if ((e.data as { translationKey: string }).translationKey === translationKey) {
      out[(e.data as { lang: Lang }).lang] = e as AnyEntry;
    }
  }
  return out;
}

/** Fetch entries of a collection filtered by language, sorted by `order` if present. */
export async function byLang<C extends AnyEntry['collection']>(
  collection: C,
  lang: Lang
): Promise<CollectionEntry<C>[]> {
  return getCollection(collection, (e) => (e.data as { lang: Lang }).lang === lang);
}
