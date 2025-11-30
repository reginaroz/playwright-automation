import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.describe('Dashboard Tests', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginAsCandidate();
  });

  test('simulate and download finding report', async ({ page, request }) => {

    await page.goto('/cym/');
    await page.waitForSelector('[data-testid="DownloadIcon"]');
});
});