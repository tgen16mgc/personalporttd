// node tests/speaker-hover.browser.mjs /path/to/playwright_cli.sh horn-hover
import { spawnSync } from "node:child_process";

async function checkSpeakerHover(page) {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:3000/');
  await page.waitForSelector('.signal-scene canvas');
  await page.waitForTimeout(4500);
  check(await page.locator('.speaker-waves').count() === 0, 'Sound-wave lines must stay removed');
  const hornImage = () => page.screenshot({ clip: { x: 220, y: 74, width: 160, height: 145 } });
  await page.mouse.move(305, 145);
  await page.waitForTimeout(650);
  check(await page.locator('.sticker-preview').getAttribute('data-visible') === 'false', 'Sticker preview covers the horn');
  const first = await hornImage();
  await page.waitForTimeout(150);
  check(!first.equals(await hornImage()), 'Horn does not wobble');
  await page.mouse.move(20, 400);
  await page.waitForTimeout(800);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.mouse.move(305, 145);
  await page.waitForTimeout(400);
  const still = await hornImage();
  await page.waitForTimeout(200);
  check(still.equals(await hornImage()), 'Reduced motion still wobbles the horn');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.mouse.move(20, 400);
}

const [cli = "playwright-cli", session = "default"] = process.argv.slice(2);
const result = spawnSync(cli, [`-s=${session}`, "run-code", checkSpeakerHover.toString()], { stdio: "inherit" });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
