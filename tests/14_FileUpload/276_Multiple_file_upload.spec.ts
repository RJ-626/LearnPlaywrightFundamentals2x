 import{test,expect} from '@playwright/test';

import path from 'path';
import { buffer } from 'stream/consumers';
const URL = "https://www.patternfly.org/components/file-upload/multiple-file-upload/";

test.describe('Multiple file upload', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

  test('should upload multiple files', async ({ page }) => {

    await page.locator("div.pf-v6-c-multiple-file-upload input").setInputFiles(
        [{
            name: 'file1.txt',
            mimeType: 'image/jpeg',
            buffer: Buffer.from('This is the content of file 1')

        },

        {
            name: 'file2.jpg',
            mimeType: 'image/jpeg',
            buffer: Buffer.from('This is the content of file 2')

        }

]);

await page.waitForTimeout(10000);


  });

});

