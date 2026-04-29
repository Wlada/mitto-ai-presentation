import { test, expect } from '@playwright/test';

const TOTAL_SLIDES = 11;

test.describe('slides visual regression', () => {
  // Disable animations and freeze the brand link so the screenshot is stable.
  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
  });

  for (let n = 1; n <= TOTAL_SLIDES; n++) {
    test(`slide ${n} matches snapshot`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`/slides/${n}`);
      // Wait for the slide title in the top bar to confirm the route resolved.
      await expect(page.locator('.slide-title')).toBeVisible();
      // Give Material's font + animations one frame to settle.
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot(`slide-${String(n).padStart(2, '0')}.png`, {
        fullPage: false,
        // Tiny pixel diffs from font hinting are fine; major layout drift is not.
        maxDiffPixelRatio: 0.02,
      });
    });
  }

  test('feedback page matches snapshot', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/feedback');
    // Skip on branches that don't ship the Q&A feature (e.g. `main` pre-cut).
    const heading = page.getByRole('heading', { name: 'Audience Q&A' });
    const present = await heading.isVisible({ timeout: 1500 }).catch(() => false);
    test.skip(!present, 'Feedback feature not present on this branch');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('feedback-page.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.02,
      // Mask the relative-time labels in case any seed entries exist.
      mask: [page.locator('.time')],
    });
  });
});
