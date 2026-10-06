# Rowe Services & Maintenance — rowe-services.com

Astro 7 static site (Node ≥ 22) on Vercel for an owner-operated gutter/exterior contractor in Grand Island, FL. Built by DubLow Digital. See README.md for file map and open items.

## Rules
- Content is data-driven: edit `src/data/*.ts` and `src/content/blog/*.md`, not templates.
- Voice: first-person Justin Rowe, plain-spoken, no hype. Keep the USPs: owner-operated since 2013, owner quotes every job, 15-year warranty, follow-up check after the job, not a franchise.
- Never invent reviews, prices, stats, licenses or guarantees. Reviews in `site.ts` are verbatim.
- The lead survey embed in `src/data/lead-form.html` is rendered verbatim — don't rewrite it.
- Canonicals/schema always use `https://rowe-services.com`. Indexing only when `PUBLIC_SITE_INDEXABLE=true` (production only).
- URLs: no trailing slash. Never change an existing slug without a `vercel.json` redirect.
- Run `npm run build` before every push. Blog `seoTitle` must be ≤ 65 chars.
