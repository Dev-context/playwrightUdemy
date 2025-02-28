import {test as login} from "@playwright/test"

import Login from "../../e2e/pages/login/loginPage"

export const test=login.extend<{loginPage:Login}>({
    loginPage:async({page},use)=>{
        const loginPage=new Login(page)
        await page.goto("")
        await use(loginPage)
    }
})


export {expect} from "@playwright/test"