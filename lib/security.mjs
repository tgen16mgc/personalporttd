const SAFE_EXTERNAL_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);
const SIMPLE_EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const BARE_DOMAIN_PATTERN = /^[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:[/:?#].*)?$/;
const ALLOWED_INLINE_TAGS = new Set(["em", "strong"]);

function hasControlChars(value) {
  return /[\u0000-\u001F\u007F]/.test(value);
}

function normalizeInput(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function isSafeInternalHref(value) {
  const href = normalizeInput(value);
  if (!href || hasControlChars(href)) return false;
  if (href.startsWith("#")) return true;
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/\\")) {
    return false;
  }
  return true;
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function applyMarkdownStrongToEscapedText(value) {
  return value.replace(/\*\*(.+?)\*\*/gs, "<strong>$1</strong>");
}

function formatTextChunk(value) {
  return applyMarkdownStrongToEscapedText(escapeHtml(value)).replace(/\n/g, "<br />");
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeInlineHtml(value) {
  const input = String(value ?? "");
  let output = "";
  let lastIndex = 0;
  const tagPattern = /<\/?\s*([A-Za-z][A-Za-z0-9:-]*)\s*[^>]*>/g;

  for (const match of input.matchAll(tagPattern)) {
    const token = match[0];
    const index = match.index ?? 0;
    const tagName = match[1].toLowerCase();
    const isClosing = /^<\s*\//.test(token);

    output += escapeHtml(input.slice(lastIndex, index));

    if (tagName === "br") {
      output += "<br />";
    } else if (ALLOWED_INLINE_TAGS.has(tagName)) {
      output += isClosing ? `</${tagName}>` : `<${tagName}>`;
    } else {
      output += escapeHtml(token);
    }

    lastIndex = index + token.length;
  }

  output += escapeHtml(input.slice(lastIndex));
  return output;
}

export function getSafeExternalHref(value, options = {}) {
  const raw = normalizeInput(value);
  if (!raw || hasControlChars(raw) || raw.startsWith("//")) return null;

  const allowBareDomains = options.allowBareDomains === true;
  const href = allowBareDomains && BARE_DOMAIN_PATTERN.test(raw) ? `https://${raw}` : raw;

  let parsed;
  try {
    parsed = new URL(href);
  } catch {
    return null;
  }

  if (!SAFE_EXTERNAL_PROTOCOLS.has(parsed.protocol)) return null;
  if ((parsed.protocol === "http:" || parsed.protocol === "https:") && !parsed.hostname) {
    return null;
  }
  if (parsed.protocol === "mailto:" && !SIMPLE_EMAIL_PATTERN.test(parsed.pathname)) {
    return null;
  }
  return href;
}

export function getSafeContentHref(value) {
  const raw = normalizeInput(value);
  if (isSafeInternalHref(raw)) return raw;
  return getSafeExternalHref(raw, { allowBareDomains: true });
}

export function isExternalHref(value) {
  return /^(?:https?:|mailto:|tel:)/i.test(value);
}

export function normalizeNavigationHref(value, fallback = "/") {
  const raw = normalizeInput(value);
  return isSafeInternalHref(raw) ? raw : fallback;
}

export function createMailtoHref(email, subject) {
  const safeEmail = normalizeInput(email);
  if (!safeEmail || hasControlChars(safeEmail) || !SIMPLE_EMAIL_PATTERN.test(safeEmail)) {
    return null;
  }

  const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${safeEmail}${query}`;
}

export function formatSafeInlineMarkdown(value) {
  const input = String(value ?? "");
  let output = "";
  let lastIndex = 0;
  const linkPattern = /\[([^\]\n]+)\]\(([^)]*)\)/g;

  for (const match of input.matchAll(linkPattern)) {
    const index = match.index ?? 0;
    const [rawMatch, rawLabel, rawHref] = match;
    const safeHref = getSafeContentHref(rawHref);

    output += formatTextChunk(input.slice(lastIndex, index));
    output += safeHref
      ? renderAnchor(rawLabel, safeHref)
      : formatTextChunk(rawLabel);
    lastIndex = index + rawMatch.length;
  }

  output += formatTextChunk(input.slice(lastIndex));
  return output;
}

function renderAnchor(label, href) {
  const targetAttr = isExternalHref(href)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
  return `<a href="${escapeAttribute(href)}"${targetAttr}>${formatTextChunk(label)}</a>`;
}

export function getTrustedVideoEmbedInfo(value) {
  const href = getSafeExternalHref(value);
  if (!href) return null;

  let url;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const pathSegments = url.pathname.split("/").filter(Boolean);

  if (host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com") {
    const isShort = pathSegments[0] === "shorts";
    const id = isShort ? pathSegments[1] : url.searchParams.get("v");
    if (!isSafeVideoId(id)) return null;
    return {
      url: `https://www.youtube.com/embed/${id}`,
      platform: "youtube",
      isVertical: isShort,
    };
  }

  if (host === "youtu.be") {
    const id = pathSegments[0];
    if (!isSafeVideoId(id)) return null;
    return {
      url: `https://www.youtube.com/embed/${id}`,
      platform: "youtube",
      isVertical: false,
    };
  }

  if (host === "vimeo.com" || host === "www.vimeo.com" || host === "player.vimeo.com") {
    const id = pathSegments.findLast((segment) => /^\d+$/.test(segment));
    return id
      ? { url: `https://player.vimeo.com/video/${id}`, platform: "vimeo", isVertical: false }
      : null;
  }

  if (host === "tiktok.com" || host === "www.tiktok.com" || host === "m.tiktok.com") {
    const videoIndex = pathSegments.indexOf("video");
    const id = videoIndex >= 0 ? pathSegments[videoIndex + 1] : null;
    return id && /^\d+$/.test(id)
      ? { url: `https://www.tiktok.com/embed/v2/${id}`, platform: "tiktok", isVertical: true }
      : null;
  }

  return null;
}

export function getTrustedFacebookEmbedInfo(value) {
  const href = getSafeExternalHref(value, { allowBareDomains: true });
  if (!href) return null;

  let url;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || (host !== "facebook.com" && !host.endsWith(".facebook.com"))) {
    return null;
  }

  const type = isFacebookVideoUrl(url) ? "video" : "post";
  const params = new URLSearchParams({
    href: url.toString(),
    show_text: "true",
    width: "500",
  });

  return {
    url: `https://www.facebook.com/plugins/${type}.php?${params.toString()}`,
    href: url.toString(),
    type,
  };
}

function isFacebookVideoUrl(url) {
  const segments = url.pathname.toLowerCase().split("/").filter(Boolean);
  if (segments[0] === "share" && (segments[1] === "v" || segments[1] === "r")) return true;
  return segments[0] === "watch" || segments.includes("videos") || segments.includes("reel");
}

export function getTrustedGoogleDrivePdfEmbedInfo(value) {
  const href = getSafeExternalHref(value, { allowBareDomains: true });
  if (!href) return null;

  let url;
  try {
    url = new URL(href);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || host !== "drive.google.com") return null;

  const fileId = getGoogleDriveFileId(url);
  if (!fileId) return null;

  return {
    url: `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/preview`,
    href: `https://drive.google.com/file/d/${encodeURIComponent(fileId)}/view`,
    fileId,
  };
}

function getGoogleDriveFileId(url) {
  const segments = url.pathname.split("/").filter(Boolean);
  const fileIdFromPath = segments[0] === "file" && segments[1] === "d" ? segments[2] : null;
  const fileId = fileIdFromPath || url.searchParams.get("id");
  return isSafeGoogleDriveFileId(fileId) ? fileId : null;
}

function isSafeGoogleDriveFileId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{10,}$/.test(value);
}

