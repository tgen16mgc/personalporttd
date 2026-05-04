import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  createFixedWindowLimiter,
  createMailtoHref,
  formatSafeInlineMarkdown,
  getClientIp,
  getSafeExternalHref,
  getTrustedVideoEmbedInfo,
  isKeystaticAdminEnabled,
  normalizeNavigationHref,
  sanitizeInlineHtml,
} from "../lib/security.mjs";

test("sanitizeInlineHtml keeps simple formatting tags and escapes active HTML", () => {
  const html = sanitizeInlineHtml(
    'Hello <em onclick="alert(1)">there</em> <strong>friend</strong><img src=x onerror=alert(1)>',
  );

  assert.equal(
    html,
    "Hello <em>there</em> <strong>friend</strong>&lt;img src=x onerror=alert(1)&gt;",
  );
});

test("formatSafeInlineMarkdown escapes raw links and unsafe markdown hrefs", () => {
  const html = formatSafeInlineMarkdown(
    '<a href="javascript:alert(1)">click</a>\n[x](" onmouseover="alert(1)) [bad](javascript:alert(1))',
  );

  assert.match(html, /&lt;a href=&quot;javascript:alert\(1\)&quot;&gt;click&lt;\/a&gt;/);
  assert.match(html, /<br \/>/);
  assert.doesNotMatch(html, /onmouseover|href="javascript:/);
});

test("formatSafeInlineMarkdown keeps safe links and markdown emphasis", () => {
  const html = formatSafeInlineMarkdown(
    "Visit [the **site**](pixself.studio) or [work](/work).",
  );

  assert.match(html, /<a href="https:\/\/pixself\.studio" target="_blank" rel="noopener noreferrer">the <strong>site<\/strong><\/a>/);
  assert.match(html, /<a href="\/work">work<\/a>/);
});

test("URL helpers allow intended schemes and reject scriptable schemes", () => {
  assert.equal(getSafeExternalHref("https://example.com/path"), "https://example.com/path");
  assert.equal(getSafeExternalHref("mailto:hello@example.com"), "mailto:hello@example.com");
  assert.equal(getSafeExternalHref("javascript:alert(1)"), null);
  assert.equal(getSafeExternalHref("data:text/html,<script>alert(1)</script>"), null);
  assert.equal(getSafeExternalHref("//example.com"), null);
  assert.equal(normalizeNavigationHref("/work"), "/work");
  assert.equal(normalizeNavigationHref("javascript:alert(1)"), "/");
  assert.equal(createMailtoHref("hello@example.com", "Hello there"), "mailto:hello@example.com?subject=Hello%20there");
  assert.equal(createMailtoHref("bad\r\n@example.com"), null);
});

test("video embeds require exact trusted hosts and fallback links are safe", () => {
  assert.equal(getTrustedVideoEmbedInfo("https://youtube.com.example/watch?v=abc"), null);
  assert.deepEqual(
    getTrustedVideoEmbedInfo("https://www.youtube.com/watch?v=abc123"),
    {
      url: "https://www.youtube.com/embed/abc123",
      platform: "youtube",
      isVertical: false,
    },
  );
  assert.equal(getSafeExternalHref("javascript:alert(1)"), null);
});

test("contact limiter blocks repeated submissions within a fixed window", () => {
  let now = 1_000;
  const limiter = createFixedWindowLimiter({
    limit: 2,
    windowMs: 60_000,
    now: () => now,
  });

  assert.deepEqual(limiter.check("203.0.113.1"), { allowed: true, remaining: 1, retryAfter: 0 });
  assert.deepEqual(limiter.check("203.0.113.1"), { allowed: true, remaining: 0, retryAfter: 0 });
  assert.deepEqual(limiter.check("203.0.113.1"), { allowed: false, remaining: 0, retryAfter: 60 });
  now += 60_001;
  assert.deepEqual(limiter.check("203.0.113.1"), { allowed: true, remaining: 1, retryAfter: 0 });
});

test("client IP extraction prefers the forwarding chain first hop", () => {
  const headers = new Headers({
    "x-forwarded-for": "203.0.113.10, 198.51.100.2",
    "x-real-ip": "198.51.100.3",
  });

  assert.equal(getClientIp(headers), "203.0.113.10");
});

test("Keystatic admin is fail-closed for production local mode", () => {
  assert.equal(isKeystaticAdminEnabled({ NODE_ENV: "development" }), true);
  assert.equal(isKeystaticAdminEnabled({ NODE_ENV: "production" }), false);
  assert.equal(
    isKeystaticAdminEnabled({
      NODE_ENV: "production",
      NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG: "portfolio-admin",
    }),
    true,
  );
  assert.equal(
    isKeystaticAdminEnabled({
      NODE_ENV: "production",
      KEYSTATIC_ALLOW_LOCAL_MODE: "true",
    }),
    true,
  );
});

test("Next.js dependency is patched for the App Router DoS advisory", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

  assert.equal(pkg.dependencies.next, "16.2.3");
  assert.equal(pkg.devDependencies["eslint-config-next"], "16.2.3");
});
