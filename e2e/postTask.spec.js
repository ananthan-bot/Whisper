import { test, expect } from '@playwright/test';

test.describe('Post Task Wizard Flow', () => {
  test('creates a new task through the 5-step wizard', async ({ page }) => {
    await page.goto('/post-task');

    // Step 1: Category selection
    await expect(page.locator('h1')).toContainText('Describe your task');
    await page.click('button:has-text("The Negotiator")');
    await page.click('button:has-text("Next step")');

    // Step 2: Description
    await page.fill('textarea', 'Call ISP customer support to request a lower monthly bill rate.');
    await page.click('button:has-text("Next step")');

    // Step 3: Talking points / Script
    await page.fill('textarea', 'Ask for promo rate extension.');
    await page.click('button:has-text("Next step")');

    // Step 4: Proof type
    await page.click('button:has-text("Next step")');

    // Step 5: Alias & Publish
    await page.click('button:has-text("Publish task")');

    // Verification: Should navigate to Helper Dashboard and show new task
    await expect(page).toHaveURL('/helper');
    await expect(page.locator('body')).toContainText('Call ISP customer support');
  });
});
