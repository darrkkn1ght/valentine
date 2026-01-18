# SEO & Link Preview Setup Guide

## Overview
This document outlines all SEO optimizations and link preview configurations for Digital Moment Studio.

---

## 1. **Link Preview (Open Graph & Twitter Cards)**

When you paste a link to your site on WhatsApp, Facebook, Twitter, LinkedIn, or other social platforms, here's what shows:

### ✅ Currently Implemented:

**Open Graph Tags** (Facebook, WhatsApp, LinkedIn):
- `og:title`: "Ask Them In A Way They'll Never Forget"
- `og:description`: Clear, compelling description
- `og:image`: `valentine-ask-preview.jpg` (1200x630px recommended)
- `og:url`: Full canonical URL
- `og:type`: website

**Twitter Card Tags**:
- `twitter:card`: summary_large_image (shows large preview)
- `twitter:title`: Compelling headline
- `twitter:description`: Concise description
- `twitter:image`: Preview image

**Result**: When link is shared, platforms pull this data automatically and display a beautiful preview card.

### 🧪 Test Link Preview:
- **Facebook**: https://developers.facebook.com/tools/debug/og/object/
- **Twitter**: https://cards-dev.twitter.com/validator
- **LinkedIn**: https://www.linkedin.com/post-inspector/
- **WhatsApp**: Just paste link in a chat - preview generates automatically

---

## 2. **Search Engine Optimization (SEO)**

### A. Meta Tags (in `index.html`)
```html
<meta name="description" content="...">  <!-- Google search snippet -->
<meta name="keywords" content="...">    <!-- Keywords (less important now) -->
<meta name="author" content="...">      <!-- Content author -->
<link rel="canonical" href="...">       <!-- Preferred version of page -->
```

### B. Structured Data (JSON-LD Schema)
Located in `/src/hooks/useSEO.ts`, automatically added to pages:

1. **Organization Schema** - Tells Google about your business
   - Name, URL, logo, description
   - Contact points
   - Social profiles

2. **Product Schema** - Shows product in search results
   - Name, description, image
   - Price, currency, availability
   - Ratings & reviews

3. **Local Business Schema** - For business listings
   - Address, phone, email
   - Business hours
   - Price range

4. **FAQ Schema** - Rich FAQ snippets in search results
   - Questions & answers displayed directly

### C. Sitemap (`/public/sitemap.xml`)
- Lists all important pages
- Helps Google crawl faster
- Includes last modified date & priority

### D. Robots.txt (`/public/robots.txt`)
- Tells search engines what to crawl
- References sitemap
- Blocks admin pages from indexing

---

## 3. **Page-Specific SEO**

Each page now uses the `useSEO` hook for dynamic meta tags:

### Homepage (`/`)
- **Title**: "Ask Them In A Way They'll Never Forget"
- **Schema**: Organization + Product
- **Focus**: Main conversion keywords

### About (`/about`)
- **Title**: "About Us - Why Digital Moment Studio Exists"
- **Type**: article
- **Schema**: Organization

### FAQ (`/faq`)
- **Title**: "Frequently Asked Questions"
- **Type**: article
- **Schema**: FAQPage (rich snippets in Google)

### Contact (`/contact`)
- **Title**: "Contact Us - Get Support"
- **Type**: article
- **Schema**: LocalBusiness

---

## 4. **Performance & Technical SEO**

✅ **Implemented:**
- Responsive design (mobile-first)
- Fast page load (Vite optimization)
- Dark mode support
- Preconnect hints for external resources
- DNS prefetch for CDN
- Proper heading hierarchy (H1, H2, etc.)
- Image optimization (lossy compression)
- CSS & JS minification (Vite)

---

## 5. **Files Created/Modified**

| File | Purpose |
|------|---------|
| `index.html` | Enhanced with all meta tags |
| `public/robots.txt` | Search engine crawling rules |
| `public/sitemap.xml` | Page list for search engines |
| `public/site.webmanifest` | PWA manifest with branding |
| `src/hooks/useSEO.ts` | Dynamic meta tag management + schemas |
| `src/utils/seo-checker.js` | Automated SEO validation script |
| Pages: `Index.tsx`, `About.tsx`, `FAQ.tsx`, `Contact.tsx` | SEO hooks integrated |

