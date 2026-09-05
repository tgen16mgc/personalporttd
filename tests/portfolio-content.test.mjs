import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";

test("reordered projects retain their own story documents and media", () => {
  const { items } = JSON.parse(readFileSync(new URL("../content/keystatic/projects.json", import.meta.url)));
  assert.equal(new Set(items.map(({ slug }) => slug)).size, items.length);
  const subjects = {
    "pixself-keychain": "Pixself",
    redagencyads: "Red Agency",
    hongha: "Hong Ha",
    "la-passion": "La Passion",
    "aeon-beta": "AEON Beta",
    cnspaper: "C&S Paper",
    "aeon-mall-thanh-hoa-kv": "AEON MALL Thanh Hoa",
  };
  for (const [index, project] of items.entries()) {
    const bodies = project.story.flatMap((block, blockIndex) => {
      if (block.discriminant !== "text") return [];
      const body = readFileSync(new URL(`../content/keystatic/projects/items/${index}/story/${blockIndex}/value/body.mdoc`, import.meta.url), "utf8");
      assert.ok(body.trim(), `${project.slug}: empty story`);
      return [body];
    });
    if (subjects[project.slug]) assert.ok(bodies[0].includes(subjects[project.slug]), `${project.slug}: wrong story`);
    const media = [project.thumbnail, project.heroImage, ...project.story.map(({ value }) => value.image), ...(project.gallery ?? []).map(({ image }) => image)].filter(Boolean);
    for (const path of media) assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `${project.slug}: missing ${path}`);
  }
});
