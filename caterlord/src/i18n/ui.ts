// ───────────────────────────────────────────────────────────────────────────
// UI string dictionary
// ───────────────────────────────────────────────────────────────────────────
// Strings that appear in chrome (nav, buttons, footer) — not page content.
// Page content lives in the Markdown collections. Keep keys identical across
// every language; only the values change.

import type { Lang } from './config';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.solutions': 'Solutions',
    'nav.successStories': 'Success Stories',
    'nav.blog': 'Blog',
    'nav.bookDemo': 'Book a Demo',
    'cta.bookDemo': 'Book a Demo',
    'cta.talkToTeam': 'Talk to our team',
    'cta.readMore': 'Read more',
    'cta.viewAll': 'View all',
    'footer.rights': 'All rights reserved.',
    'footer.partners': 'Partners',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'blog.latest': 'Latest articles',
    'stories.title': 'Success Stories',
    'lang.label': 'Language',
  },
  'zh-hant': {
    'nav.home': '首頁',
    'nav.products': '產品',
    'nav.solutions': '解決方案',
    'nav.successStories': '客戶成功案例',
    'nav.blog': '博文',
    'nav.bookDemo': '預約示範',
    'cta.bookDemo': '預約示範',
    'cta.talkToTeam': '聯絡我們',
    'cta.readMore': '閱讀更多',
    'cta.viewAll': '查看全部',
    'footer.rights': '版權所有。',
    'footer.partners': '合作夥伴',
    'footer.about': '關於我們',
    'footer.contact': '聯絡我們',
    'blog.latest': '最新文章',
    'stories.title': '客戶成功案例',
    'lang.label': '語言',
  },
  'zh-hans': {
    'nav.home': '首页',
    'nav.products': '产品',
    'nav.solutions': '解决方案',
    'nav.successStories': '客户成功案例',
    'nav.blog': '博文',
    'nav.bookDemo': '预约示范',
    'cta.bookDemo': '预约示范',
    'cta.talkToTeam': '联系我们',
    'cta.readMore': '阅读更多',
    'cta.viewAll': '查看全部',
    'footer.rights': '版权所有。',
    'footer.partners': '合作伙伴',
    'footer.about': '关于我们',
    'footer.contact': '联系我们',
    'blog.latest': '最新文章',
    'stories.title': '客户成功案例',
    'lang.label': '语言',
  },
  ms: {
    'nav.home': 'Laman Utama',
    'nav.products': 'Produk',
    'nav.solutions': 'Penyelesaian',
    'nav.successStories': 'Kisah Kejayaan',
    'nav.blog': 'Blog',
    'nav.bookDemo': 'Tempah Demo',
    'cta.bookDemo': 'Tempah Demo',
    'cta.talkToTeam': 'Hubungi pasukan kami',
    'cta.readMore': 'Baca lagi',
    'cta.viewAll': 'Lihat semua',
    'footer.rights': 'Hak cipta terpelihara.',
    'footer.partners': 'Rakan Kongsi',
    'footer.about': 'Tentang Kami',
    'footer.contact': 'Hubungi Kami',
    'blog.latest': 'Artikel terkini',
    'stories.title': 'Kisah Kejayaan',
    'lang.label': 'Bahasa',
  },
} satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
