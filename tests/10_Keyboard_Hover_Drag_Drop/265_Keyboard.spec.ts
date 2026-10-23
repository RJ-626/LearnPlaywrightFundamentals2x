import { test, expect } from '@playwright/test';

test('Keyboard test in Playwright', async ({ page }) => {

    await page.goto('https://keycode.info/');

    await page.keyboard.press('A');
    await page.keyboard.press('B');
    await page.keyboard.press('C');
    await page.screenshot({ path: 'A.png' });
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowRight');
   



});