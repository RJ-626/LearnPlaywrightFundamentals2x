import {test, expect} from '@playwright/test';

test("Verify the Title", async ({ page }) => {

await page.goto("https://app.vwo.com");
await expect(page).toHaveTitle("Login - Wingify")


})

//skip the test using test.skip() method. This is useful when you want to temporarily disable a test case without removing it from the codebase. You can provide a reason for skipping the test as an optional second argument.
test.skip("This is a skipped test", async ({ page }) => {
  // Test implementation here
});

//only run the test using test.only() method. This is useful when you want to focus on a specific test case during development or debugging. When you use test.only(), only that test will be executed, and all other tests will be skipped.
test.only("This is a focused test", async ({ page }) => {
  // Test implementation here
});

//mark as failing test using test.fail() method. This is useful when you want to indicate that a test case is expected to fail due to known issues or limitations. You can provide a reason for marking the test as failing as an optional second argument.
test.fail("This is a failing test", async ({ page }) => {
  // Test implementation here
});

//slow test using test.slow() method. This is useful when you want to indicate that a test case is expected to take longer than usual to complete. You can provide a reason for marking the test as slow as an optional second argument.
test.slow(() => {
  test("This is a slow test", async ({ page }) => {
    // Test implementation here
  });
  return true;
});

//conditional test execution using test.describe() method. This is useful when you want to group related test cases together and apply conditions to the entire group. You can use test.describe() to define a test suite and apply conditions such as skipping or focusing on the entire suite.

  test("conditional test", async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Skipping test on Firefox');
  });