---

## 6. **Running SEO Checks**

### Option 1: Terminal Command
```bash
node src/utils/seo-checker.js
```

### Option 2: Add to package.json
```json
{
  "scripts": {
    "check:seo": "node src/utils/seo-checker.js"
  }
}
```

Then run:
```bash
npm run check:seo
```

### What the checker verifies:
- ✅ Meta tags present in HTML
- ✅ robots.txt exists & valid
- ✅ sitemap.xml exists & valid
- ✅ site.webmanifest complete
- ✅ Image assets exist & optimized
- ✅ SEO hooks installed

---

## 7. **Social Sharing Best Practices**

### When you share a link:

**WhatsApp**:
- Paste link → WhatsApp fetches og:image, og:title, og:description
- Beautiful card shows instantly
- User clicks → lands on site

**Facebook/LinkedIn**:
- Use sharing debugger (links above) to debug
- Clear cache with "Scrape Again" button
- Preview updates immediately

**Twitter**:
- Use Twitter Card validator
- Validate or update with "Preview Card" button

### Pro Tips:
1. **High-quality image** (1200x630px): Makes preview stand out
2. **Compelling title**: First thing people see
3. **Clear description**: 155-160 characters (Google displays ~155)
4. **Fast load time**: Improves SEO ranking & user experience
5. **Mobile responsive**: ~60% of traffic is mobile

---

## 8. **Google Search Console Setup** (Next Step)

Once deployed:

1. Go to https://search.google.com/search-console
2. Add property: `https://digitalmoment.studio`
3. Verify ownership (via DNS, HTML file, or Google Analytics)
4. Submit sitemap: `https://digitalmoment.studio/sitemap.xml`
5. Monitor:
   - Click-through rate (CTR)
   - Average position in search
   - Crawl errors
   - Mobile usability

---

## 9. **Links & Social Accounts to Add**

In `src/hooks/useSEO.ts`, update the `organizationSchema`:

```javascript
"sameAs": [
  "https://instagram.com/digitalmoment",      // Add your handle
  "https://tiktok.com/@digitalmoment",        // Add your handle
  "https://twitter.com/@digitalmoment"        // Add your handle
]
```

Also update in `index.html`:
```html
<meta name="twitter:site" content="@yourhandle" />
<meta name="twitter:creator" content="@yourhandle" />
```

---

## 10. **SEO Metrics to Track**

**Google Search Console**:
- Impressions (how many times your site appears)
- Clicks (how many people clicked)
- CTR (click-through rate)
- Average position

**Google Analytics** (Add later):
- Session duration
- Bounce rate
- Conversion rate
- Traffic sources

**User Signals**:
- Core Web Vitals (LCP, FID, CLS)
- Mobile-friendliness
- Page experience

---

## 11. **Common Issues & Fixes**

| Issue | Fix |
|-------|-----|
| Links not showing preview | Check og:image URL is accessible, not relative path |
| Wrong preview showing | Clear cache in social debugger, re-scrape |
| Search engines can't crawl | Check robots.txt not blocking, ensure sitemap.xml valid |
| Poor CTR in search | Improve title & description, update keywords |
| Slow load time | Compress images, minify code (Vite does this) |

---

## 12. **Quick Checklist Before Launch**

- [ ] Update `og:image` URL to production domain
- [ ] Update `og:url` to production domain in index.html
- [ ] Update Twitter handles in schema & meta tags
- [ ] Test link preview on all platforms (debuggers above)
- [ ] Run SEO checker: `npm run check:seo`
- [ ] Test mobile responsiveness
- [ ] Check page speed with Lighthouse (Chrome DevTools)
- [ ] Submit to Google Search Console once deployed
- [ ] Set up Google Analytics tracking
- [ ] Monitor search console for errors

---

## 13. **Resources**

- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org](https://schema.org/) - Structured data reference
- [Web.dev Core Web Vitals](https://web.dev/vitals/)
- [Open Graph Documentation](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

---

## Summary

Your site now has:
✅ Professional link previews on social media
✅ Comprehensive SEO optimization
✅ Structured data for rich search results
✅ Automated SEO validation
✅ Mobile-optimized pages
✅ Fast loading times
✅ Search engine crawlability

**Ready for production! 🚀**
