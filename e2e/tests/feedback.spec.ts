import { test, expect } from '@playwright/test';

test.describe('Audience Q&A flow', () => {
  test('user can submit feedback and see it in the list', async ({ page }) => {
    await page.goto('/feedback');

    await expect(page.getByRole('heading', { name: /audience q.?&.?a/i })).toBeVisible();

    const uniqueMessage = `Live demo question ${Date.now()}`;

    await page.getByLabel(/name/i).fill('Demo Attendee');

    await page.getByLabel(/type/i).click();
    await page.getByRole('option', { name: /question/i }).click();

    await page.getByLabel(/message/i).fill(uniqueMessage);

    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText(/thanks for your feedback/i)).toBeVisible({
      timeout: 5000,
    });

    await expect(page.getByText(uniqueMessage)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Demo Attendee')).toBeVisible();
  });

  test('submit button is disabled until form is valid', async ({ page }) => {
    await page.goto('/feedback');

    const submit = page.getByRole('button', { name: /submit/i });
    await expect(submit).toBeDisabled();

    await page.getByLabel(/type/i).click();
    await page.getByRole('option', { name: /comment/i }).click();
    await page.getByLabel(/message/i).fill('Quick comment');

    await expect(submit).toBeEnabled();
  });

  test('list filters by feedback type', async ({ page }) => {
    await page.goto('/feedback');

    const seedMessage = `Filter test seed ${Date.now()}`;

    await page.getByLabel(/type/i).click();
    await page.getByRole('option', { name: /suggestion/i }).click();
    await page.getByLabel(/message/i).fill(seedMessage);
    await page.getByRole('button', { name: /submit/i }).click();

    await expect(page.getByText(seedMessage)).toBeVisible({ timeout: 5000 });

    const questionsChip = page.getByRole('option', { name: /^questions?$/i }).first();
    if (await questionsChip.isVisible().catch(() => false)) {
      await questionsChip.click();
      await expect(page.getByText(seedMessage)).toBeHidden({ timeout: 5000 });
    }
  });
});
