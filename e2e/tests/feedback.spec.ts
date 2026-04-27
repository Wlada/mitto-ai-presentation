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
    await expect(page.getByText(uniqueMessage)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Demo Attendee')).toBeVisible();
  });

  test('submit is disabled until a message is provided', async ({ page }) => {
    await page.goto('/feedback');

    const submit = page.getByRole('button', { name: /submit/i });
    await expect(submit).toBeDisabled();

    await page.getByLabel('Message').fill('Quick comment');
    await expect(submit).toBeEnabled();
  });
});