function isSafeVideoId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{6,}$/.test(value);
}

export function createFixedWindowLimiter(options = {}) {
  const limit = positiveInteger(options.limit, 5);
  const windowMs = positiveInteger(options.windowMs, 10 * 60 * 1000);
  const maxKeys = positiveInteger(options.maxKeys, 500);
  const now = typeof options.now === "function" ? options.now : Date.now;
  const buckets = new Map();

  return {
    check(key) {
      const bucketKey = normalizeInput(key) || "unknown";
      const timestamp = now();
      pruneExpiredBuckets(buckets, timestamp, maxKeys);

      let bucket = buckets.get(bucketKey);
      if (!bucket || bucket.resetAt <= timestamp) {
        bucket = { count: 0, resetAt: timestamp + windowMs };
        buckets.set(bucketKey, bucket);
      }

      if (bucket.count >= limit) {
        return {
          allowed: false,
          remaining: 0,
          retryAfter: Math.max(1, Math.ceil((bucket.resetAt - timestamp) / 1000)),
        };
      }

      bucket.count += 1;
      return {
        allowed: true,
        remaining: Math.max(0, limit - bucket.count),
        retryAfter: 0,
      };
    },
    reset() {
      buckets.clear();
    },
  };
}

function positiveInteger(value, fallback) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function pruneExpiredBuckets(buckets, timestamp, maxKeys) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= timestamp) buckets.delete(key);
  }

  while (buckets.size > maxKeys) {
    const oldestKey = buckets.keys().next().value;
    buckets.delete(oldestKey);
  }
}

export function getClientIp(headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstHop = forwardedFor.split(",")[0].trim();
    if (firstHop && !hasControlChars(firstHop)) return firstHop;
  }

  const realIp = headers.get("x-real-ip");
  if (realIp && !hasControlChars(realIp.trim())) return realIp.trim();

  return "unknown";
}

export function getContactRateLimitKey(headers, email = "") {
  const normalizedEmail = normalizeInput(email).toLowerCase();
  return `${getClientIp(headers)}:${normalizedEmail}`;
}

export function isKeystaticAdminEnabled(env = process.env) {
  if (env.KEYSTATIC_DISABLE_ADMIN === "true") return false;
  if (env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG) return true;
  if (env.KEYSTATIC_ALLOW_LOCAL_MODE === "true") return true;
  return env.NODE_ENV !== "production";
}
