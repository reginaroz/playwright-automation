import { test } from '../../utils/project-custom-fictures';

test.describe('Login Tests', () => {

    test.beforeEach(async ({loginPage}) =>{
    await loginPage.navigateToLogin();
    });
    
    test('Valid user Login', async ({loginPage}) =>{

        await loginPage.loginAsAdmin();
        await loginPage.validateLoginSuccess();
    });

    test('Valid User Login', async({loginPage})=>{
        await loginPage.loginAsuser();
        await loginPage.validateLoginSuccess();
    });
    
    test('Invalid User Login', async ({loginPage}) =>{
        await loginPage.login('invalidUser', 'invalidPass');
        await loginPage.validatLoginFailure();
});

});