// ───────────────────────────────────────────────────────────────────────────
// Route resolver
// ───────────────────────────────────────────────────────────────────────────
// Single source of truth that turns every content entry (across all
// collections and all 4 languages) into a static route. The catch-all page
// `src/pages/[...slug].astro` consumes this list in getStaticPaths.
//
// To add a new section: (1) add a collection in content.config.ts, (2) add a
// block here that pushes routes, (3) add a view in the catch-all page.

import { getCollection } from 'astro:content';
import { defaultLang, type Lang } from '../i18n/config';
import { slugOf, type AnyEntry } from './content';

export type RouteType =
  | 'home'
  | 'page'
  | 'product'
  | 'restaurant-type'
  | 'solution'
  | 'blog-index'
  | 'blog-post'
  | 'stories-index'
  | 'story'
  | 'testimonials-index';

export interface RouteProps {
  type: RouteType;
  lang: Lang;
  entry?: AnyEntry;
  entries?: AnyEntry[];
  collection?: AnyEntry['collection'];
}

export interface Route {
  // Astro 5 expects a rest param as a slash-joined string (or undefined for root).
  params: { slug: string | undefined };
  props: RouteProps;
}

/** Build the localized slug string for [...slug]. EN at root, others prefixed. */
function segments(lang: Lang, parts: string[]): string | undefined {
  const segs = lang === defaultLang ? [...parts] : [lang, ...parts];
  return segs.length === 0 ? undefined : segs.join('/');
}

export async function getAllRoutes(): Promise<Route[]> {
  const routes: Route[] = [];

  // ── PAGES (home + generic) ───────────────────────────────────────────────
  const pages = (await getCollection('pages')) as unknown as AnyEntry[];
  for (const entry of pages) {
    const isHome = entry.data.translationKey === 'home';
    routes.push({
      params: { slug: segments(entry.data.lang, isHome ? [] : [slugOf(entry)]) },
      props: {
        type: isHome ? 'home' : 'page',
        lang: entry.data.lang,
        entry,
        collection: 'pages',
      },
    });
  }

  // ── PRODUCTS (root slug) ─────────────────────────────────────────────────
  const products = (await getCollection('products')) as unknown as AnyEntry[];
  for (const entry of products) {
    routes.push({
      params: { slug: segments(entry.data.lang, [slugOf(entry)]) },
      props: { type: 'product', lang: entry.data.lang, entry, collection: 'products' },
    });
  }

  // ── RESTAURANT TYPES (root slug) ─────────────────────────────────────────
  const rtypes = (await getCollection('restaurantTypes')) as unknown as AnyEntry[];
  for (const entry of rtypes) {
    routes.push({
      params: { slug: segments(entry.data.lang, [slugOf(entry)]) },
      props: { type: 'restaurant-type', lang: entry.data.lang, entry, collection: 'restaurantTypes' },
    });
  }

  // ── SOLUTIONS (/solutions/<slug>) ───────────────────────────────────────
  const solutions = (await getCollection('solutions')) as unknown as AnyEntry[];
  for (const entry of solutions) {
    routes.push({
      params: { slug: segments(entry.data.lang, ['solutions', slugOf(entry)]) },
      props: { type: 'solution', lang: entry.data.lang, entry, collection: 'solutions' },
    });
  }

  // ── BLOG (/blog + /blog/<slug>) ──────────────────────────────────────────
  const posts = (await getCollection('posts', (p) => !p.data.draft)) as unknown as AnyEntry[];
  for (const lang of uniqueLangs(posts)) {
    const inLang = posts.filter((p) => p.data.lang === lang);
    routes.push({
      params: { slug: segments(lang, ['blog']) },
      props: { type: 'blog-index', lang, entries: inLang, collection: 'posts' },
    });
  }
  for (const entry of posts) {
    routes.push({
      params: { slug: segments(entry.data.lang, ['blog', slugOf(entry)]) },
      props: { type: 'blog-post', lang: entry.data.lang, entry, collection: 'posts' },
    });
  }

  // ── SUCCESS STORIES (/success-stories + /<slug>) ─────────────────────────
  const stories = (await getCollection('successStories')) as unknown as AnyEntry[];
  for (const lang of uniqueLangs(stories)) {
    const inLang = stories.filter((s) => s.data.lang === lang);
    routes.push({
      params: { slug: segments(lang, ['success-stories']) },
      props: { type: 'stories-index', lang, entries: inLang, collection: 'successStories' },
    });
  }
  for (const entry of stories) {
    routes.push({
      params: { slug: segments(entry.data.lang, ['success-stories', slugOf(entry)]) },
      props: { type: 'story', lang: entry.data.lang, entry, collection: 'successStories' },
    });
  }

  // ── TESTIMONIALS INDEX (/testimonials) ───────────────────────────────────
  const testimonials = (await getCollection('testimonials')) as unknown as AnyEntry[];
  for (const lang of uniqueLangs(testimonials)) {
    routes.push({
      params: { slug: segments(lang, ['testimonials']) },
      props: { type: 'testimonials-index', lang, entries: testimonials.filter((x) => x.data.lang === lang), collection: 'testimonials' },
    });
  }

  return routes;
}

function uniqueLangs(entries: AnyEntry[]): Lang[] {
  return [...new Set(entries.map((e) => e.data.lang))];
}
