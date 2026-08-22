import type { Metadata } from "next";
import { guideArticles } from "./articles";
import MobileNav from "../components/MobileNav";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Mortal Shell 2 Guides, Builds, Bosses, and Locations",
  description: "Browse verified Mortal Shell 2 guides for Shell locations, Tarstones, weapons, bosses, progression, key items, builds, and the full story route.",
  alternates: { canonical: "https://mortalshell2guide.org/guides" },
};

export default function GuidesIndex() {
  return (
    <main className={styles.page}>
      <header><a href="/">Mortal Shell II</a><span><a href="/map">Interactive map</a> · <a href="/">Home ↗</a></span><MobileNav /></header>
      <section className={styles.hero}>
        <p>Verified launch-build coverage</p>
        <h1>Mortal Shell II<br /><em>Field Notes.</em></h1>
        <span>{guideArticles.length} independent guides // <a href="/map">Interactive map live ↗</a></span>
      </section>
      <section className={styles.grid}>
        {guideArticles.map((article, index) => (
          <a href={`/guides/${article.slug}`} key={article.slug}>
            <span>{String(index + 1).padStart(2, "0")} / {article.category}</span>
            <h2>{article.heading}</h2>
            <p>{article.quickAnswer}</p>
            <i>Read guide ↗</i>
          </a>
        ))}
      </section>
    </main>
  );
}
