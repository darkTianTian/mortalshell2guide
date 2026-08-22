import { guideArticleMap, guideArticles } from "./guides/articles";
import type { GuideArticle } from "./guides/types";
import { CURRENT_VERIFICATION, getGuideEnhancement } from "./guides/enhancements";
import {
  MAP_UPDATED_AT,
  mapCategories,
  mapEditorialSections,
  mapMarkers,
  mapPageMeta,
} from "./map/map-data";

const siteUrl = "https://mortalshell2guide.org";

export const latestGuideUpdate = [...guideArticles.map((article) => article.updatedAt), MAP_UPDATED_AT]
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

Use the linked guides for focused answers. Each article identifies its spoiler level, update date, and verification standard. Details that have not been independently reproduced are labeled provisional instead of presented as confirmed facts.

Latest content update: ${latestGuideUpdate}. The interactive map uses the same versioned source data as the sitemap and full text export.

## Core site

- [Shellbound homepage](${siteUrl}): Main navigation, confirmed game facts, featured guides, and launch resources.
- [All Mortal Shell II guides](${siteUrl}/guides): Human-readable index of every published long-form guide.
- [Mortal Shell 2 interactive map](${mapPageMeta.canonical}): ${mapPageMeta.description}
- [简体中文站点](${siteUrl}/zh-cn): Simplified Chinese guide library with protected official game terminology.
- [繁體中文站點](${siteUrl}/zh-hant): Traditional Chinese guide library with protected official game terminology.

${sections}

## Optional

- [Complete guide corpus](${siteUrl}/llms-full.txt): Full Markdown text of every guide in one file for deep retrieval and offline context.
- [XML sitemap](${siteUrl}/sitemap.xml): Complete index of canonical human-readable pages and their last-modified dates.
- [Robots policy](${siteUrl}/robots.txt): Current crawler access and sitemap declaration.
`;
}

function mapToMarkdown() {
  const categoryLabels = new Map(mapCategories.map((category) => [category.id, category.label]));
  const markers = mapCategories
    .map((category) => {
      const entries = mapMarkers
        .filter((marker) => marker.category === category.id)
        .map((marker) =>
          `- **${marker.title}** — ${marker.region}. ${marker.summary} Route note: ${marker.routeHint}`,
        )
        .join("\n");
      return `## ${categoryLabels.get(category.id)}\n\n${entries}`;
    })
    .join("\n\n");
  const editorial = mapEditorialSections
    .map((section) => `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}`)
    .join("\n\n");
  return `# ${mapPageMeta.title}

Canonical URL: ${mapPageMeta.canonical}
Marker dataset updated: ${MAP_UPDATED_AT}
Marker count: ${mapMarkers.length} curated launch-build essentials
Default spoiler policy: major boss and Corrupted Gate pins hidden until revealed

${mapPageMeta.description}

${editorial}

${markers}`;
}

function articleToMarkdown(article: GuideArticle) {
  const enhancement = getGuideEnhancement(article);
  const sections = article.sections
    .map((section) => {
      const bullets = section.bullets?.length
        ? `\n\n${section.bullets.map((bullet) => `- ${bullet}`).join("\n")}`
        : "";
      return `## ${section.heading}\n\n${section.paragraphs.join("\n\n")}${bullets}`;
    })
    .join("\n\n");
  const related = article.related
    .map((slug) => guideArticleMap.get(slug))
    .filter((item): item is GuideArticle => Boolean(item))
    .map((item) => `- [${item.title}](${articleUrl(item)})`)
    .join("\n");
  const faqs = enhancement.faqs
    .map((faq) => `### ${faq.question}\n\n${faq.answer}`)
    .join("\n\n");

  return `# ${article.title}

Canonical URL: ${articleUrl(article)}  
Primary keyword: ${article.keyword}  
Category: ${article.category}  
Spoiler level: ${article.spoiler}  
Last updated: ${article.updatedAt}
Verification: ${CURRENT_VERIFICATION}

## At a glance

- Start: ${enhancement.start}
- Objective: ${enhancement.goal}
- Result: ${enhancement.result}
- Watch for: ${enhancement.risk}
- Map: ${siteUrl}${enhancement.mapUrl}

## Quick answer

${article.quickAnswer}

## Introduction

${article.intro.join("\n\n")}

${sections}

## Frequently asked questions

${faqs}

## Related guides

${related}`;
}

export function buildLlmsFull() {
  const articles = guideArticles
    .map(articleToMarkdown)
    .join("\n\n---\n\n");

  return `# Shellbound — Complete Mortal Shell II Guide Corpus

> Full Markdown export of the verified Shellbound guide library for retrieval and offline LLM context.

Generated automatically from the same structured article data used by the website, sitemap, metadata, and internal-link system. Latest content update: ${latestGuideUpdate}. Human-readable guide index: ${siteUrl}/guides. Concise LLM index: ${siteUrl}/llms.txt.

Verification policy: official material and current launch-build reporting take priority. Details without independent reproduction remain explicitly provisional.

---

${mapToMarkdown()}

---

${articles}
`;
}
