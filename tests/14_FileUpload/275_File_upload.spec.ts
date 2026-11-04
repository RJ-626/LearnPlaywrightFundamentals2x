import { test, expect, } from '@playwright/test';

import path from 'path';

const URL = "https://the-internet.herokuapp.com/upload";

test.describe('File Upload', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto(URL);


    });

    test('locate shadow DOM and assert visible', async ({ page }) => {
        const filePath = path.join(__dirname, 'File.txt');
        console.log('File Path:', filePath);

        await page.setInputFiles('#file-upload', filePath);
        await page.click('#file-submit')

        await expect(page.locator('h3')).toHaveText('File Uploaded!');
        await expect(page.locator('#uploaded-files')).toHaveText('File.txt');

        await page.pause();
    });



});
