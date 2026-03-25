import { Page } from '@playwright/test';

export class SearchOption {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openSearch(): Promise<void> {
    await this.page.getByRole('button', { name: ' Search' }).click();
  }

  async performSearch(query: string): Promise<void> {
    await this.openSearch();
    await this.page.fill('input[type="search"]', query);
    await this.page.keyboard.press('Enter');
  }

  async getSearchResults(): Promise<string[]> {
    const results = await this.page.locator('.search-result').allTextContents();
    return results;
  }

  async closeSearch(): Promise<void> {
    await this.page.getByRole('button', { name: 'Close' }).click();
  }
}