import { expect, test } from '@playwright/test';

test.describe('app health', () => {
  test('home page loads successfully', async ({ page }) => {
    const response = await page.goto('/');

    expect(response, 'navigation response should exist').not.toBeNull();
    expect(response!.status(), 'response status should be < 400').toBeLessThan(400);

    // Sanity check that Angular bootstrapped and rendered something.
    await expect(page.locator('body')).not.toBeEmpty();
  });
});
