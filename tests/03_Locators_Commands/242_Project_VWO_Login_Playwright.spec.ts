import { test, expect } from '@playwright/test';

test('Verify that the sign up page has error with invalid email', async ({ page }) => {

    await page.goto("https://vwo.com/free-trial/")
    await page.getByRole('textbox', { name: "email" }).fill("abcd");

    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: "Create a Free Trial Account" }).click();


    let error_message = await page.locator("//div[contains(@class,'invalid-reason')]").first().textContent();
    expect(error_message).toContain("The email address you entered is incorrect.");

});