/*
 * Starter screenshot capture for the visual review gate (docs/DESIGN.md s9).
 * Writes full-page images to evidence/screens/ for the agent (or a human) to
 * look at and critique. Add every user-facing route to ROUTES.
 */
import { test } from "@playwright/test";

const ROUTES = ["/"];
const VIEWPORTS = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 900 },
];

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    test(`screenshot ${route} @${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.emulateMedia({ reducedMotion: "reduce" }); // settled final state
      await page.goto(route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const slug = route === "/" ? "home" : route.replace(/\W+/g, "-");
      await page.screenshot({
        path: `evidence/screens/${slug}-${vp.name}.png`,
        fullPage: true,
      });
    });
  }
}
