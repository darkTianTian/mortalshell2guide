import assert from "node:assert/strict";
import test from "node:test";

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
  assert.doesNotMatch(html, /<img[^>]+alt=""/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("publishes sitemap and robots discovery files", async () => {
  const sitemapResponse = await render("/sitemap.xml", "application/xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(await sitemapResponse.text(), /https:\/\/mortalshell2guide\.org\//);

  const robotsResponse = await render("/robots.txt", "text/plain");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/mortalshell2guide\.org\/sitemap\.xml/);
});
