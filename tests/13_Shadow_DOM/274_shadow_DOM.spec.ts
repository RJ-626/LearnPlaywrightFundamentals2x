import { test, expect, Locator } from '@playwright/test';

const URL = "https://app.thetestingacademy.com/playwright/widgets/shadow-dom";

test.describe('shadow DOM', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(URL);


    });

    test('locate shadow DOM and assert visible', async ({ page }) => {

        const card = await page.getByTestId('card-account');
        await card.locator('input[name="email"]').fill('student@testingacademy.com');
        await card.locator('input[name="password"]').fill('123456');
        await card.getByTestId('card-account-submit').click();
        await expect(card.getByTestId('card-account-status')).toContainText('student@testingacademy.com');


        await page.waitForTimeout(10000);


    });
});
