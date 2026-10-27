import { Page, Locator } from "@playwright/test";

export class CheckoutPage{
readonly page:Page
readonly firstName: Locator;
readonly lastName: Locator;
readonly postalCode: Locator;
readonly continueButton: Locator
readonly finishButton: Locator;
readonly orderConfirmationHeading: Locator;
readonly errorMessage: Locator;

constructor(page:Page){
    this.page = page;
    this.firstName = page.getByLabel("First Name");
    this.lastName = page.getByLabel("Last Name");
    this.postalCode = page.getByLabel("Zip/Postal Code");
    this.continueButton = page.getByRole("button", {name:"Continue"});
    this.finishButton = page.getByRole("button", {name:"Finish"});
    this.orderConfirmationHeading = page.getByRole("heading", {name:"Thank you for your order!"});
    this.errorMessage = page.locator('[data-test="error"]');
}

async fillCheckoutInfo(firstName:string, lastName:string, postalCode:string){
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
}

async finishCheckout() {
    await this.finishButton.click();
}
}