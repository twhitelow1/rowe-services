import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    dateEstimated: z.boolean().optional(),
    service: z.enum(['seamless-gutters', 'soffit-and-fascia', 'vinyl-siding', 'porches-and-enclosures']).optional(),
    town: z.string().optional(),
    seoTitle: z.string().max(65).optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { blog, pages };
