import assert from "node:assert/strict";
import { guideArticleMap, guideArticles } from "../app/guides/articles";
import { articleWordCount } from "../app/guides/types";
import {
  mapCategories,
  mapEditorialWordCount,
  mapMarkers,
  mapPageMeta,
  mapSources,
} from "../app/map/map-data";

assert.equal(guideArticles.length, 19, "expected nineteen launch guide pages");
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

assert.ok(mapEditorialWordCount() >= 600, `map page has only ${mapEditorialWordCount()} editorial words`);
assert.ok(mapPageMeta.title.length >= 50 && mapPageMeta.title.length <= 60, `map title length is ${mapPageMeta.title.length}`);
assert.ok(mapPageMeta.description.length >= 140 && mapPageMeta.description.length <= 160, `map description length is ${mapPageMeta.description.length}`);
assert.equal(mapMarkers.length, 59, "expected 59 curated launch map markers");
assert.equal(new Set(mapMarkers.map((marker) => marker.id)).size, mapMarkers.length, "map marker ids must be unique");
assert.deepEqual(
  Object.fromEntries(mapCategories.map((category) => [category.id, mapMarkers.filter((marker) => marker.category === category.id).length])),
  { hub: 7, shell: 8, weapon: 8, tarstone: 7, fragment: 11, key: 2, gate: 6, boss: 10 },
  "map category counts changed unexpectedly",
);
for (const marker of mapMarkers) {
  assert.ok(marker.x >= 1 && marker.x <= 99 && marker.y >= 1 && marker.y <= 99, `${marker.id} is outside map bounds`);
  assert.ok(marker.sourceIds.length >= 2, `${marker.id} needs at least two sources`);
  for (const sourceId of marker.sourceIds) {
    assert.ok(mapSources[sourceId], `${marker.id} references missing source ${sourceId}`);
  }
}

console.log(`Validated ${guideArticles.length} guides and ${mapMarkers.length} map markers: long-form copy, SEO metadata, sources, and internal links.`);
