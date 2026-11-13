import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('File Scroll', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://app.thetestingacademy.com/playwright/widgets/scroll');
    });

    test('should scroll to an element', async ({ page }) => {

        //scrollintoviewifneeded is a method that scrolls the element into view if it is not already in the viewport. It is useful when we want to interact with an element that is not visible on the screen. We can use the page.getByTestId('deep-anchor') method to get the element and then call the scrollIntoViewIfNeeded() method on it.
        const element = page.getByTestId('deep-anchor');
        await element.scrollIntoViewIfNeeded()
        await element.click();


        //scroll by 1000 pixels down the page. We can use the page.evaluate() method to execute JavaScript code in the context of the page. We can use the window.scrollBy() method to scroll the page by a specified number of pixels.
        await page.evaluate('window.scrollBy(0, 1000)');


        //jump to the bottom of the page. We can use the page.evaluate() method to execute JavaScript code in the context of the page. We can use the window.scrollTo() method to scroll to a specified position on the page.
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');


        //jump back to the top of the page. We can use the page.evaluate() method to execute JavaScript code in the context of the page. We can use the window.scrollTo() method to scroll to a specified position on the page.
        await page.evaluate('window.scrollTo(0, 0)');


        //Lazy loading is a technique that defers the loading of non-critical resources at page load time. We can use the page.evaluate() method to execute JavaScript code in the context of the page. We can use the window.scrollBy() method to scroll the page by a specified number of pixels and trigger the lazy loading of images.
        //Lazy list grows past 10 once visible
        await page.getByTestId('lazy-list').scrollIntoViewIfNeeded();

        const list = page.getByTestId('lazy-list').locator('li');
        const initialCount = await list.count();

        await page.getByTestId('lazy-item-10').scrollIntoViewIfNeeded();
        const updatedCount = await list.count();
        console.log(initialCount, updatedCount);
        expect(updatedCount).toBeGreaterThan(initialCount);


        await page.pause();

    });




});