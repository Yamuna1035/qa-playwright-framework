import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"

test('successful login with valid credentials', async ({page})=>{
     const loginPage = new LoginPage(page);
     await loginPage.goto();
     await loginPage.login('standard_user', 'secret_sauce');
     await expect(page).toHaveURL(/inventory.html/);
})

test('shows error message with invalid credentials', async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
})