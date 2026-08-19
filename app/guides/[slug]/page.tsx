import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideArticleMap, guideArticles } from "../articles";
import { articleWordCount } from "../types";
import styles from "./guide.module.css";

const siteUrl = "https://mortalshell2guide.org";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = guideArticleMap.get(slug);
  if (!article) return {};
  const canonical = `${siteUrl}/guides/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: canonical,
      siteName: "Shellbound",
      images: [{ url: `${siteUrl}${article.image}`, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [`${siteUrl}${article.image}`],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const article = guideArticleMap.get(slug);
  if (!article) notFound();

  const related = article.related
    .map((relatedSlug) => guideArticleMap.get(relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const canonical = `${siteUrl}/guides/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.heading,
    description: article.description,
    dateModified: "2026-08-20",
    inLanguage: "en",
    mainEntityOfPage: canonical,
    publisher: { "@type": "Organization", name: "Shellbound" },
    image: `${siteUrl}${article.image}`,
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <span aria-hidden="true">S</span>
          <div><strong>Shellbound</strong><small>Mortal Shell II codex</small></div>
        </Link>
        <nav aria-label="Guide navigation">
          <Link href="/guides">All guides</Link>
          <Link href="/map">Map</Link>
          <Link href="/guides/shell-locations">Shells</Link>
          <Link href="/guides/weapon-tier-list">Weapons</Link>
        </nav>
        <Link className={styles.homeLink} href="/">Return home ↗</Link>
      </header>

      <section className={styles.hero}>
        <img src={article.image} alt={article.imageAlt} />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{article.category}</span>
          </div>
          <p className={styles.eyebrow}>{article.eyebrow}</p>
          <h1>{article.heading}</h1>
          <div className={styles.meta}>
            <span>{article.spoiler}</span>
            <span>Updated {article.updated}</span>
            <span>{articleWordCount(article).toLocaleString("en-US")} words</span>
          </div>
        </div>
      </section>

      <div className={styles.articleLayout}>
        <aside className={styles.sidebar}>
          <span>On this page</span>
          <ol>
            {article.sections.map((section, index) => (
              <li key={section.heading}>
                <a href={`#section-${index + 1}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
          <div className={styles.verification}>
            <strong>Verification standard</strong>
            <p>Named facts are cross-checked against official material and current launch-build reporting. Unconfirmed details are labeled instead of guessed.</p>
          </div>
        </aside>

        <article className={styles.article}>
          <div className={styles.quickAnswer}>
            <span>Quick answer</span>
            <p>{article.quickAnswer}</p>
          </div>

          <div className={styles.intro}>
            {article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          {article.sections.map((section, index) => (
            <section className={styles.section} id={`section-${index + 1}`} key={section.heading}>
              <div className={styles.sectionNumber}>{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                )}
              </div>
            </section>
          ))}

          <section className={styles.sources}>
            <div><span>Research log</span><h2>Sources checked</h2></div>
            <ul>
              {article.sources.map((source) => (
                <li key={source.url}>
                  <span>{source.type}</span>
                  <a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>

      <section className={styles.related}>
        <div><p className={styles.eyebrow}>Continue the run</p><h2>Related field notes</h2></div>
        <div className={styles.relatedGrid}>
          {related.map((item) => (
            <a href={`/guides/${item.slug}`} key={item.slug}>
              <span>{item.category}</span><h3>{item.heading}</h3><p>{item.quickAnswer}</p><i>Read guide ↗</i>
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Independent fan guide. Game names and official imagery belong to Cold Symmetry and Playstack.</p>
        <Link href="/">Shellbound home ↑</Link>
      </footer>
    </main>
  );
}
