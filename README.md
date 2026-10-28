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
# Run all tests (headed mode, per config)
npm test                    # or: npx playwright test

# Run in headed mode explicitly
npm run test:headed

# Run a single spec
npm test -- tests/07_WebTables/254_filter_page_locator.spec.ts

# Run in UI mode (interactive)
npm run test:ui

# Debug a test (opens Playwright Inspector; page.pause() works here)
npm run test:debug

# List all discovered tests without running them
npm run list
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
│   │   ├── 238_Locator_strategy.spec.ts                 # Locator strategy demo (TTA cart page)
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
│   ├── 06_Multiple_Element_/
│   │   ├── 250_multiple_elements.spec.ts              # Handles multiple matching elements via loop (allInnerTexts / all)
│   │   └── 251_multi_elements_direct.spec.ts          # Handles multiple matching elements with a precise getByRole locator
│   ├── 07_WebTables/
│   │   ├── 252_web_tables_dynamic_Xpath.spec.ts       # Web table traversal with dynamic XPath (find country for a name)
│   │   ├── 253_web_tables_dynamic.spec.ts             # Dynamic web table extraction with CSS locators and row loops
│   │   ├── 254_filter_page_locator.spec.ts            # locator().filter({ hasText }) to narrow multiple matches
│   │   ├── 255_web_table_xpath.spec.ts                # Click a row checkbox via preceding-sibling XPath
│   │   ├── 256_web_table_xpath.spec.ts                # Read an employee's email & country via row filter
│   │   ├── 257_web_table_xpath_pagination.spec.ts     # While-loop pagination walk to find a row (unknown page count)
│   │   ├── 258_web_table_xpath_pagination.spec.ts     # For-loop over known pages; collect all emails
│   │   └── 259_web_table_xpath_pagination_function.spec.ts # Reusable findRowByName(page, name) helper for paginated tables
│   ├── 08_Web_Select_Frames_Iframe/
│   │   ├── 260_normal_dropdown_select.spec.ts      # selectOption on a native <select> dropdown
│   │   ├── 261_custom_dropdown_select.spec.ts      # Custom dropdown widgets via testid triggers + option roles
│   │   └── 262_advance_select_dropdown.spec.ts     # Searchable / multi / creatable / grouped / async dropdowns
│   ├── 09_Frame_Iframe/
│   │   ├── 263_iframe.spec.ts                      # Single iframe interaction via frameLocator
│   │   └── 264_multiple_frame.spec.ts              # Multiple frames: enumerate <frame> tags + click inside side frame
│   ├── 10_Keyboard_Hover_Drag_Drop/
│   │   ├── 265_Keyboard.spec.ts                    # Keyboard press demo (keycode.info)
│   │   ├── 266_Spicejet.hover.spec.ts              # Hover menu navigation (SpiceJet Add-ons)
│   │   ├── 267_Drag_Drop.spec.ts                   # Basic dragTo between two columns (the-internet.herokuapp.com)
│   │   ├── 268_Advance_Drag_Drop.spec.ts           # HTML5 dragTo on the TTA Kanban board with count assertion
│   │   ├── 269_Context_click.spec.ts               # Right-click custom context menu: open, count items
│   │   └── learning.md                             # Keyboard keys & mouse up/down reference notes
│   ├── 11_JS_Alerts/
│   │   └── 270_js_alerts.spec.ts                   # JS alert / confirm / prompt handling via dialog events
│   ├── 12_Handle_SVG/
│   │   └── 271_svg.spec.ts                         # Flipkart search via the SVG search icon + result titles
│   ├── Live_Task/
│   │   ├── Task_6th_July.spec.ts           # Browser context demo with multiple contexts
│   │   ├── Task_8th_July.spec.ts           # HTML form creation task
│   │   ├── Task_10th_July.spec.ts          # XPath relative locators task
│   │   ├── Task_17th_July.spec.ts          # Student login form automation + URL assertion
│   │   ├── Task_17th_July_advanced.spec.ts # Loop through employee table rows to find & delete first Terminated employee
│   │   ├── Task_19th_July.spec.ts           # Web table row filter + paginated email lookup (Mia Hoffmann)
│   │   ├── Task_20th_July.spec.ts           # SpiceJet origin/destination selection via airport typeahead
│   │   └── Task_22nd_July.spec.ts           # Hover Add-ons menu, print all options, click Wifi + output assertion
│   ├── Custom_Reporter_Demo.spec.ts        # Demo test with nested test.step() for custom reporter
│   └── Template.spec.ts                    # Minimal test template
├── reporters/
│   └── custom-reporter.ts                 # Custom Playwright Reporter with HTML/JSON output + steps
├── Utils/
│   └── CustomReporter.ts                  # TTA real-time HTML reporter (timestamped runs + history)
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

