import {Page, Locator} from "@playwright/test"

export class CartPage{
readonly page:Page
readonly checkout:Locator
readonly continueShopping:Locator
readonly cartItemName:Locator
readonly cartItemQuantity:Locator
readonly cartHeading:Locator
readonly cartItems:Locator

constructor(page:Page){
    this.page = page
    this.checkout = page.locator("#checkout");
    this.continueShopping = page.locator("#continue-shopping");
    this.cartItemName = page.locator('.cart_item .inventory_item_name')
    this.cartItemQuantity = page.locator('.cart_quantity')
    this.cartHeading = page.locator('[data-test="title"]');
    this.cartItems = page.locator('.cart_item');
}

getCartItem(productName: string): Locator {
    return this.page.locator('.cart_item').filter({
        has: this.page.getByText(productName, { exact: true }),
    });
}

async removeProduct(productName: string) {
    await this.getCartItem(productName).getByRole('button', { name: 'Remove' }).click();
}

async clickCheckout() {
    await this.checkout.click();
}
}