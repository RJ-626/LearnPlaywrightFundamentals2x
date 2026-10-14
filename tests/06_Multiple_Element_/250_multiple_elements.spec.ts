import { test, expect } from '@playwright/test';

test('Basic verify how to handle multiple elements', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", { waitUntil: 'domcontentloaded' });
    const rightPanelLinksTexts: string[] = await page.locator("a.list-group-item").allInnerTexts();

    console.log(rightPanelLinksTexts.length);

    for (const linkText of rightPanelLinksTexts) {
        if (linkText.trim() == "Forgotten Password") {
            await page.locator("a.list-group-item", { hasText: "Forgotten Password" }).click();
        }
    }

    const rightPanelLinks = await page.locator("a.list-group-item").all();
    for (const link of rightPanelLinks) {
        console.log(await link.getAttribute("href"));
    }


});