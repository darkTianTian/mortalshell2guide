import assert from "node:assert/strict";
import test from "node:test";

const guideSlugs = [
  "shell-locations",
  "tarstones",
  "shell-tier-list",
  "weapon-tier-list",
  "baghead",
  "duality-stone",
  "crypt-key",
  "axatana",
  "bosses",
  "final-boss",
  "eredrim",
  "beacons",
  "shell-points",
  "walkthrough",
  "genessa",
  "glimpse",
  "patch-notes",
  "editions",
  "gragu",
  "blackmarrow-key",
  "smert",
  "ps5",
  "sidearms",
  "hall-of-murmurs",
  "npc-questlines",
  "night-mode",
  "tarforge",
  "trophies",
  "new-game-plus",
  "tiel",
  "proxima",
  "lazlo",
  "sariel",
  "chapel-key",
  "forgotten-crossbow",
  "beginner-guide",
  "monolith",
];

async function render(path = "/", accept = "text/html") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Shellbound field guide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Shellbound — Mortal Shell II Field Guide<\/title>/i);
  assert.match(html, /<span class="sigil" aria-hidden="true">II<\/span>/i);
  assert.match(html, /<strong>Mortal Shell II<\/strong><small>Shellbound field guide<\/small>/i);
  assert.match(html, /Survive the/);
  assert.match(html, /Everything that can kill you/);
  assert.match(html, /Confirmed game intel/);
  assert.match(html, /Search Shells, weapons, bosses/);
  assert.match(html, /<a href="\/guides">All Guides<\/a>/);
  assert.match(html, /<a href="\/map">Map<\/a>/);
  assert.match(html, /<meta name="viewport" content="[^"]*width=device-width[^"]*initial-scale=1[^"]*"/i);
  assert.match(html, /<nav aria-label="Mobile navigation">/i);
  for (const slug of ["genessa", "glimpse", "patch-notes", "editions", "gragu", "blackmarrow-key", "smert", "ps5", "sidearms", "hall-of-murmurs", "npc-questlines", "night-mode", "tarforge", "trophies", "new-game-plus", "tiel", "proxima", "lazlo", "sariel", "chapel-key", "forgotten-crossbow", "beginner-guide", "monolith"]) {
    assert.match(html, new RegExp(`href="/guides/${slug}"`));
  }
  assert.match(html, /<link rel="canonical" href="https:\/\/mortalshell2guide\.org\/?"/i);
  assert.match(
    html,
    /Master Mortal Shell II with spoiler-aware routes, Shell builds, weapon tactics, boss preparation, dungeon guidance, and launch-week field notes\./,
  );
  assert.match(html, /<link rel="icon" href="\/icon\.png\?[^"]+" sizes="512x512" type="image\/png"\/>/i);
  assert.match(html, /<link rel="apple-touch-icon" href="\/apple-icon\.png\?[^"]+" sizes="180x180" type="image\/png"\/>/i);
  assert.match(html, /<link rel="describedby" href="\/llms\.txt"\/>/i);
  assert.match(html, /googletagmanager\.com\/gtag\/js\?id=G-BDWC6HJWKB/i);
  assert.match(html, /id="google-analytics-config"/i);
  assert.match(html, /gtag\('config', 'G-BDWC6HJWKB'\)/i);
  assert.equal((html.match(/<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-BDWC6HJWKB"/gi) ?? []).length, 1);
  assert.doesNotMatch(html, /<img[^>]+alt=""/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("provides mobile navigation on every primary surface", async () => {
  for (const path of ["/", "/guides", "/map", "/guides/beginner-guide"]) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    assert.match(html, /<details class="mobile-nav">/i, `${path} needs a mobile menu`);
    assert.match(html, /<summary aria-label="Open site navigation">/i);
    assert.match(html, /<nav aria-label="Mobile navigation">/i);
    for (const href of ["/guides", "/map", "/guides/shell-locations", "/guides/weapon-tier-list", "/guides/bosses"]) {
      assert.match(html, new RegExp(`href="${href}"`), `${path} mobile menu should link to ${href}`);
    }
  }
});

test("provides consistent desktop navigation on every primary surface", async () => {
  for (const path of ["/", "/guides", "/map", "/guides/beginner-guide"]) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    assert.match(html, /<header class="site-header site-header--(?:overlay|solid)">/i);
    assert.match(html, /<nav class="desktop-nav" aria-label="Primary navigation">/i);
    for (const href of ["/guides", "/map", "/guides/shell-locations", "/guides/weapon-tier-list", "/guides/bosses"]) {
      assert.match(html, new RegExp(`href="${href}"`), `${path} primary nav should link to ${href}`);
    }
  }
});

test("provides structured correction feedback on every primary surface", async () => {
  for (const path of ["/", "/guides", "/map", "/guides/beginner-guide"]) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    assert.match(html, /<footer class="site-footer">/i, `${path} needs the global footer`);
    assert.match(html, /feedback@mortalshell2guide\.org/i);
    assert.match(html, /mailto:feedback@mortalshell2guide\.org\?subject=/i);
    assert.match(html, /Data(?:%20|\+)%(?:2F|2f)(?:%20|\+)section/i);
    assert.match(html, /Suggested(?:%20|\+)correction/i);
    assert.match(html, /Source(?:%20|\+)%(?:2F|2f)(?:%20|\+)evidence/i);
  }

  const guide = await (await render("/guides/beginner-guide")).text();
  assert.match(guide, /Report data in this section/i);
  assert.match(guide, /data-feedback-context="Guide section:/i);

  const map = await (await render("/map")).text();
  assert.match(map, /Report this marker/i);
  assert.match(map, /data-feedback-context="Map marker:/i);
});

test("labels the visible site identity as Mortal Shell II", async () => {
  for (const path of ["/", "/map", "/guides/beginner-guide"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<strong>Mortal Shell II<\/strong><small>Shellbound field guide<\/small>/i);
    assert.match(html, />II<\/span>/i);
  }

  const indexResponse = await render("/guides");
  const index = await indexResponse.text();
  assert.match(index, /<header class="site-header site-header--solid">/i);
  assert.match(index, /<strong>Mortal Shell II<\/strong><small>Shellbound field guide<\/small>/i);
});

test("publishes visible and structured breadcrumbs on hierarchical pages", async () => {
  for (const path of ["/guides", "/map", "/guides/beginner-guide"]) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
    const html = await response.text();
    assert.match(html, /<nav[^>]+aria-label="Breadcrumb">/i);
    assert.match(html, /"@type":"BreadcrumbList"/i);
    assert.match(html, /"itemListElement":\[/i);
  }
});

test("publishes sitemap and robots discovery files", async () => {
  const sitemapResponse = await render("/sitemap.xml", "application/xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/mortalshell2guide\.org\//);
  assert.match(sitemap, /<lastmod>2026-08-22T00:00:00\.000Z<\/lastmod>/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 40);
  assert.match(sitemap, /https:\/\/mortalshell2guide\.org\/map/);
  for (const slug of guideSlugs) {
    assert.match(sitemap, new RegExp(`https://mortalshell2guide\\.org/guides/${slug}`));
  }

  const robotsResponse = await render("/robots.txt", "text/plain");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/mortalshell2guide\.org\/sitemap\.xml/);
});

test("publishes automatic LLM indexes from the guide corpus", async () => {
  const indexResponse = await render("/llms.txt", "text/plain");
  assert.equal(indexResponse.status, 200);
  assert.match(indexResponse.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const index = await indexResponse.text();
  assert.match(index, /^# Shellbound — Mortal Shell II Field Guide/m);
  assert.match(index, /Latest content update: 2026-08-22/);
  assert.match(index, /https:\/\/mortalshell2guide\.org\/llms-full\.txt/);
  assert.match(index, /https:\/\/mortalshell2guide\.org\/map/);
  for (const slug of guideSlugs) {
    assert.match(index, new RegExp(`https://mortalshell2guide\\.org/guides/${slug}`));
  }

  const fullResponse = await render("/llms-full.txt", "text/plain");
  assert.equal(fullResponse.status, 200);
  assert.match(fullResponse.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const full = await fullResponse.text();
  assert.match(full, /^# Shellbound — Complete Mortal Shell II Guide Corpus/m);
  assert.doesNotMatch(full, /^## (?:Map )?Sources checked$/m);
  assert.ok(full.trim().split(/\s+/).length > 10_000, "full corpus should include all long-form guide text");
  assert.match(full, /Canonical URL: https:\/\/mortalshell2guide\.org\/map/);
  for (const slug of guideSlugs) {
    assert.match(full, new RegExp(`Canonical URL: https://mortalshell2guide\\.org/guides/${slug}`));
  }
});

test("renders the verified interactive map with SEO metadata and discovery content", async () => {
  const response = await render("/map");
  assert.equal(response.status, 200);
  const html = await response.text();
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ?? "";
  assert.ok(title.length >= 50 && title.length <= 60, `map title length ${title.length}`);
  assert.ok(description.length >= 140 && description.length <= 160, `map description length ${description.length}`);
  assert.match(html, /<link rel="canonical" href="https:\/\/mortalshell2guide\.org\/map"/i);
  assert.match(html, /Find the next thing that changes your run/);
  assert.match(html, /88(?:<!-- -->)? essential markers/);
  assert.match(html, /Marrow Keep/);
  assert.match(html, /Position standard/);
  assert.match(html, /Exact position/);
  assert.match(html, /Interior anchor/);
  assert.match(html, /Route anchor/);
  assert.match(html, /Positions audited/);
  assert.match(html, /2026-08-22/);
  assert.match(html, /aria-label="Quick marker filter actions"/);
  assert.match(html, />Show all<\/button>/);
  assert.match(html, />Hide all<\/button>/);
  assert.doesNotMatch(html, />Shells only<\/button>/);
  assert.match(html, /13(?:<!-- -->)? categories shown/);
  assert.doesNotMatch(html, /Map sources checked|Research log|Sources &amp; verification/);
  assert.match(html, /ms2-interactive-world-map\.webp/);
  assert.match(html, /--pin-inverse-scale:1/);
  assert.doesNotMatch(html, /<img[^>]+alt=""/i);
});

test("renders every guide with compliant metadata and internal navigation", async () => {
  for (const slug of guideSlugs) {
    const response = await render(`/guides/${slug}`);
    assert.equal(response.status, 200, `${slug} should render`);
    const html = await response.text();
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] ?? "";
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1] ?? "";
    assert.ok(title.length >= 50 && title.length <= 60, `${slug} title length ${title.length}`);
    assert.ok(description.length >= 140 && description.length <= 160, `${slug} description length ${description.length}`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://mortalshell2guide\\.org/guides/${slug}`));
    assert.doesNotMatch(html, /Sources checked|Research log/);
    assert.match(html, /Guide at a glance|Retail build/);
    assert.match(html, /Frequently asked questions/);
    assert.match(html, /Related field notes/);
    assert.doesNotMatch(html, /<img[^>]+alt=""/i);
  }
});
