import { test, expect } from '@playwright/test';

test('Verify webtable by Xpath pagination', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
    const pageCount = 3;
    const allEmails: string[] = [];

    for (let p = 0; p < pageCount; p++) {
        await page.getByTestId(`page-${p + 1}`).click();

        const emails = await page.locator('[data-testid="employees-tbody"] tr td[data-col="email"]').allTextContents();

        allEmails.push(...emails);

    }
});