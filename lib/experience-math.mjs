export function wrap(value, length = 1) {
  return length > 0 ? ((value % length) + length) % length : 0;
}

export function wheelPixels(event, height) {
  const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
  return delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1);
}

export function wavePath(edge, control, width, height, inverted = false) {
  const scale = Math.max(width, height) / 100;
  const left = (width - 100 * scale) / 2;
  const right = left + 100 * scale;
  const hole = `M ${left} ${100 * scale} V ${edge * scale} Q ${width / 2} ${control * scale} ${right} ${edge * scale} V ${100 * scale} Z`;
  return inverted ? `M ${left} 0 H ${right} V ${100 * scale} H ${left} Z ${hole}` : hole;
}

export function scrambleText(current, next, progress, seed = 0) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>-_[]{}";
  const count = Math.max(current.length, next.length);
  const resolved = Math.floor(count * Math.max(0, (progress - 0.448) / 0.552));
  return Array.from({ length: count }, (_, index) => {
    if (index >= next.length) return " ";
    if (progress >= 1 || index < resolved) return next[index];
    if (next[index] === " ") return " ";
    const random = Math.abs(Math.sin(seed + index * 127.1 + Math.floor(progress * 48) * 311.7));
    return progress < 0.448 && random > 0.18 + progress * 0.42
      ? current[index] || " "
      : chars[Math.floor(random * chars.length) % chars.length];
  }).join("").trimEnd();
}
