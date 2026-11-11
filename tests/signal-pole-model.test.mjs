import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { AnimationMixer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

test("Hanoi pole retains its camera animation and navigation surfaces", async () => {
  const file = await readFile(new URL("../public/models/signal-pole.glb", import.meta.url));
  const jsonLength = file.readUInt32LE(12);
  const json = JSON.parse(file.subarray(20, 20 + jsonLength).toString());
  const names = json.nodes.map((node) => node.name);
  for (const name of ["Loa phuong - flared enamel horn", "Utility enclosure", "Service drip loop"]) {
    assert.ok(names.includes(name), `Missing Hanoi model component: ${name}`);
  }
  assert.ok(file.byteLength < 5_000_000, "Homepage model must stay below 5 MB");
  assert.equal(json.scenes.length, 1, "Studio review scenes must not ship");
  assert.ok(!names.some((name) => name === "Cube" || name.includes("Studio")));
  assert.deepEqual(json.cameras[0].perspective, {
    aspectRatio: 1.7777777777777777,
    yfov: 0.16835126306094314,
    zfar: 1000,
    znear: 0.10000000149011612,
  }, "Keep the original website lens and framing");
  assert.ok(json.images.length > 0);
  assert.ok(json.images.every((image) => Number.isInteger(image.bufferView) && !image.uri));
  assert.ok(!json.materials.some((material) => /^light[123]$/.test(material.name)));
  for (const name of ["hiroto-profile", "to_projects", "to_contact"]) {
    const materialIndex = json.materials.findIndex((material) => material.name === name);
    assert.ok(materialIndex >= 0);
    assert.ok(json.meshes.some((mesh) => mesh.primitives.some((primitive) => primitive.material === materialIndex)));
  }
  const enamel = json.materials.find((material) => material.name === "Aged ivory horn enamel");
  assert.equal(enamel.pbrMetallicRoughness.metallicFactor, 0);
  assert.ok(enamel.pbrMetallicRoughness.metallicRoughnessTexture);
  assert.ok(enamel.extensions.KHR_materials_clearcoat.clearcoatFactor > 0.3);
  for (const name of ["Metallic", "Metallic.002", "Dull galvanized mounting steel"]) {
    const metal = json.materials.find((material) => material.name === name);
    assert.ok(metal.pbrMetallicRoughness.metallicFactor > 0.9, `${name} must reflect as exposed metal`);
    assert.ok(metal.pbrMetallicRoughness.metallicRoughnessTexture, "Keep baked wear variation");
  }

  // Decode geometry and animation in Node; embedded image decoding is checked in the browser.
  json.materials = json.materials.map(({ name }) => ({ name }));
  const jsonChunk = Buffer.from(JSON.stringify(json));
  const padding = Buffer.alloc((4 - jsonChunk.length % 4) % 4, 0x20);
  const binaryChunk = file.subarray(20 + jsonLength);
  const header = Buffer.alloc(20);
  header.write("glTF"); header.writeUInt32LE(2, 4);
  header.writeUInt32LE(20 + jsonChunk.length + padding.length + binaryChunk.length, 8);
  header.writeUInt32LE(jsonChunk.length + padding.length, 12); header.writeUInt32LE(0x4e4f534a, 16);
  const model = Buffer.concat([header, jsonChunk, padding, binaryChunk]);
  const gltf = await new GLTFLoader().parseAsync(model.buffer.slice(model.byteOffset, model.byteOffset + model.byteLength), "");
  assert.equal(gltf.scene.getObjectByName("Text"), undefined);
  assert.ok(gltf.scene.getObjectByName("signal_pole"));
  assert.equal(gltf.cameras.length, 1);
  const cameraRig = gltf.scene.getObjectByName("Empty");
  const rotation = cameraRig.quaternion.clone();
  const clip = gltf.animations.find((animation) => animation.name === "CameraAction");
  assert.ok(clip?.duration > 0);
  const mixer = new AnimationMixer(gltf.scene);
  mixer.clipAction(clip).play();
  mixer.setTime(clip.duration / 2);
  assert.ok(cameraRig.quaternion.angleTo(rotation) > 0.01);
});
