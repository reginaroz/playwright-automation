import { expect, Page, test } from '@playwright/test';

export class FindingsPage {
  
  public FindingsTab = this.page.getByTestId('link-button-Findings');
  private pageTitle = this.page.getByTestId('main-page-title');
  public Table = this.page.getByTestId('Table');
  private tableRows = this.page.locator('tbody.p-datatable-tbody tr[role="row"]');
  private firstRowCheckbox = this.page.locator('tbody.p-datatable-tbody tr[role="row"]').first().locator('.p-checkbox-box');
  
  constructor(private page: Page) {}

  async navigateToFindingsTab() {
    await test.step('Navigate to Findings Tab', async () => {
      await this.FindingsTab.click();
      await this.verifyTitleExists();
    });
  }

  async verifyTitleExists() {
    await test.step('Verify Findings title is visible', async () => {
      await expect(this.pageTitle).toBeVisible();
      await expect(this.pageTitle).toHaveText(/Findings/i);
    });
  }

  async selectFirstRow() {
    await test.step('Select first row in findings table', async () => {
      await this.firstRowCheckbox.waitFor({ state: 'visible' });
      await this.firstRowCheckbox.scrollIntoViewIfNeeded();
      await this.firstRowCheckbox.click();
      await this.verifyFirstRowIsSelected();
    });
  }

 
  async verifyFirstRowIsSelected() {
    await test.step('Verify first row is selected', async () => {
      await expect(this.firstRowCheckbox).toHaveClass(/p-highlight/);
    });
  }

  async getFirstRowFindingName(): Promise<string> {
    return await test.step('Get first row finding name', async () => {
      const firstRow = this.tableRows.first();
      await firstRow.waitFor({ state: 'visible' });
      // Finding Name is in the 2nd td (index 1), inside a span with data-testid="Text"
      const findingNameCell = firstRow.locator('td').nth(1).locator('[data-testid="Text"]');
      const text = await findingNameCell.textContent();
      return text?.trim() || '';
    });
  }

  async getFirstRowTimestamp(): Promise<string> {
    return await test.step('Get first row timestamp', async () => {
      const firstRow = this.tableRows.first();
      await firstRow.waitFor({ state: 'visible' });
      // Timestamp is in the 3rd td (index 2), with double-line text format
      const timestampCell = firstRow.locator('td').nth(2);
      const dateTitle = await timestampCell.locator('._double-line-text-title_10fbb_50').textContent();
      const timeSubtitle = await timestampCell.locator('._double-line-text-subtitle_10fbb_72').textContent();
      return `${dateTitle?.trim()} - ${timeSubtitle?.trim()}`;
    });
  }

  async getFirstRowStatus(): Promise<string> {
    return await test.step('Get first row status', async () => {
      const firstRow = this.tableRows.first();
      await firstRow.waitFor({ state: 'visible' });
      // Status is in the 6th td (index 5), inside a tag with class p-tag-value
      const statusCell = firstRow.locator('td').nth(5);
      const statusTag = await statusCell.locator('.p-tag-value').textContent();
      return statusTag?.trim() || '';
    });
  }

  async getFirstRowData() {
    return await test.step('Get first row data (Finding Name, Timestamp, Status)', async () => {
      const findingName = await this.getFirstRowFindingName();
      const timestamp = await this.getFirstRowTimestamp();
      const status = await this.getFirstRowStatus();
      
      return {
        findingName,
        timestamp,
        status
      };
    });
  }
}
