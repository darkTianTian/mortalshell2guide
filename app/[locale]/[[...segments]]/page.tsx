import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MobileNav from "../../components/MobileNav";
import { guideArticleMap, guideArticles } from "../../guides/articles";
import { getGuideEnhancement } from "../../guides/enhancements";
import { articleWordCount, type GuideArticle } from "../../guides/types";
import guideStyles from "../../guides/[slug]/guide.module.css";
import indexStyles from "../../guides/guides.module.css";
import InteractiveMap, { type InteractiveMapCopy } from "../../map/InteractiveMap";
import { MAP_POSITION_AUDIT_AT, mapCategories, mapEditorialSections, mapMarkers, mapPageMeta } from "../../map/map-data";
import mapStyles from "../../map/map.module.css";
import { isLocaleSegment, localePrefix, localeSegments, localeTags, localizedArticle, localizedMarker, tr, ui, type LocaleSegment, type SiteLocale } from "../../i18n";

const siteUrl = "https://mortalshell2guide.org";

type PageProps = { params: Promise<{ locale: string; segments?: string[] }> };

const alternates = (path: string) => ({
  canonical: `${siteUrl}${path}`,
  languages: {
    en: `${siteUrl}${path}`,
    "zh-CN": `${siteUrl}/zh-cn${path === "/" ? "" : path}`,
    "zh-Hant": `${siteUrl}/zh-hant${path === "/" ? "" : path}`,
    "x-default": `${siteUrl}${path}`,
  },
});

export function generateStaticParams() {
  return localeSegments.flatMap((locale) => [
    { locale, segments: [] },
    { locale, segments: ["guides"] },
    { locale, segments: ["map"] },
    ...guideArticles.map((article) => ({ locale, segments: ["guides", article.slug] })),
  ]);
}

function resolveLocale(value: string): { segment: LocaleSegment; locale: Exclude<SiteLocale, "en"> } {
  if (!isLocaleSegment(value)) notFound();
  return { segment: value, locale: localeTags[value] };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, segments = [] } = await params;
  const { locale, segment } = resolveLocale(rawLocale);
  const prefix = `/${segment}`;
  if (!segments.length) {
    const title = locale === "zh-CN" ? "致命躯壳 II 攻略、地图、躯壳与武器指南" : "Mortal Shell II 攻略、地圖、軀殼與武器指南";
    const description = locale === "zh-CN" ? "面向简体中文玩家的 Mortal Shell II 攻略站，包含躯壳、武器、首领、任务、升级路线和互动地图。" : "面向繁體中文玩家的 Mortal Shell II 攻略站，包含軀殼、武器、頭目、任務、升級路線和互動地圖。";
    return { title, description, alternates: { canonical: `${siteUrl}${prefix}`, languages: alternates("/").languages }, openGraph: { title, description, url: `${siteUrl}${prefix}`, images: [`${siteUrl}/og.png`] } };
  }
  if (segments[0] === "guides" && segments.length === 1) {
    const title = locale === "zh-CN" ? "Mortal Shell II 全部简体中文攻略" : "Mortal Shell II 全部繁體中文攻略";
    const description = locale === "zh-CN" ? "浏览全部 Mortal Shell II 简体中文长篇攻略、躯壳构筑、武器、首领、任务与路线。" : "瀏覽全部 Mortal Shell II 繁體中文長篇攻略、軀殼構築、武器、頭目、任務與路線。";
    return { title, description, alternates: { canonical: `${siteUrl}${prefix}/guides`, languages: alternates("/guides").languages } };
  }
  if (segments[0] === "map" && segments.length === 1) {
    const title = tr(locale, "map.meta.title", mapPageMeta.title);
    const description = tr(locale, "map.meta.description", mapPageMeta.description);
    return { title, description, alternates: { canonical: `${siteUrl}${prefix}/map`, languages: alternates("/map").languages }, openGraph: { title, description, url: `${siteUrl}${prefix}/map`, images: [`${siteUrl}/ms2-interactive-world-map.webp`] } };
  }
  if (segments[0] === "guides" && segments[1]) {
    const source = guideArticleMap.get(segments[1]);
    if (!source) return {};
    const article = localizedArticle(source, locale);
    return { title: article.title, description: article.description, alternates: { canonical: `${siteUrl}${prefix}/guides/${article.slug}`, languages: alternates(`/guides/${article.slug}`).languages }, openGraph: { title: article.title, description: article.description, type: "article", url: `${siteUrl}${prefix}/guides/${article.slug}`, images: [{ url: `${siteUrl}${article.image}`, alt: article.imageAlt }] } };
  }
  return {};
}

