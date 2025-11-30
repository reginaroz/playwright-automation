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
}
