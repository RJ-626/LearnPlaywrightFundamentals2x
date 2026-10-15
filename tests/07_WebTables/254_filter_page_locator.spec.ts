import { test, expect } from '@playwright/test';

test('Verify element by filter', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", { waitUntil: 'domcontentloaded' });
    const forgottenPasswordLink = await page.locator("a.list-group-item").filter({ hasText: "Forgotten Password" });
    await forgottenPasswordLink.click();
    //await page.pause();

    const accountLinks = await page.locator("a.list-group-item");
    await expect(accountLinks).toHaveCount(13);

    const privacyLink = await page.locator('footer a').filter({ hasText: "Privacy" });
    await expect(privacyLink).toHaveCount(1);
    await expect(privacyLink).toHaveAttribute("href", '#privacy-policy');
    await privacyLink.click();
    await expect(page).toHaveURL("https://app.thetestingacademy.com/playwright/multiple_element_filter#privacy-policy");



});