import { test, expect } from '@playwright/test';

test('Verify webtable by Xpath', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/webtable", { waitUntil: 'domcontentloaded' });

    await page.locator("//td[text()='Aarav.Sharma']/preceding-sibling::td/input[@type='checkbox']"
    ).click();

    await page.locator("tr:has(td:text('Rohan.Mehta'))")
    .locator("td")
    .first()
    .click();



});