import { test, expect } from '@playwright/test';

test('Advance Select Dropdown', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/tables/select-boxes')

    //Single-Searchable Dropdown
    await page.getByTestId('rs-single').click();
    await page.getByRole('option', { name: 'Cypress' }).click();

    //Multiple-Chips with remove Dropdown

    await page.getByTestId('rs-multi').click();
    await page.getByText('Pytest', { exact: true }).click();
    await page.getByText('JUnit', { exact: true }).click();
    await page.getByRole('button', { name: 'Remove JUnit' }).click();
    await page.keyboard.press('Escape');


    // Creatable multi-select Dropdown
    await page.getByTestId('rs-creatable').click();
    await page.getByText('api-testing', { exact: true }).click();
    await page.getByText('security', { exact: true }).click();
    await page.keyboard.press('Escape');

    //Grouped Dropdown
    await page.getByTestId('rs-grouped').click();
    await page.getByRole('option', { name: 'Azure' }).click();


    //Async Searchable Dropdown
    await page.getByTestId('rs-async').click();
    await page.getByTestId('rs-async-input').fill('par');
    await expect(page.getByTestId('rs-async-menu')).toContainText('Paris');
    await page.getByRole('option', { name: 'Paris' }).click();

});