function LocalHeader({ locale, prefix, active }: { locale: Exclude<SiteLocale, "en">; prefix: string; active: "home" | "guides" | "map" | "shells" | "weapons" | "bosses" }) {
  const copy = ui[locale];
  const labels = { home: copy.home, guides: copy.guides, map: copy.map, shells: copy.shells, weapons: copy.weapons, bosses: copy.bosses };
  return (
    <header className="site-header">
      <a className="wordmark" href={prefix} aria-label={`${copy.home} Mortal Shell II`}><span className="sigil" aria-hidden="true">II</span><span className="wordmark-copy"><strong>Mortal Shell II</strong><small>{copy.fieldGuide}</small></span></a>
      <nav className="desktop-nav" aria-label="Primary navigation"><a href={`${prefix}/guides/shell-locations`}>{copy.shells}</a><a href={`${prefix}/guides/weapon-tier-list`}>{copy.weapons}</a><a href={`${prefix}/guides/bosses`}>{copy.bosses}</a><a href={`${prefix}/map`}>{copy.map}</a><a href={`${prefix}/guides`}>{copy.guides}</a></nav>
      <MobileNav active={active} prefix={prefix} labels={labels} menuLabel={copy.menu} />
    </header>
  );
}

function LocaleHome({ locale }: { locale: Exclude<SiteLocale, "en"> }) {
  const copy = ui[locale];
  const prefix = localePrefix(locale);
  const articles = guideArticles.map((article) => localizedArticle(article, locale));
  return (
    <main lang={locale}>
      <LocalHeader locale={locale} prefix={prefix} active="home" />
      <section className="hero" id="top"><img className="hero-image" src="/ms2-world.webp" alt="Mortal Shell II"/><div className="hero-shade"/><div className="hero-grid" aria-hidden="true"/><div className="hero-content"><p className="eyebrow">Mortal Shell II · Shellbound</p><div className="game-title"><span>Mortal Shell II</span><h1>{copy.heroTitle}</h1></div><p className="hero-lede">{copy.heroCopy}</p><div className="hero-actions"><a className="button button-primary" href={`${prefix}/guides`}>{copy.openCodex} →</a><a className="button button-ghost" href={`${prefix}/map`}>{copy.openInteractiveMap}</a></div></div></section>
      <section className="intel-strip"><div className="intel-label"><span className="ember-dot"/>Mortal Shell II</div><dl><div><dt>8</dt><dd>{copy.shells}</dd></div><div><dt>8</dt><dd>{copy.weapons}</dd></div><div><dt>88</dt><dd>{copy.map}</dd></div><div><dt>37</dt><dd>{copy.guides}</dd></div></dl></section>
      <section className="guide-section"><div className="guide-heading"><div><p className="eyebrow">{copy.allGuides}</p><h2>{copy.guides}</h2></div><a className="button button-ghost" href={`${prefix}/guides`}>{copy.allGuides} →</a></div><div className="guide-grid" style={{ marginTop: 40 }}>{articles.slice(0, 12).map((article, index) => <article className="guide-card" key={article.slug}><div className="guide-topline"><span>{String(index + 1).padStart(2,"0")}</span><span>{article.category}</span></div><div className="guide-body"><h3>{article.heading}</h3><p>{article.quickAnswer}</p></div><div className="guide-bottom"><span>{article.updatedAt}</span><a href={`${prefix}/guides/${article.slug}`}>{copy.read}</a></div></article>)}</div></section>
      <footer><a className="wordmark" href={prefix}><span className="sigil" aria-hidden="true">II</span><span className="wordmark-copy"><strong>Mortal Shell II</strong><small>{copy.fieldGuide}</small></span></a><p>Independent fan guide.</p><a href="#top">↑</a></footer>
    </main>
  );
}

