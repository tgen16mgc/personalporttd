// node tests/speaker-hover.browser.mjs /path/to/playwright_cli.sh horn-hover
import { spawnSync } from "node:child_process";

async function checkSpeakerHover(page) {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:3000/');
  await page.waitForSelector('.speaker-waves', { state: 'attached' });
  await page.waitForTimeout(4500);
  const waves = page.locator('.speaker-waves');
  check(await waves.locator('path').count() === 2, 'Expected exactly two sound-wave arcs');
  check(Number(await waves.evaluate(el => el.style.opacity)) < 0.01, 'Waves visible before hover');
  await page.mouse.move(305, 145);
  await page.waitForTimeout(650);
  check(Number(await waves.evaluate(el => el.style.opacity)) > 0.9, 'Horn hover did not activate waves');
  check(await page.locator('.sticker-preview').getAttribute('data-visible') === 'false', 'Sticker preview covers the horn');
  const first = await waves.locator('g').getAttribute('transform');
  await page.waitForTimeout(150);
  check(first !== await waves.locator('g').getAttribute('transform'), 'Horn does not wobble');
  await page.mouse.move(20, 400);
  await page.waitForTimeout(800);
  check(Number(await waves.evaluate(el => el.style.opacity)) < 0.01, 'Waves did not fade out');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.mouse.move(305, 145);
  await page.waitForTimeout(400);
  check(Number(await waves.evaluate(el => el.style.opacity)) === 0, 'Reduced motion still shows animated waves');
  const still = await waves.locator('g').getAttribute('transform');
  await page.waitForTimeout(200);
  check(still === await waves.locator('g').getAttribute('transform'), 'Reduced motion still wobbles the horn');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.mouse.move(20, 400);
}

const [cli = "playwright-cli", session = "default"] = process.argv.slice(2);
const result = spawnSync(cli, [`-s=${session}`, "run-code", checkSpeakerHover.toString()], { stdio: "inherit" });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
