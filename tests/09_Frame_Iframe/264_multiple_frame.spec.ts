import { test, expect, FrameLocator, Locator } from '@playwright/test';

test('Verify multiple frames in Playwright ', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/frames/multi-frames');

    let mainFrame: FrameLocator = await page.frameLocator('[name="main"]');
    const headertext = await mainFrame.locator('h2').innerText();
    console.log(headertext);


    const allFrames: Locator[] = await page.locator('//frame').all();
    console.log('Total Frames in the page are : ' + allFrames.length);

    for (const frame of allFrames) {
        console.log(await frame.getAttribute('name'), ':', await frame.getAttribute('src'));

    }

    let sideFrame: FrameLocator = await page.frameLocator('[name="side"]');
    await sideFrame.getByTestId('side-link-registration').click();

    await page.pause();




});