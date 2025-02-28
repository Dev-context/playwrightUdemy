import {test} from '../e2e/fixtures/loginFixtiure.spec.ts'
import Dashboard from '../e2e/pages/dashboard/dashboardPage'
import { Page } from 'playwright/types/test'

test.describe.configure({mode:"serial"})
let customPage:Page
let dashboard:Dashboard

test.beforeEach(async({page})=>{
   customPage=page
    dashboard=new Dashboard(customPage)
})

test("choose one products",async({loginPage})=>{
    await loginPage.login(process.env.EMAIL,process.env.PASSWORD)
    await dashboard.addToCartByProductName("ZARA COAT 3")  
})