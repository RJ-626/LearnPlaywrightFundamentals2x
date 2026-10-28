import { test, expect } from "@playwright/test";
test('Hover Add-ons, print all options, and click Wifi', async ({ page }) => {
    // 1. Navigate to the page
    await page.goto("https://app.thetestingacademy.com/playwright/widgets/hover-menu");
    // 2. Hover over the Add-ons menu
    await page.getByTestId('nav-add-ons').hover();
    // 3. Locate all the options in the dropdown.
    const dropdownOptions = page.locator("//div[@data-testid='nav-add-ons']//div//a");
    //4.Count all options.
    console.log(await dropdownOptions.count());
    // 5. Extract the text from all matched elements into an array of strings
    const optionsText = await dropdownOptions.allInnerTexts();
    //6. Print all options in console.
    for (const itemName of optionsText) {
        console.log(itemName.trim());
    }

    // 7. Click the Wifi option
    await page.getByTestId('test-id-Wifi').click();
    // 8. Validate the output using a web-first assertion
    const outputLocator = page.getByTestId("hover-output");
    //9. This will automatically wait until the element contains the expected text
    await expect(outputLocator).toContainText('"testId": "test-id-Wifi"');

});