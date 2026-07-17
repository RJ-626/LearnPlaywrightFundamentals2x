import { test, expect } from '@playwright/test';

test('Custom Reporter Demo with Steps', async ({ page }) => {

  await test.step('Step 1: Navigate to the application', async () => {
    await page.goto('https://app.vwo.com');
  });

  await test.step('Step 2: Verify page elements', async () => {
    await test.step('2a: Check page title', async () => {
      await expect(page).toHaveTitle('Login - Wingify');
    });

    await test.step('2b: Check logo is visible', async () => {
      const logo = page.locator('#vow-login-logo');
      await expect(logo).toBeVisible();
    });

    await test.step('2c: Check login form exists', async () => {
      const loginForm = page.locator('form#login-form');
      await expect(loginForm).toBeVisible();
    });
  });

  await test.step('Step 3: Fill login credentials', async () => {
    await test.step('3a: Enter email', async () => {
      await page.fill('input[name="username"]', 'test@example.com');
    });

    await test.step('3b: Enter password', async () => {
      await page.fill('input[name="password"]', 'testpassword123');
    });
  });

  await test.step('Step 4: Submit login form', async () => {
    const signInButton = page.locator('button[type="submit"]');
    await signInButton.click();
  });

  await test.step('Step 5: Verify error message for invalid login', async () => {
    const errorMessage = page.locator('.notification-box-description');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Your email, password, IP address or location did not match');
  });

});
