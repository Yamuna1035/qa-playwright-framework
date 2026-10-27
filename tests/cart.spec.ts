import { test, expect } from '../fixtures/auth.fixture';
import { CartPage } from '../pages/CartPage';

test('verify selected product and quantity in cart', async ({ page, inventoryPage }) => {
  const cartPage = new CartPage(page);

  await inventoryPage.addFirstProductToCart();
  await expect(inventoryPage.cartBadge).toHaveText('1');
  await inventoryPage.goToCart();

  await expect(cartPage.cartItemName).toHaveText('Sauce Labs Backpack');
  await expect(cartPage.cartItemQuantity).toHaveText('1');
});

test('add two different products to the cart', async ({ page, inventoryPage }) => {
  const cartPage = new CartPage(page);

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  await expect(inventoryPage.cartBadge).toHaveText('2');
  await inventoryPage.goToCart();

  await expect(cartPage.cartItemName).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);
  await expect(cartPage.cartItemQuantity).toHaveText(['1', '1']);
});

test('remove a product from the cart', async ({ page, inventoryPage }) => {
  const cartPage = new CartPage(page);

  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  await expect(inventoryPage.cartBadge).toHaveText('2');
  await inventoryPage.goToCart();

  await cartPage.removeProduct('Sauce Labs Backpack');

  await expect(cartPage.getCartItem('Sauce Labs Backpack')).toHaveCount(0);
  await expect(cartPage.getCartItem('Sauce Labs Bike Light')).toBeVisible();
  await expect(cartPage.getCartItem('Sauce Labs Bike Light').locator('.cart_quantity')).toHaveText('1');
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('verify empty cart state', async ({ page, inventoryPage }) => {
  const cartPage = new CartPage(page);

  await inventoryPage.goToCart();

  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(cartPage.cartHeading).toHaveText('Your Cart');
  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(inventoryPage.cartBadge).toHaveCount(0);
});