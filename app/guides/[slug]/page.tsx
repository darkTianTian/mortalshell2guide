import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guideArticleMap, guideArticles } from "../articles";
import { articleWordCount } from "../types";
import { CURRENT_VERIFICATION, getGuideEnhancement } from "../enhancements";
import FeedbackLink from "../../components/FeedbackLink";
import SiteHeader from "../../components/SiteHeader";
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
  const enhancement = getGuideEnhancement(article);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.heading,
        description: article.description,
        dateModified: article.updatedAt,
        inLanguage: "en",
        mainEntityOfPage: canonical,
        publisher: { "@type": "Organization", name: "Shellbound" },
        image: `${siteUrl}${article.image}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: enhancement.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${siteUrl}/guides` },
          { "@type": "ListItem", position: 3, name: article.heading, item: canonical },
        ],
      },
    ],
  };

  const activeNav = article.slug === "shell-locations"
    ? "shells"
    : article.slug === "weapon-tier-list"
      ? "weapons"
      : article.slug === "bosses"
        ? "bosses"
        : "guides";

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <SiteHeader active={activeNav} />

      <section className={styles.hero}>
        <img src={article.image} alt={article.imageAlt} />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/guides">Guides</a><span aria-hidden="true">/</span><span aria-current="page">{article.heading}</span>
          </nav>
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

          <section className={styles.fieldCard} aria-label="Guide at a glance">
            <div className={styles.fieldStatus}>
              <span>Verification</span>
              <strong>{CURRENT_VERIFICATION}</strong>
            </div>
            <dl>
              <div><dt>Start</dt><dd>{enhancement.start}</dd></div>
              <div><dt>Objective</dt><dd>{enhancement.goal}</dd></div>
              <div><dt>Result</dt><dd>{enhancement.result}</dd></div>
              <div><dt>Watch for</dt><dd>{enhancement.risk}</dd></div>
            </dl>
            <a href={enhancement.mapUrl}>Open the relevant map marker ↗</a>
          </section>

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
                <FeedbackLink
                  className={styles.dataFeedback}
                  context={`Guide section: ${section.heading}`}
                >
                  Report data in this section ↗
                </FeedbackLink>
              </div>
            </section>
          ))}

          <section className={styles.faq}>
            <div><span>Field questions</span><h2>Frequently asked questions</h2></div>
            {enhancement.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
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

    </main>
  );
}
