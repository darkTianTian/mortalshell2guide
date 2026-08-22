import type { Metadata } from "next";
import { guideArticles } from "./articles";
import SiteHeader from "../components/SiteHeader";
import styles from "./guides.module.css";

const siteUrl = "https://mortalshell2guide.org";

export const metadata: Metadata = {
  title: "Mortal Shell 2 Guides, Builds, Bosses, and Locations",
  description: "Browse verified Mortal Shell 2 guides for Shell locations, Tarstones, weapons, bosses, progression, key items, builds, and the full story route.",
  alternates: { canonical: "https://mortalshell2guide.org/guides", languages: { en: "https://mortalshell2guide.org/guides", "zh-CN": "https://mortalshell2guide.org/zh-cn/guides", "zh-Hant": "https://mortalshell2guide.org/zh-hant/guides", "x-default": "https://mortalshell2guide.org/guides" } },
};

export default function GuidesIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader active="guides" variant="solid" />
      <section className={styles.hero}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Guides</span>
        </nav>
        <p>Verified launch-build coverage</p>
        <h1>Mortal Shell II<br /><em>Field Notes.</em></h1>
        <span>{guideArticles.length} independent guides // <a href="/map">Interactive map live ↗</a></span>
      </section>
      <section className={styles.grid}>
        {guideArticles.map((article, index) => (
          <a href={`/guides/${article.slug}`} key={article.slug}>
            <span>{String(index + 1).padStart(2, "0")} / {article.category}</span>
            <h2>{article.heading}</h2>
            <p>{article.quickAnswer}</p>
            <i>Read guide ↗</i>
          </a>
        ))}
      </section>
    </main>
  );
}
