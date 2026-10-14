import { test, expect } from '@playwright/test';

test('Automate Student Login and Verify the URL is changed with your username and password -', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    await page.getByRole("textbox", { name: 'email' }).fill("abc@test.com");
    await page.getByRole("textbox", { name: 'password' }).fill("abcd");
    await page.getByRole("checkbox", { name: 'remember' }).check();
    await page.getByRole("button", { name: 'Login to Practice Account' }).click();
    await expect(page).toHaveURL("https://app.thetestingacademy.com/playwright/multiple_element_filter?email=abc%40test.com&password=abcd&remember=yes#login-success");

});