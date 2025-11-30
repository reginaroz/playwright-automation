import { expect, Page, test } from '@playwright/test';

export class ExportPage {
  
  // Export overlay panel locators - using the parent container with class to avoid strict mode violation
  private exportOverlayPanel = this.page.locator('.p-overlaypanel.p-component');
  private exportOverlayContent = this.page.locator('.p-overlaypanel-content[data-testid="overlay-panel"]');
  private exportSearchInput = this.page.getByTestId('InputSearch');
  private exportListHeader = this.page.getByTestId('ListHeader');
  private exportListItems = this.page.getByTestId('ListItems');
  private exportButton = this.page.locator('button[aria-label="Export"]').filter({ hasText: 'Export' });
  private selectAllButton = this.page.locator('button[aria-label="Select all"]');
  private clearAllButton = this.page.locator('button[aria-label="Clear all"]');
  
  constructor(private page: Page) {}

  async verifyExportOverlayIsOpen() {
    await test.step('Verify export overlay panel is open', async () => {
      await this.exportOverlayContent.waitFor({ state: 'visible' });
      await expect(this.exportOverlayContent).toBeVisible();
    });
  }

  async searchExportColumn(columnName: string) {
    await test.step(`Search for export column: ${columnName}`, async () => {
      await this.exportSearchInput.waitFor({ state: 'visible' });
      await this.exportSearchInput.fill(columnName);
    });
  }

  async selectExportColumn(columnLabel: string) {
    await test.step(`Select export column: ${columnLabel}`, async () => {
      const columnCheckbox = this.page.locator(`label.checkbox-label:has-text("${columnLabel}")`);
      await columnCheckbox.waitFor({ state: 'visible' });
      await columnCheckbox.scrollIntoViewIfNeeded();
      await columnCheckbox.click();
    });
  }

  async clickSelectAllColumns() {
    await test.step('Click select all columns', async () => {
      await this.selectAllButton.waitFor({ state: 'visible' });
      await this.selectAllButton.click();
    });
  }

  async clickClearAllColumns() {
    await test.step('Click clear all columns', async () => {
      await this.clearAllButton.waitFor({ state: 'visible' });
      await this.clearAllButton.click();
    });
  }

  async clickExportButton() {
    await test.step('Click export button', async () => {
      await this.exportButton.waitFor({ state: 'visible' });
      await this.exportButton.scrollIntoViewIfNeeded();
      await this.exportButton.click();
    });
  }

  
}
