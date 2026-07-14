//Browser 
//Context - 1 - https://app.thetestingacademy.com/playwright/ttacart/

//Context - 2 → https://tta-bank-digital-973242068062.us-west1.run.app/





import { test, expect } from "@playwright/test";

test("Open pages in separate context", async ({ browser }) => {

    let firstContext = await browser.newContext();
    let firstPage = await firstContext.newPage();

    let secondContext = await browser.newContext();
    let secondPage = await secondContext.newPage();
    await firstPage.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    await secondPage.goto("https://tta-bank-digital-973242068062.us-west1.run.app/");
    console.log("TTAcart URL: ", firstPage.url());
    console.log("TTAbank URL: ", secondPage.url());
    await firstContext.close();
    await secondContext.close();

});