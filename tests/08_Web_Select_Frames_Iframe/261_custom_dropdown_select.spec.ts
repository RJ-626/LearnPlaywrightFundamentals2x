import { test, expect } from '@playwright/test';

test('Basic Web test - Verify custom dropdown select! ', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns");

    await page.getByTestId('lang-trigger').click();

    await page.getByRole('option', { name: 'JavaScript' }).click();

    await page.getByTestId('framework-trigger').click();

    await page.getByRole('option', { name: 'React' }).click();

    await page.getByTestId('experience-trigger').click();

    await page.getByText('Senior (7+ years)', { exact: true }).click();

    await page.getByTestId('dropdown-save').click();

});