import { test, expect } from '../fixtures/auth.fixture';

test('add product to cart updates cart badge', async ({ inventoryPage }) => {
  await inventoryPage.addFirstProductToCart();

  await expect(inventoryPage.cartBadge).toHaveText('1');
}); 