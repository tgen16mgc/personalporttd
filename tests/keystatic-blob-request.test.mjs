import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { requestBlobWithRetry } from "../node_modules/@keystatic/core/dist/keystatic-blob-request.js";

test("temporary network and server failures recover without failing the editor", async () => {
  let calls = 0;
  const result = await requestBlobWithRetry(async () => {
    calls++;
    if (calls === 1) throw new TypeError("Failed to fetch");
    if (calls === 2) return new Response("Unavailable", { status: 503 });
    return new Response("content");
  }, "about.json");
  assert.equal(calls, 3);
  assert.equal(new TextDecoder().decode(result), "content");
});

test("broken response bodies are retried too", async () => {
  let calls = 0;
  const result = await requestBlobWithRetry(async () => {
    calls++;
    if (calls === 1) return { ok: true, arrayBuffer: async () => { throw new TypeError("terminated"); } };
    return new Response("image");
  }, "image.webp");
  assert.equal(calls, 2);
  assert.equal(new TextDecoder().decode(result), "image");
});

test("missing files and denied access are not retried", async () => {
  for (const status of [400, 401, 403, 404]) {
    let calls = 0;
    await assert.rejects(requestBlobWithRetry(async () => {
      calls++;
      return new Response("Denied", { status });
    }, "missing.webp"), new RegExp(String(status)));
    assert.equal(calls, 1);
  }
});

test("persistent network errors stop after three attempts", async () => {
  let calls = 0;
  await assert.rejects(requestBlobWithRetry(async () => {
    calls++;
    throw new TypeError("Failed to fetch");
  }, "projects.json"), /Failed to fetch/);
  assert.equal(calls, 3);
});

test("blob downloads cap concurrency and release slots after failures", async () => {
  let active = 0;
  let peak = 0;
  const results = await Promise.allSettled(Array.from({ length: 20 }, (_, index) =>
    requestBlobWithRetry(async () => {
      active++;
      peak = Math.max(peak, active);
      return {
        ok: index !== 0,
        status: index === 0 ? 404 : 200,
        text: async () => { active--; return "Missing"; },
        arrayBuffer: async () => {
          await new Promise(resolve => setTimeout(resolve, 5));
          active--;
          return new ArrayBuffer(1);
        },
      };
    }, `image-${index}.webp`),
  ));
  assert.equal(peak, 4);
  assert.equal(active, 0);
  assert.equal(results.filter(result => result.status === "fulfilled").length, 19);
});

test("the shipped Keystatic patch wires retries into blob loading", () => {
  const patch = readFileSync(new URL("../patches/@keystatic+core+0.5.50.patch", import.meta.url), "utf8");
  assert.match(patch, /\+.*requestBlobWithRetry\(\(\) => isLocal/);
  assert.match(patch, /\+.*getBlobFromPersistedCache\(oid\)\.catch/);
  assert.match(patch, /\+.*setBlobToPersistedCache\(oid, array\)\.catch/);
});
