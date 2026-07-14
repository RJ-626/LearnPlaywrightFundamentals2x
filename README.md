# Learning Playwright Fundamentals 2x

A hands-on starter project for learning [Playwright](https://playwright.dev/) end-to-end testing with TypeScript. Part of **The Testing Academy** Playwright Fundamentals course.

## Tech Stack

- [Playwright Test](https://playwright.dev/docs/intro) `^1.61.1`
- TypeScript / Node.js (`@types/node`)

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
│   │   ├── 231_First_running_Test.spec.ts  # First real test with locator visibility
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
│   ├── Live_Task/
│   │   ├── Task_6th_July.spec.ts           # Browser context demo with multiple contexts
│   │   ├── Task_8th_July.spec.ts           # HTML form creation task
│   │   └── Task_10th_July.spec.ts          # XPath relative locators task
│   └── Template.spec.ts                    # Minimal test template
├── playwright.config.ts    # Playwright configuration
├── package.json
└── .gitignore
```

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

- **`231_First_running_Test.spec.ts`** — First end-to-end test with a real locator (`#vow-login-logo`) and visibility assertion.
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

### `tests/Live_Task/`

- **`Task_6th_July.spec.ts`** — Live task: open pages in separate browser contexts (multi-site demo).
- **`Task_8th_July.spec.ts`** — Live task: HTML form creation (email, password, remember me, sign-up).
- **`Task_10th_July.spec.ts`** — Live task: XPath relative locators for the Cura Healthcare demo site.

## Configuration Highlights

Defined in `playwright.config.ts`:

- `testDir: './tests'` — root directory for test files
- `testMatch: ['tests/**/*.spec.ts']` — match all `.spec.ts` files recursively
- `timeout: 50000` — global test timeout (50s)
- `fullyParallel: true` — run test files in parallel
- `reporter: 'html'` — generate an HTML report
- `headless: false` — run browsers in headed mode by default
- `screenshot: 'only-on-failure'` — capture screenshots on test failures
- **Projects:** Chromium only (Firefox & WebKit commented out)
- CI-aware retries (`retries: 2`) and single worker (`workers: 1`) when `process.env.CI` is set

## Learn More

- [Playwright Docs](https://playwright.dev/docs/intro)
- [The Testing Academy](https://thetestingacademy.com/)

## License

ISC
