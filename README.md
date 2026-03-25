# CG Automation - Playwright Testing Framework

A comprehensive Playwright testing framework for Capgemini web applications with cross-browser support, environment management, and advanced reporting.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cg-automation
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

## 📁 Project Structure

```
cg-automation/
├── src/
│   ├── config/           # Environment variables (.env files)
│   ├── pagelocators/     # Page element selectors and constants
│   ├── testdata/         # Test data (users, forms, etc.)
│   ├── basePage/         # Custom Playwright fixtures
│   ├── pages/            # Page Object Models
│   └── types/            # TypeScript type definitions
├── tests/                # Test specifications
├── utils/                # Helper functions and utilities
├── .github/              # GitHub workflows
├── playwright-report/    # Playwright HTML test reports (generated)
└── test-results/         # Playwright test artifacts
```

## 🧪 Running Tests

### Test Execution Options
```bash
# Run all tests
npm test

# Run tests headless
npm run test:headless

# Run tests with headed browsers (visible)
npm run test:headed

# Run tests in CI mode
npm run test:ci

# Debug tests interactively
npm run test:debug
```

### Cross-Browser Testing
Tests automatically run on:
- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)

### Single Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Specific Tests
```bash
# Run specific test file
npm run test:dev -- tests/header.spec.ts

# Run tests matching pattern
npm run test:dev -- --grep="login"

# Debug mode (headed browser)
npm run test:dev -- --debug
```

## 📊 Reporting

### Dual Reporting System
This project supports both Playwright HTML and Allure reports running simultaneously:

#### Playwright HTML Reports (Default)
```bash
# View the last test results in browser
npm run test:report

# Run tests and automatically open report
npx playwright test --reporter=html
```

#### Allure Reports (Enhanced Analytics)
```bash
# Generate and open interactive Allure report
npm run allure:generate && npm run allure:open

# Serve live Allure report (auto-refreshing)
npm run allure:serve

# Generate report only (without opening)
npm run allure:generate
```

### View Results
- **HTML Report**: Interactive Playwright dashboard at `playwright-report/index.html`
- **Allure Report**: Enhanced analytics dashboard at `allure-report/index.html`
- **Screenshots**: Captured on failure in `test-results/`
- **Videos**: Recorded for failed tests in `test-results/`
- **Traces**: Debug information available for analysis
- **Live Results**: Playwright reports at `http://localhost:9323`, Allure at `http://localhost:9001`

## ⚙️ Configuration

### Environment Variables
Configure different environments in `src/config/`:

- **`.env.dev`** - Development settings
- **`.env.staging`** - Staging environment
- **`.env.prod`** - Production environment

Example configuration:
```env
# Application URLs
BASE_URL=https://qa.ucwe.capgemini.com
API_BASE_URL=https://api.capgemini.com

# Authentication
AUTH_USERNAME=your-username
AUTH_PASSWORD=your-password

# Test Configuration
TIMEOUT=30000
BROWSER=chromium
HEADLESS=true
```

### Playwright Configuration
Main configuration in `playwright.config.ts`:
- **Cross-browser projects** (Chromium, Firefox, WebKit)
- **HTML Reporter** with `playwright-report` output directory
- **Custom fixtures** for browser and page management
- **Optimized timeouts** (40s test, 30s navigation, 15s actions)
- **Automatic screenshots** on failure
- **Video recording** for failed tests
- **HTTP basic authentication**
- **Environment-specific base URLs**

## 🏗️ Writing Tests

### Test Structure
```typescript
import { test, expect } from '../src/basePage/BasePage';
import { HeaderFunctionality } from '../src/pages/HeaderFunctionality';

test.describe('Header Functionality', () => {
  let headerPage: HeaderFunctionality;
  
  test.beforeAll(async ({ sharedPage }) => {
    headerPage = new HeaderFunctionality(sharedPage);
    await headerPage.initializePage();
  });
  
  test('should verify logo visibility', async () => {
    await headerPage.verifyLogoVisibility();
  });
});```
```

### Page Object Model
```typescript
// src/pages/HeaderFunctionality.ts
import { Page } from '@playwright/test';
import { MarcommSiteLocators } from '../pagelocators/MarcommSiteLocators';

export class HeaderFunctionality {
  constructor(private page: Page) {}

  async verifyLogoVisibility() {
    const logoVisible = await this.page.locator(MarcommSiteLocators.LogoSelectors[0]).isVisible();
    if (logoVisible) {
      console.log('✅ LOGO IS VISIBLE - Test PASSED');
    } else {
      console.log('❌ LOGO IS NOT VISIBLE - Test FAILED');
    }
  }
}
```

### Custom Fixtures
The framework provides optimized shared resources:
- `sharedBrowser` - Worker-scoped shared browser instance
- `sharedContext` - Worker-scoped shared browser context  
- `sharedPage` - Test-scoped shared page instance

This architecture ensures optimal performance by reusing browser instances across tests while maintaining proper test isolation.

## 🔧 Development

### Code Quality
```bash
# Run linting (when configured)
npm run lint

# Format code (when configured)
npm run format

# Type checking (when configured)
npm run type-check
```

### Debugging
- Use `--debug` flag for interactive debugging
- Add `await page.pause()` for breakpoints
- Check browser developer tools in headed mode
- Review screenshots and videos in `test-results/`

## 📝 Best Practices

1. **Environment Management**: Use appropriate environment files for different testing stages
2. **Page Objects**: Keep locators and actions in page object classes
3. **Selectors**: Use data-testid attributes when possible, fallback to CSS selectors
4. **Wait Strategies**: Use `waitForLoadState()` and `waitForSelector()` for reliable tests
5. **Test Data**: Store test data in `src/testdata/` for reusability
6. **Error Handling**: Let tests fail fast with clear error messages

## 🚨 Troubleshooting

### Common Issues

**Environment variables not loading:**
```bash
# Check if NODE_ENV is set correctly
echo $NODE_ENV

# Verify .env files exist in src/config/
ls src/config/
```

**Browser installation issues:**
```bash
# Reinstall browsers
npx playwright install --force
```

**Test timeouts:**
- Increase timeout in environment files
- Check network connectivity
- Verify application availability

**Selector failures:**
- Update selectors in `src/pagelocators/MarcommSiteLocators.ts`
- Use browser dev tools to inspect elements
- Test selectors manually in browser console
- Check selector visibility with `:visible` pseudo-selector

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch
3. **Write** tests for new functionality
4. **Ensure** all tests pass
5. **Submit** a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Contact the automation team
- Review documentation and examples

---

**Framework Version**: 1.0.0  
**Playwright Version**: 1.58.2  
**Node.js Required**: ≥16.0.0