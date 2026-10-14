import { test, expect } from "@playwright/test";

test("Find the First Terminated Employee", async ({ page }) => {

    await page.goto("https://awesomeqa.com/hr/web/index.php/auth/login");
    await page.waitForTimeout(3000);

    await page.getByPlaceholder("Username").fill("admin");
    await page.getByPlaceholder("Password").fill("Awesomeqa@4321");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("https://awesomeqa.com/hr/web/index.php/pim/viewEmployeeList");
    await expect(page.locator(".oxd-table-body")).toBeVisible();

    const rows = page.locator(".orangehrm-container .oxd-table-body .oxd-table-row");
    const rowCount = await rows.count();

    console.log("Count is= ", rowCount);

    for (let i = 0; i < rowCount; i++) {

        const cellValues = await rows.nth(i)
            .locator(".oxd-table-cell")
            .allInnerTexts();

        if (cellValues.includes("Terminated")) {

            const deleteIcon = rows.nth(i).locator(
                "//div[normalize-space()='Terminated']/parent::div/following-sibling::div//i[contains(@class,'bi-trash')]"
            );

            await deleteIcon.click();

            console.log(`First Terminated Employee Found in Row ${i + 1}: ${cellValues}`);

            break;
        }
    }
});