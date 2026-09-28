import { test, expect } from '@playwright/test';

test.describe('Admin Panel Multilingual BDD Feature', () => {
  test('Admin navigates to settings and interacts with multi-language controls', async ({ page }) => {
    await page.goto('/admin/settings');

    await expect(page.locator('body')).toBeVisible();

    const langToggle = page.locator('button').filter({ hasText: /Türkçe|English|Deutsch/ }).first();
    if (await langToggle.isVisible()) {
      await langToggle.click();
      const menuOption = page.locator('text=Deutsch').first();
      if (await menuOption.isVisible()) {
        await menuOption.click();
      }
    }
  });
});
