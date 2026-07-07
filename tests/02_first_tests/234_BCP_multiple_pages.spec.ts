import {chromium} from "playwright";

async function multitabTest(){

    let browser= await chromium.launch({headless: false});
    let context = await browser.newContext();

    //Tab
    let page1 = await context.newPage();
    await page1.goto("https://app.vwo.com/#login");
    console.log("Tab1: Dashboard");

      let page2 = await context.newPage();
    await page2.goto("https://app.vwo.com/#dashboard");
    console.log("Tab1: Settings");



}
multitabTest();
