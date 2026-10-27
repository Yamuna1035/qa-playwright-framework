import { Locator, Page } from "@playwright/test";
export class InventoryPage{
    readonly page:Page
    readonly productsHeading:Locator
    readonly productTitles:Locator
    readonly addToCartButtons:Locator
    readonly cartIcon:Locator
    readonly cartBadge:Locator
    readonly productSort:Locator
    readonly productPrices:Locator

    constructor(page:Page){
        this.page = page;
        this.productsHeading = page.getByText("Products", { exact: true });
        this.productTitles = page.locator(".inventory_item_name");
        this.addToCartButtons = page.locator('button:has-text("Add to cart")');    
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.productSort = page.getByRole('combobox', { name: 'Sort products' });
        this.productPrices = page.locator('.inventory_item_price');
    }

    async addFirstProductToCart(){
        await this.addToCartButtons.first().click();
    }

    async addProductToCart(productName: string) {
        const product = this.page.locator('.inventory_item').filter({
            has: this.page.getByText(productName, { exact: true }),
        });
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async sortProductsByPriceLowToHigh() {
        await this.productSort.selectOption({ label: 'Price (low to high)' });
    }

    async getDisplayedProductPrices(): Promise<string[]> {
        return this.productPrices.allTextContents();
    }

    async goToCart(){
        await this.cartIcon.click();
    }
}