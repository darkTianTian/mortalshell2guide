import type { MetadataRoute } from "next";
import { guideArticles } from "./guides/articles";
import { latestGuideUpdate } from "./llms-content";

const siteUrl = "https://mortalshell2guide.org";

const asDate = (date: string) => new Date(`${date}T00:00:00Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: asDate(latestGuideUpdate),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: asDate(latestGuideUpdate),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...guideArticles.map((article) => ({
      url: `${siteUrl}/guides/${article.slug}`,
      lastModified: asDate(article.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