## TTA Real-Time Custom Reporter (`Utils/CustomReporter.ts`)

This project also includes the **TTA Reporter** — a custom Playwright reporter that generates a self-updating HTML report *while tests are still running*.

### Features

- **Real-Time Updates** — The report auto-refreshes every 5 seconds and includes in-progress tests
- **Timestamped Runs** — Each run creates `tta-report/report_<YYYYMMDD_HHMMSS>.html`
- **History & Latest Pages** — `tta-report/history.html` lists all previous runs; `tta-report/index.html` always redirects to the latest one
- **Console Integration** — Live start / step / result output in the terminal with running pass-fail-skip totals
- **Step-Level Detail** — Nested `test.step()` results with durations, console logs, screenshots, errors, and stack traces
- **Video Timestamps** — Each step shows the exact video time range to jump to
- **Auto-captured Attachments** — Screenshots, videos, and traces are copied into `tta-report/screenshots/`, `tta-report/videos/`, and `tta-report/traces/`
- **Environment Metadata** — Environment (`TEST_ENV`, defaults to UAT), author (`TEST_AUTHOR`, defaults to TTA-QA), browser, platform, workers, and run ID

### How to Use

The TTA reporter is **not enabled by default**. To use it, add it to the reporter list in `playwright.config.ts`:

```typescript
reporter: [
  ["line"],
  ["./Utils/CustomReporter.ts"]
],
```

Then run the tests and open the report:

