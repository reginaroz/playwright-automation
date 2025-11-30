import { expect, Page ,test} from '@playwright/test';
import { env } from '../utils/env-setup';
import { PageUrls } from '../enums/page-urls';

export class LoginPage {
  // Public locators
  public usernameInput = this.page.locator('#email');
  public passwordInput = this.page.locator('#password');

  // Private locators
  private loginButton = this.page.locator('[test-id="sign-in"]');
  private userLoggedInAvatar = this.page.getByTestId('app-menu-avatar-button');

  constructor(private page: Page) {}
  async openLoginPage() {
    await test.step('Open main Spaces page', async () => {
      await this.page.goto(PageUrls.LOGIN);
    });
  }
  async login(username: string, password: string) {
    await test.step('Login with username and password', async () => {
    await this.openLoginPage();
    await this.performLogin(username, password);
    });
  }

  private async performLogin(username: string, password: string) {  
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
async verifyUserLoggedIn() {
    await expect(this.userLoggedInAvatar).toBeVisible();
  }
  async loginAsCandidate() {

    await this.login(env.candidateEmail, env.candidatePassword);
    await this.verifyUserLoggedIn();
  }

  async loginAsAdmin() {
    await this.login(env.adminUsername, env.adminPassword);
    await this.verifyUserLoggedIn();
  }
}
