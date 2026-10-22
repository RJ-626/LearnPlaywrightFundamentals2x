import { test, expect } from "@playwright/test";

test.use({ permissions: ["notifications"] });

test("Working 20th July task", async ({ page }) => {

    await page.goto("https://www.spicejet.com/");

    const origin = page.getByTestId("to-testID-origin");
    await origin.click();
    const originInput = origin.getByRole("textbox");
    await originInput.click();
    await originInput.pressSequentially("del", { delay: 150 });
    await expect(originInput).toHaveValue(/Delhi/);

    const destination = page.getByTestId("to-testID-destination");
    await destination.click();
    const destinationInput = destination.getByRole("textbox");
    await destinationInput.click();
    await destinationInput.pressSequentially("beng", { delay: 150 });
    await expect(destinationInput).toHaveValue(/Bengaluru/);
});
