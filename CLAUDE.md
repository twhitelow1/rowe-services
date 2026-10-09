# Rowe Services & Maintenance — rowe-services.com

Astro 7 static site (Node ≥ 22) on Vercel for an owner-operated gutter/exterior contractor in Grand Island, FL. Built by DubLow Digital. See README.md for file map and open items.

## Commands
`npm run dev` · `npm run build` · `npm test` · `npm run test:e2e` · `npm run ci` (full pipeline). See README → Testing & CI/CD.

## Rules
- Content is data-driven: edit `src/data/*.ts` and `src/content/blog/*.md`, not templates.
- Voice: company voice ("we"), plain-spoken, no hype. No personal branding: the owner's name appears only on /about (founder line) and in schema (founder). Keep the USPs: owner-operated since 2013, owner quotes every job, 15-year warranty, follow-up check after the job, not a franchise. Enforced by the "company voice" test in `tests/build.test.mjs`.
- Never invent reviews, prices, stats, licenses or guarantees. Reviews in `site.ts` are verbatim.
- The lead survey embed in `src/data/lead-form.html` is rendered verbatim — don't rewrite it.
- Canonicals/schema always use `https://rowe-services.com`. Indexing only when `PUBLIC_SITE_INDEXABLE=true` (production only).
- URLs: no trailing slash. Never change an existing slug without a `vercel.json` redirect.
- Run `npm run ci` (or at least `npm run check && npm run build && npm test && npm run test:seo`) before every push; CI runs the same steps and must stay green. Never skip or weaken a test to get green.
- Blog `seoTitle` must be ≤ 65 chars. Money pages need ≥ 4 FAQs, an answer-first lede naming the business + FL, quick facts and a reviewed/updated line (enforced by `tests/ai-visibility.test.mjs`).
- Logo/icons come from `src/data/logo.ts`; regenerate PNGs with `npm run icons`.
