import { test, expect, FrameLocator } from '@playwright/test';

test('iframe test in Playwright', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/frames/');
    let vehicleFrame: FrameLocator = await page.frameLocator('#frame-one'); //why typecasting

    await vehicleFrame.locator('#RESULT_TextField-1').fill('Hyundai i20');
    await vehicleFrame.locator('#RESULT_TextField-2').fill('Rahul Jaiswal');
    await vehicleFrame.locator('#RESULT_TextField-3').fill('MH-12-0456');
    await vehicleFrame.locator('#RESULT_RadioButton-1').selectOption('Hatchback');
    await vehicleFrame.locator('#RESULT_TextField-4').fill('2023');
    await vehicleFrame.locator('#RESULT_TextArea-1').fill('Amazing Car');
    await vehicleFrame.locator('#vehicle-submit').click();
    let outputText = await vehicleFrame.locator('#vehicle-output').innerText();
    console.log(outputText);

    await page.pause();


});