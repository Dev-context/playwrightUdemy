import { Page } from 'playwright/types/test'
import {test} from '../e2e/fixtures/loginFixtiure.spec.ts'


test.describe.configure({mode:"serial"})
let customPage:Page

test.beforeEach(async({page})=>{
   customPage=page
    await page.goto('')
   
})

 
test.skip("Register",async()=>{ 
   const registerButton=customPage.locator(".text-reset")
   await registerButton.click()
   await customPage.getByLabel("First Name").fill("vinicius")
   await customPage.getByLabel("Last Name").fill("Queiroz")
   await customPage.getByPlaceholder("email@example.com").fill("vinicius.smt.cmd@gmail.com")
   await customPage.getByPlaceholder("enter your number").fill("9999999999")
   await customPage.locator("select[formcontrolname='occupation']").selectOption("Doctor")
   
   await customPage.locator("input[value='Male']").check()
   await customPage.locator("#userPassword").fill("Vini@12345678")
   await customPage.locator("#confirmPassword").fill("Vini@12345678")
   await customPage.getByRole("checkbox").check()
   await customPage.locator("#login").click()

//    hasText:" I am 18 year or Older "}).textContent()
   
  
  

})

test("Login",async({loginPage})=>{
   await loginPage.login(process.env.EMAIL,process.env.PASSWORD)

})









