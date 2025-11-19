import { test, expect, Page, Locator } from '@playwright/test';
import { PageUrls } from '../enums/page-urls';
import { env } from '../utils/env-setup';


export class loginPage {
private usernameInput: Locator;
private passwordInput: Locator;
private loginButton: Locator;
private titleText: Locator;
private loginErrorMessage: Locator;

constructor(private page: Page) {
this.usernameInput = this.page.getByTestId('username');
this.passwordInput = this.page.getByTestId('password');
this.loginButton = this.page.getByTestId('login-button');
this.titleText = this.page.getByTestId('title-text');
this.loginErrorMessage = this.page.getByTestId('login-error-message');
}
async navigateToLogin(){
    await this.page.goto(PageUrls.LOGIN)
}

async submitLogin(){
    await test.step('lick Login button', async () =>{
    await this.loginButton.click();
   })
}
async login(username:string, password:string){
    await test.step(`Perform Login ${username} `, async () =>{
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitLogin();
})
}

async loginAsAdmin(){
    await test.step('login As Admin', async() =>{
        await this.login(env.adminUsername, env.adminPassword);
})
}

async loginAsuser() {
    await test.step('Login as User', async () =>{
        await this.login(env.readerUsername, env.readerPassword);
    })
}

async validateLoginSuccess(){
    await test.step('Validate Successful Login', async () =>{
    await expect(this.page).toHaveURL(PageUrls.DASHBOARD);
    await expect(this.titleText).toHaveText('Welcome');
})
}

async validatLoginFailure(){
    await test.step('Error message on failed Login', async () =>{
    await expect(this.loginErrorMessage).toBeVisible();
    await expect(this.loginErrorMessage).toHaveText('Invalid username or password.');
    })
    
}

}