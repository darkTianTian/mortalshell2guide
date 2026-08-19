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
  assert.match(html, /Survive the/);
  assert.match(html, /Everything that can kill you/);
  assert.match(html, /Confirmed game intel/);
  assert.match(html, /Search Shells, weapons, bosses/);
  assert.match(html, /<link rel="canonical" href="https:\/\/mortalshell2guide\.org\/?"/i);
  assert.match(
    html,
    /Master Mortal Shell II with spoiler-aware routes, Shell builds, weapon tactics, boss preparation, dungeon guidance, and launch-week field notes\./,
  );
  assert.match(html, /<link rel="icon" href="\/icon\.png\?[^\"]+" sizes="512x512" type="image\/png"\/>/i);
  assert.match(html, /<link rel="apple-touch-icon" href="\/apple-icon\.png\?[^\"]+" sizes="180x180" type="image\/png"\/>/i);
  assert.doesNotMatch(html, /<img[^>]+alt=""/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("publishes sitemap and robots discovery files", async () => {
  const sitemapResponse = await render("/sitemap.xml", "application/xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/mortalshell2guide\.org\//);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 16);
  for (const slug of guideSlugs) {
    assert.match(sitemap, new RegExp(`https://mortalshell2guide\\.org/guides/${slug}`));
  }

  const robotsResponse = await render("/robots.txt", "text/plain");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/mortalshell2guide\.org\/sitemap\.xml/);
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
    assert.match(html, /Sources checked/);
    assert.match(html, /Related field notes/);
    assert.doesNotMatch(html, /<img[^>]+alt=""/i);
  }
});
