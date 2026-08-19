"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Guide = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  difficulty: "Essential" | "Field note" | "Deep dive";
};

const guides: Guide[] = [
  {
    id: "shell-locations",
    category: "Shells",
    title: "Find all eight Shells",
    excerpt:
      "The verified launch roster, built-in location reveals, Glimpse costs, and a safe unlock order.",
    readTime: "8 min",
    difficulty: "Essential",
  },
  {
    id: "tarstones",
    category: "Arsenal",
    title: "Build with Tarstones",
    excerpt:
      "All four categories, slot limits, the strongest verified launch picks, and retail locations.",
    readTime: "8 min",
    difficulty: "Essential",
  },
  {
    id: "shell-tier-list",
    category: "Shells",
    title: "Shell tier list",
    excerpt:
      "Tiel, Eredrim, Proxima, Genessa, and the complete roster ranked by verified launch roles.",
    readTime: "7 min",
    difficulty: "Field note",
  },
  {
    id: "weapon-tier-list",
    category: "Arsenal",
    title: "Weapon tier list",
    excerpt:
      "Axe and Dagger, Axatana, heavy control weapons, and sidearms ranked by practical value.",
    readTime: "7 min",
    difficulty: "Deep dive",
  },
  {
    id: "baghead",
    category: "World",
    title: "Baghead ending explained",
    excerpt:
      "Where the returning NPC appears, what the surprise credits mean, and what progress you keep.",
    readTime: "6 min",
    difficulty: "Field note",
  },
  {
    id: "duality-stone",
    category: "Arsenal",
    title: "Duality Stone tested",
    excerpt:
      "What the reported double-strike effect changes, how to test it, and what remains unverified.",
    readTime: "7 min",
    difficulty: "Deep dive",
  },
  {
    id: "bosses",
    category: "Bosses",
    title: "All major bosses",
    excerpt:
      "Six Corrupted Gates, three Unfound Path guardians, rewards, summons, and final preparation.",
    readTime: "8 min",
    difficulty: "Deep dive",
  },
  {
    id: "walkthrough",
    category: "Routes",
    title: "Main story walkthrough",
    excerpt:
      "The verified campaign spine from the prologue through six gates, Unfound Path, and Zmey.",
    readTime: "9 min",
    difficulty: "Field note",
  },
];

const categories = [
  "All",
  "Shells",
  "Arsenal",
  "Bosses",
  "World",
  "Routes",
];

const paths = [
  {
    index: "01",
    label: "Shells",
    title: "Possess the fallen",
    copy: "Eight warriors. Eight ways to survive.",
    image: "/ms2-shot-03.webp",
    alt: "An armored Mortal Shell II warrior wielding a hooked polearm against a towering creature",
    href: "/guides/shell-locations",
  },
  {
    index: "02",
    label: "Arsenal",
    title: "Choose your violence",
    copy: "Weapons, sidearms, posture breaks, upgrades.",
    image: "/ms2-shot-12.webp",
    alt: "A heavily armored Mortal Shell II warrior swinging a broad axe through a group of enemies",
    href: "/guides/weapon-tier-list",
  },
  {
    index: "03",
    label: "Bestiary",
    title: "Know what hunts you",
    copy: "Enemy reads and spoiler-shielded boss prep.",
    image: "/ms2-shot-04.webp",
    alt: "A mysterious Mortal Shell II figure playing an accordion in a firelit cavern",
    href: "/guides/bosses",
  },
  {
    index: "04",
    label: "World",
    title: "Chart the Undermether",
    copy: "Zoom, filter, search, and track 59 verified essentials.",
    image: "/ms2-combat.webp",
    alt: "A ruined stone fortress under a gray sky in Mortal Shell II",
    href: "/map",
  },
];

