import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/LoginPage"
import { InventoryPage } from "../pages/InventoryPage"
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage"

test('complete checkout flow with one product', async ({page})=>{
   const loginPage = new LoginPage(page);
   const inventoryPage = new InventoryPage(page);
   const cartPage = new CartPage(page);
   const checkoutPage = new CheckoutPage(page);

   //step 1 login
   await loginPage.goto();
   await loginPage.login('standard_user', 'secret_sauce');

   //step 2: Add product to cart
   await inventoryPage.addFirstProductToCart();
   await inventoryPage.goToCart();

   //step 3: Go to checkout
   await cartPage.clickCheckout();

   //step 4: fill details
   await checkoutPage.fillCheckoutInfo('Yamuna', 'P', '560001');

   //step 5: Verify we move to next page
   await expect(page).toHaveURL(/checkout-step-two/);
})