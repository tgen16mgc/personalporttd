import assert from "node:assert/strict";
import test from "node:test";
import { cacheKeystaticResponse } from "../lib/keystatic-response.mjs";

const blobPath = `/api/keystatic/blob/${"a".repeat(40)}/public/images/projects/image.png`;

test("successful content-addressed blobs use private immutable browser caching", async () => {
  const response = cacheKeystaticResponse(
    new Request(`http://localhost:3000${blobPath}`),
    new Response("image bytes", { headers: { "Content-Type": "image/png" } }),
  );
  assert.equal(response.headers.get("Cache-Control"), "private, max-age=31536000, immutable");
  assert.equal(response.headers.get("Content-Type"), "image/png");
  assert.equal(await response.text(), "image bytes");
});

test("trees, updates, auth responses and failed blobs are never cached", () => {
  for (const [pathname, method, status] of [
    ["/api/keystatic/tree", "GET", 200],
    ["/api/keystatic/update", "POST", 200],
    ["/api/keystatic/github/oauth/callback", "GET", 200],
    [blobPath, "GET", 404],
    [blobPath, "GET", 400],
    [blobPath, "GET", 503],
    [blobPath, "POST", 200],
    ["/api/keystatic/blob/invalid/image.png", "GET", 200],
  ]) {
    const response = cacheKeystaticResponse(
      new Request(`http://localhost:3000${pathname}`, { method }),
      new Response("", { status }),
    );
    assert.equal(response.headers.get("Cache-Control"), "no-store", `${method} ${pathname} ${status}`);
  }
});
