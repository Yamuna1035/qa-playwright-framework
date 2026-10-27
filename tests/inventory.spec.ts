import { test, expect } from '../fixtures/auth.fixture';

test('sort products by price from low to high', async ({ inventoryPage }) => {
  await inventoryPage.sortProductsByPriceLowToHigh();

  const prices = (await inventoryPage.getDisplayedProductPrices()).map((price) =>
    Number(price.replace('$', '')),
  );

  expect(prices.length).toBeGreaterThan(0);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});
