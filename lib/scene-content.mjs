/** @param {{ width?: number | null, height?: number | null }} [sticker] */
export function getStickerSize(sticker = {}) {
  const bounded = (value, fallback, min, max) => typeof value === "number" && Number.isFinite(value)
    ? Math.min(max, Math.max(min, value)) : fallback;
  return {
    width: bounded(sticker.width, 100, 24, 240),
    height: bounded(sticker.height, 50, 16, 240),
  };
}

/** @param {{ circlePreviewImage?: string | null, heroImage?: string | null, thumbnail?: string | null }} project */
export function getCirclePreviewImage(project) {
  return project.circlePreviewImage || project.heroImage || project.thumbnail || null;
}
