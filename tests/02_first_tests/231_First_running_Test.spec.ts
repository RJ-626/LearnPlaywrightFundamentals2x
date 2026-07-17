import { test, expect } from '@playwright/test';

test('First running Test', async ({ page }) => {

    await test.step('Navigate to VWO login page', async () => {
        await page.goto('https://app.vwo.com');
    });

    await test.step('Verify page title', async () => {
        await expect(page).toHaveTitle('Login - Wingify');
    });

    await test.step('Verify logo visibility', async () => {
        const logo_img = page.locator('#vow-login-logo');
        await expect(logo_img).toBeVisible();
    });

});