function LocaleGuideIndex({ locale }: { locale: Exclude<SiteLocale, "en"> }) {
  const copy = ui[locale]; const prefix = localePrefix(locale);
  return <main className={indexStyles.page} lang={locale}><header><a href={prefix}>Mortal Shell II</a><span><a href={`${prefix}/map`}>{copy.map}</a> · <a href={prefix}>{copy.home} ↗</a></span><MobileNav active="guides" prefix={prefix} labels={{ home: copy.home, guides: copy.guides, map: copy.map, shells: copy.shells, weapons: copy.weapons, bosses: copy.bosses }} menuLabel={copy.menu}/></header><section className={indexStyles.hero}><p>Mortal Shell II</p><h1>{copy.allGuides}<br/><em>Field Notes.</em></h1><span>{guideArticles.length} {copy.guides} · <a href={`${prefix}/map`}>{copy.map} ↗</a></span></section><section className={indexStyles.grid}>{guideArticles.map((source,index)=>{const article=localizedArticle(source,locale);return <a href={`${prefix}/guides/${article.slug}`} key={article.slug}><span>{String(index+1).padStart(2,"0")} / {article.category}</span><h2>{article.heading}</h2><p>{article.quickAnswer}</p><i>{copy.read}</i></a>})}</section></main>;
}

