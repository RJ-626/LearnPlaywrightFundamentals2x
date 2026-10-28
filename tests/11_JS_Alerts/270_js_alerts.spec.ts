import { test, expect } from '@playwright/test';

test('JS Alerts Test in Playwright', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    //register the dialog handler before triggering the alerts
    page.once('dialog', async dialog => {       //register the dialog 
        console.log('Alert type: ${dialog.type()}');
        console.log(`Alert message: ${dialog.message()}`);
        await dialog.accept();
    });
    //trigger the alert by clicking the button
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();


    page.once('dialog', async dialog => {       //register the confirmation dialog
        console.log('Alert type: ${dialog.type()}');
        console.log(`Alert message: ${dialog.message()}`);
        expect(dialog.type()).toBe('confirm');
        expect(dialog.message()).toBe('I am a JS Confirm');
        await dialog.accept();
        //await dialog.dismiss();
    });

    await page.locator('button:has-text("Click for JS Confirm")').click(); //trigger the confirmation dialog

    const inputText = 'Playwright';

    page.once('dialog', async dialog => {       //register the input prompt dialog
        expect(dialog.type()).toBe('prompt');
        expect(dialog.defaultValue()).toBe('');
        await dialog.accept(inputText);  //accept the prompt with input text');
        //await dialog.dismiss();
    });

    await page.locator('button:has-text("Click for JS Prompt")').click(); //trigger the prompt dialog

});