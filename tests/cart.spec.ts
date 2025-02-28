import { Page } from "playwright"
import { test,expect } from "../e2e/fixtures/loginFixtiure.spec"
import Cart from "../e2e/pages/cart/cartPage"
import Dashboard from "../e2e/pages/dashboard/dashboardPage"


let customPage: Page
let cart: Cart
let dashboard:Dashboard
test.describe.configure({ mode: "serial" })

test.beforeEach(async ({ page, loginPage }) => {
    customPage = page
    cart = new Cart(customPage)
    dashboard=new Dashboard(customPage)
    await loginPage.login(process.env.EMAIL, process.env.PASSWORD)
    await dashboard.addToCartByProductName("ZARA COAT 3")
})

test("remove item from cart", async()=>{
     await cart.openTheCart()
     await cart.removeItem("ZARA COAT 3")
    
})

test("buy one product",async()=>{
    await cart.openTheCart()
    await cart.buyItem("ZARA COAT 3")
})

