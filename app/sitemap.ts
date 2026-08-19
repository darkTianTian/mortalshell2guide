import type { MetadataRoute } from "next";
import { guideArticles } from "./guides/articles";

const siteUrl = "https://mortalshell2guide.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-08-20T00:00:00+08:00"),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/guides`,
      lastModified: new Date("2026-08-20T00:00:00+08:00"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...guideArticles.map((article) => ({
      url: `${siteUrl}/guides/${article.slug}`,
      lastModified: new Date("2026-08-20T00:00:00+08:00"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
