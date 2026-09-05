import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

test("signal pole loads without the embossed text and retains its camera animation", async () => {
  const file = await readFile(new URL("../public/models/signal-pole.glb", import.meta.url));
  const gltf = await new GLTFLoader().parseAsync(file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength), "");
  assert.equal(gltf.scene.getObjectByName("Text"), undefined);
  assert.ok(gltf.scene.getObjectByName("signal_pole"));
  assert.equal(gltf.cameras.length, 1);
  for (const name of ["light1", "light2", "light3"]) {
    assert.ok(gltf.parser.json.materials.some((material) => material.name === name));
  }
  const cameraRig = gltf.scene.getObjectByName("Empty");
  const rotation = cameraRig.quaternion.clone();
  const clip = gltf.animations.find((animation) => animation.name === "CameraAction");
  assert.ok(clip?.duration > 0);
  const mixer = new AnimationMixer(gltf.scene);
  mixer.clipAction(clip).play();
  mixer.setTime(clip.duration / 2);
  assert.ok(cameraRig.quaternion.angleTo(rotation) > 0.01);
});
