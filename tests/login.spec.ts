import {test} from '../e2e/fixtures/loginFixtiure.spec.ts'

test("Login",async({loginPage})=>{
    await loginPage.login(process.env.EMAIL,process.env.PASSWORD)
 
 })