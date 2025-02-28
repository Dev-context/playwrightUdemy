import { Locator, Page } from "playwright";


export default class Login{

    private readonly page:Page
    private readonly email:Locator
    private readonly password:Locator
    private readonly loginButton:Locator

    constructor(page:Page){
        this.page=page;
        this.email=page.getByPlaceholder("email@example.com")
        this.password=page.locator("#userPassword")
        this.loginButton=page.locator("#login")
    }

    async login(email:string|any,password:string|any){
        await this.email.fill(email)
        await this.password.fill(password)
        await this.loginButton.click()
    }
}