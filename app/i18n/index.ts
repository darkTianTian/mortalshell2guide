import zhCN from "./generated/zh-CN.json";
import zhHant from "./generated/zh-Hant.json";
import type { GuideArticle } from "../guides/types";
import type { MapMarker } from "../map/map-data";

export type SiteLocale = "en" | "zh-CN" | "zh-Hant";
export type LocaleSegment = "zh-cn" | "zh-hant";

export const localeSegments: LocaleSegment[] = ["zh-cn", "zh-hant"];
export const localeTags: Record<LocaleSegment, Exclude<SiteLocale, "en">> = {
  "zh-cn": "zh-CN",
  "zh-hant": "zh-Hant",
};

const dictionaries: Record<Exclude<SiteLocale, "en">, Record<string, string>> = {
  "zh-CN": zhCN,
  "zh-Hant": zhHant,
};

export function isLocaleSegment(value: string): value is LocaleSegment {
  return localeSegments.includes(value as LocaleSegment);
}

export function localePrefix(locale: SiteLocale) {
  return locale === "en" ? "" : locale === "zh-CN" ? "/zh-cn" : "/zh-hant";
}

export function tr(locale: SiteLocale, key: string, fallback: string) {
  if (locale === "en") return fallback;
  return dictionaries[locale][key] ?? fallback;
}

export function localizedArticle(article: GuideArticle, locale: SiteLocale): GuideArticle {
  if (locale === "en") return article;
  const base = `guide.${article.slug}`;
  return {
    ...article,
    title: tr(locale, `${base}.title`, article.title),
    description: tr(locale, `${base}.description`, article.description),
    heading: tr(locale, `${base}.heading`, article.heading),
    eyebrow: tr(locale, `${base}.eyebrow`, article.eyebrow),
    category: tr(locale, `${base}.category`, article.category),
    keyword: tr(locale, `${base}.keyword`, article.keyword),
    imageAlt: tr(locale, `${base}.imageAlt`, article.imageAlt),
    quickAnswer: tr(locale, `${base}.quickAnswer`, article.quickAnswer),
    intro: article.intro.map((value, index) => tr(locale, `${base}.intro.${index}`, value)),
    sections: article.sections.map((section, sectionIndex) => ({
      ...section,
      heading: tr(locale, `${base}.section.${sectionIndex}.heading`, section.heading),
      paragraphs: section.paragraphs.map((value, index) => tr(locale, `${base}.section.${sectionIndex}.paragraph.${index}`, value)),
      bullets: section.bullets?.map((value, index) => tr(locale, `${base}.section.${sectionIndex}.bullet.${index}`, value)),
    })),
  };
}

export function localizedMarker(marker: MapMarker, locale: SiteLocale): MapMarker {
  if (locale === "en") return marker;
  const base = `map.marker.${marker.id}`;
  return {
    ...marker,
    title: tr(locale, `${base}.title`, marker.title),
    region: tr(locale, `${base}.region`, marker.region),
    summary: tr(locale, `${base}.summary`, marker.summary),
    routeHint: tr(locale, `${base}.routeHint`, marker.routeHint),
    pinType: marker.pinType,
  };
}

export const ui = {
  "zh-CN": {
    menu: "菜单", home: "首页", guides: "全部攻略", map: "互动地图", shells: "躯壳", weapons: "武器", bosses: "首领",
    fieldGuide: "Shellbound 玩家指南", returnHome: "返回首页", onPage: "本页目录", quick: "快速答案", glance: "攻略速览",
    start: "起点", objective: "目标", result: "结果", watch: "注意", openMap: "打开相关地图标记 ↗", faq: "常见问题",
    related: "相关攻略", updated: "更新于", words: "英文原文词数", allGuides: "全部攻略", read: "阅读攻略 ↗",
    heroTitle: "在 Undermether 中活下去。", heroCopy: "路线、躯壳构筑、武器策略与首领准备；减少无谓挫折，同时保留探索乐趣。",
    openCodex: "打开攻略库", openInteractiveMap: "打开互动地图", mapTitle: "Undermether 全域地图",
  },
  "zh-Hant": {
    menu: "選單", home: "首頁", guides: "全部攻略", map: "互動地圖", shells: "軀殼", weapons: "武器", bosses: "頭目",
    fieldGuide: "Shellbound 玩家指南", returnHome: "返回首頁", onPage: "本頁目錄", quick: "快速答案", glance: "攻略速覽",
    start: "起點", objective: "目標", result: "結果", watch: "注意", openMap: "開啟相關地圖標記 ↗", faq: "常見問題",
    related: "相關攻略", updated: "更新於", words: "英文原文詞數", allGuides: "全部攻略", read: "閱讀攻略 ↗",
    heroTitle: "在 Undermether 中活下去。", heroCopy: "路線、軀殼構築、武器策略與頭目準備；減少無謂挫折，同時保留探索樂趣。",
    openCodex: "開啟攻略庫", openInteractiveMap: "開啟互動地圖", mapTitle: "Undermether 全域地圖",
  },
} as const;
