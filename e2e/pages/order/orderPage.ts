import { Locator, Page } from "playwright";

export default class Order {
  private readonly page: Page;
  private readonly paymentMethod: Locator;
  private readonly creditCartNumber: Locator;
  private readonly expiryDate: Locator;
  private readonly cvvCode: Locator;
  private readonly nameOnCard: Locator;
  private readonly applyCoupon: Locator;
  private readonly applyCouponBtn: Locator;
  private readonly email: Locator;
  private readonly country: Locator;
  private sendOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentMethod = page.locator(".payment__type");
    this.creditCartNumber = page.locator(
      "input:near(div:text('Credit Card Number'))"
    );
    this.expiryDate = page.locator("select:near(div:text('Expiry Date'))");
    this.nameOnCard = page.locator("input:near(div:text('Name on Card'))");
    this.cvvCode = page.locator("input:near(div:text('CVV Code'))");
    this.email = page.locator(`input:near(label:text('${process.env.EMAIL}'))`);
    this.country = page.getByPlaceholder("Select Country");
    this.sendOrder = page.locator(".action__submit");
  }

  async fillCardNumber(cardNumber: string) {
    await this.creditCartNumber.fill(cardNumber);
  }
  async selectMonth(expiryDate: string) {
    await this.expiryDate.first().selectOption(expiryDate);
  }

  async selectYear(expiryMonth: string) {
    await this.expiryDate.last().selectOption(expiryMonth);
  }
  async fillCvv(cvvCode: string) {
    await this.cvvCode.fill(cvvCode);
  }
  async fillCardHolder(cardHolder: string) {
    await this.nameOnCard.fill(cardHolder);
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async chooseCountry(country: string) {
    await this.country.pressSequentially(country, { delay: 100 });
    await this.page
      .locator("button.list-group-item", { hasText: country })
      .click();
  }

  async submitOrder() {
    await this.sendOrder.click();
  }

 
}
