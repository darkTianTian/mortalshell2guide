export type GuideSource = {
  label: string;
  url: string;
  type: "Official" | "Editorial" | "Community";
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  heading: string;
  eyebrow: string;
  category: string;
  keyword: string;
  spoiler: "Spoiler-light" | "Gameplay spoilers" | "Major spoilers";
  updated: string;
  updatedAt: string;
  image: string;
  imageAlt: string;
  quickAnswer: string;
  intro: string[];
  sections: GuideSection[];
  sources: GuideSource[];
  related: string[];
};

export function articleWordCount(article: GuideArticle) {
  const text = [
    article.quickAnswer,
    ...article.intro,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ].join(" ");

  return text.trim().split(/\s+/).filter(Boolean).length;
}
