// The original faces sample narrow strips of the square texture.
// Equal insets from those bounds keep the rectangular border centered.
export function paintHanoiSignBackground(ctx: CanvasRenderingContext2D, name: string) {
  ctx.fillStyle = "#0053a5";
  ctx.fillRect(0, 0, 1024, 1024);
  const [minY, maxY] = name === "hiroto-profile" ? [385, 639]
    : name === "to_projects" ? [404, 620] : [179, 845];
  const padding = 22;
  const left = padding, right = 1024 - padding;
  const top = minY + padding, bottom = maxY - padding, corner = 12;
  ctx.strokeStyle = "#f7f5ef"; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(left + corner, top);
  ctx.lineTo(right - corner, top); ctx.quadraticCurveTo(right - corner, top + corner, right, top + corner);
  ctx.lineTo(right, bottom - corner); ctx.quadraticCurveTo(right - corner, bottom - corner, right - corner, bottom);
  ctx.lineTo(left + corner, bottom); ctx.quadraticCurveTo(left + corner, bottom - corner, left, bottom - corner);
  ctx.lineTo(left, top + corner); ctx.quadraticCurveTo(left + corner, top + corner, left + corner, top);
  ctx.closePath(); ctx.stroke();
  // Keep animated text and arrows inside the border with a separate gutter.
  // The caller saves/restores this context for each texture repaint.
  const textPadding = 16;
  ctx.beginPath();
  ctx.rect(left + textPadding, top + textPadding,
    right - left - textPadding * 2, bottom - top - textPadding * 2);
  ctx.clip();
}
