import { test as base, BrowserContext } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DownloadPage } from '../pages/download.page';
import { FindingsPage } from '../pages/findings.page';
import { CommonFunctions } from '../pages/common-functions';
import { ExportPage } from '../pages/export-page';


type AllFixtures = {
  loginPage: LoginPage;
  downloadPage: DownloadPage;
  findingsPage: FindingsPage;
  commonFunctions: CommonFunctions;
  exportPage: ExportPage;
};

export const test = base.extend<AllFixtures>({

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  downloadPage: async ({ page }, use) => {
    const downloadPage = new DownloadPage(page);
    await use(downloadPage);
  },
  findingsPage: async ({ page }, use) => {
    const findingsPage = new FindingsPage(page);
    await use(findingsPage);
  },
  commonFunctions: async ({ page }, use) => {
    const commonFunctions = new CommonFunctions(page);
    await use(commonFunctions);
  },
  exportPage: async ({ page }, use) => {
    const exportPage = new ExportPage(page);
    await use(exportPage);
  }
});