const routeSteps = [
  {
    time: "00—20",
    title: "Learn the threat cycle",
    copy: "Engage. Harden. Punish. Disengage. Use the opening enemies to isolate one action at a time.",
  },
  {
    time: "20—50",
    title: "Open the first region",
    copy: "Touch the main path, then turn around. Short detours teach the region's visual language at lower risk.",
  },
  {
    time: "50—90",
    title: "Commit to one loop",
    copy: "Choose a weapon rhythm you can reproduce under pressure. Upgrade consistency before novelty.",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredGuides = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return guides.filter((guide) => {
      const inCategory = category === "All" || guide.category === category;
      const inSearch =
        !normalized ||
        [guide.title, guide.excerpt, guide.category].some((value) =>
          value.toLowerCase().includes(normalized),
        );
      return inCategory && inSearch;
    });
  }, [category, query]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Shellbound home">
          <span className="sigil" aria-hidden="true">S</span>
          <span className="wordmark-copy">
            <strong>Shellbound</strong>
            <small>Mortal Shell II codex</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/guides/shell-locations">Shells</Link>
          <Link href="/guides/weapon-tier-list">Arsenal</Link>
          <Link href="/guides/bosses">Bosses</Link>
          <Link href="/map">Map</Link>
          <Link href="/guides">All Guides</Link>
        </nav>
        <a className="launch-status" href="#intel">
          <span /> Launch build 1.0
        </a>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/ms2-world.webp"
          alt="A warrior approaching a towering enemy between burning torches in Mortal Shell II"
        />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Unofficial player codex // Spoiler shield active</p>
          <div className="game-title">
            <span>Mortal Shell II</span>
            <h1>Survive the<br />Undermether.</h1>
          </div>
          <p className="hero-lede">
            Routes, Shell builds, weapon doctrine, and boss preparation—written
            to make you dangerous without taking discovery away from you.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#route">
              Begin the first route <span aria-hidden="true">→</span>
            </a>
            <Link className="button button-ghost" href="/guides">
              Open the codex
            </Link>
          </div>
        </div>

        <div className="hero-feature">
          <div className="feature-number">01</div>
          <div>
            <span>Featured field note</span>
            <strong>What to do before the first false god</strong>
          </div>
          <Link href="/guides/bosses" aria-label="Read the featured field note">↗</Link>
        </div>

        <div className="hero-rail" aria-hidden="true">
          <span>Cold Symmetry</span>
          <i />
          <span>Field record // 0820</span>
        </div>
      </section>

      <section className="intel-strip" id="intel" aria-label="Confirmed game facts">
        <div className="intel-label">
          <span className="ember-dot" /> Confirmed game intel
        </div>
        <dl>
          <div><dt>8</dt><dd>Playable Shells</dd></div>
          <div><dt>60+</dt><dd>Dungeons</dd></div>
          <div><dt>∞</dt><dd>No stamina bar</dd></div>
          <div><dt>20.08.26</dt><dd>Worldwide launch</dd></div>
        </dl>
      </section>

      <section className="path-section" id="paths">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Choose your path</p>
            <h2>Everything that can kill you.<br /><em>Catalogued.</em></h2>
          </div>
          <p>
            Start with the system giving you trouble. Every path favors useful
            decisions over exhaustive lists and keeps story spoilers behind a warning.
          </p>
        </div>

        <div className="path-grid">
          {paths.map((path) => (
            <a className="path-card" href={path.href} key={path.label}>
              <img src={path.image} alt={path.alt} />
              <span className="path-shade" />
              <div className="path-index">/{path.index}</div>
              <div className="path-content">
                <span>{path.label}</span>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
              </div>
              <div className="path-arrow" aria-hidden="true">↗</div>
            </a>
          ))}
        </div>
      </section>

      <section className="doctrine-section">
        <img
          src="/ms2-shot-12.webp"
          alt="A Mortal Shell II warrior fighting several enemies with a heavy axe"
        />
        <div className="doctrine-shade" />
        <div className="doctrine-copy">
          <p className="eyebrow">Combat doctrine // 001</p>
          <h2>No stamina.<br />No excuses.</h2>
          <p>
            Freedom from a stamina gauge changes the question. You are no longer
            asking whether you can swing—you are asking whether the enemy can answer.
          </p>
          <Link href="/guides/tarstones">Study the combat system <span>→</span></Link>
        </div>
        <ol className="doctrine-list">
          <li><span>01</span><strong>Close distance</strong><small>Make them commit first.</small></li>
          <li><span>02</span><strong>Harden on impact</strong><small>Turn defense into pressure.</small></li>
          <li><span>03</span><strong>Break posture</strong><small>Create the critical window.</small></li>
          <li><span>04</span><strong>Execute</strong><small>End the exchange cleanly.</small></li>
        </ol>
      </section>

      <section className="guide-section" id="guides">
        <div className="guide-heading">
          <div>
            <p className="eyebrow">Search the archive</p>
            <h2>Field notes</h2>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Search guides</span>
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Shells, weapons, bosses…"
            />
            <kbd>/</kbd>
          </label>
        </div>

        <div className="filter-row">
          <div className="filter-list" aria-label="Filter guides by category">
            {categories.map((item) => (
              <button
                className={category === item ? "active" : ""}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
          <span>{String(filteredGuides.length).padStart(2, "0")} entries</span>
        </div>

        {filteredGuides.length ? (
          <div className="guide-grid">
            {filteredGuides.map((guide, index) => (
              <article className="guide-card" id={guide.id} key={guide.id}>
                <div className="guide-topline">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{guide.category}</span>
                </div>
                <div className="guide-body">
                  <span className={`difficulty ${guide.difficulty.replace(" ", "-").toLowerCase()}`}>
                    {guide.difficulty}
                  </span>
                  <h3>{guide.title}</h3>
                  <p>{guide.excerpt}</p>
                </div>
                <div className="guide-bottom">
                  <span>{guide.readTime} read</span>
                  <a href={`/guides/${guide.id}`} aria-label={`Read ${guide.title}`}>Open note ↗</a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <strong>No field record found.</strong>
            <p>Try a broader keyword or return to the full codex.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>
              Reset the archive
            </button>
          </div>
        )}
      </section>

      <section className="route-section" id="route">
        <div className="route-image">
          <img
            src="/ms2-shot-06.webp"
            alt="A Mortal Shell II warrior approaching a distant enemy in the rain"
          />
          <span>Route / 001</span>
        </div>
        <div className="route-content">
          <div className="route-heading">
            <p className="eyebrow">Spoiler-light opening</p>
            <h2>Your first<br />90 minutes.</h2>
            <p>Learn the world before you try to conquer it.</p>
          </div>
          <ol className="route-list">
            {routeSteps.map((step, index) => (
              <li key={step.time}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <time>{step.time} MIN</time>
                <div><strong>{step.title}</strong><p>{step.copy}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="closing-section">
        <img
          src="/ms2-shot-03.webp"
          alt="An armored warrior confronting a skeletal beast in a frozen Mortal Shell II landscape"
        />
        <div className="closing-shade" />
        <div className="closing-copy">
          <p className="eyebrow">The archive lives</p>
          <h2>Every death leaves a record.</h2>
          <p>
            Launch-week discoveries are dated, tested, and marked for spoilers.
            Rumors do not become guidance until they survive the field.
          </p>
          <div>
            <a href="https://mortalshell.com/" target="_blank" rel="noreferrer">Official game site ↗</a>
            <a href="https://store.steampowered.com/app/2584270/Mortal_Shell_II/" target="_blank" rel="noreferrer">Steam ↗</a>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark" href="#top">
          <span className="sigil" aria-hidden="true">S</span>
          <span className="wordmark-copy"><strong>Shellbound</strong><small>Mortal Shell II codex</small></span>
        </a>
        <p>
          An independent fan-made guide. Official screenshots © Playstack and
          Cold Symmetry. Used for editorial identification; all rights remain
          with their respective owners.
        </p>
        <a href="#top">Return to the surface ↑</a>
      </footer>
    </main>
  );
}
