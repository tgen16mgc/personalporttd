import * as THREE from "three";

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

export function styleHanoiPole(model: THREE.Group, textures: Set<THREE.Texture>) {
  const pole = model.getObjectByName("signal_pole");
  if (!(pole instanceof THREE.Mesh) || !(pole.material instanceof THREE.MeshStandardMaterial)) return;
  const canvas = document.createElement("canvas");
  canvas.width = 256; canvas.height = 2048;
  const ctx = canvas.getContext("2d")!;
  for (let band = 0; band < 8; band++) {
    ctx.fillStyle = band % 2 ? "#dedfd5" : "#ac1518";
    ctx.fillRect(0, band * 256, 256, 256);
  }
  // Fixed, subtle paint wear without added copy or stickers.
  for (let i = 0; i < 2400; i++) {
    const x = (i * 137 + 23) % 256;
    const y = (i * 317 + 43) % 2048;
    ctx.fillStyle = i % 3 ? "rgba(66,57,45,0.065)" : "rgba(246,242,223,0.13)";
    ctx.fillRect(x, y, 1 + i % 3, 1 + i % 7);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  textures.add(texture);

  // Map by height so the painted bands wrap continuously around the shaft.
  const geometry = pole.geometry;
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox!;
  const center = bounds.getCenter(new THREE.Vector3());
  const height = bounds.max.y - bounds.min.y;
  const positions = geometry.getAttribute("position");
  const uv = new Float32Array(positions.count * 2);
  for (let i = 0; i < positions.count; i++) {
    uv[i * 2] = Math.atan2(positions.getZ(i) - center.z, positions.getX(i) - center.x) / (2 * Math.PI) + 0.5;
    uv[i * 2 + 1] = (positions.getY(i) - bounds.min.y) / height;
  }
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  pole.material.map = texture;
  pole.material.color.set("white");
  pole.material.metalness = 0.1;
  pole.material.roughness = 0.58;
  if (pole.material instanceof THREE.MeshPhysicalMaterial) {
    pole.material.clearcoat = 0.18;
    pole.material.clearcoatRoughness = 0.55;
  }
  pole.material.needsUpdate = true;

  // Recolor only the housing. Lenses, chrome reflectors, HDR lighting,
  // light pulses, and the RGB-shift impact shader keep their original settings.
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      if (material instanceof THREE.MeshStandardMaterial && material.name === "Material.002") {
        material.color.set("#202421");
      }
    }
  });
}
