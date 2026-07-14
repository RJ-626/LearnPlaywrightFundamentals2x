import { test, expect } from '@playwright/test';

test('Verify that the sign up page has error with invalid email', async ({ page }) => {

    await page.goto("https://vwo.com/free-trial/")
    let input_box = page.locator("#page-v1-step1-email");
    await input_box.fill("abcde");
    await page.locator("#page-free-trial-step1-cu-gdpr-consent-checkbox").click();
    await page.locator("//button[@data-qa='page-su-submit']").first().click();

    let error_message = await page.locator("//div[contains(@class,'invalid-reason')]").first().textContent();
    expect(error_message).toContain("The email address you entered is incorrect.");

});