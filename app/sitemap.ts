import type { MetadataRoute } from "next";
import { guideArticles } from "./guides/articles";
import { latestGuideUpdate } from "./llms-content";
import { MAP_UPDATED_AT } from "./map/map-data";

const siteUrl = "https://mortalshell2guide.org";

const asDate = (date: string) => new Date(`${date}T00:00:00Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  const english: MetadataRoute.Sitemap = [
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
    {
      url: `${siteUrl}/map`,
      lastModified: asDate(MAP_UPDATED_AT),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...guideArticles.map((article) => ({
      url: `${siteUrl}/guides/${article.slug}`,
      lastModified: asDate(article.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
  const localized = ["zh-cn", "zh-hant"].flatMap((locale) => english.map((entry) => ({
    ...entry,
    url: entry.url.replace(siteUrl, `${siteUrl}/${locale}`),
  })));
  return [...english, ...localized];
}
