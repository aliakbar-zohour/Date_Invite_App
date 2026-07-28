import { chromium } from "playwright-core";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

/**
 * Optional helper for regenerating README screenshots.
 * Requires: npm i -D playwright-core
 * And a Chromium-based browser (Edge/Chrome) installed.
 *
 *   node scripts/capture-screenshots.mjs
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "docs", "screenshots");
const EDGE =
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge";
const BASE = process.env.APP_URL ?? "http://localhost:3000";

async function shot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, type: "png" });
  console.log("saved", file);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({
    executablePath: EDGE,
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: "fa-IR",
  });

  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      nextjs-portal, [data-next-mark-loading] {
        display: none !important;
        opacity: 0 !important;
      }
    `,
  });
  await page.waitForTimeout(800);
  await shot(page, "01-ask");

  await page.locator(".btn-yes").click();
  await page.waitForTimeout(700);
  await shot(page, "02-date");

  const day = page.locator("button.day:not(.past):not([disabled])").first();
  await day.click();
  await page.waitForTimeout(350);
  await page.getByRole("button", { name: /بعدی/ }).click();
  await page.waitForTimeout(700);
  await shot(page, "03-time");

  await page.getByRole("button", { name: /بعدی/ }).click();
  await page.waitForTimeout(700);
  await shot(page, "04-food");

  await page.locator(".food-option").first().click();
  await page.waitForTimeout(350);
  await page.getByRole("button", { name: /تمومه/ }).click();
  await page.waitForTimeout(1000);
  await shot(page, "05-celebrate");

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
