# Launch runbook — rowe-services.com

Status (2026-10-09): site merged to `main`, CI green, Vercel production builds from `main`.
`rowe-services.com` and `www.rowe-services.com` (308 → apex) are attached to the Vercel
project `rowe-services` and verified. **DNS still points at the old WordPress host**, so the
live site is unchanged until the cutover below.

## Blockers before cutover
- [ ] **Lead survey embed** pasted into `src/data/lead-form.html` (the old site's GHL survey).
      Launching without it means the quote cards fall back to call/text only.
- [ ] Confirm the phone on the Google Business Profile: (352) 706-8913 vs (352) 572-0650.
- [ ] Domain registrant: Namecheap lists the registrant/admin/tech contact as a third party
      ("Bypass Creations"), not Rowe or DubLow. Update the contacts to the business owner so
      Rowe controls renewals and transfers. Domain expires 2027-03-07.

## Cutover (Namecheap → Advanced DNS for rowe-services.com)
Change only these two records. Lower TTL is already 60s, so propagation is fast.

| Type  | Host | Current value                  | New value               |
|-------|------|--------------------------------|-------------------------|
| A     | @    | 104.18.185.50 (old WP host)    | 76.76.21.21             |
| CNAME | www  | wuwev9m93f.wpdns.site.         | cname.vercel-dns.com.   |

**Keep unchanged** (GoHighLevel email + other services):
`email.hello` CNAME, `hello` MX ×2, `hello` TXT (SPF), `_dmarc.hello` TXT,
`smtp._domainkey.hello` TXT, `offer` CNAME (sites.ludicrous.cloud).
After cutover, `_acme-challenge` and `_cf-custom-hostname` TXT records belonged to the old
host and can be removed once the new site is confirmed live.

## Immediately after DNS resolves
1. Vercel → Project → Settings → Environment Variables: add `PUBLIC_SITE_INDEXABLE=true`
   for **Production only**, then redeploy `main`.
2. Verify on https://rowe-services.com:
   - pages return 200, `/services/seamless-gutters`, `/blogs/<post>` (old URLs) work
   - view-source shows `<meta name="robots" content="index, follow...`
   - `/robots.txt` allows crawling and lists the sitemap; `/llms.txt`, `/sitemap.xml` load
   - `www.` redirects to the apex; old WP paths (`/feed`, `/blogs/page/2`) redirect
   - the quote form submits into GoHighLevel
3. Google Search Console: add/verify the domain property, submit `https://rowe-services.com/sitemap.xml`.
4. Bing Webmaster Tools: import from GSC, submit the sitemap (Bing feeds ChatGPT search).
5. Google Business Profile: confirm the website link is `https://rowe-services.com`.
6. Add GTM/GA4/Clarity IDs to `src/data/site.ts` → `tracking` (loads only in production).

## Rollback
Set the A record back to `104.18.185.50` and the `www` CNAME back to
`wuwev9m93f.wpdns.site.` — the old WordPress host keeps serving until it is cancelled.
Don't cancel the old hosting for at least 2 weeks after launch.

## Repo housekeeping (GitHub settings — needs the repo owner)
- Settings → General → Default branch: switch to `main`.
- Settings → Branches: protect `main`, require the **CI / Build & test** check.
- Then delete the merged `claude/great-goodall-fjb8kh` branch.
