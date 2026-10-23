import { test, expect } from '@playwright/test';

test('Keyboard Test in Playwright', async ({ page }) => {

    await page.goto('https://www.spicejet.com/');
    await page.getByText('Add-ons', { exact: true }).hover();
    await page.getByText('FlyEarly', { exact: true }).click();


    await page.pause();





});