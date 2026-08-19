import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://mortalshell2guide.org/sitemap.xml",
    host: "https://mortalshell2guide.org",
  };
}
