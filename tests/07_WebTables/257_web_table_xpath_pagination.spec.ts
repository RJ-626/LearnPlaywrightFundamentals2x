import { test, expect } from '@playwright/test';

test('Verify webtable by Xpath pagination', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");

    let name: string = "Camila Lopez";
    let row;
    while (true) {
        row = page.locator('[data-testid="employees-tbody"] tr').filter({ hasText: name });
        if (await row.count()) {
            break;
        }

        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) throw new Error("Row not found!");
        await next.click();
    }

    const email = await row.locator('td[data-col="email"]').innerText();
    const country = await row.locator('td[data-col="country"]').textContent();


    console.log("Camila's Email is: " + email);
    console.log("Camila's Country is: " + country);

});