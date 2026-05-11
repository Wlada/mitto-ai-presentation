import { test, expect } from '@playwright/test';

test.describe('Audience Q&A flow', () => {
  // Serial + unique message payloads keep tests independent without a reset endpoint.
  test.describe.configure({ mode: 'serial' });

  test('feedback page loads with form and list', async ({ page }) => {
    await page.goto('/feedback');

    await expect(page.getByRole('heading', { name: 'Audience Q&A' })).toBeVisible();
    await expect(page.getByRole('heading', { name: /share your feedback/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /recent feedback/i })).toBeVisible();

    await expect(page.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  test('user can submit feedback and see it in the list', async ({ page }) => {
    await page.goto('/feedback');

    const uniqueMessage = `e2e demo question ${Date.now()}`;

    await page.getByLabel('Name (optional)').fill('Demo Attendee');

    // Material's mat-select renders as role=combobox; clicking it opens the panel.
    // Scope option click to the listbox to avoid matching filter chips on the list.
    await page.getByRole('combobox', { name: 'Type' }).click();
    await page
      .getByRole('listbox', { name: 'Type', exact: true })
      .getByRole('option', { name: 'question', exact: true })
      .click();

    await page.getByLabel('Message').fill(uniqueMessage);

    const submit = page.getByRole('button', { name: /submit/i });
    await expect(submit).toBeEnabled();
    await submit.click();

    await expect(page.getByText(/thanks for your feedback/i)).toBeVisible({ timeout: 5000 });

    // The list polls every 3s; new entry should appear within one cycle.
    // Scope to the card carrying the unique message so prior in-memory entries
    // (the dev server is reused across runs) don't trigger strict-mode errors.
    const newCard = page.locator('mat-card').filter({ hasText: uniqueMessage });
    await expect(newCard).toBeVisible({ timeout: 5000 });
    await expect(newCard.getByText('Demo Attendee')).toBeVisible();
  });

  test('submit is disabled until a message is provided', async ({ page }) => {
    await page.goto('/feedback');

    const submit = page.getByRole('button', { name: /submit/i });
    await expect(submit).toBeDisabled();

    await page.getByLabel('Message').fill('Quick comment');
    await expect(submit).toBeEnabled();
  });

  test('full demo flow: slide CTA → submit → back to source slide', async ({ page }) => {
    // Land on slide 6 (Results) where the audience CTA lives after the
    // renumbering that dropped the old slide-5 demo-task.
    await page.goto('/slides/6');
    await expect(page).toHaveURL(/\/slides\/6$/);

    // Click the slide's CTA link into the feature.
    await page.getByRole('link', { name: /try the demo feature/i }).click();
    await expect(page).toHaveURL(/\/feedback$/);

    // Submit a unique entry to prove the full flow works end-to-end.
    const uniqueMessage = `slide-cta flow ${Date.now()}`;
    await page.getByLabel('Name (optional)').fill('Slide CTA Tester');
    await page.getByRole('combobox', { name: 'Type' }).click();
    await page
      .getByRole('listbox', { name: 'Type', exact: true })
      .getByRole('option', { name: 'comment', exact: true })
      .click();
    await page.getByLabel('Message').fill(uniqueMessage);
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/thanks for your feedback/i)).toBeVisible({ timeout: 5000 });

    // The back arrow should return to the source slide, not /slides/1.
    await page.getByRole('link', { name: /back to slide 6/i }).click();
    await expect(page).toHaveURL(/\/slides\/6$/);
    await expect(page.getByRole('heading', { level: 1, name: /what we produced/i })).toBeVisible();
  });
});
