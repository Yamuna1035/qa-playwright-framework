import { Locator, Page } from "@playwright/test";
export class InventoryPage{
    readonly page:Page
    readonly productTitles:Locator
    readonly addToCartButtons:Locator
    readonly cartIcon:Locator
    readonly cartBadge:Locator

    constructor(page:Page){
        this.page = page;
        this.productTitles = page.locator(".inventory_item_name");
        this.addToCartButtons = page.locator('button:has-text("Add to cart")');    
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addFirstProductToCart(){
        await this.addToCartButtons.first().click();
    }

    async goToCart(){
        await this.cartIcon.click();
    }
}