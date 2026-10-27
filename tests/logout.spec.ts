import { test, expect } from '../fixtures/auth.fixture';
import { LoginPage } from '../pages/LoginPage';

test('user can logout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.logout();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('logged-out user cannot access inventory directly', async ({
  page,
  inventoryPage: authenticatedInventoryPage,
}) => {
  const loginPage = new LoginPage(page);

  await expect(authenticatedInventoryPage.productsHeading).toBeVisible();
  await expect(page).toHaveURL(/\/inventory\.html$/);

  await loginPage.logout();
  await expect(loginPage.loginButton).toBeVisible();

  await page.goto('/inventory.html');

  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  );
  await expect(page).not.toHaveURL(/\/inventory\.html$/);
});