function LocaleGuide({ locale, source }: { locale: Exclude<SiteLocale, "en">; source: GuideArticle }) {
  const copy=ui[locale]; const prefix=localePrefix(locale); const article=localizedArticle(source,locale); const originalExtra=getGuideEnhancement(source); const base=`guide.${source.slug}`;
  const extra={...originalExtra,start:tr(locale,`${base}.enhancement.start`,originalExtra.start),goal:tr(locale,`${base}.enhancement.goal`,originalExtra.goal),result:tr(locale,`${base}.enhancement.result`,originalExtra.result),risk:tr(locale,`${base}.enhancement.risk`,originalExtra.risk),faqs:originalExtra.faqs.map((faq,index)=>({question:tr(locale,`${base}.faq.${index}.question`,faq.question),answer:tr(locale,`${base}.faq.${index}.answer`,faq.answer)}))};
  const related=source.related.map((slug)=>guideArticleMap.get(slug)).filter((item):item is GuideArticle=>Boolean(item)).map((item)=>localizedArticle(item,locale));
  return <main className={guideStyles.page} lang={locale}><header className={guideStyles.header}><a className={guideStyles.brand} href={prefix}><span aria-hidden="true">II</span><div><strong>Mortal Shell II</strong><small>{copy.fieldGuide}</small></div></a><nav><a href={`${prefix}/guides`}>{copy.guides}</a><a href={`${prefix}/map`}>{copy.map}</a><a href={`${prefix}/guides/shell-locations`}>{copy.shells}</a><a href={`${prefix}/guides/weapon-tier-list`}>{copy.weapons}</a></nav><MobileNav active="guides" prefix={prefix} labels={{ home: copy.home, guides: copy.guides, map: copy.map, shells: copy.shells, weapons: copy.weapons, bosses: copy.bosses }} menuLabel={copy.menu}/></header><section className={guideStyles.hero}><img src={article.image} alt={article.imageAlt}/><div className={guideStyles.heroShade}/><div className={guideStyles.heroContent}><div className={guideStyles.breadcrumbs}><a href={prefix}>{copy.home}</a><span>/</span><a href={`${prefix}/guides`}>{copy.guides}</a><span>/</span><span>{article.category}</span></div><p className={guideStyles.eyebrow}>{article.eyebrow}</p><h1>{article.heading}</h1><div className={guideStyles.meta}><span>{tr(locale,`${base}.spoiler`,source.spoiler)}</span><span>{copy.updated} {article.updatedAt}</span><span>{articleWordCount(source).toLocaleString("en-US")} {copy.words}</span></div></div></section><div className={guideStyles.articleLayout}><aside className={guideStyles.sidebar}><span>{copy.onPage}</span><ol>{article.sections.map((section,index)=><li key={section.heading}><a href={`#section-${index+1}`}>{section.heading}</a></li>)}</ol></aside><article className={guideStyles.article}><div className={guideStyles.quickAnswer}><span>{copy.quick}</span><p>{article.quickAnswer}</p></div><section className={guideStyles.fieldCard}><div className={guideStyles.fieldStatus}><span>{copy.glance}</span><strong>Balance Patch 1</strong></div><dl><div><dt>{copy.start}</dt><dd>{extra.start}</dd></div><div><dt>{copy.objective}</dt><dd>{extra.goal}</dd></div><div><dt>{copy.result}</dt><dd>{extra.result}</dd></div><div><dt>{copy.watch}</dt><dd>{extra.risk}</dd></div></dl><a href={`${prefix}${extra.mapUrl}`}>{copy.openMap}</a></section><div className={guideStyles.intro}>{article.intro.map((p)=><p key={p}>{p}</p>)}</div>{article.sections.map((section,index)=><section className={guideStyles.section} id={`section-${index+1}`} key={section.heading}><div className={guideStyles.sectionNumber}>{String(index+1).padStart(2,"0")}</div><div><h2>{section.heading}</h2>{section.paragraphs.map((p)=><p key={p}>{p}</p>)}{section.bullets&&<ul>{section.bullets.map((b)=><li key={b}>{b}</li>)}</ul>}</div></section>)}<section className={guideStyles.faq}><div><span>FAQ</span><h2>{copy.faq}</h2></div>{extra.faqs.map((faq)=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section></article></div><section className={guideStyles.related}><div><p className={guideStyles.eyebrow}>Mortal Shell II</p><h2>{copy.related}</h2></div><div className={guideStyles.relatedGrid}>{related.map((item)=><a href={`${prefix}/guides/${item.slug}`} key={item.slug}><span>{item.category}</span><h3>{item.heading}</h3><p>{item.quickAnswer}</p><i>{copy.read}</i></a>)}</div></section></main>;
}

function LocaleMap({ locale }: { locale: Exclude<SiteLocale,"en"> }) {
  const copy=ui[locale]; const prefix=localePrefix(locale); const categories=mapCategories.map((c)=>({...c,label:tr(locale,`map.category.${c.id}.label`,c.label),shortLabel:tr(locale,`map.category.${c.id}.shortLabel`,c.shortLabel)})); const markers=mapMarkers.map((m)=>localizedMarker(m,locale));
  const mapCopy:Partial<InteractiveMapCopy>=locale==="zh-CN"?{kicker:"零售版地图 // 已核验标记",title:"找到下一项能够改变流程的关键内容。",searchPlaceholder:"搜索躯壳、武器、地区……",clearSearch:"清除搜索",revealSpoilers:"显示首领剧透",hideSpoilers:"首领剧透已显示",positionStandard:"位置标准",exactPosition:"精确位置",interiorAnchor:"室内锚点",routeAnchor:"路线锚点",exactDescription:"当前零售版地图上的精确坐标。",interiorDescription:"已核验室内或地牢区域；具体房间请看路线说明。",routeDescription:"已核验路线起点或任务状态位置，并非奖励所在像素。",dragCaption:"拖动平移 · 使用滚轮或按钮缩放 · 标记会区分精确位置、室内锚点和路线锚点。",visible:"可见",found:"已找到",routeNote:"路线说明",markFound:"标记为已找到",markedFound:"✓ 已找到",openGuide:"打开完整攻略 ↗",visibleMarkers:"可见标记",noMarker:"没有可见标记",noMarkerHelp:"清除搜索、重新启用分类或显示首领剧透。",reset:"重置"}:{kicker:"零售版地圖 // 已核驗標記",title:"找到下一項能夠改變流程的關鍵內容。",searchPlaceholder:"搜尋軀殼、武器、地區……",clearSearch:"清除搜尋",revealSpoilers:"顯示頭目劇透",hideSpoilers:"頭目劇透已顯示",positionStandard:"位置標準",exactPosition:"精確位置",interiorAnchor:"室內錨點",routeAnchor:"路線錨點",exactDescription:"目前零售版地圖上的精確座標。",interiorDescription:"已核驗室內或地牢區域；具體房間請看路線說明。",routeDescription:"已核驗路線起點或任務狀態位置，並非獎勵所在像素。",dragCaption:"拖曳平移 · 使用滾輪或按鈕縮放 · 標記會區分精確位置、室內錨點和路線錨點。",visible:"可見",found:"已找到",routeNote:"路線說明",markFound:"標記為已找到",markedFound:"✓ 已找到",openGuide:"開啟完整攻略 ↗",visibleMarkers:"可見標記",noMarker:"沒有可見標記",noMarkerHelp:"清除搜尋、重新啟用分類或顯示頭目劇透。",reset:"重設"};
  return <main className={mapStyles.page} lang={locale}><header className={mapStyles.header}><a className={mapStyles.brand} href={prefix}><span aria-hidden="true">II</span><div><strong>Mortal Shell II</strong><small>{copy.fieldGuide}</small></div></a><nav><a href={`${prefix}/guides`}>{copy.guides}</a><a href={`${prefix}/guides/shell-locations`}>{copy.shells}</a><a href={`${prefix}/guides/weapon-tier-list`}>{copy.weapons}</a><a href={`${prefix}/guides/bosses`}>{copy.bosses}</a></nav><MobileNav active="map" prefix={prefix} labels={{ home: copy.home, guides: copy.guides, map: copy.map, shells: copy.shells, weapons: copy.weapons, bosses: copy.bosses }} menuLabel={copy.menu}/></header><section className={mapStyles.hero}><img className={mapStyles.heroImage} src="/ms2-interactive-world-map.webp" alt="Mortal Shell II world map"/><div className={mapStyles.heroShade}/><div className={mapStyles.heroGrid}/><div className={mapStyles.heroContent}><div className={mapStyles.breadcrumbs}><a href={prefix}>{copy.home}</a><span>/</span><span>{copy.map}</span></div><p className={mapStyles.kicker}>Mortal Shell II</p><h1>{tr(locale,"map.meta.heading",mapPageMeta.heading)}</h1><p className={mapStyles.heroLede}>{tr(locale,"map.meta.description",mapPageMeta.description)}</p><div className={mapStyles.heroMeta}><span>{markers.length} markers</span><span>{MAP_POSITION_AUDIT_AT}</span></div></div></section><InteractiveMap markers={markers} categories={categories} localePrefix={prefix} copy={mapCopy}/><section className={mapStyles.editorial}><aside className={mapStyles.editorialAside}><span>Mortal Shell II</span><p>{copy.mapTitle}</p></aside><div className={mapStyles.editorialBody}>{mapEditorialSections.map((section,sectionIndex)=><section className={mapStyles.editorialSection} key={section.heading}><span>{String(sectionIndex+1).padStart(2,"0")}</span><div><h2>{tr(locale,`map.editorial.${sectionIndex}.heading`,section.heading)}</h2>{section.paragraphs.map((p,index)=><p key={p}>{tr(locale,`map.editorial.${sectionIndex}.paragraph.${index}`,p)}</p>)}</div></section>)}</div></section></main>;
}

export default async function LocalizedRoute({ params }: PageProps) {
  const { locale: rawLocale, segments=[] }=await params; const { locale }=resolveLocale(rawLocale);
  if(!segments.length)return <LocaleHome locale={locale}/>;
  if(segments.length===1&&segments[0]==="guides")return <LocaleGuideIndex locale={locale}/>;
  if(segments.length===1&&segments[0]==="map")return <LocaleMap locale={locale}/>;
  if(segments[0]==="guides"&&segments[1]){const source=guideArticleMap.get(segments[1]);if(!source)notFound();return <LocaleGuide locale={locale} source={source}/>;}
  notFound();
}
