"use client";

import { useMemo, useState } from "react";

type Guide = {
  id: string;
  index: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  label?: string;
};

const guides: Guide[] = [
  {
    id: "first-route",
    index: "01",
    category: "Exploration",
    readTime: "6 min",
    title: "Your first 90 minutes",
    excerpt:
      "A low-risk route from the prologue into the first open region, with the detours that actually pay off.",
    label: "Start here",
  },
  {
    id: "harden",
    index: "02",
    category: "Combat",
    readTime: "4 min",
    title: "Harden windows, explained",
    excerpt:
      "Turn the signature defensive tool into pressure: bait, interrupt, reset, then take back your turn.",
  },
  {
    id: "shell-role",
    index: "03",
    category: "Shells",
    readTime: "5 min",
    title: "Choose a Shell by role",
    excerpt:
      "Ignore tier-list noise. Match each warrior's strengths to your preferred range, tempo, and margin for error.",
  },
  {
    id: "posture",
    index: "04",
    category: "Weapons",
    readTime: "4 min",
    title: "Break posture with intent",
    excerpt:
      "Build a repeatable pressure loop by pairing melee commitment with the right sidearm timing.",
    label: "Core system",
  },
  {
    id: "dungeons",
    index: "05",
    category: "Exploration",
    readTime: "7 min",
    title: "Read the compact open world",
    excerpt:
      "How landmarks, side paths, and dungeon entrances telegraph where the next meaningful reward may be hiding.",
  },
  {
    id: "no-stamina",
    index: "06",
    category: "Combat",
    readTime: "3 min",
    title: "No stamina does not mean no rhythm",
    excerpt:
      "Your real limits are recovery frames, spacing, posture, and enemy retaliation—not a green bar.",
  },
  {
    id: "false-god",
    index: "07",
    category: "Boss Prep",
    readTime: "5 min",
    title: "Before you face a false god",
    excerpt:
      "A spoiler-light readiness check for upgrades, consumables, sidearm utility, and a clean first attempt.",
    label: "Spoiler-light",
  },
  {
    id: "death-loop",
    index: "08",
    category: "Combat",
    readTime: "4 min",
    title: "Fix the death, not the build",
    excerpt:
      "A quick review loop for separating a routing problem from a timing, range, or loadout problem.",
  },
];

const categories = [
  "All",
  "Combat",
  "Exploration",
  "Shells",
  "Weapons",
  "Boss Prep",
];

