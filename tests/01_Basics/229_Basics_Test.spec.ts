import {test, expect} from '@playwright/test';

test("Verify the Title", async ({ page }) => {

await page.goto("https://app.vwo.com");
await expect(page).toHaveTitle("Login - Wingify")

//Page- fixture (injected by playwright) is used to navigate to the URL and verify the title of the page using expect assertion.


})