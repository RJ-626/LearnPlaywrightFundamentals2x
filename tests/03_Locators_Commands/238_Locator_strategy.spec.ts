import{test,expect}from'@playwright/test';

test('First running Test',async({page})=>{

    await page.goto("https://app.thetestingacademy.com/playwright/ttacart");

    });