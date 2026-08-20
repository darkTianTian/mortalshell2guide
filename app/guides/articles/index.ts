import type { GuideArticle } from "../types";
import { shellArticles } from "./shells";
import { equipmentArticles } from "./equipment";
import { worldArticles } from "./world";
import { trendingArticles } from "./trending";
import { opportunityArticles } from "./opportunities";
import { hubArticles } from "./hubs";
import { remainingShellArticles } from "./remaining-shells";

export const guideArticles: GuideArticle[] = [
  ...shellArticles,
  ...equipmentArticles,
  ...worldArticles,
  ...trendingArticles,
  ...opportunityArticles,
  ...hubArticles,
  ...remainingShellArticles,
];

export const guideArticleMap = new Map(
  guideArticles.map((article) => [article.slug, article]),
);
