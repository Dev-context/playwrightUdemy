import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export default class Dashboard {
  private readonly page: Page;
  private readonly products: Locator;
  private readonly cartButton: Locator;
  private readonly loadingText: Locator;
  private readonly successMessage: Locator;
  private readonly addTocartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card");
    this.cartButton = page.locator("button").filter({ hasText: "Cart" });
    this.loadingText = page.locator(".loading-text");
    this.successMessage = page.locator(".toast-title", {
      hasText: " Login Successfully ",
    });
    this.addTocartButton = page.locator("button", { hasText: "Add To Cart" });
  }

  async getAllproducts() {
    return await this.products.all();
  }

  async addToCartByProductName(productName: string) {
    const cartQuantity = this.cartButton;
    const loadingText = this.loadingText;
    const toastSuccess = this.successMessage;
    const products = await this.products.all();

    for (const e of products) {
      const text = await e.locator("b").textContent();
      if (text === productName) {
        await e.locator(this.addTocartButton).click();
        break;
      }
    }

    await this.page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/add-to-cart")
    await expect(toastSuccess).not.toBeVisible();
    await expect(loadingText).not.toBeVisible();
    const labelText = await cartQuantity.locator("label").textContent();

  
    expect(labelText).toEqual("1");
     
    }
  
}
