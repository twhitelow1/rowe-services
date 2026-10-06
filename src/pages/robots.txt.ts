import type { APIRoute } from 'astro';
// Production: open to search engines and AI answer engines (the GEO strategy).
// Anything else: blocked, so previews never compete with the real domain.
export const GET: APIRoute = () => {
  const prod = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';
  const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'meta-externalagent', 'Amazonbot', 'DuckAssistBot'];
  const body = prod
    ? `# Rowe Services & Maintenance\nUser-agent: *\nAllow: /\n\n# AI answer engines and assistants are explicitly welcome.\n${bots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n')}\n\nSitemap: https://rowe-services.com/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
