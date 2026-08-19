import type { MetadataRoute } from "next";

const siteUrl = "https://mortalshell2guide.org/";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-08-20T00:00:00+08:00"),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