```bash
npx playwright test

# On Windows
start tta-report/index.html

# On macOS / Linux
open tta-report/index.html
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

- **`238_Locator_strategy.spec.ts`** — Locator strategy starter: navigates to the Testing Academy cart demo page for practicing different locator strategies.
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

### `tests/06_Multiple_Element_/`

- **`250_multiple_elements.spec.ts`** — Handles multiple matching elements: collects all link texts with `allInnerTexts()`, loops through them to click "Forgotten Password", then iterates all elements with `.all()` to read `href` attributes.
- **`251_multi_elements_direct.spec.ts`** — Same goal without loops: uses a precise `getByRole('link', { name: 'Forgotten Password' })` locator to avoid strict mode violations when the text matches multiple elements.

### `tests/07_WebTables/`

- **`252_web_tables_dynamic_Xpath.spec.ts`** — Static HTML web table traversal with dynamic XPath: builds `//table[@id='customers']/tbody/tr[i]/td[j]` paths in a nested loop, counts rows/columns dynamically, and finds the country for "Helen Bennett" using `following-sibling::td`.
- **`253_web_tables_dynamic.spec.ts`** — Dynamic web table extraction: counts rows with `.count()` and prints every row's cell data using `rows.nth(i).locator('td').allTextContents()`.
- **`254_filter_page_locator.spec.ts`** — Locator `filter()` demo on the TTA multi-element page: narrows `a.list-group-item` matches with `filter({ hasText: 'Forgotten Password' })`, then verifies link counts, footer link attributes and URL hash navigation.
- **`255_web_table_xpath.spec.ts`** — Web table XPath demo: clicks the checkbox of a specific row using `//td[text()='Aarav.Sharma']/preceding-sibling::td/input[@type='checkbox']` (sibling-axis traversal) and a `tr:has(td:text(...))` selector.
- **`256_web_table_xpath.spec.ts`** — Web table read demo on the TTA employees table: filters rows with `locator('#employees-tbody tr').filter({ hasText: 'Priya Kapoor' })` and reads the row's email and country cells (`td[data-col="email"]` / `td[data-col="country"]`).
- **`257_web_table_xpath_pagination.spec.ts`** — Paginated web table walk with *unknown* page count: `while` loop that filters rows by name and clicks `next-page` until the row is found or the button is disabled (finds "Camila Lopez" on page 3 and reads her email/country).
- **`258_web_table_xpath_pagination.spec.ts`** — Paginated web table walk with *known* page count: `for` loop over the `page-{n}` pager buttons that collects every employee email across all pages into one array.
- **`259_web_table_xpath_pagination_function.spec.ts`** — Refactor of the 257 pattern into a reusable `findRowByName(page, name)` helper that walks pages and returns the row `Locator` (or `null` when the employee isn't found).

### `tests/08_Web_Select_Frames_Iframe/`

- **`260_normal_dropdown_select.spec.ts`** — Native `<select>` dropdown handling on the-internet.herokuapp.com: `selectOption('2')` to pick an option by value.
- **`261_custom_dropdown_select.spec.ts`** — Custom (non-`<select>`) dropdown widgets on the TTA dropdowns page: open each dropdown by its `data-testid` trigger, choose options via `getByRole('option')` / exact `getByText`, then click save.
- **`262_advance_select_dropdown.spec.ts`** — Advanced select-box variants on the TTA select-boxes page: single searchable, multi-select chips (with remove button + `Escape`), creatable multi-select, grouped, and async searchable dropdowns (asserts the async menu contains the filtered option before clicking).

### `tests/09_Frame_Iframe/`

- **`263_iframe.spec.ts`** — Single iframe handling on the TTA frames page: creates a `FrameLocator` via `page.frameLocator('#frame-one')`, fills the vehicle form fields inside the frame, submits it, and reads the output text from within the frame.
- **`264_multiple_frame.spec.ts`** — Multiple-frames demo: reads the header from the `[name="main"]` frame, enumerates all `<frame>` elements with `.all()` to print their `name`/`src` attributes, then clicks a link inside the `[name="side"]` frame.

### `tests/10_Keyboard_Hover_Drag_Drop/`

- **`265_Keyboard.spec.ts`** — Keyboard API demo on keycode.info: presses letters and navigation keys with `page.keyboard.press()` (e.g., `ArrowLeft` / `ArrowRight`) and captures a screenshot.
- **`266_Spicejet.hover.spec.ts`** — Hover demo on the SpiceJet site: hovers the "Add-ons" menu with `locator.hover()` to reveal the flyout and clicks the "FlyEarly" option.
- **`267_Drag_Drop.spec.ts`** — Basic drag & drop on the-internet.herokuapp.com: swaps columns A and B with `columnA.dragTo(columnB)`.
- **`268_Advance_Drag_Drop.spec.ts`** — HTML5 drag & drop on the TTA Kanban board: drags `card-write-spec` from "To do" into "In progress" with `getByTestId().dragTo()` and asserts the column count badge becomes `1` (`toHaveText`). Lessons baked in:
  - Cards have `id` attributes but the columns **don't** — only `data-testid="col-*"` — so `#col-in-progress` matches nothing and `dragTo()` hangs until timeout.
  - A top-level `viewport` in `use` is **overridden** by the project's `...devices['Desktop Chrome']` spread (device defaults win) — set the viewport again at project level for a real 1920×1080.
- **`269_Context_click.spec.ts`** — Custom context menu on the TTA context-menu page: right-clicks `span.context-menu-one` with `click({ button: 'right' })`, asserts exactly one open menu (`ul#ctx-menu.context-menu-list.is-open` → `toHaveCount(1)`) and 7 `<li>` rows (6 actions — Edit/Cut/Copy/Paste/Delete/Quit — plus a `<li><hr></li>` separator that also counts).
- **`learning.md`** — Reference notes for this module: all supported keyboard keys (modifiers, navigation, F1–F12, numpad, media keys), `keyboard` methods (`press` / `type` / `insertText` / `down` / `up`), mouse methods (`up` / `down` / `click` / `dblclick` / `move` / `wheel`), key combinations, hover options, and all three drag & drop approaches.

### `tests/Live_Task/`

- **`Task_6th_July.spec.ts`** — Live task: open pages in separate browser contexts (multi-site demo).
- **`Task_8th_July.spec.ts`** — Live task: HTML form creation (email, password, remember me, sign-up).
- **`Task_10th_July.spec.ts`** — Live task: XPath relative locators for the Cura Healthcare demo site.
- **`Task_17th_July.spec.ts`** — Live task: student login form automation using `getByRole` locators (email, password, remember-me checkbox) with a URL assertion after submit.
- **`Task_17th_July_advanced.spec.ts`** — Live task: logs into the AwesomeQA HR portal, loops through the employee table row by row, finds the first employee with "Terminated" status, and clicks its delete icon via a relative XPath (`parent::div` / `following-sibling::div`).
- **`Task_19th_July.spec.ts`** — Live task with two web table challenges on the TTA table page: find the country of "Yoshi Tannamuri" in the companies table via `locator().filter()`, and find "Mia Hoffmann"'s email in the paginated employees table with a `while` loop that clicks Next until the row appears.
- **`Task_20th_July.spec.ts`** — Live task: SpiceJet booking widget — select origin (Delhi) and destination (Bengaluru) via the `to-testID-origin` / `to-testID-destination` containers, typing with `pressSequentially` to trigger the airport typeahead, asserting the picked values with `toHaveValue`. Grants the `notifications` permission so Chrome's native "Allow this time" prompt never appears.
- **`Task_22nd_July.spec.ts`** — Live task on the TTA hover-menu widget: hovers the Add-ons nav item, counts and prints all dropdown options via XPath + `allInnerTexts()`, clicks the Wifi option by test id, and asserts the output panel with a web-first `toContainText`.

### `tests/11_JS_Alerts/`

- **`270_js_alerts.spec.ts`** — Native `alert` / `confirm` / `prompt` handling on the-internet.herokuapp.com: registers `page.once('dialog', ...)` handlers **before** triggering each dialog (dialogs auto-dismiss if no handler is active), asserts dialog type/message, and accepts the prompt with custom text via `dialog.accept('Playwright')`.

### `tests/12_Handle_SVG/`

- **`271_svg.spec.ts`** — Flipkart search driven by the SVG search icon: fills `input[name="q"]`, clicks the icon inside the form's submit button (`form[action^="/search"] button[type="submit"] svg`), then loops over product titles extracted with the `//div[contains(@data-id,'CPU') or ...]/div/a[2]` XPath. Lessons baked in:
  - `locator.count()` does **not** auto-wait — called before results render it returns 0, so the loop is skipped. Wait for the first result (`first().waitFor()`) before counting.
  - A bare `page.locator('svg')` matches ~86 icons on the page (hearts, logo, cart...) — scope the locator to the one you need.
  - Flipkart's page re-hydrates ~2 s after load and can **wipe a filled input** (empty search box on the results screenshot). Refill until the value sticks (`expect(...).toPass()` retry loop) and confirm the search committed with `waitForURL(/q=macmini/)` before extracting results.

## Configuration Highlights

Defined in `playwright.config.ts`:

- `testDir: './tests'` — root directory for test files
- `testMatch: ['tests/**/*.spec.ts']` — match all `.spec.ts` files recursively
- `timeout: 120000` — global test timeout (120s)
- `outputDir: 'C:/Users/DELL/pw-test-results'` — local (non-OneDrive) artifact folder; avoids OneDrive sync/lock stalls that were adding ~17s per run (tests: 54s → 23s)
- `fullyParallel: true` — run test files in parallel
- `reporter: ["line"], ["allure-playwright"], ["./reporters/custom-reporter.ts"]` — multiple reporters (line, Allure, custom HTML)
- `headless: false` — run browsers in headed mode by default
- `screenshot: 'only-on-failure'` — capture screenshots only for failed tests
- `viewport: { width: 1920, height: 1080 }` — full-HD viewport, set both at the top level **and** inside the chromium project (project-level `...devices['Desktop Chrome']` would otherwise reset it to the device default 1280×720)
- `trace: 'retain-on-failure'` — capture traces and keep them only for failed tests (open with `npx playwright show-trace <path>`)
- **Projects:** Chromium only (Firefox & WebKit commented out)
- CI-aware retries (`retries: 2`) and single worker (`workers: 1`) when `process.env.CI` is set

## Troubleshooting Tips

### VS Code: green run buttons missing

- Ensure the **chromium** project is enabled in the Playwright sidebar (Projects section) — buttons only show for enabled projects.
- Run **Playwright: Reload tests** from the Command Palette, or kill leftover `node.exe ... cli.js test-server` processes and reload the window.
- This repo's `.vscode/settings.json` sets `playwright.reuseServer: false` so a wedged test server is never reused across sessions.

### `page.pause()` hangs the test run

`page.pause()` is for **debug mode only**. Running a test that contains it via the normal Run button hangs it indefinitely (the test timeout is disabled while paused). Use the **Debug** button (bug icon) or `npm run test:debug` when you want breakpoints/pausing.

### XPath works in the test but shows 0 results in Chrome DevTools

- In the Elements panel Ctrl+F search, paste the **bare XPath only** (starting with `//`). A prefix like `xpath=` or a wrapper like `page.locator('...')` makes DevTools fall back to a plain-text search → 0 results.
- Verify reliably in the Console instead: `$x("//td[text()='Aarav.Sharma']/preceding-sibling::td/input[@type='checkbox']")` returns the matched elements.

### Chrome's native permission prompt ("Allow this time") can't be clicked

- Buttons like "Allow this time" belong to the **browser UI**, not the page DOM — `page.getByText("Allow this time")` will time out forever. Pre-grant the permission instead: `test.use({ permissions: ['notifications'] })` (see `Task_20th_July.spec.ts`). The prompt never blocks page interactions, so it can also just be ignored.

### `fill()` doesn't open suggestions on typeahead inputs

- `fill()` sets the input value in one shot; React typeaheads (e.g., SpiceJet's airport picker) only filter/autocomplete on real key events. Type with `pressSequentially('del', { delay: 150 })` instead, then assert the completed value with `expect(input).toHaveValue(/Delhi/)` — input *values* are invisible to `toContainText`.

### `locator.count()` returns 0 right after navigation

- `count()` (and `allTextContents()` / `allInnerTexts()`) do **not** auto-wait — they return whatever exists at the instant of the call. Actions, assertions and `waitFor()` auto-wait; these don't. Wait for the page to reach a known state first, e.g. `await locator.first().waitFor({ state: 'visible' })` (see `271_svg.spec.ts`).

### Flipkart clears a filled search input (empty results page)

- Flipkart's app re-hydrates shortly after load and can reset a React-controlled input, wiping your `fill()` — the subsequent search click then submits an empty query ("All Categories" results, blank search box). Retry the fill until the value survives (`await expect(async () => { await input.fill('macmini'); await page.waitForTimeout(2500); expect(await input.inputValue()).toBe('macmini'); }).toPass()`) and verify the search actually happened with `await page.waitForURL(/q=macmini/)` (see `271_svg.spec.ts`).

## Learn More

- [Playwright Docs](https://playwright.dev/docs/intro)
- [The Testing Academy](https://thetestingacademy.com/)

## License

ISC
