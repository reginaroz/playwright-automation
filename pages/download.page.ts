import { expect, Page, test } from '@playwright/test';

export class DownloadPage {
  public downloadButton = this.page.getByTestId('open-download-manager-button');
  public downloadList = this.page.getByTestId('download-manager-overlay-content');

  private reportRow = this.page.locator('[data-testid^="download-card-"]');
  private clearAllDownloads = this.page.getByTestId('download-manager-clear-all-button');
  private emptyContent = this.page.getByTestId('empty-content-container');
  private closeButton = this.page.getByTestId('CloseIcon');
  private cardTextContainer = this.page.locator('[data-testid^="card-text-container-"]');
  private downloadReportButton = this.page.locator('[data-testid^="download-report-button-"]'); 

  constructor(private page: Page) {}

  private async openDownloadsPanel() {
    const isVisible = await this.downloadList.isVisible();
    if (!isVisible) {
      await this.downloadButton.click();
      await this.downloadList.waitFor({ state: 'visible' });
    }
  }

  async verifyNoDownloads() {
    await test.step('Verify no downloads are present', async () => {
      await this.openDownloadsPanel();
      await expect(this.reportRow).toHaveCount(0);
    });
  }

  async verifyEmptyDownloadsMessage() {
    await test.step('Verify empty downloads message is shown', async () => {
      await this.openDownloadsPanel();
      await expect(this.emptyContent).toBeVisible();
      await expect(this.emptyContent).toContainText(/No downloads yet/i);
    });
  }
  async deleteDownloads() {
    await test.step('Delete all downloads', async () => {
      await this.openDownloadsPanel();
      if (await this.reportRow.count() === 0) {
        return;
      }
      await this.clearAllDownloads.click();
      await this.verifyEmptyDownloadsMessage();
    });
  }
  async closeDownloadPanel() {
    await test.step('Close the download panel', async () => {
      await this.closeButton.click();
      await expect(this.downloadList).toBeHidden();
    });
  }

  async verifyReportText(expectedText: string) {
    await test.step(`Verify report contains text: ${expectedText}`, async () => {
      await this.openDownloadsPanel();
      await expect(this.cardTextContainer.first()).toContainText(expectedText);
    });
  }

  async verifyReportExists(reportText: string) {
    await test.step(`Verify report "${reportText}" exists in downloads`, async () => {
      await this.openDownloadsPanel();
      await this.cardTextContainer.first().waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.cardTextContainer.first()).toContainText(reportText);
    });
  }

  async waitForReportToAppear(timeout: number = 15000) {
    await test.step('Wait for report to appear in downloads', async () => {
      await this.openDownloadsPanel();
      await this.cardTextContainer.first().waitFor({ state: 'visible', timeout });
    });
  }

  async clickDownloadReport() {
    await test.step('Click download button for first report', async () => {
      await this.openDownloadsPanel();
      await this.downloadReportButton.first().waitFor({ state: 'visible' });
      await this.downloadReportButton.first().click();
    });
  }

  async clickDownloadReportByText(reportText: string) {
    await test.step(`Click download button for report: ${reportText}`, async () => {
      await this.openDownloadsPanel();
      await this.cardTextContainer.first().waitFor({ state: 'visible', timeout: 10000 });
      const reportCard = this.cardTextContainer.filter({ hasText: reportText });
      const reportId = await reportCard.first().getAttribute('data-testid');
      const id = reportId?.replace('card-text-container-', '');
      const downloadBtn = this.page.getByTestId(`download-report-button-${id}`);
      await downloadBtn.waitFor({ state: 'visible' });
      await downloadBtn.click();
    });
  }
}
