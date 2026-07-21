import { test, expect } from '@playwright/test';

test.describe('Task Claim, Chat, Proof, and Rating Flow', () => {
  test('allows helper to claim a task, chat, submit proof, and requester to rate', async ({ page }) => {
    // 1. Visit Helper Dashboard
    await page.goto('/helper');
    await expect(page.locator('h1')).toContainText('Available Tasks');

    // 2. Select first task
    await page.click('a:has-text("TASK-8472")');
    await expect(page.locator('h1')).toContainText('Comcast');

    // 3. Switch to Helper view & Claim Task
    await page.click('button:has-text("Helper")');
    await page.click('button:has-text("Claim This Task")');

    // 4. Send a chat message
    await page.fill('input[placeholder*="Type a quiet message"]', 'Hello, starting this call now.');
    await page.click('button:has-element(svg)');
    await expect(page.locator('body')).toContainText('Hello, starting this call now.');

    // 5. Submit Proof
    await page.fill('textarea[placeholder*="summary"]', 'Spoke with agent John. Reduced monthly fee to $55.');
    await page.click('button:has-text("Submit Proof")');

    // 6. Switch to Requester View & Accept
    await page.click('button:has-text("Requester")');
    await page.click('button:has-text("Accept & Complete")');

    // 7. Submit 5-star rating
    await page.click('button:has-text("Submit Rating")');
    await expect(page.locator('body')).toContainText('Thanks for your rating!');
  });
});
