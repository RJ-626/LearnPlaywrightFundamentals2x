import { test, expect } from '@playwright/test';

test('Verify webtable by Xpath', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

    //Finding one person's email and country

    const PriyaRow = page.locator('#employees-tbody tr').filter({ hasText: 'Priya Kapoor' });
    const PriyaEmail = await PriyaRow.locator('td[data-col="email"]').innerText();
    const PriyaCountry = await PriyaRow.locator('td[data-col="country"]').textContent();

    console.log("Priya's Email is: " + PriyaEmail);
    console.log("Priya's Country is: " + PriyaCountry);

});