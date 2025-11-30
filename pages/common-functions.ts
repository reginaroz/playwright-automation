import { expect, Page, test } from '@playwright/test';

export class CommonFunctions {
  // Filters 
  private filtersButton = this.page.getByRole('button', { name: /filters/i });
  private filtersPanel = this.page.getByTestId('FilterItems');
  private filterItem = this.page.getByTestId('FilterItem');
  private filterOptionsPanel = this.page.getByTestId('FilterOptions');
  private filterCheckbox = this.page.getByTestId('Checkbox');
  private applyFiltersButton = this.page.getByTestId('ApplyFilters');
  private clearAllFiltersButton = this.page.getByTestId('ClearAll');
 // Export
 public exportButton = this.page.getByTestId('ExportIcon');
  constructor(private page: Page) {}

  async openFilters() {
    await test.step('Open filters panel', async () => {
      await this.filtersButton.click();
      await this.filtersPanel.waitFor({ state: 'visible' });
    });
  }

  async selectFilterByLabel(label: string) {
    await test.step(`Select filter item: ${label}`, async () => {

      await this.clearAllFilters();
      const item = this.filterItem.filter({ hasText: label }).first();
      await item.scrollIntoViewIfNeeded();
      await expect(item).toBeVisible();
      await item.click();
      await expect(this.filterOptionsPanel).toBeVisible();
    });
  }

  async selectFilterOption(optionLabel: string) {
    await test.step(`Select filter option: ${optionLabel}`, async () => {
      await expect(this.filterOptionsPanel).toBeVisible();
      const checkboxLabel = this.page.locator(`label.checkbox-label:has-text("${optionLabel}")`).first();
      await checkboxLabel.scrollIntoViewIfNeeded();
      await expect(checkboxLabel).toBeVisible();
      await checkboxLabel.click();
    });
  }

  async applyFilters() {
    await test.step('Apply selected filters', async () => {
      await expect(this.applyFiltersButton).toBeVisible();
      await this.applyFiltersButton.click();
    });
  }

  async clearAllFilters() {
    await test.step('Clear all filters', async () => {
      await this.openFilters();
      await expect(this.clearAllFiltersButton).toBeVisible();
      await this.clearAllFiltersButton.click();
    });
  }

  async selectModuleFilter(moduleName: string, optionLabel: string) {
    await test.step(`Select Module filter: ${moduleName}`, async () => {
      await this.selectFilterByLabel(moduleName);
      await this.selectFilterOption(optionLabel);
      await this.applyFilters();
    });
  }

  async clickExportButton() {
    await test.step('Click Export button', async () => {
      await expect(this.exportButton).toBeVisible();
      await this.exportButton.click();
    });
}
}
