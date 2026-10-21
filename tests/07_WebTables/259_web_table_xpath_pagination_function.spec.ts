import { test, expect, Page, Locator } from '@playwright/test';



async function findRowByName(page: Page, name: string): Promise<Locator | null> {
    while (true) {
        const row = page.locator('[data-testid="employees-tbody"] tr').filter({ hasText: name });
        if (await row.count()) {
            return row;
        }

        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) return null;
        await next.click();
    }
}

test('Verify webtable by Xpath pagination', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

    let name: string = "Luca Greco";
    const row = await findRowByName(page, name);
    if (!row) throw new Error(`Employee not found: ${name}`);
    const email = await row.locator('td[data-col="email"]').innerText();
    const country = await row.locator('td[data-col="country"]').textContent();


    console.log("Luca's Email is: " + email);
    console.log("Luca's Country is: " + country);


});