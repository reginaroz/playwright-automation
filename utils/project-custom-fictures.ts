import{test as base}from'@playwright/test';
import{loginPage}from'../pages/login.page';

type pageFixtures ={
    loginPage: loginPage;
}
export const test = base.extend<pageFixtures>({
    loginPage: async({page},use) =>{
        await use (new loginPage(page));
    },
});