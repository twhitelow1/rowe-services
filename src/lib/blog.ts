import { getCollection, type CollectionEntry } from 'astro:content';
import { locations } from '../data/locations';

export type Post = CollectionEntry<'blog'>;

export async function allPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// A post belongs to a town if its frontmatter names it OR the title mentions it
// (several posts cover two towns, e.g. "Leesburg and Tavares").
export function townsOf(p: Post) {
  return locations.filter((l) => p.data.town === l.town || p.data.title.toLowerCase().includes(l.town.toLowerCase()));
}

export const postsForService = (posts: Post[], slug: string) => posts.filter((p) => p.data.service === slug);
export const postsForTown = (posts: Post[], slug: string) => posts.filter((p) => townsOf(p).some((l) => l.slug === slug));

export const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
