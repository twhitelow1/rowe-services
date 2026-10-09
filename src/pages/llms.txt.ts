import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { services } from '../data/services';
import { locations } from '../data/locations';
import { allPosts } from '../lib/blog';
// llms.txt: a plain-language map of the site for LLM crawlers (llmstxt.org format).
export const GET: APIRoute = async () => {
  const U = site.url;
  const posts = await allPosts();
  const body = `# ${site.name}

> ${site.legalName} is an owner-operated exterior home-services contractor based in ${site.address.locality}, Florida (Lake County), founded in ${site.founded} by ${site.owner.name}. It installs and repairs seamless gutters, soffit and fascia, vinyl siding and screen porches/enclosures for homeowners in The Villages and across Lake, Marion, Sumter and Orange County, Florida. Phone: ${site.phone}.

Key facts:
- Gutters: 6-inch seamless aluminum K-style gutters formed on site as one continuous piece per run; new installs, replacements, repairs, mobile-home gutters, downspouts and gutter screens/leaf guards. Most homes are installed in a single day.
- Warranty: 15 years on installs. If a leak is reported later, the crew comes back out, even if it turns out not to be their fault.
- Owner-led: every job is quoted on site by the owner, managed by the company's own crew, and re-checked a couple of weeks after completion.
- Process: free on-site quote, 24 hours' confirmation before work begins, clean job site, owner quality check afterward.
- Not a franchise or call center; the company deliberately limits how many jobs it takes.
- Soffit & fascia: vinyl and aluminum, vented soffit available, for CMU (concrete block), wood-frame and mobile homes.
- Vinyl siding: installation, replacement, storm repair and mobile-home skirting.
- Screen porches & enclosures: screen rooms, Florida rooms, birdcages, porch/patio close-ins, aluminum sheet-pan roof enclosures, rescreening and storm repair.
- Hours: Mon–Fri 9am–6pm, Sat 10am–6pm.
- Quotes are free and no-obligation; pricing is quoted on site (no published prices).

## Services
${services.map((s) => `- [${s.name}](${U}/services/${s.slug}): ${s.card}`).join('\n')}
- [Free gutter & drainage inspection](${U}/free-gutter-inspection)

## Service areas
${locations.map((l) => `- [${l.town}, FL](${U}/service-areas/${l.slug}): ${l.county} County, ZIP ${l.zips.join(', ')}.`).join('\n')}
- Also serves Orange County and the greater Orlando area.

## Company
- [About ${site.name}](${U}/about)
- [Reviews](${U}/reviews)
- [Contact / free quote](${U}/contact-us)

## Blog
${posts.map((p) => `- [${p.data.title}](${U}/blogs/${p.id}): ${p.data.description}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
