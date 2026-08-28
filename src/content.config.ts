import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const bulletins = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/bulletins" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(["en", "ne"]),
    pair: z.string(),
    sources: z
      .array(
        z.object({
          name: z.string(),
          url: z.string().url(),
        }),
      )
      .default([]),
  }),
});

export const collections = { bulletins };
