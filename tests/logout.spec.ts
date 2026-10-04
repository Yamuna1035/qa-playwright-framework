import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can logout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.logout();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});