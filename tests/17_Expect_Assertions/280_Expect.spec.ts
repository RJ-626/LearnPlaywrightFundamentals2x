import{test,expect} from '@playwright/test';

test.describe('Expect assertion',()=>{

    test('2 locator based assertions', async({page})=>{
        await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
        
        const element = page.getByTestId('expect-text');
        await expect(element).toHaveText('This is a text from the testing academy');
        await expect(element).toBeVisible();

        const email = page.getByRole('textbox', { name: 'Email' });
        await expect(email).toHaveAttribute('placeholder', 'Enter your email');
        
    });
    


});