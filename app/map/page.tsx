import type { Metadata } from "next";
import InteractiveMap from "./InteractiveMap";
import MobileNav from "../components/MobileNav";
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
  alternates: { canonical: mapPageMeta.canonical },
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
    "@type": "WebApplication",
    name: "Shellbound Mortal Shell 2 Interactive Map",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    inLanguage: "en",
    url: mapPageMeta.canonical,
    description: mapPageMeta.description,
    dateModified: MAP_UPDATED_AT,
    isAccessibleForFree: true,
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className={styles.header}>
        <a className={styles.brand} href="/">
          <span aria-hidden="true">II</span>
          <div><strong>Mortal Shell II</strong><small>Shellbound field guide</small></div>
        </a>
        <nav aria-label="Map navigation">
          <a href="/guides">All guides</a>
          <a href="/guides/shell-locations">Shells</a>
          <a href="/guides/weapon-tier-list">Weapons</a>
          <a href="/guides/bosses">Bosses</a>
        </nav>
        <MobileNav />
        <a className={styles.homeLink} href="/">Return home ↗</a>
      </header>

      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/ms2-interactive-world-map.webp"
          alt="The complete Mortal Shell II world map seen through dark fog"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.breadcrumbs}>
            <a href="/">Home</a><span>/</span><span>Interactive map</span>
          </div>
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

      <footer className={styles.footer}>
        <span>
          Independent fan guide. Base map art © Cold Symmetry and Playstack; used for
          editorial identification. Marker text and interface © Shellbound.
        </span>
        <a href="/">Shellbound home ↑</a>
      </footer>
    </main>
  );
}
