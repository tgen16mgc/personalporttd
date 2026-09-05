"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";
import { DecalGeometry } from "three/addons/geometries/DecalGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { FullScreenQuad } from "three/addons/postprocessing/Pass.js";
import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";
import { gsap } from "gsap";
import { personal } from "@/content/personal";
import { heroContent } from "@/content/pages/home";
import { getFeaturedProjects } from "@/content/projects";
import { scrambleText, wheelPixels, wrap } from "@/lib/experience-math.mjs";

const signLinks: Record<string, { href: string; label: string }> = {
  "hiroto-profile": { href: "/about", label: "About" },
  to_projects: { href: "/work", label: "Work" },
  to_contact: { href: "/contact", label: "Contact" },
};
const imagePaths = getFeaturedProjects().map((project) => project.heroImage || project.thumbnail).filter((path): path is string => Boolean(path));

export default function SignalPole({ active, onReady }: { active: boolean; onReady: () => void }) {
  const mount = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const readyRef = useRef(onReady);
  useLayoutEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const style = getComputedStyle(host);
    const sansFont = style.getPropertyValue("--font-portfolio") || '"Helvetica Neue", sans-serif';
    const condensedFont = style.getPropertyValue("--font-portfolio-condensed") || 'Impact, sans-serif';
    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    } catch {
      host.dataset.failed = "true"; readyRef.current(); return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.04;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.append(renderer.domElement);
    let impactFrame = new THREE.FramebufferTexture(renderer.domElement.width, renderer.domElement.height);
    const impactMaterial = new THREE.ShaderMaterial({ ...RGBShiftShader, uniforms: THREE.UniformsUtils.clone(RGBShiftShader.uniforms), depthTest: false, depthWrite: false });
    impactMaterial.uniforms.tDiffuse.value = impactFrame;
    impactMaterial.uniforms.angle.value = Math.atan2(0.005, 0.019);
    const impactQuad = new FullScreenQuad(impactMaterial);
    let impactElapsed = 1;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");
    scene.environmentIntensity = 0.42;
    scene.add(new THREE.AmbientLight(0xffffff, 0.18));
    scene.add(new THREE.HemisphereLight(0xffffff, "#ddd8cf", 2.15));
    const sun = new THREE.DirectionalLight("#fff7ed", 1.1);
    sun.position.set(4.8, 6.2, 4.2);
    sun.castShadow = true;
    sun.shadow.bias = -0.00012;
    sun.shadow.mapSize.set(2048, 2048);
    scene.add(sun);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    let environment = pmrem.fromScene(room);
    room.dispose();
    scene.environment = environment.texture;
    new HDRLoader().load("/models/city.hdr", (hdr) => {
      if (disposed) { hdr.dispose(); return; }
      const next = pmrem.fromEquirectangular(hdr);
      environment.dispose(); environment = next; scene.environment = next.texture;
      hdr.dispose();
    }, undefined, () => { /* The local studio environment keeps metal readable if HDR loading fails. */ });

    let camera: THREE.PerspectiveCamera;
    let mixer: THREE.AnimationMixer;
    let model: THREE.Group;
    let duration = 1;
    let baseFov = 10;
    let elapsed = 0;
    let targetScroll = 0;
    let currentScroll = 0;
    let shake = 0;
    const cameraPosition = new THREE.Vector3();
    let stickerIndex = 0;
    let lastTextureFrame = -1;
    let pointerDown: { x: number; y: number; lastX: number; lastY: number } | null = null;
    let hoveredLabel = "";
    let pointerInside = false;
    const pointer = new THREE.Vector2(20, 20);
    const raycaster = new THREE.Raycaster();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const materials = new Map<string, THREE.MeshStandardMaterial>();
    const textures = new Set<THREE.Texture>();
    const decals: THREE.Mesh[] = [];
    const images: HTMLImageElement[] = [];
    const canvases = new Map<string, { context: CanvasRenderingContext2D; texture: THREE.CanvasTexture }>();
    const stickerPreview = document.createElement("canvas");
    stickerPreview.width = 512; stickerPreview.height = 256;
    stickerPreview.className = "sticker-preview";
    stickerPreview.setAttribute("aria-hidden", "true");
    host.append(stickerPreview);
    const previewX = gsap.quickTo(stickerPreview, "x", { duration: 0.18, ease: "power3.out" });
    const previewY = gsap.quickTo(stickerPreview, "y", { duration: 0.18, ease: "power3.out" });
    const paintSticker = () => {
      const sticker = heroContent.gravityTags[stickerIndex % heroContent.gravityTags.length];
      if (!sticker) return;
      const ctx = stickerPreview.getContext("2d")!;
      ctx.clearRect(0, 0, 512, 256);
      ctx.fillStyle = "white"; ctx.beginPath(); ctx.roundRect(5, 5, 502, 246, 70); ctx.fill();
      ctx.fillStyle = sticker.color; ctx.beginPath(); ctx.roundRect(16, 16, 480, 224, 62); ctx.fill();
      const color = new THREE.Color(sticker.color);
      ctx.fillStyle = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722 < 0.25 ? "white" : "#111111";
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = `700 52px ${sansFont}`;
      ctx.fillText(sticker.label.toUpperCase(), 256, 128, 435);
    };
    paintSticker();

    const createMap = (name: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1024;
      const context = canvas.getContext("2d")!;
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
      texture.generateMipmaps = false;
      texture.minFilter = texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      textures.add(texture);
      canvases.set(name, { context, texture });
      const material = materials.get(name);
      if (material) {
        material.map = texture; material.emissiveMap = texture;
        material.color.set("white"); material.emissive.set("white");
        material.emissiveIntensity = name === "to_contact" ? 0.86 : name === "hiroto-profile" ? 0.72 : 0.68;
        material.metalness = 0; material.roughness = 0.54; material.toneMapped = false;
        material.needsUpdate = true;
      }
      return context;
    };

    const drawCover = (context: CanvasRenderingContext2D, image: HTMLImageElement, alpha = 1) => {
      if (!image.complete || !image.naturalWidth) return;
      const scale = Math.max(1024 / image.naturalWidth, 1024 / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.globalAlpha = alpha;
      context.drawImage(image, (1024 - width) / 2, (1024 - height) / 2, width, height);
      context.globalAlpha = 1;
    };

    const drawSigns = (time: number) => {
      const cycle = Math.floor(time / 3.65);
      const progress = reduced.matches ? 1 : Math.min((time % 3.65) / 1.25, 1);
      const labels = [personal.name.toUpperCase(), heroContent.positioning.toUpperCase()];
      for (const [name, { context: ctx, texture }] of canvases) {
        ctx.clearRect(0, 0, 1024, 1024);
        ctx.textBaseline = "middle";
        if (name === "hiroto-profile") {
          ctx.fillStyle = "#ffdf0e"; ctx.fillRect(0, 0, 1024, 1024);
          ctx.fillStyle = "#000000"; ctx.font = `500 152px ${condensedFont}`; ctx.textAlign = "center";
          ctx.fillText(scrambleText(labels[cycle % 2], labels[(cycle + 1) % 2], progress, cycle), 512, 512, 925);
        } else if (name === "to_projects") {
          ctx.fillStyle = "#133afd"; ctx.fillRect(0, 0, 1024, 1024);
          ctx.fillStyle = "#f7f5ef"; ctx.font = `400 72px ${sansFont}`; ctx.textAlign = "left";
          const text = "PROJECTS ARCHIVE / PROJECTS ARCHIVE / PROJECTS ARCHIVE / ";
          const width = ctx.measureText(text).width;
          for (let x = -wrap(time * 100, width); x < 1024; x += width) ctx.fillText(text, x, 512);
        } else if (name === "to_contact") {
          ctx.fillStyle = "white"; ctx.fillRect(0, 0, 1024, 1024);
          ctx.fillStyle = "#0047bd"; ctx.font = `700 172px ${sansFont}`; ctx.textAlign = "center";
          const contactLabels = ["SAY HELLO", "CONTACT"];
          ctx.fillText(scrambleText(contactLabels[cycle % 2], contactLabels[(cycle + 1) % 2], progress, cycle), 512, 360, 960);
          for (let x = -560 - wrap(time * 118, 560); x < 1584; x += 560) {
            ctx.beginPath(); ctx.moveTo(x, 664); ctx.lineTo(x + 160, 552); ctx.lineTo(x + 160, 628); ctx.lineTo(x + 530, 628); ctx.lineTo(x + 530, 700); ctx.lineTo(x + 160, 700); ctx.lineTo(x + 160, 776); ctx.closePath(); ctx.fill();
          }
        } else {
          ctx.fillStyle = "#e9e6df"; ctx.fillRect(0, 0, 1024, 1024);
          if (images.length) {
            const index = Math.floor(time / 4) % images.length;
            drawCover(ctx, images[index]);
            const blend = Math.max(0, (time % 4 - 3.4) / 0.6);
            if (blend) drawCover(ctx, images[(index + 1) % images.length], blend);
          }
        }
        texture.needsUpdate = true;
      }
    };

    const resize = () => {
      renderer.setSize(host.clientWidth, host.clientHeight);
      impactFrame.dispose();
      impactFrame = new THREE.FramebufferTexture(renderer.domElement.width, renderer.domElement.height);
      impactMaterial.uniforms.tDiffuse.value = impactFrame;
      if (!camera) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.fov = host.clientWidth <= 620 ? Math.min(baseFov + 3, 72) : baseFov;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const load = new GLTFLoader();
    load.load("/models/signal-pole.glb", (gltf) => {
      if (disposed) {
        gltf.scene.traverse((node) => { if (node instanceof THREE.Mesh) { node.geometry.dispose(); (Array.isArray(node.material) ? node.material : [node.material]).forEach((material) => material.dispose()); } });
        return;
      }
      model = gltf.scene;
      scene.add(model);
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.castShadow = object.receiveShadow = true;
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          if (material instanceof THREE.MeshStandardMaterial) materials.set(material.name, material);
        }
      });
      camera = gltf.cameras[0] as THREE.PerspectiveCamera;
      cameraPosition.copy(camera.position);
      baseFov = camera.fov;
      mixer = new THREE.AnimationMixer(model);
      const clip = gltf.animations.find((animation) => animation.name === "CameraAction");
      if (clip) { mixer.clipAction(clip).play(); duration = clip.duration; }
      for (const name of ["hiroto-profile", "to_projects", "to_contact", "hirotos_showreel"]) createMap(name);
      for (const path of imagePaths) {
        const image = new Image(); image.src = path; images.push(image);
        image.onload = () => { if (!disposed) { drawSigns(elapsed); renderer.render(scene, camera); } };
      }
      void Promise.allSettled([document.fonts.load(`500 152px ${condensedFont}`), document.fonts.load(`400 72px ${sansFont}`)]).then(() => { if (!disposed && camera) { drawSigns(elapsed); renderer.render(scene, camera); } });
      drawSigns(0); mixer.setTime(0); scene.updateMatrixWorld(true); resize();
      readyRef.current();
    }, undefined, () => { if (!disposed) { host.dataset.failed = "true"; readyRef.current(); } });

    const hitTest = () => {
      if (!camera || !model) return undefined;
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObject(model, true)[0];
    };
    const linkFor = (hit: THREE.Intersection | undefined) => {
      if (!(hit?.object instanceof THREE.Mesh)) return undefined;
      const meshMaterials = Array.isArray(hit.object.material) ? hit.object.material : [hit.object.material];
      return meshMaterials.map((material) => signLinks[material.name]).find(Boolean);
    };
    const setPointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    };
    const move = (event: PointerEvent) => {
      setPointer(event); pointerInside = true;
      previewX(Math.max(10, Math.min(event.clientX - 51, innerWidth - 112)));
      previewY(Math.max(10, Math.min(event.clientY - 61, innerHeight - 112)));
      if (pointerDown && activeRef.current && !reduced.matches) {
        const dx = pointerDown.lastX - event.clientX;
        const dy = pointerDown.lastY - event.clientY;
        targetScroll += (Math.abs(dx) > Math.abs(dy) ? dx : dy) * 1.9 / (3 * host.clientHeight);
        pointerDown.lastX = event.clientX; pointerDown.lastY = event.clientY;
      }
    };
    const down = (event: PointerEvent) => {
      if (!activeRef.current) return;
      setPointer(event);
      pointerDown = { x: event.clientX, y: event.clientY, lastX: event.clientX, lastY: event.clientY };
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const up = (event: PointerEvent) => {
      const start = pointerDown; pointerDown = null;
      if (!activeRef.current || !start || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 7) return;
      setPointer(event);
      const hit = hitTest();
      const link = linkFor(hit);
      if (link) { window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: link.href })); return; }
      if (!(hit?.object instanceof THREE.Mesh) || !hit.face) return;
      if (!heroContent.gravityTags.length) return;
      const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 256;
      canvas.getContext("2d")!.drawImage(stickerPreview, 0, 0);
      stickerIndex++; paintSticker();
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.add(texture);
      const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
      const orientation = new THREE.Object3D(); orientation.position.copy(hit.point); orientation.lookAt(hit.point.clone().add(normal)); orientation.rotateZ((Math.random() - 0.5) * 1.2);
      const size = new THREE.Vector3(0.068, 0.034, 0.05);
      const geometry = new DecalGeometry(hit.object, hit.point, orientation.rotation, size);
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 });
      const decal = new THREE.Mesh(geometry, material); scene.add(decal); decals.push(decal); shake = reduced.matches ? 0 : 1;
      impactElapsed = reduced.matches ? 1 : 0;
      if (decals.length > 32) {
        const old = decals.shift()!;
        const oldMaterial = old.material as THREE.MeshBasicMaterial;
        if (oldMaterial.map) { oldMaterial.map.dispose(); textures.delete(oldMaterial.map); }
        scene.remove(old); old.geometry.dispose(); oldMaterial.dispose();
      }
    };
    const cancel = () => { pointerDown = null; pointerInside = false; stickerPreview.dataset.visible = "false"; };
    const wheel = (event: WheelEvent) => {
      if (!activeRef.current || reduced.matches || event.ctrlKey) return;
      event.preventDefault(); targetScroll += wheelPixels(event, host.clientHeight) / (3 * host.clientHeight);
    };
    const reset = () => { targetScroll = currentScroll = 0; cancel(); if (mixer) mixer.setTime(0); };
    const tick = (_: number, milliseconds: number) => {
      if (!camera || document.hidden) return;
      if (!activeRef.current) return;
      const dt = Math.min(milliseconds / 1000, 0.064);
      elapsed += reduced.matches ? 0 : dt;
      currentScroll += (targetScroll - currentScroll) * (1 - Math.exp(-dt / 0.14));
      mixer.setTime(wrap(currentScroll) * duration);
      camera.position.copy(cameraPosition);
      if (shake > 0.0001) {
        camera.position.x += Math.sin(elapsed * 83.2) * shake * 0.0026;
        camera.position.y += Math.cos(elapsed * 109.2) * shake * 0.00091;
        shake *= Math.exp(-14 * dt);
      }
      const frame = Math.floor(elapsed * 30);
      if (frame !== lastTextureFrame) { drawSigns(elapsed); lastTextureFrame = frame; }
      const lightColors = ["#ff2b1f", "#ffd21f", "#12d7a8"];
      const litIndex = reduced.matches ? 2 : Math.floor((elapsed % 3.6) / 1.2);
      for (let index = 0; index < 3; index++) {
        const material = materials.get(`light${index + 1}`);
        if (!material) continue;
        material.toneMapped = false;
        material.color.set(index === litIndex ? lightColors[index] : "#050505");
        material.emissive.copy(material.color);
        material.emissiveIntensity = index === litIndex ? 2.8 * (0.74 + 0.26 * Math.sin((elapsed % 1.2) / 1.2 * Math.PI)) : 0.05;
      }
      scene.updateMatrixWorld(true);
      if (pointerInside) {
        const hit = hitTest();
        const text = linkFor(hit)?.label || "";
        stickerPreview.dataset.visible = String(Boolean(hit && !text && heroContent.gravityTags.length && !pointerDown));
        if (text !== hoveredLabel) { hoveredLabel = text; window.dispatchEvent(new CustomEvent("portfolio:cursor", { detail: text })); host.style.cursor = hit ? "pointer" : ""; }
      }
      renderer.render(scene, camera);
      if (impactElapsed < 0.29) {
        impactElapsed += dt;
        impactMaterial.uniforms.amount.value = Math.hypot(0.019, 0.005) * (impactElapsed <= 0.05 ? 1 : Math.pow(2, -10 * Math.min((impactElapsed - 0.05) / 0.24, 1)));
        renderer.copyFramebufferToTexture(impactFrame);
        impactQuad.render(renderer);
      }
    };
    const canvas = renderer.domElement;
    canvas.addEventListener("pointerdown", down); canvas.addEventListener("pointermove", move); canvas.addEventListener("pointerup", up); canvas.addEventListener("pointercancel", cancel); canvas.addEventListener("pointerleave", cancel); canvas.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("portfolio:route-change", reset);
    gsap.ticker.add(tick);
    return () => {
      disposed = true; gsap.ticker.remove(tick); observer.disconnect();
      previewX.tween.kill(); previewY.tween.kill(); stickerPreview.remove();
      window.removeEventListener("portfolio:route-change", reset);
      canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", cancel); canvas.removeEventListener("pointerleave", cancel); canvas.removeEventListener("wheel", wheel);
      images.forEach((image) => { image.onload = null; });
      mixer?.stopAllAction();
      const geometries = new Set<THREE.BufferGeometry>(); const disposableMaterials = new Set<THREE.Material>();
      scene.traverse((object) => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => disposableMaterials.add(material)); } });
      geometries.forEach((geometry) => geometry.dispose()); disposableMaterials.forEach((material) => material.dispose()); textures.forEach((texture) => texture.dispose());
      impactFrame.dispose(); impactMaterial.dispose(); impactQuad.dispose();
      sun.shadow.dispose(); environment.dispose(); pmrem.dispose(); renderer.dispose(); canvas.remove();
    };
  }, []);

  return <div className="signal-scene" ref={mount}><div className="scene-fallback"><p>{personal.seo.shortDescription}</p><span>Explore my work using the navigation.</span></div></div>;
}
