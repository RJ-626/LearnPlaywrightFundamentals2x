import { test, expect } from '@playwright/test';

const simpleMaps = 'https://simplemaps.com/svg/country/in';

test.describe('Advance SVG', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(simpleMaps);

    });

    test('generate the list of states', async ({ page }) => {
        const states = await page.locator("//div[@id='admin1_map_inner']//*[name()='svg']//*[name()='path' and contains(@class,'sm_state')]").all();
        for (const state of states) {
            const stateName = await state.getAttribute('class');
            console.log(stateName);
            if (stateName?.includes('INUP')) {
                state.click();
        }
    }

        await page.pause();
    });

});