import { test as base, Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

export class BasePage {
  browser: Browser | undefined;
  context: BrowserContext | undefined;
  page: Page | undefined;
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async init(browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium') {
    if (browserType === 'chromium') {
      this.browser = await chromium.launch({ headless: false });
    } else if (browserType === 'firefox') {
      this.browser = await firefox.launch({ headless: false });
    } else if (browserType === 'webkit') {
      this.browser = await webkit.launch({ headless: false });
    }
    this.context = await this.browser!.newContext();
    this.page = await this.context.newPage();
    return this.page;
  }

  async goto(path: string = '/') {
    if (!this.page) throw new Error('Page not initialized. Call init() first.');
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async close() {
    await this.browser?.close();
  }
}

// Custom fixture that shares browser, context, and page for all tests in a suite
export type TestFixtures = {
  sharedPage: Page;
};

export type WorkerFixtures = {
  sharedBrowser: Browser;
  sharedContext: BrowserContext;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  sharedBrowser: [async ({}, use) => {
    const browser = await chromium.launch({ 
      headless: false,
      timeout: 30000 // Reduced browser launch timeout
    });
    await use(browser);
    await browser.close();
  }, { scope: 'worker' }],
  
  sharedContext: [async ({ sharedBrowser }, use) => {
    const context = await sharedBrowser.newContext({
      // Add context options for better stability
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    });
    await use(context);
    await context.close();
  }, { scope: 'worker' }],
  
  sharedPage: [async ({ sharedContext }, use) => {
    const page = await sharedContext.newPage();
    
    // Add error handling for page operations
    page.on('pageerror', (error) => {
      console.log('Page error:', error.message);
    });
    
    page.on('requestfailed', (request) => {
      console.log('Request failed:', request.url());
    });
    
    await use(page);
    // Let context handle page cleanup
  }, { scope: 'test' }], // Keep page at test scope to share across tests in same file
});

export { expect } from '@playwright/test';
