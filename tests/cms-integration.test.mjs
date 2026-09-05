import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";
import { createReader } from "@keystatic/core/reader";
import { getDocumentText, getStoryItemLabel } from "../lib/cms-content.mjs";

const configUrl = new URL("../keystatic.config.tsx", import.meta.url);
const compiledConfig = ts.transpileModule(readFileSync(configUrl, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
}).outputText
  .replace('"@keystatic/core"', JSON.stringify(import.meta.resolve("@keystatic/core")))
  .replace('"./lib/cms-content.mjs"', JSON.stringify(new URL("../lib/cms-content.mjs", import.meta.url).href));
const { default: config } = await import(`data:text/javascript;base64,${Buffer.from(compiledConfig).toString("base64")}`);
const reader = createReader(fileURLToPath(new URL("..", import.meta.url)), config);

test("every CMS singleton can read the checked-in content with its actual schema", async () => {
  for (const [name, singleton] of Object.entries(reader.singletons)) {
    assert.ok(await singleton.readOrThrow(), `${name}: cannot read CMS content`);
  }
});

test("CMS story labels use object preview fields and flatten rich text", () => {
  const preview = (discriminant, fields) => ({ discriminant, value: { fields } });
  assert.equal(getStoryItemLabel(preview("heading", { body: { value: "The challenge" } })), "H: The challenge");
  assert.equal(getStoryItemLabel(preview("text", { body: { value: [{ type: "paragraph", children: [{ text: "Hello", bold: true }, { type: "link", children: [{ text: "world" }] }] }] } })), "Hello world");
  assert.equal(getStoryItemLabel(preview("pdf", { url: { value: "https://drive.google.com/file/d/example/view" } })), "PDF: https://drive.google.com/file/d/example/view");
  assert.equal(getStoryItemLabel(preview("text", {})), "text");
});

test("Keystatic resolves each project's linked story documents as rich text", async () => {
  const entries = await reader.singletons.projects.readOrThrow();
  const raw = JSON.parse(readFileSync(new URL("../content/keystatic/projects.json", import.meta.url), "utf8"));
  for (const [projectIndex, project] of entries.items.entries()) {
    assert.equal(project.slug, raw.items[projectIndex].slug);
    for (const [blockIndex, block] of project.story.entries()) {
      if (block.discriminant !== "text") continue;
      const document = await block.value.body();
      assert.ok(Array.isArray(document));
      assert.ok(getDocumentText(document).trim(), `${project.slug}/${blockIndex}: missing text`);
      assert.ok(document.every((node) => node.type === "paragraph"), `${project.slug}/${blockIndex}: unsupported document node`);
    }
  }
});

test("homepage details and contact copy are editable independently of quick facts", async () => {
  const home = await reader.singletons.homepage.readOrThrow();
  const contact = await reader.singletons.contact.readOrThrow();
  assert.ok(home.homeDetails.available);
  assert.ok(home.homeDetails.seeking);
  assert.ok(contact.heading);
  assert.ok(contact.formHeading);
  const homePage = readFileSync(new URL("../app/(main)/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(homePage, /facts\[\d+\]/);
  assert.match(homePage, /homeDetails\.available/);
});
