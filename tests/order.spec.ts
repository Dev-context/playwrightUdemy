import { Page } from 'playwright'
import { expect, test } from '../e2e/fixtures/loginFixtiure.spec'
import Dashboard from '../e2e/pages/dashboard/dashboardPage'
import Cart from '../e2e/pages/cart/cartPage'
import Order from '../e2e/pages/order/orderPage'


let customPage: Page
let dashboard: Dashboard
let cart: Cart
let order: Order

test.describe.configure({ mode: "serial" })

test.beforeEach(async ({ page, loginPage }) => {
  customPage = page
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD)
  dashboard = new Dashboard(customPage)
  order = new Order(customPage)
  cart = new Cart(customPage)
  await dashboard.addToCartByProductName("ZARA COAT 3")

})

test("make a payment", async () => {
  await cart.openTheCart()
  await cart.buyItem("ZARA COAT 3")
  await order.fillCardNumber("123456789")
  await order.selectMonth("01")
  await order.selectYear("12")
  await order.fillCvv("123")
  await order.fillCardHolder("maria")
  await order.fillEmail(`${process.env.EMAIL}`)
  await order.chooseCountry("Brazil")
  await order.submitOrder()
  await expect(customPage.locator(".hero-primary")).toHaveText("Thankyou for the order.")
})