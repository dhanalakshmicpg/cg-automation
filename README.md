# CG Automation - Playwright Testing Framework

Playwright testing framework for Capgemini web applications with cross-browser support and dual reporting.

## 🚀 Quick Setup

### Prerequisites
- Node.js (v16+)
- npm

### Installation
```bash
# Clone and setup
git clone https://github.com/dhanalakshmicpg/cg-automation.git
cd cg-automation
npm install
npx playwright install
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run specific browser
npx playwright test --project=chromium

# Debug tests (with browser UI)
npm run test:headed

# Interactive debugging
npm run test:debug
```

## 📊 Reports

### View Test Results
```bash
# Playwright HTML Report
npm run test:report

# Allure Report (enhanced analytics)
npm run allure:serve
```

## 📁 Project Structure

```
src/
├── pages/            # Page Object Models
├── pagelocators/     # Element selectors
├── basePage/         # Custom fixtures
├── config/           # Environment settings (.env)
└── testdata/         # Test data

tests/                # Test specifications
```

## ⚙️ Configuration

**Environment**: Configure in `src/config/.env`
```env
BASE_URL=https://qa.ucwe.capgemini.com
AUTH_USERNAME=your-username
AUTH_PASSWORD=your-password
```

**Browser Settings**: Configured in `playwright.config.ts`
- Cross-browser testing (Chromium, Firefox, WebKit)
- Automatic screenshots on failure
- Video recording for failed tests

## 🏗️ Writing Tests

```typescript
import { test } from '../src/basePage/BasePage';
import { HeaderFunctionality } from '../src/pages/HeaderFunctionality';

test.describe('Header Tests', () => {
  let headerPage: HeaderFunctionality;
  
  test.beforeAll(async ({ sharedPage }) => {
    headerPage = new HeaderFunctionality(sharedPage);
    await headerPage.initializePage();
  });
  
  test('verify logo visibility', async () => {
    await headerPage.verifyLogoVisibility();
  });
});
```

## Troubleshooting

**Browser issues**: `npx playwright install --force`  
**Timeout errors**: Check network connectivity and increase timeouts in config  
**Selector failures**: Update selectors in `src/pagelocators/MarcommSiteLocators.ts`

