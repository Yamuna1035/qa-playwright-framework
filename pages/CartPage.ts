import {Page, Locator} from "@playwright/test"

export class CartPage{
readonly page:Page
readonly checkout:Locator
readonly continueShopping:Locator
readonly cartItemName:Locator

constructor(page:Page){
    this.page = page
    this.checkout = page.locator("#checkout");
    this.continueShopping = page.locator("#continue-shopping");
    this.cartItemName = page.locator('.inventory_item_name')
}

async clickCheckout() {
    await this.checkout.click();
}
}