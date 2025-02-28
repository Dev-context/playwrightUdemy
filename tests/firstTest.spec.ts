//@ts-check
import { expect, test } from "@playwright/test";
import { only } from "node:test";

test("Login", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  await page.locator("#username").fill("teste")

 await page.pause()

});


test("DropDown test",async({page})=>{
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
  await page.locator("select[class=form-control]").selectOption("Teacher")
  await page.locator("input[value='user']").click()
  await page.locator("#okayBtn").click()
  await page.pause()
})

test("Work different Tabs",async({browser})=>{
  const context=browser.newContext();
  const page1=await (await context).newPage()

  await page1.goto("https://rahulshettyacademy.com/loginpagePractise/")
  const userName=page1.getByLabel("Username:")

 

  const [page2]= await Promise.all([(await context).waitForEvent("page")
  ,page1.getByText('Free Access to',{exact:false}).click()])
  
  const pageTitle= await page2.title()
  console.log(pageTitle)

  const regex=new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)
  const email = await page2.locator(".red").textContent().then((email: string|null) => email.match(regex)?.[0])
  await page1.getByLabel("Username").fill(email)
  await page1.pause()
})