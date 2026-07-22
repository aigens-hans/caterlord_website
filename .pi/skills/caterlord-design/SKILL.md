---
name: caterlord-design
description: The locked design system for the Caterlord website rebuild ("Grid" / brutalist direction). Use whenever building or restyling any Caterlord page, component, section, email, or asset — so the whole migration stays visually consistent. Covers colors, type, structure, component voice, and content rules.
version: 1.0.0
---

# Caterlord Design System — "Grid" (brutalist)

The chosen direction for the Caterlord site migration. Opinionated on purpose. Follow it for every page so the 37+ pages across 4 languages don't drift.

## Personality
Confident, premium, "category leader." Stark, high-contrast, structurally honest. Thick ink rules, hard offset shadows, oversized condensed display type. No softness, no gradients, no stock-template feel. Think design-studio-meets-enterprise-tech. (Bridges the chosen **E (Grid)** with the polish of **B (Cobalt)** — keep it clean and high-contrast, never raw or messy.)

## Color tokens (locked)
```
--paper:      #fafafa   /* page background */
--paper-2:    #f0f0f0   /* soft section background */
--ink:        #0a0a0a   /* text, borders, primary buttons */
--soft:       #555555   /* secondary text */
--blue:       #00b0fa   /* brand (logo color) — accents only; too light for white text */
--blue-deep:  #0078c2   /* brand deepened — the usable blue for white-on-blue blocks/buttons */
--accent:     #ff5c21   /* hot pop — use SPARINGLY (one accent word, one hot cell) */
```
- **Borders and dividers are always `--ink`**, weight `2px`. Never grey hairlines.
- Filled blue blocks use `--blue-deep` (white text passes contrast). Never put white text on `--blue`.
- `--accent` (orange) is a detail color — never a background flood.

## Typography (locked)
- **Display** `Anton` — hero headlines, CTA headlines, big stat numbers. Always **UPPERCASE**, `line-height: ~0.86`. Apply via the `.display` class.
- **Body / UI** `Space Grotesk` — everything else. Section headings & card titles are `Space Grotesk 700`, **uppercase**, tight tracking.
- **Labels** `JetBrains Mono` — eyebrows, tags, stats labels, footer/meta. `0.72–0.78rem`, uppercase, `letter-spacing: 0.1em`. Apply via the `.mono` class.
- **No italic headers, ever.** Carry emphasis with weight, color, or scale.
- **CJK note:** Anton/Space Grotesk have no Chinese glyphs. For 繁中/简中 headings, pair with PingFang TC/SC (already in the font stack fallback) — do not uppercase CJK.

## Structure rules (the "brutalist" tells)
1. **2px ink borders** around containers, grids, and between grid cells (cells share borders — `border-right` + `border-bottom`, last-of-row/col drops the outer one).
2. **Hard offset shadows** `8px 8px 0 <ink|blue-deep>` on hover lift for cards. Never blurred shadows on primary chrome.
3. **Strict modular grids** — features 4-up, products/stories 3-up, restaurant types 6-up. Cells are equal, bordered, no rounded corners (`border-radius: 0`).
4. **Numbered cells** — feature grids lead with a big `01 / 02 / 03` numeral in display type. Exactly **one cell may be "hot"** (ink background, accent numeral) — only on small (≤4) grids.
5. **Tags/pills** = bordered mono chips; the first/primary one may be filled `--blue-deep`.
6. **Alternating section backgrounds** — `--paper` and `--paper-2`, separated by a 2px ink rule.

## Component voice
- **Buttons**: bordered, uppercase, bold. Primary = `--ink` bg / white (hover → `--blue-deep`); brand = `--blue-deep` bg / white; ghost = white bg / ink border. Square corners.
- **Cards** (product / story): bordered image-top + caption. On hover, translate `-3px,-3px` + hard shadow. Images get a slight `grayscale(.15) contrast(1.04)` treatment.
- **Testimonials**: a filled `--blue-deep` block with white type, mono attribution, gold stars — single bordered row of 3.
- **CTA band**: full-bleed `--ink`, huge Anton headline, one blue button. One accent word allowed.
- **FAQ**: bordered accordion, mono `+` rotates to `×` on open.
- **Header**: sticky, 2px ink bottom rule, blue "Book a demo" button. **Footer**: inverted — `--ink` background, white type.

## Content rules (non-negotiable)
- **Real content only.** Use the actual Caterlord copy from the content collections. Never invent metrics, testimonials, or logo counts. Permitted stat numbers are real and sourced from the site: **7 modules · 3 operating systems (Android/Windows/iOS) · 50+ reports**. Anything else must be a labelled placeholder (`—`, "metric to confirm").
- **No fake UI chrome** (browser bars, phone frames, code-window mockups).
- Every page must be responsive at 320 / 375 / 414 / 768 px — grids collapse to 2-up then 1-up; `overflow-x: clip` on html/body; no horizontal scroll.

## Voice — 繁體中文（香港）
The primary audience is **Hong Kong**. 繁中 copy must read like a local HK brand, not Taiwan/general 書面語.
- **HK F&B vocabulary (use these):** 餐牌 (menu) · 落單 (place order) · 埋單 (pay) · 執枱 / 拆枱 / 合枱 (table ops) · 枱 / 枱面 / 枱況 (table) · 外賣 (takeaway) · 介面 (interface) · 酒店 (hotel) · 員工食堂 (canteen) · 分店 · 排更 / 更數 / 出糧 (scheduling & payroll) · 套餐 (set meal) · 賣過龍 (oversell) · 就手 · 低水位.
- **Light Cantonese flavor is on-brand** in headlines/CTAs: 點解揀 · 啱 · 搞掝 · 我哋 · 同 (and) · 嘅 · 都用緊 · 點講 · 升級未. Keep body copy professional-but-natural — don't slide into full colloquial Cantonese.
- **Keep English tech terms** where HK readers expect them: POS · cloud · API · KDS · BI · ERP · app · QR.
- **HK numerals:** "No.1", "50+ 份報表".
- **Never use Taiwan terms:** 菜單→餐牌 · 桌→枱 · 結帳→埋單 · 界面→介面 · 飯店→酒店 · 飯堂→員工食堂 · 外帶→外賣.

## Where it lives (implementation reference)
- Tokens + primitives (`.bw`, `.sh`, `.display`, `.mono`, `.tag`, `.btn`): `caterlord/src/styles/global.css`
- Section components (each already styled to this system): `caterlord/src/components/*.astro`
- Hero schema supports `tags`, `stats`, `headingAccent`: `caterlord/src/content.config.ts`
- Homepage (the reference implementation): `caterlord/src/content/pages/en/home.md`
- Fonts loaded in `caterlord/src/layouts/BaseLayout.astro`

## When building a new page
1. Compose it from the existing section blocks (hero, feature-grid, product-grid, testimonials, stories-grid, restaurant-grid, faq, cta, logo-wall) — don't invent new chrome.
2. Reference tokens by name (`var(--ink)`), never inline hex.
3. Reuse `.display`, `.mono`, `.bw`, `.sh`, `.btn` primitives.
4. Check it against this file before shipping.
