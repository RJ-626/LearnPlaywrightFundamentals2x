# Learn Playwright Fundamentals

This repository contains the fundamentals of Playwright testing, covering basic test automation concepts using the Playwright framework.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

Run tests for a specific browser:

```bash
npx playwright test --project=chromium
```

## Project Structure

```
LearnPlaywrightFundamental2x/
├── tests/
│   └── example.spec.ts       # Sample Playwright tests
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

## Test Examples

The `example.spec.ts` file includes basic tests against [playwright.dev](https://playwright.dev/):

- **has title**: Verifies that the page title contains "Playwright"
- **get started link**: Verifies that clicking "Get started" navigates to the Installation page

## Configuration

Playwright is configured to run tests across three browsers:

- Chromium (Desktop Chrome)
- Firefox (Desktop Firefox)
- WebKit (Desktop Safari)

Configuration can be updated in `playwright.config.ts`.

## Reports

After running tests, an HTML report is generated. Open it with:

```bash
npx playwright show-report
```

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
