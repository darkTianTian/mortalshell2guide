import assert from "node:assert/strict";
import { guideArticleMap, guideArticles } from "../app/guides/articles";
import { articleWordCount } from "../app/guides/types";

assert.equal(guideArticles.length, 14, "expected fourteen launch guide pages");
assert.equal(guideArticleMap.size, guideArticles.length, "guide slugs must be unique");

for (const article of guideArticles) {
  const words = articleWordCount(article);
  assert.ok(words >= 600, `${article.slug} has only ${words} words`);
  assert.ok(article.title.length >= 50 && article.title.length <= 60, `${article.slug} title length is ${article.title.length}`);
  assert.ok(article.description.length >= 140 && article.description.length <= 160, `${article.slug} description length is ${article.description.length}`);
  assert.match(article.updatedAt, /^\d{4}-\d{2}-\d{2}$/, `${article.slug} needs an ISO update date`);
  assert.ok(!Number.isNaN(Date.parse(`${article.updatedAt}T00:00:00Z`)), `${article.slug} has an invalid update date`);
  assert.ok(article.sources.length >= 3, `${article.slug} needs at least three sources`);
  assert.ok(article.sources.some((source) => source.type === "Official" || source.type === "Editorial"), `${article.slug} needs a higher-trust source`);
  for (const relatedSlug of article.related) {
    assert.ok(guideArticleMap.has(relatedSlug), `${article.slug} links to missing ${relatedSlug}`);
  }
}

console.log(`Validated ${guideArticles.length} guides: 600+ words, SEO metadata, sources, and internal links.`);
