import { test, expect, Locator } from '@playwright/test';
const URL = 'https://www.flipkart.com/search';

test.describe('Flipkart search via SVG', () => {

    test.beforeEach(async ({ page }) => {
        console.log("Before running any testcases!")
        await page.goto(URL);
    })


    test('TC#1 @smoke @regression', async ({ page }) => {

        await page.locator('input[name="q"]').fill("macmini");
      //await page.getByTitle ("Search for products,brands and more").fill('macmini')


      const svgElements: Locator = page.locator('form[action^="/search"] button[type="submit"] svg');
      await svgElements.first().click();

      // Flipkart re-hydrates ~2s after load and can wipe the input —
      // refill until the value actually sticks before searching
      const searchBox = page.locator('input[name="q"]');
      await expect(async () => {
          await searchBox.fill("macmini");
          await page.waitForTimeout(2500);
          expect(await searchBox.inputValue()).toBe("macmini");
      }).toPass({ timeout: 30000 });

      await page.waitForURL(/q=macmini/);

      const titleResults: Locator= page.locator("//div[contains(@data-id,'CPU') or contains(@data-id,'ACC') or contains(@data-id,'COM') or contains(@data-id,'MPC')]/div/a[2]");
      await titleResults.first().waitFor({ state: 'visible', timeout: 15000 });
      const count: number = await titleResults.count();
      
      for(let i=0;i< count;i++) {
        const title: string|null = await titleResults.nth(i).textContent();
        console.log(title);

      }

      await page.pause();

    });

  


});