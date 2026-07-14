
//https://app.vwo.com/#login

import { test, expect } from '@playwright/test';

test("TC-01 Verify that VWO login is not working and gives you an error with lazy , strict, auto wait concepts", async ({ page }) => {

    await page.goto("https://app.vwo.com/#login");


    // first use default locators -> id, name,className, Tag,  then custom locator (via CSS selector)
    //CSS selector -> Browser-> CSS engine- helps to find the element by using default locators.
    // id => #id
    //classNmae => .
    //name => [name = "value"]
    //TAG => [tag]


    //<input 
    // type="email" 
    // class="text-input W(100%)" 
    // name="username" 
    // vwo-html-translate-attr="placeholder" 
    // vwo-html-translate-placeholder="login:enterEmailID" 
    // id="login-username" 
    // data-qa="hocewoqisi" 
    // placeholder="Enter email ID"
    //>

    let userNameField = page.locator('#login-username');
    let passwordField = page.locator('#login-password');
    let loginButton = page.locator('#js-login-btn');

    //Now , playwright finds the element and acts (auto-wait)

    await userNameField.fill("admin@admin.com");
    await passwordField.fill("test1234");
    await loginButton.click();
    console.log("All the actions are completed");

    let error_message = page.locator('#js-notification-box-msg');
    await expect(error_message).toContainText("Your email, password, IP address or location did not match")



});