const routeSteps = [
  {
    number: "01",
    time: "0—20 MIN",
    title: "Learn the threat cycle",
    copy: "Use the opening enemies to isolate one action at a time: engage, harden, punish, disengage. Do not race past the tutorial's safe repetitions.",
    tag: "NO SPOILERS",
  },
  {
    number: "02",
    time: "20—50 MIN",
    title: "Open the first region",
    copy: "Touch the main path, then turn around. Short side routes teach the region's visual language and usually cost less than pushing an unknown elite.",
    tag: "LOW RISK",
  },
  {
    number: "03",
    time: "50—90 MIN",
    title: "Commit to one upgrade loop",
    copy: "Choose a weapon rhythm you can reproduce under pressure. Spend early resources on consistency before experimenting across every option.",
    tag: "FOUNDATION",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

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
          <span className="wordmark-mark" aria-hidden="true">
            S
          </span>
          <span>
            <strong>Shellbound</strong>
            <small>Mortal Shell II field guide</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#guides">Guides</a>
          <a href="#route">Starter route</a>
          <a href="#intel">Launch intel</a>
        </nav>
        <a className="status-chip" href="#intel">
          <span className="status-dot" /> Launch day guide
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Unofficial guide // Updated Aug 20, 2026</p>
          <h1>
            Enter the Undermether.
            <span>Leave nothing unanswered.</span>
          </h1>
          <p className="hero-lede">
            Spoiler-aware routes, combat theory, and field-tested decisions for
            Mortal Shell II—built to get you unstuck without playing the game
            for you.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#route">
              Start the route <span aria-hidden="true">↘</span>
            </a>
            <a className="button button-quiet" href="#guides">
              Browse all guides
            </a>
          </div>
          <div className="hero-proof" aria-label="Guide principles">
            <span>01 / Spoiler-aware</span>
            <span>02 / Evidence first</span>
            <span>03 / Built for replay</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <span className="artifact-label top-label">FIELD RECORD / 001</span>
          <div className="shell-orbit orbit-one" />
          <div className="shell-orbit orbit-two" />
          <div className="shell-core">
            <span className="core-scar scar-one" />
            <span className="core-scar scar-two" />
            <span className="core-scar scar-three" />
          </div>
          <div className="artifact-coordinate">42° 16′ N<br />THE UNDERMETHER</div>
          <span className="artifact-label bottom-label">HARDEN / HOLD / STRIKE</span>
        </div>
      </section>

      <section className="intel-strip" id="intel" aria-label="Launch intel">
        <div className="intel-intro">
          <span className="section-kicker">Confirmed launch intel</span>
          <p>What the official material tells us—no rumor padding.</p>
        </div>
        <dl className="intel-stats">
          <div>
            <dt>8</dt>
            <dd>Playable Shells</dd>
          </div>
          <div>
            <dt>60+</dt>
            <dd>Dungeons</dd>
          </div>
          <div>
            <dt>0</dt>
            <dd>Stamina bars</dd>
          </div>
          <div>
            <dt>20.08</dt>
            <dd>Worldwide launch</dd>
          </div>
        </dl>
      </section>

      <section className="route-section" id="route">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Recommended start</p>
            <h2>The first 90 minutes</h2>
          </div>
          <p>
            A disciplined opening route for players who want direction, not a
            checklist. Learn the world before you try to conquer it.
          </p>
        </div>
        <div className="route-grid">
          {routeSteps.map((step) => (
            <article className="route-card" key={step.number}>
              <div className="route-card-top">
                <span className="route-number">{step.number}</span>
                <span className="route-tag">{step.tag}</span>
              </div>
              <div>
                <time>{step.time}</time>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              <a href="#guides" aria-label={`Read ${step.title}`}>
                Open field note <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" id="guides">
        <div className="guide-header">
          <div>
            <p className="eyebrow">The living archive</p>
            <h2>Field notes</h2>
          </div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Search guides</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tactics, routes, systems…"
            />
            <kbd>/</kbd>
          </label>
        </div>

        <div className="filter-row" aria-label="Filter guides by category">
          <div className="filter-list">
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
          <span className="result-count">
            {String(filteredGuides.length).padStart(2, "0")} records
          </span>
        </div>

        {filteredGuides.length > 0 ? (
          <div className="guide-grid">
            {filteredGuides.map((guide) => (
              <article className="guide-card" id={guide.id} key={guide.id}>
                <div className="guide-meta">
                  <span className="guide-index">/{guide.index}</span>
                  <span>{guide.category}</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.excerpt}</p>
                <div className="guide-footer">
                  {guide.label ? <span>{guide.label}</span> : <i />}
                  <a href={`#${guide.id}`} aria-label={`Read ${guide.title}`}>
                    Read note <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span>NO RECORD FOUND</span>
            <p>Try another keyword or return to all field notes.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="dispatch">
        <div>
          <span className="section-kicker">The field is changing</span>
          <h2>Launch-week knowledge, without the noise.</h2>
        </div>
        <div className="dispatch-copy">
          <p>
            This first edition separates confirmed systems from developing
            strategy. Major discoveries will be dated, tested, and clearly
            marked for spoilers.
          </p>
          <div className="source-links">
            <a href="https://mortalshell.com/" target="_blank" rel="noreferrer">
              Official site <span aria-hidden="true">↗</span>
            </a>
            <a
              href="https://store.steampowered.com/app/2584270/Mortal_Shell_II/"
              target="_blank"
              rel="noreferrer"
            >
              Steam page <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-wordmark" href="#top">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span><strong>Shellbound</strong><small>Mortal Shell II field guide</small></span>
        </a>
        <p>
          An independent, fan-made guide. Not affiliated with Cold Symmetry or
          Playstack. Game names and marks belong to their respective owners.
        </p>
        <a href="#top">Return to top ↑</a>
      </footer>
    </main>
  );
}
