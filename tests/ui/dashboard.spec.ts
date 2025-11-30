import { test, expect } from '../../utils/project-custom-fixtures';
import { CSVHelper } from '../../utils/csv-helper';
import * as path from 'path';
import * as os from 'os';

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
    
    // Get first row data from UI before exporting
    const uiData = await findingsPage.getFirstRowData();
    console.log('UI Data:', uiData);
    
    await findingsPage.selectFirstRow();
    await commonFunctions.clickExportButton();
    await exportPage.verifyExportOverlayIsOpen();
    await exportPage.clickExportButton();
    
    // Wait for export to complete
    await page.waitForTimeout(3000);
    
    await page.reload();
    await downloadPage.verifyReportExists('Findings');
    
    // Download the report
    const downloadPromise = page.waitForEvent('download');
    await downloadPage.clickDownloadReport();
    const download = await downloadPromise;
    
    // Save the downloaded file
    const downloadsPath = path.join(os.homedir(), 'Downloads');
    const filePath = path.join(downloadsPath, download.suggestedFilename());
    await download.saveAs(filePath);
    
    // Wait for file to be written
    await page.waitForTimeout(1000);
    
    // Compare UI data with CSV data
    const comparison = CSVHelper.compareFindingsWithCSV(uiData, filePath);
    console.log('Comparison Result:', comparison);
    
    expect(comparison.match, `Data mismatch:\n${comparison.differences.join('\n')}`).toBeTruthy();
  });
});