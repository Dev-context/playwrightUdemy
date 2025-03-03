import { When, Given, Then } from "@cucumber/cucumber"
import Login from "../../e2e/pages/login/loginPage";
import { BeforeAll } from "@cucumber/cucumber";
import {test} from "playwright/test"

const login=new Login()

BeforeAll('Visit the page',async()=>{
   await login.toGo()
})

Given('the user has a Valid email and password', () => {
    // Write code here that turns the phrase above into concrete actions
  })

When('I click in login button', function () {

});



Then('the user is logged with success', function () {
    
});

