import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ───────────────────────────────────────────────────────────────────────────
// Shared building blocks
// ───────────────────────────────────────────────────────────────────────────
// Every translatable collection shares these fields so the router can link
// the 4 language versions of a page together.

const langEnum = z.enum(['en', 'zh-hant', 'zh-hans', 'ms']);

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  noindex: z.boolean().optional(),
});

const featureItem = z.object({
  icon: z.string().optional(), // key/name, rendered by an icon component
  heading: z.string(),
  body: z.string(),
});

const metricItem = z.object({
  label: z.string(),
  value: z.string(),
});

// Composable section blocks used by marketing pages (home, about, …).
// To add a new block type, add a branch here + a case in SectionRenderer.astro.
const sectionBlock = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hero'),
    heading: z.string(),
    headingAccent: z.string().optional(),
    eyebrow: z.string().optional(),
    subheading: z.string().optional(),
    background: z.string().optional(),
    image: z.string().optional(),
    cta: ctaSchema.optional(),
    badges: z.array(z.object({ image: z.string(), href: z.string() })).optional(),
    tags: z.array(z.string()).optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
  }),
  z.object({
    type: z.literal('feature-grid'),
    heading: z.string().optional(),
    items: z.array(featureItem),
    columns: z.number().optional(), // default 3
  }),
  z.object({
    type: z.literal('logo-wall'),
    heading: z.string().optional(),
    images: z.array(z.string()),
  }),
  z.object({
    type: z.literal('testimonials'),
    heading: z.string().optional(),
    items: z.array(z.string()).optional(), // testimonial translationKeys; omit = latest 3
  }),
  z.object({
    type: z.literal('cta'),
    heading: z.string(),
    subheading: z.string().optional(),
    cta: ctaSchema,
  }),
  z.object({
    type: z.literal('faq'),
    heading: z.string().optional(),
    items: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
  z.object({
    type: z.literal('product-grid'),
    heading: z.string().optional(),
    items: z.array(z.string()).optional(), // product translationKeys; omit = all products
  }),
  z.object({
    type: z.literal('stories-grid'),
    heading: z.string().optional(),
    items: z.array(z.string()).optional(), // success-story translationKeys; omit = latest
  }),
  z.object({
    type: z.literal('restaurant-grid'),
    heading: z.string().optional(),
  }),
]);

// ───────────────────────────────────────────────────────────────────────────
// Collections
// ───────────────────────────────────────────────────────────────────────────

// Generic marketing pages (home, about, contact, faqs, partners, …).
// Rendered from composable `sections`. Markdown body is optional extra prose.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    lang: langEnum,
    translationKey: z.string(), // ties the same page across languages together
    slug: z.string().optional(), // override; defaults to filename
    seo: seoSchema.optional(),
    sections: z.array(sectionBlock).default([]),
  }),
});

// The 7 products (POS, Mobile, Kiosk, Checkout, Loyalty, Connect, KDS).
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    lang: langEnum,
    translationKey: z.string(),
    slug: z.string().optional(),
    tagline: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(99), // display order in product grids
    hero: z.object({
      heading: z.string(),
      subheading: z.string().optional(),
      image: z.string().optional(),
      cta: ctaSchema.optional(),
    }),
    features: z.array(featureItem).default([]),
    relatedProducts: z.array(z.string()).default([]), // translationKeys
    seo: seoSchema.optional(),
  }),
});

// Blog / newsroom posts.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    lang: langEnum,
    translationKey: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
    seo: seoSchema.optional(),
  }),
});

// Customer success stories / case studies.
const successStories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/success-stories' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    lang: langEnum,
    translationKey: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date().optional(),
    cover: z.string().optional(),
    quote: z.string().optional(),
    person: z.string().optional(),
    role: z.string().optional(),
    metrics: z.array(metricItem).default([]),
    seo: seoSchema.optional(),
  }),
});

// Short customer quotes shown in carousels/grids.
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
    company: z.string().optional(),
    rating: z.number().min(1).max(5).default(5),
    avatar: z.string().optional(),
    lang: langEnum,
    translationKey: z.string(),
  }),
});

// Restaurant-type landing pages (QSR, FSR, Buffet, Bars, …).
const restaurantTypes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/restaurant-types' }),
  schema: z.object({
    name: z.string(),
    lang: langEnum,
    translationKey: z.string(),
    slug: z.string().optional(),
    icon: z.string().optional(),
    blurb: z.string().optional(),
    order: z.number().default(99),
    seo: seoSchema.optional(),
  }),
});

// /solutions/* pages.
const solutions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/solutions' }),
  schema: z.object({
    title: z.string(),
    lang: langEnum,
    translationKey: z.string(),
    slug: z.string().optional(),
    category: z.string().optional(),
    seo: seoSchema.optional(),
  }),
});

export const collections = {
  pages,
  products,
  posts,
  successStories,
  testimonials,
  restaurantTypes,
  solutions,
};
