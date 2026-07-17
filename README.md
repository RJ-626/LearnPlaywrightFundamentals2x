# Learning Playwright Fundamentals 2x

A hands-on starter project for learning [Playwright](https://playwright.dev/) end-to-end testing with TypeScript. Part of **The Testing Academy** Playwright Fundamentals course.

## Tech Stack

- [Playwright Test](https://playwright.dev/docs/intro) `^1.61.1`
- TypeScript / Node.js (`@types/node`)
- Allure Playwright (`allure-playwright`)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (ships with Node)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests (headless)
npx playwright test

# Run in headed mode (watch the browser)
npx playwright test --headed

# Run a single spec
npx playwright test tests/example.spec.ts

# Run in UI mode (interactive)
npx playwright test --ui

# Debug a test
npx playwright test --debug
```

## Viewing the Report

After a run, open the HTML report:

```bash
npx playwright show-report
```

## Project Structure

```
.
├── tests/
│   ├── 01_Basics/
│   │   ├── 229_Basics_Test.spec.ts         # Page fixture & title assertion
│   │   └── 230_Test_Annotations.spec.ts    # Test annotations (skip, only, fail, slow)
│   ├── 02_first_tests/
│   │   ├── 231_First_running_Test.spec.ts  # First real test with locator visibility + test.step()
│   │   ├── 232_BCP.spec.ts                 # Browser / Context / Page lifecycle (Playwright library)
│   │   ├── 233_BCP_multiple_context.spec.ts # Multi-user simulation via multiple contexts
│   │   ├── 234_BCP_multiple_pages.spec.ts    # Multi-tab test inside one context
│   │   ├── 235_Test_Interface_playwright.spec.ts # Test runner interface & form interactions
│   │   ├── 236_BCP_test_playwright.spec.ts     # Browser-level fixture with dual contexts
│   │   └── 237_BCP_test_options.spec.ts        # Context options (viewport, locale, mobile)
│   ├── 03_Locators_Commands/
│   │   ├── 239_Project_VWO_Login.spec.ts              # VWO login test with CSS selector concepts
│   │   ├── 240_XPath_spec.ts                          # XPath locators and selectors
│   │   ├── 241_Project_VWO_signup.spec.ts             # VWO signup error validation with locators
│   │   ├── 242_Project_VWO_Login_Playwright.spec.ts   # VWO signup test using getByRole locators
│   │   ├── 243_Playwright_commands.spec.ts            # page.goto waitUntil options demo
│   │   ├── 244_Refere_Playwright.spec.ts              # Navigation with custom referer header
│   │   ├── 245_GetbyRole.spec.ts                      # getByRole locator demo (Cura Healthcare)
│   │   └── 246_press_sequential.spec.ts               # pressSequentially and navigation demo
│   ├── 04_Session_Storage/
│   │   └── 247_session_storage.spec.ts                # Captures and saves browser session to user-session.json
│   ├── 05_Allure_Reporting/
│   │   ├── 248_Test_vwo_dashboard.spec.ts             # VWO dashboard test with Allure annotations + custom reporter steps
│   │   └── 249_Test_vwo_dashboard_no_custom report.spec.ts # VWO dashboard test without custom reporter
│   ├── Live_Task/
│   │   ├── Task_6th_July.spec.ts           # Browser context demo with multiple contexts
│   │   ├── Task_8th_July.spec.ts           # HTML form creation task
│   │   └── Task_10th_July.spec.ts          # XPath relative locators task
│   ├── Custom_Reporter_Demo.spec.ts        # Demo test with nested test.step() for custom reporter
│   └── Template.spec.ts                    # Minimal test template
├── reporters/
│   └── custom-reporter.ts                 # Custom Playwright Reporter with HTML/JSON output + steps
├── playwright.config.ts    # Playwright configuration
├── package.json
├── tsconfig.json
└── .gitignore
```

## Custom Playwright Reporter

This project includes a **custom reporter** (`reporters/custom-reporter.ts`) that generates a beautiful HTML report with test steps, screenshots, videos, and traces.

### Features

- **Summary Dashboard** — Total, Passed, Failed, Skipped, Pass Rate, Duration
- **Environment Meta Bar** — Environment, Browser, Platform, Workers, Run ID, Start Time
- **Priority & Status Filters** — Click to filter tests by P0/P1/P2 or Passed/Failed/Skipped
- **Detailed Test Table** — Sr No, Suite, Test Name, Author, Priority, Tags, File, Timestamps, Duration, Status, Screenshot, Video, Trace
- **Expandable Test Logs** — Click "Test Logs" to view all nested `test.step()` hierarchies with durations
- **Auto-captured Attachments** — Screenshots, videos, and traces are automatically saved to `custom-report/attachments/` and linked in the report

### How to Use

The custom reporter is already configured in `playwright.config.ts`:

```typescript
reporter: [
  ["line"],
  ["allure-playwright", {}],
  ["./reporters/custom-reporter.ts", { outputDir: "custom-report" }]
],
```

Run your tests and the report will be generated automatically:

```bash
npx playwright test
```

Open the report:

```bash
# On macOS / Linux
open custom-report/custom-report.html

# On Windows
start custom-report/custom-report.html
```

### Writing Tests with Steps

Use `test.step()` to organize your tests into logical steps. These steps will appear in the custom report:

```typescript
import { test, expect } from '@playwright/test';

test('VWO dashboard test', async ({ page }) => {
  await test.step('Navigate to dashboard', async () => {
    await page.goto('https://app.vwo.com/#/dashboard');
  });

  await test.step('Verify dashboard loaded', async () => {
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Report Output

After a test run, the following files are generated in `custom-report/`:

- `custom-report.html` — Styled HTML report (open in browser)
- `custom-report.json` — Machine-readable JSON report
- `attachments/` — Folder containing screenshots (`.png`), videos (`.webm`), and traces (`.zip`)

## What's Inside

### `tests/01_Basics/`

- **`229_Basics_Test.spec.ts`** — Page fixture basics: navigate to `app.vwo.com` and assert the title.
- **`230_Test_Annotations.spec.ts`** — Playwright test annotations:
  - `test.skip()` — temporarily disable a test.
  - `test.only()` — focus on a single test.
  - `test.fail()` — mark a test as expected to fail.
  - `test.slow()` — triple the default timeout.
  - Conditional skipping via `browserName`.

### `tests/02_first_tests/`

- **`231_First_running_Test.spec.ts`** — First end-to-end test with a real locator (`#vow-login-logo`) and visibility assertion. Now includes `test.step()` for custom reporter compatibility.
- **`232_BCP.spec.ts`** — Manual Browser → Context → Page lifecycle using the Playwright library (not test runner).
- **`233_BCP_multiple_context.spec.ts`** — Simulate multiple users by creating separate browser contexts.
- **`234_BCP_multiple_pages.spec.ts`** — Open multiple tabs (pages) inside a single context.
- **`235_Test_Interface_playwright.spec.ts`** — Playwright Test runner interface: automatic browser management with page-level fixtures and form interactions.
- **`236_BCP_test_playwright.spec.ts`** — Use the `browser` fixture to create and manage multiple contexts/pages within a single test.
- **`237_BCP_test_options.spec.ts`** — Configure context-level options:
  - Custom viewport, locale, timezone, geolocation
  - Mobile emulation (iPhone viewport, touch, user-agent)

### `tests/03_Locators_Commands/`

- **`239_Project_VWO_Login.spec.ts`** — VWO login page test demonstrating CSS selector strategies (id, class, name, tag) and Playwright's auto-waiting behavior.
- **`240_XPath_spec.ts`** — XPath locators and selector patterns.
- **`241_Project_VWO_signup.spec.ts`** — VWO signup page test: validates the error message for an invalid email using CSS and XPath locators.
- **`242_Project_VWO_Login_Playwright.spec.ts`** — VWO signup test using `getByRole` locators (`textbox`, `checkbox`, `button`) for accessibility-based selection.
- **`243_Playwright_commands.spec.ts`** — Demonstrates `page.goto` with different `waitUntil` options: `commit`, `domcontentloaded`, `load`, and `networkidle`.
- **`244_Refere_Playwright.spec.ts`** — Navigation basics: default `page.goto` behavior and using a custom `referer` header.
- **`245_GetbyRole.spec.ts`** — `getByRole` locator demonstration on the Cura Healthcare demo site (e.g., clicking a link by role and name).
- **`246_press_sequential.spec.ts`** — Demonstrates `pressSequentially` for realistic typing with delay, plus navigation methods (`goBack`).

### `tests/04_Session_Storage/`

- **`247_session_storage.spec.ts`** — Captures a logged-in VWO session using Playwright library API and saves it to `user-session.json` for reuse in subsequent tests.

### `tests/05_Allure_Reporting/`

- **`248_Test_vwo_dashboard.spec.ts`** — VWO dashboard test that reuses the saved session (`storageState`), uses Allure annotations (`allure.epic`, `allure.feature`, `allure.story`, `allure.tag`, `allure.severity`), and includes `test.step()` for custom reporter. Tags: `@P0 @smoke` and `@P1 @regression`.
- **`249_Test_vwo_dashboard_no_custom report.spec.ts`** — Same VWO dashboard test without custom reporter integration.

### `tests/Live_Task/`

- **`Task_6th_July.spec.ts`** — Live task: open pages in separate browser contexts (multi-site demo).
- **`Task_8th_July.spec.ts`** — Live task: HTML form creation (email, password, remember me, sign-up).
- **`Task_10th_July.spec.ts`** — Live task: XPath relative locators for the Cura Healthcare demo site.

## Configuration Highlights

Defined in `playwright.config.ts`:

- `testDir: './tests'` — root directory for test files
- `testMatch: ['tests/**/*.spec.ts']` — match all `.spec.ts` files recursively
- `timeout: 120000` — global test timeout (120s) to handle video recording overhead
- `fullyParallel: true` — run test files in parallel
- `reporter: ["line"], ["allure-playwright"], ["./reporters/custom-reporter.ts"]` — multiple reporters (line, Allure, custom HTML)
- `headless: false` — run browsers in headed mode by default
- `screenshot: 'on'` — capture screenshots for every test
- `video: 'on'` — record video for every test
- `trace: 'on'` — capture traces for every test
- **Projects:** Chromium only (Firefox & WebKit commented out)
- CI-aware retries (`retries: 2`) and single worker (`workers: 1`) when `process.env.CI` is set

## Learn More

- [Playwright Docs](https://playwright.dev/docs/intro)
- [The Testing Academy](https://thetestingacademy.com/)

## License

ISC
