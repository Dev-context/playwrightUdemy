import { Locator, Page } from "playwright"
import { expect } from "playwright/test"


export default class Cart {

    private readonly page: Page
    private readonly cartButton: Locator
    private readonly continueShoppingButton: Locator
    private readonly buyButton: Locator
    private readonly binButton: Locator
    private readonly checkoutButton: Locator
    private readonly itemContainer: Locator
    private readonly noItemsText:Locator


    constructor(page: Page) {
        this.page = page
        this.cartButton = page.locator("button",{hasText:/^\s*Cart/g})
        this.continueShoppingButton = page.locator("button:has-text('Continue Shopping')")
        this.buyButton = page.locator("button:has-text('Buy Now')")
        this.binButton = page.locator("button", { has: page.locator(".fa-trash-o") })
        this.checkoutButton = page.locator("button:has-text('Checkout')")
        this.itemContainer = page.locator("li .infoWrap")
        this.noItemsText=page.locator("h1:has-text('No Products in Your Cart !')")
    }



    async openTheCart() {
        await this.cartButton.click()
    }

    async removeItem(itemName: string) {
        await this.itemContainer.waitFor()
        const cartItems = await this.itemContainer.all()
  
        if(cartItems.length>=1){
            expect(this.noItemsText).not.toBeVisible()
            for (const item of cartItems) {
                const itemText = await item.locator("h3").textContent()
                if(itemText===itemName){
                    await item.locator(this.binButton).click()
                }
            }
        }

        const resRemoveFromCart=await this.page.waitForResponse("**/remove-from-cart/**")


        expect(JSON.stringify(await resRemoveFromCart.json()))
        .toContain('{"message":"Product Removed from cart"}')
    
        await expect( this.page.locator('#toast-container')).toBeVisible()
        await expect( this.page.locator('#toast-container')).not.toBeVisible()
        expect(this.noItemsText).toBeVisible()
        
       
    }

    async buyItem(itemName:string){
        await this.itemContainer.waitFor()
        const cartItems=await this.itemContainer.all()

        for(const items of cartItems){
            const itemText = await items.locator("h3").textContent()
            if(itemText===itemName){
                await items.locator(this.buyButton).click()
            }
            
        }

        await expect(this.page.getByText("Payment Method")).toBeVisible()
         
    }


}