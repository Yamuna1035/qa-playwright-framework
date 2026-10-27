import {test, expect} from "../fixtures/auth.fixture"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"

test('complete checkout flow with one product', async ({page, inventoryPage})=>{
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);

   //step 2: Add product to cart
   await inventoryPage.addFirstProductToCart();
   await inventoryPage.goToCart();

   //step 3: Go to checkout
   await cartPage.clickCheckout();

   //step 4: fill details
   await checkoutPage.fillCheckoutInfo('Yamuna', 'P', '560001');

   //step 5: Verify we move to next page
   await expect(page).toHaveURL(/checkout-step-two/);

   //step 6: Complete the purchase
   await checkoutPage.finishCheckout();
   await expect(page).toHaveURL(/checkout-complete/);
   await expect(checkoutPage.orderConfirmationHeading).toBeVisible();
})

test('checkout requires first name', async ({page, inventoryPage})=>{
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);

   await inventoryPage.goToCart();
   await cartPage.clickCheckout();
   await checkoutPage.fillCheckoutInfo('', 'P', '560001');

   await expect(checkoutPage.errorMessage).toHaveText('Error: First Name is required');
   await expect(page).toHaveURL(/checkout-step-one/);
})

test('checkout requires last name', async ({page, inventoryPage})=>{
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);

   await inventoryPage.goToCart();
   await cartPage.clickCheckout();
   await checkoutPage.fillCheckoutInfo('Yamuna', '', '560001');

   await expect(checkoutPage.errorMessage).toHaveText('Error: Last Name is required');
   await expect(page).toHaveURL(/checkout-step-one/);
})

test('checkout requires postal code', async ({page, inventoryPage})=>{
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);

   await inventoryPage.goToCart();
   await cartPage.clickCheckout();
   await checkoutPage.fillCheckoutInfo('Yamuna', 'P', '');

   await expect(checkoutPage.errorMessage).toHaveText('Error: Postal Code is required');
   await expect(page).toHaveURL(/checkout-step-one/);
})