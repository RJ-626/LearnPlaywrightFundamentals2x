import { test, expect } from '@playwright/test';

test('Context Click Test in Playwright', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/widgets/context-menu');
    await page.locator('span.context-menu-one').first().click({ button: 'right' });


    const contextMenu: string[] = await page.locator('ul.context-menu-list').allTextContents();
    console.log(contextMenu);
    await expect(page.locator('ul#ctx-menu.context-menu-list.is-open')).toHaveCount(1);
    await expect(page.locator('ul#ctx-menu.context-menu-list.is-open li')).toHaveCount(7);


    await page.getByText('Copy', { exact: true }).first().click();
});