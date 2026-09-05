import assert from "node:assert/strict";
import test from "node:test";
import { wrap, wheelPixels, wavePath, scrambleText } from "../lib/experience-math.mjs";

test("camera and gallery wrap continuously in either scroll direction", () => {
  assert.equal(wrap(-0.25), 0.75);
  assert.equal(wrap(2.25), 0.25);
  assert.equal(wrap(-2401, 2400), 2399);
  assert.equal(wrap(1, 0), 0);
});

test("trackpads, line-mode mice and page-mode keyboards use consistent distances", () => {
  assert.equal(wheelPixels({ deltaX: -20, deltaY: 2, deltaMode: 0 }, 900), -20);
  assert.equal(wheelPixels({ deltaX: 0, deltaY: 3, deltaMode: 1 }, 900), 48);
  assert.equal(wheelPixels({ deltaX: 0, deltaY: 1, deltaMode: 2 }, 900), 900);
});

test("transition mask covers tall and wide screens without a side seam", () => {
  assert.match(wavePath(100, 100, 1440, 900, true), /^M 0 0 H 1440 V 1440/);
  assert.match(wavePath(100, 100, 390, 844, true), /^M -227 0 H 617 V 844/);
  assert.equal(scrambleText("TIEN", "ACCOUNT PLANNER", 1), "ACCOUNT PLANNER");
  assert.equal(scrambleText("LONG NAME", "TIEN", 1), "TIEN");
});
