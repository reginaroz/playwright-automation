import{test, expect, Page, Locator} from '@playwright/test';

export class DashboardPage {

    private viewFilter : Locator;
    constructor(private page: Page) {
        this.viewFilter = this.page.getByTestId('view-filter');
    }


async filterDashboard() {
await test.step('filter Dashboard View', async () => {
await expect(this.viewFilter).toBeVisible();
await this.viewFilter.selectOption('monthly');
})
}

}