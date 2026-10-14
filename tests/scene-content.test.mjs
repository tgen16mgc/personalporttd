import assert from "node:assert/strict";
import test from "node:test";
import { getCirclePreviewImage, getStickerSize } from "../lib/scene-content.mjs";

test("old stickers retain their dimensions and custom dimensions are bounded", () => {
  assert.deepEqual(getStickerSize(), { width: 100, height: 50 });
  assert.deepEqual(getStickerSize({ width: 160, height: 120 }), { width: 160, height: 120 });
  assert.deepEqual(getStickerSize({ width: null, height: NaN }), { width: 100, height: 50 });
  assert.deepEqual(getStickerSize({ width: -5, height: 900 }), { width: 24, height: 240 });
});

test("circle artwork is independent with backwards-compatible fallbacks", () => {
  const project = { circlePreviewImage: "/circle.webp", heroImage: "/hero.webp", thumbnail: "/thumb.webp" };
  assert.equal(getCirclePreviewImage(project), "/circle.webp");
  assert.equal(getCirclePreviewImage({ ...project, circlePreviewImage: null }), "/hero.webp");
  assert.equal(getCirclePreviewImage({ thumbnail: "/thumb.webp" }), "/thumb.webp");
  assert.equal(getCirclePreviewImage({}), null);
});
