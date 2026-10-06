# Rowe Services & Maintenance — rowe-services.com

Rebuild of rowe-services.com (previously WordPress) as a fast, static Astro site built for local SEO, AI search (GEO) and conversion. Built by DubLow Digital.

- **Stack:** Astro 7 static output, Node ≥ 22, deployed on Vercel. No client-side framework; one self-hosted font; zero third-party JS until tracking IDs are added.
- **Commands:** `npm install` · `npm run dev` · `npm run build` (static build to `dist/`)
- **Preview bundle:** `npm run build && python3 tools/preview_bundle.py dist preview.html`

## Where things live
| What | File |
|---|---|
| NAP, hours, reviews, USPs, tracking IDs | `src/data/site.ts` |
| **Lead survey embed (GHL)** | `src/data/lead-form.html` — paste the embed verbatim |
| Service pages (`/services/<slug>`) | `src/data/services.ts` |
| Town pages (`/service-areas/<slug>`) | `src/data/locations.ts` |
| Blog posts (`/blogs/<slug>`) | `src/content/blog/*.md` |
| Privacy policy text | `src/content/pages/privacy-policy.md` |
| JSON-LD schema | `src/lib/schema.ts` |
| Design tokens | `src/styles/global.css` |
| Redirects + headers | `vercel.json` |

## SEO / GEO
- Every original URL is preserved: `/`, `/services`, `/services/{seamless-gutters,soffit-and-fascia,vinyl-siding,porches-and-enclosures}`, `/blogs`, all 26 `/blogs/<slug>` posts, `/reviews`, `/contact-us`, `/privacy-policy`, `/terms-and-conditions`. Old WordPress paths (`/feed`, `/blogs/page/N`, `/category/*`, sitemaps, `wp-admin`) redirect in `vercel.json`.
- New pages: 14 town pages, `/service-areas` hub, `/about`, `/free-gutter-inspection`.
- JSON-LD `@graph` on every page: HomeAndConstructionBusiness + GeneralContractor, WebSite, Person (Justin Rowe), WebPage, BreadcrumbList, Service, FAQPage, BlogPosting.
- `/llms.txt`, `/rss.xml`, `/sitemap.xml`, and a `robots.txt` that welcomes AI crawlers in production.
- **Indexing gate:** pages are `noindex` and `robots.txt` disallows all unless `PUBLIC_SITE_INDEXABLE=true`. Set it **only** on the Vercel Production environment at launch.

## Open items (need Rowe / Todd)
1. **Lead survey embed** — paste the exact GHL survey HTML from the old site into `src/data/lead-form.html`. Until then the quote card shows call/text buttons.
2. **Phone** — the old header shows (352) 706-8913; the old contact page and privacy policy show (352) 572-0650. Confirm which one is on the Google Business Profile.
3. **Email** — `team@roweservices.com` (no hyphen) vs. the `rowe-services.com` domain. Confirm it receives mail.
4. **Google Business Profile** URL + review link → `site.gbp` in `site.ts`.
5. **More verbatim Google reviews** → `site.reviews`.
6. **Logo** — an SVG wordmark stands in; drop the official logo file in and swap `Logo.astro`.
7. **Project photos** — the old gallery images couldn't be migrated. Add real before/after photos.
8. **Photo of Justin** for `/about`.
9. **Tracking** — GTM / GA4 / Clarity IDs in `site.tracking`.
10. **Blog claims to verify** (migrated verbatim from the old site): repaint cost ranges, foundation repair $5k–$30k, gutter cleaning $150–$300/visit, "90% fewer leak points", rainfall/attic temperature stats.
11. Florida contractor license number, if Rowe wants it shown.

## Build log
- 2026-10-06 — Full rebuild. Scaffolded from the DubLow reference architecture (vail-valley-it). Migrated 26 blog posts + privacy policy. Wrote 4 service pages, 14 town pages, about, reviews, contact, free-inspection landing page. SEO audit: 0 issues across 55 pages. Desktop (1280) + mobile (390) screenshots checked; no horizontal overflow.
