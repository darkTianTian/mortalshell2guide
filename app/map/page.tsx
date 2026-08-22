import type { Metadata } from "next";
import InteractiveMap from "./InteractiveMap";
import SiteHeader from "../components/SiteHeader";
import {
  MAP_UPDATED_AT,
  MAP_POSITION_AUDIT_AT,
  mapEditorialSections,
  mapEditorialWordCount,
  mapMarkers,
  mapPageMeta,
} from "./map-data";
import styles from "./map.module.css";

export const metadata: Metadata = {
  title: mapPageMeta.title,
  description: mapPageMeta.description,
  alternates: { canonical: mapPageMeta.canonical, languages: { en: mapPageMeta.canonical, "zh-CN": "https://mortalshell2guide.org/zh-cn/map", "zh-Hant": "https://mortalshell2guide.org/zh-hant/map", "x-default": mapPageMeta.canonical } },
  openGraph: {
    title: mapPageMeta.title,
    description: mapPageMeta.description,
    type: "website",
    url: mapPageMeta.canonical,
    siteName: "Shellbound",
    images: [
      {
        url: "https://mortalshell2guide.org/ms2-interactive-world-map.webp",
        width: 3000,
        height: 3000,
        alt: "Complete fog-free Mortal Shell II world map",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: mapPageMeta.title,
    description: mapPageMeta.description,
    images: ["https://mortalshell2guide.org/ms2-interactive-world-map.webp"],
  },
};

export default function MapPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Shellbound Mortal Shell 2 Interactive Map",
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        inLanguage: "en",
        url: mapPageMeta.canonical,
        description: mapPageMeta.description,
        dateModified: MAP_UPDATED_AT,
        isAccessibleForFree: true,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://mortalshell2guide.org" },
          { "@type": "ListItem", position: 2, name: "Interactive map", item: mapPageMeta.canonical },
        ],
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <SiteHeader active="map" />

      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/ms2-interactive-world-map.webp"
          alt="The complete Mortal Shell II world map seen through dark fog"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Interactive map</span>
          </nav>
          <p className={styles.kicker}>World record // Launch build 1.0</p>
          <h1>{mapPageMeta.heading}</h1>
          <p className={styles.heroLede}>
            A zoomable retail map with cross-checked exact positions and clearly labeled
            interior or route anchors for Shells, gear, keys, fragments, Gates, and bosses.
          </p>
          <div className={styles.heroMeta}>
            <span>{mapMarkers.length} essential markers</span>
            <span>Boss spoiler shield</span>
            <span>Progress saved on this device</span>
            <span>Positions audited {MAP_POSITION_AUDIT_AT}</span>
          </div>
        </div>
      </section>

      <InteractiveMap />

      <section className={styles.editorial} aria-label="Interactive map guide">
        <aside className={styles.editorialAside}>
          <span>Field manual</span>
          <p>
            {mapEditorialWordCount().toLocaleString("en-US")} words explaining scope,
            controls, versioning, and a low-spoiler route order.
          </p>
        </aside>
        <div className={styles.editorialBody}>
          {mapEditorialSections.map((section, index) => (
            <section className={styles.editorialSection} key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}

        </div>
      </section>

    </main>
  );
}
