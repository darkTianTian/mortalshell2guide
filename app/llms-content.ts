import { guideArticleMap, guideArticles } from "./guides/articles";
import type { GuideArticle } from "./guides/types";

const siteUrl = "https://mortalshell2guide.org";

export const latestGuideUpdate = guideArticles
  .map((article) => article.updatedAt)
  .toSorted()
  .at(-1) ?? "2026-08-20";

const articleUrl = (article: GuideArticle) =>
  `${siteUrl}/guides/${article.slug}`;

export function buildLlmsIndex() {
  const groups = new Map<string, GuideArticle[]>();
  for (const article of guideArticles) {
    const group = groups.get(article.category) ?? [];
    group.push(article);
    groups.set(article.category, group);
  }

  const sections = [...groups.entries()]
    .toSorted(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB))
    .map(([category, articles]) => {
      const links = articles
        .toSorted((articleA, articleB) => articleA.title.localeCompare(articleB.title))
        .map((article) => `- [${article.title}](${articleUrl(article)}): ${article.description}`)
        .join("\n");
      return `## ${category}\n\n${links}`;
    })
    .join("\n\n");

  return `# Shellbound — Mortal Shell II Field Guide

> An independent English-language guide to Mortal Shell II with verified launch-build coverage of Shells, weapons, Tarstones, bosses, key items, progression, and the main story route.

Use the linked guides for focused answers. Each article identifies its spoiler level, update date, verification standard, and research sources. Details that have not been independently reproduced are labeled provisional instead of presented as confirmed facts.

Latest content update: ${latestGuideUpdate}. The interactive map is intentionally excluded until its marker data is verified.

## Core site

- [Shellbound homepage](${siteUrl}): Main navigation, confirmed game facts, featured guides, and launch resources.
- [All Mortal Shell II guides](${siteUrl}/guides): Human-readable index of every published long-form guide.

${sections}

## Optional

- [Complete guide corpus](${siteUrl}/llms-full.txt): Full Markdown text of every guide in one file for deep retrieval and offline context.
- [XML sitemap](${siteUrl}/sitemap.xml): Complete index of canonical human-readable pages and their last-modified dates.
- [Robots policy](${siteUrl}/robots.txt): Current crawler access and sitemap declaration.
- [Official Mortal Shell II website](https://mortalshell.com/): Primary source for official game features, media, and release information.
`;
}

function articleToMarkdown(article: GuideArticle) {
  const sections = article.sections
    .map((section) => {
      const bullets = section.bullets?.length
        ? `\n\n${section.bullets.map((bullet) => `- ${bullet}`).join("\n")}`
        : "";
      return `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}${bullets}`;
    })
    .join("\n\n");
  const sources = article.sources
    .map((source) => `- [${source.label}](${source.url}) — ${source.type}`)
    .join("\n");
  const related = article.related
    .map((slug) => guideArticleMap.get(slug))
    .filter((item): item is GuideArticle => Boolean(item))
    .map((item) => `- [${item.title}](${articleUrl(item)})`)
    .join("\n");

  return `# ${article.title}

Canonical URL: ${articleUrl(article)}  
Primary keyword: ${article.keyword}  
Category: ${article.category}  
Spoiler level: ${article.spoiler}  
Last updated: ${article.updatedAt}

## Quick answer

${article.quickAnswer}

## Introduction

${article.intro.join("\n\n")}

${sections}

## Sources checked

${sources}

## Related guides

${related}`;
}

export function buildLlmsFull() {
  const articles = guideArticles
    .map(articleToMarkdown)
    .join("\n\n---\n\n");

  return `# Shellbound — Complete Mortal Shell II Guide Corpus

> Full Markdown export of the verified Shellbound guide library for retrieval, citation discovery, and offline LLM context.

Generated automatically from the same structured article data used by the website, sitemap, metadata, and internal-link system. Latest content update: ${latestGuideUpdate}. Human-readable guide index: ${siteUrl}/guides. Concise LLM index: ${siteUrl}/llms.txt.

Verification policy: official sources and current launch-build reporting take priority. Community findings are labeled by source type, and details without independent reproduction remain explicitly provisional.

---

${articles}
`;
}
