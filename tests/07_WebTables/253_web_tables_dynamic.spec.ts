import { test, expect } from '@playwright/test';


test.describe('Web Table Dynamic', () => {
    test('Dynamic Web table extraction', async ({ page }) => {

        await page.goto("https://awesomeqa.com/webtable1.html");

        const rows = page.locator('table[summary="Sample Table"] tbody tr');
        const rowCount = await rows.count();
        console.log(rowCount);

        for (let i = 0; i <= rowCount; i++) {
            const rowData = await rows.nth(i).locator('td').allTextContents();
            console.log(`Row ${i + 1} : ${rowData}`);
        }

    })
});