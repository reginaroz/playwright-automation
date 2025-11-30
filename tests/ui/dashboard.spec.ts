import { test } from '../../utils/project-custom-fixtures';

test.describe('Dashboard Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.loginAsCandidate();
  });

  test('simulate and download finding report', async ({ page, downloadPage, findingsPage, commonFunctions, exportPage }) => {
    await page.goto('/cym/');
    await downloadPage.deleteDownloads();
    await downloadPage.closeDownloadPanel();
    await findingsPage.navigateToFindingsTab();
    await commonFunctions.selectModuleFilter('Module', 'BAS');
    await findingsPage.selectFirstRow();
    await commonFunctions.clickExportButton();
    await exportPage.verifyExportOverlayIsOpen();
    await exportPage.clickExportButton();
    await page.reload();
    await downloadPage.verifyReportExists('odule - Findings');
    await downloadPage.clickDownloadReport();

});
});