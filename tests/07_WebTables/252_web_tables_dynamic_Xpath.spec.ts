import { test, expect } from '@playwright/test';

test('Basic verify how to access web table', async ({ page }) => {

    await page.goto("https://awesomeqa.com/webtable.html")

    const firstPart = "//table[@id='customers']/tbody/tr[";
    const secondPart = "]/td[";
    const thirdPart = "]";

    const rows = await page.locator("//table[@id='customers']/tbody/tr").count();
    const columns = await page.locator("//table[@id='customers']/tbody/tr[2]/td").count();
    for (let i = 2; i <= rows; i++) {
        for (let j = 1; j <= columns; j++) {
            const dynamicPath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;


            const cellData = await page.locator(dynamicPath).textContent();
            if (cellData?.includes("Helen Bennett")) {
                const countryPath = `${dynamicPath}/following-sibling::td[1]`;
                const countryData = await page.locator(countryPath).textContent();
                console.log(`Helen Bennett's country is: ${countryData}`);
            }
        }
    }

});