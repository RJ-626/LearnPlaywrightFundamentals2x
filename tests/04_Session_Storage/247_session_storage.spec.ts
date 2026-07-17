import { chromium } from "playwright";
async function saveSession() {
    let browser = await chromium.launch({ headless: false });
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto("https://app.vwo.com/#login");
    await page.waitForTimeout(2000);
    await page.fill("#login-username", "opg73@singleuseemail.site");
    await page.fill("#login-password", "Wingify@4321");
    await page.waitForTimeout(1500);
    await page.click("#js-login-btn");
    // Wait for login to actually complete before snapshotting storage —
    // otherwise the auth cookie isn't set yet and the saved state is empty.
    // VWO may redirect to app.wingify.com after login.
    await page.waitForURL(/.*(dashboard|home|wingify)/, { timeout: 30000 });
    await page.waitForTimeout(3000);
    await context.storageState({ path: "./user-session.json" });
    console.log("Session saved to user-session.json ✅");
    await page.waitForTimeout(2000);
    await browser.close();
}
saveSession();