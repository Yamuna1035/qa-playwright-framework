import { Page, Locator } from "@playwright/test";

export class CheckoutPage{
readonly page:Page
readonly firstName: Locator;
readonly lastName: Locator;
readonly postalCode: Locator;
readonly continueButton: Locator

constructor(page:Page){
    this.page = page;
    this.firstName = page.getByLabel("First Name");
    this.lastName = page.getByLabel("Last Name");
    this.postalCode = page.getByLabel("Zip/Postal Code");
    this.continueButton = page.getByRole("button", {name:"Continue"});
}

async fillCheckoutInfo(firstName:string, lastName:string, postalCode:string){
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
}
}