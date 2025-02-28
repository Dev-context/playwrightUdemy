import { test, expect } from "@playwright/test";

test("Verify hidden behaviour", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible()
  await page.locator("#hide-textbox").click()
  await expect(page.locator("#displayed-text")).toBeHidden()

  page.once("dialog",dialog => dialog.accept())

});


test("Workin with Iframes",async({page})=>{
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.waitForLoadState("networkidle")

  await page.locator("#mousehover").hover()
  const frame= page.frameLocator("#courses-iframe")
  await frame.locator("li a:visible",{hasText:"Courses"}).click()

})



