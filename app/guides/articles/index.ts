import type { GuideArticle } from "../types";
import { shellArticles } from "./shells";
import { equipmentArticles } from "./equipment";
import { worldArticles } from "./world";
import { trendingArticles } from "./trending";

export const guideArticles: GuideArticle[] = [
  ...shellArticles,
  ...equipmentArticles,
  ...worldArticles,
  ...trendingArticles,
];

export const guideArticleMap = new Map(
  guideArticles.map((article) => [article.slug, article]),
);
