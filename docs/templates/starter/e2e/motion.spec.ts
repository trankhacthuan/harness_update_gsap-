/*
 * Starter Playwright proof for a route's motion contract (docs/MOTION.md).
 * Copy to e2e/, set ROUTE and the data-motion selectors from the story's
 * motion contract. Asserts a real start -> end change, not a sleep or import.
 */
import { test, expect } from "@playwright/test";

const ROUTE = "/";
const TARGET = "[data-motion='title']";

test.describe("normal motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("GSAP entrance runs and ends visible", async ({ page }) => {
    await page.goto(ROUTE);
    const el = page.locator(TARGET).first();
    // Animation was applied by GSAP (inline style written by the tween).
    await expect
      .poll(() => el.evaluate((n) => (n as HTMLElement).style.transform || (n as HTMLElement).style.opacity))
      .not.toBe("");
    // Final state: fully visible and untransformed.
    await expect(el).toHaveCSS("opacity", "1", { timeout: 3000 });
    await expect(el).toHaveCSS("transform", /none|matrix\(1, 0, 0, 1, 0, 0\)/);
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("content is visible immediately and not transformed", async ({ page }) => {
    await page.goto(ROUTE);
    const el = page.locator(TARGET).first();
    await expect(el).toBeVisible();
    await expect(el).toHaveCSS("opacity", "1");
    await expect(el).toHaveCSS("transform", /none|matrix\(1, 0, 0, 1, 0, 0\)/);
  });
});
