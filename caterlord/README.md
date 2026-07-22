# Caterlord — Astro rebuild (AI-updatable)

A static [Astro](https://astro.build) site with **content stored as Markdown in
Git** and **typed content collections**, so every page is structured data that a
person **or an AI agent** can edit safely via Pull Request.

This is a starting scaffold, not a finished migration. It implements the
architecture; the real content gets ported in during Phase 2.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

Requires Node 20+ (built & tested on Node 22 / 26).

---

## Why this structure is AI-friendly

| Property | How it's achieved |
|---|---|
| **Structured content** | Every collection has a Zod schema (`src/content.config.ts`). Invalid edits fail the build. |
| **Text-first & diffable** | Pages are Markdown + YAML frontmatter. An AI edit is a readable Git diff. |
| **Content ≠ presentation** | Templates render data; agents edit data, never layout. |
| **Version-controlled** | All content lives in Git under `src/content/`. |
| **Multilingual by default** | `lang` + `translationKey` fields link the 4 translations of each page. |

---

## Languages

| Code | Label | URL prefix |
|---|---|---|
| `en` | English | _none (site root)_ |
| `zh-hant` | 繁體中文 | `/zh-hant/` |
| `zh-hans` | 简体中文 | `/zh-hans/` |
| `ms` | Bahasa Melayu | `/ms/` |

Add or remove a language in **one place**: `src/i18n/config.ts` (and add a
matching block in `src/i18n/ui.ts` for UI strings).

---

## Content model

All content lives under `src/content/<collection>/<lang>/<slug>.md`.

```
src/content/
  pages/            # home, about, contact, faqs, partners … (section-driven)
  products/         # POS, Mobile, Kiosk, Checkout, Loyalty, Connect, KDS
  posts/            # blog / newsroom
  success-stories/  # case studies
  testimonials/     # customer quotes
  restaurant-types/ # QSR, FSR, Buffet, Bars …
  solutions/        # /solutions/* pages
```

### The frontmatter contract

Each file's frontmatter is validated against the schema in
`src/content.config.ts`. Example product (`src/content/products/en/caterlord-mobile.md`):

```yaml
---
name: "Caterlord Mobile"
lang: en                 # one of: en | zh-hant | zh-hans | ms
translationKey: product-mobile   # ties the 4 translations together
order: 2
hero:
  heading: "Caterlord Mobile"
  cta: { label: "Book a Demo", href: "/book-a-demo/" }
features:
  - { heading: "Increased Efficiency", body: "…" }
relatedProducts: [product-pos, product-kiosk]   # translationKeys
---
```

### How URLs are generated

A single resolver — `src/lib/routes.ts` → consumed by `src/pages/[...slug].astro`
— turns every Markdown file into a localized URL. There is **no per-page route
file to maintain**; drop a file in the right folder and it gets a URL.

| File | URL |
|---|---|
| `pages/en/home.md` | `/` |
| `pages/zh-hant/home.md` | `/zh-hant/` |
| `products/en/caterlord-mobile.md` | `/caterlord-mobile/` |
| `products/zh-hant/caterlord-mobile.md` | `/zh-hant/caterlord-mobile/` |
| `posts/en/welcome.md` | `/blog/welcome/` |
| `success-stories/en/susan-chicken-rice.md` | `/success-stories/susan-chicken-rice/` |
| `restaurant-types/en/qsr.md` | `/qsr/` |
| `solutions/en/caterlord-pos.md` | `/solutions/caterlord-pos/` |

---

## How to add / edit content (the AI workflow)

1. **Edit a Markdown file** under `src/content/` (change frontmatter fields and/or body).
2. Commit on a branch; open a Pull Request.
3. CI runs `npm run build` — the Zod schema validates the edit.
4. Review the diff, merge → hosting rebuilds & deploys.

**To translate a page:** copy the file into the target language folder, keep the
same `translationKey`, set `lang`, translate the text. The language switcher and
`hreflang` tags update automatically.

**To add a new collection:** add the schema in `src/content.config.ts`, add a
routing block in `src/lib/routes.ts`, add a view in `src/views/`, and a case in
`src/pages/[...slug].astro`.

---

## Architecture map

```
astro.config.mjs          # site URL, i18n (EN at root), sitemap, MDX
src/
  i18n/
    config.ts             # the 4 languages (single source of truth)
    ui.ts                 # UI strings per language (nav, buttons, footer)
    utils.ts              # t(), localizePath(), hreflang alternates
  content.config.ts       # ★ the schemas (the "contract")
  content/                # ★ the content (Markdown), the only thing AI edits
  lib/
    content.ts            # slug/href/translation helpers
    routes.ts             # ★ the single URL resolver
  components/             # Hero, FeatureGrid, LogoWall, Testimonials, CTA, FAQ, …
  layouts/BaseLayout.astro# <html>, SEO meta, hreflang, header, footer
  views/                  # one render component per page type
  pages/[...slug].astro   # ★ catch-all: routes → views
  styles/global.css       # design tokens
```

---

## What's intentionally left for the real migration

- **Forms:** Contact Form 7 → Netlify Forms / Formspree / Cloudflare Worker.
- **Redirects:** build a 301 map from the old WP URLs (incl. percent-encoded
  Chinese slugs) — add to `public/_redirects` (Netlify/Cloudflare) or the host's
  redirect config.
- **Media:** copy `/wp-content/uploads/` → `public/uploads/`.
- **Reviews widget:** fetch Google reviews at build time into a data file, or
  embed a lightweight client script.
- **Visual editing for non-devs (optional):** add [Keystatic](https://keystatic.com)
  or [TinaCMS](https://tina.io) on top of these same Markdown files.
- **Rest of the content:** port the remaining pages, products, posts, stories,
  testimonials and restaurant-types across all 4 languages.

See `../caterlord-migration-recommendation.md` for the full migration plan.
