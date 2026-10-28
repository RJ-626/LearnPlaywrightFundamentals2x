import {test,expect} from '@playwright/test';

test('Advance Drag and Drop Test', async ({ page }) => {
    await page.goto('https://app.thetestingacademy.com/playwright/widgets/dnd');

    await page.getByTestId('card-write-spec').dragTo(page.getByTestId('col-in-progress'));

    await expect(page.getByTestId('count-in-progress')).toHaveText('1');

    page.pause();

});