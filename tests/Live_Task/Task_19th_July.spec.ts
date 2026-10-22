//Task-1

import { test,expect} from '@playwright/test';

test("Identify Employee Country", async({page})=>{

    await page.goto ("https://app.thetestingacademy.com/playwright/tables/webtable");
   //await page.pause();
   
   const row = page.locator('#companies-table tr').filter({hasText:"Yoshi Tannamuri"});
 //   const getcountry = await row.locator('[data-col="country"]').innerText();
   const getcountry = await row.locator('td.country').innerText();
   console.log(`Yoshi Tannamuri belongs to ${getcountry}`);
   
});



//Task 2 : 
test("Identify Employee EmailID - Pagination", async({page})=>{
     await page.goto ("https://app.thetestingacademy.com/playwright/tables/webtable");
    

     const NametoSearch = "Mia Hoffmann"

    while(true){
        const row = page.locator('#employees-tbody tr').filter({hasText:NametoSearch});
        if(await (row.count()) > 0) 
            {
            const getEmailID = await row.locator('[data-col="email"]').innerText();
            console.log(`${NametoSearch} has Email :  ${getEmailID}`);

            break;
            }
        else
        {
            const NextbuttonLocator = page.getByRole('button',{name:'Next '});
            if (await (NextbuttonLocator).isDisabled()) throw new Error("Row not found");
            await NextbuttonLocator.click();
            // await page.getByRole('button',{name:'Next '}).click();
        }
    }
});  