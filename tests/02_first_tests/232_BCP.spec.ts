import{chromium,Browser,BrowserContext, Page} from "playwright";

async function run(){

    //level 1 - launch our browser- heaviest operation, do it once 

    let browser: Browser = await chromium.launch({headless: false});
    console.log("Browser Launched", browser);

    //level2 - create context - fresh session - Isolated cookies
    let context1: BrowserContext = await browser.newContext();
    console.log("Context Created", context1);

    let context2: BrowserContext = await browser.newContext();
    console.log("Context Created", context2);

    //level3 - create page - tab inside the context
    let page: Page = await context1.newPage();
    console.log("Page Opened");

    await page.goto("https://app.vwo.com");
    console.log("Title:",await page.title());

    //clean up -reverse order 
    await page.close();
    await context1.close();
    await context2.close();
    await browser.close();

    
    
}