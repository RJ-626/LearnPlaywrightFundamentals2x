import { test, expect } from '@playwright/test';

test('Basic Web test - Verify select! ', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/dropdown");

    await page.locator('#dropdown').click();

    await page.locator('#dropdown').selectOption('2');

    //await page.pause();




});