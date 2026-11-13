import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Download', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/upload-download');
    });

    test('should download a file', async ({ page }) => {

        //download is an event that is emitted when a file download is triggered. We can use the page.waitForEvent('download') method to wait for the download event to be emitted and get the download object.
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-text').click()
        ]);

        await download.saveAs(path.join('output', download.suggestedFilename()));

    });

});