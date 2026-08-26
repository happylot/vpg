import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
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

test("server-renders the Vproud landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Vproud/);
  assert.match(html, /Sản phẩm Việt vươn ra thế giới/);
  assert.match(html, /Sản phẩm Việt\. Thị trường toàn cầu\./);
  assert.match(html, /Học viện Vproud/);
  assert.match(html, /Hệ sinh thái đối tác Vproud/);
  assert.match(html, /Sản phẩm Việt có câu chuyện/);
  assert.match(html, /Hoạt động thực tế/);
  assert.match(html, /\/asset\/products\/1\.jpg/);
  assert.match(html, /\/asset\/events\/hoabinh\.jpg/);
  assert.match(html, /\/asset\/products\/product-motion\.mp4/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
  assert.doesNotMatch(html, /Partner Pool|Export Readiness Score|Enterprise Journey|Global Markets/i);
});

test("keeps starter preview code out of the product surface", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const pillars/);
  assert.match(layout, /Vproud \| Sản phẩm Việt vươn ra thế giới/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
