import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { allPosts } from '../lib/blog';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const GET: APIRoute = async () => {
  const posts = await allPosts();
  const items = posts
    .map((p) => `    <item>\n      <title>${esc(p.data.title)}</title>\n      <link>${site.url}/blogs/${p.id}</link>\n      <guid>${site.url}/blogs/${p.id}</guid>\n      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>\n      <description>${esc(p.data.description)}</description>\n    </item>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${esc(site.name)} blog</title>\n    <link>${site.url}/blogs</link>\n    <description>Gutter, siding and exterior advice for Central Florida homeowners.</description>\n    <language>en-us</language>\n${items}\n  </channel>\n</rss>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
