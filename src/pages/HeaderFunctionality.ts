import { Page, expect } from '@playwright/test';
import { MarcommSiteLocators } from '../pagelocators/MarcommSiteLocators';

// Timeout constants
const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 15000,
  LONG: 30000,
  VERY_LONG: 60000,
} as const;

export class HeaderFunctionality {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ===== COOKIE CONSENT METHODS =====
  async handleCookieConsent(): Promise<void> {
    try {
      const cookieButton = this.page.locator(MarcommSiteLocators.AllowAllCookies);
      if (await cookieButton.first().isVisible({ timeout: 3000 })) {
        await cookieButton.first().click();
        console.log('Cookie consent handled');
      }
    } catch {
      // Cookie banner might not be present, continue
    }
  }

  // ===== LOGO VERIFICATION METHODS =====
  async verifyLogoVisibility(): Promise<{ isVisible: boolean; foundWith?: string }> {
    console.log('Testing logo visibility...');

    const logoSelectors = MarcommSiteLocators.LogoSelectors;

    for (const selector of logoSelectors) {
      try {
        const logoElement = this.page.locator(selector).first();
        const count = await this.page.locator(selector).count();
        
        if (count > 0) {
          console.log(`Found logo with selector: ${selector} (${count} elements)`);
          
          const isVisible = await logoElement.isVisible();
          console.log(`Logo visibility: ${isVisible}`);
          
          if (isVisible) {
            return { isVisible: true, foundWith: selector };
          }
        }
      } catch (error) {
        console.log(`Selector ${selector} failed: ${(error as Error).message}`);
      }
    }

    console.log('No visible logo found with any selector');
    await this.page.screenshot({ path: 'test-results/logo-not-found.png' });
    return { isVisible: false };
  }

  // ===== MENU VERIFICATION METHODS =====
  async verifyMenusVisibility(): Promise<{ visibleMenus: string[]; hiddenMenus: string[]; totalVisible: number }> {
    console.log('Testing menu visibility...');

    const menuItems = [
      { name: 'Insights', selectors: MarcommSiteLocators.MenuSelectors.Insights },
      { name: 'Industries', selectors: MarcommSiteLocators.MenuSelectors.Industries },
      { name: 'Services', selectors: MarcommSiteLocators.MenuSelectors.Services },
      { name: 'Careers', selectors: MarcommSiteLocators.MenuSelectors.Careers },
      { name: 'News', selectors: MarcommSiteLocators.MenuSelectors.News },
      { name: 'About', selectors: MarcommSiteLocators.MenuSelectors.About }
    ];

    const visibleMenus: string[] = [];
    const hiddenMenus: string[] = [];

    for (const menu of menuItems) {
      console.log(`\nChecking ${menu.name} menu...`);
      let menuFound = false;

      for (const selector of menu.selectors) {
        try {
          const menuElement = this.page.locator(selector).first();
          const count = await this.page.locator(selector).count();

          if (count > 0) {
            const isVisible = await menuElement.isVisible();
            console.log(`   Selector: ${selector} - Count: ${count}, Visible: ${isVisible}`);
            
            if (isVisible) {
              visibleMenus.push(menu.name);
              menuFound = true;
              break;
            }
          }
        } catch (error) {
          console.log(`   Error with ${selector}: ${(error as Error).message}`);
        }
      }

      if (!menuFound) {
        console.log(`   ${menu.name} menu not found or not visible`);
        hiddenMenus.push(menu.name);
      } else {
        console.log(`   ${menu.name} menu is visible`);
      }
    }

    console.log(`\nMenu Visibility Summary:`);
    console.log(`Visible menus (${visibleMenus.length}): ${visibleMenus.join(', ')}`);
    console.log(`Hidden menus (${hiddenMenus.length}): ${hiddenMenus.join(', ')}`);

    await this.page.screenshot({ path: 'test-results/menu-visibility-test.png' });

    return { visibleMenus, hiddenMenus, totalVisible: visibleMenus.length };
  }

  // ===== INITIALIZATION METHOD =====
  async initializePage(): Promise<void> {
    try {
      await this.page.goto('/', { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
      // Wait for page to be ready
      await this.page.waitForLoadState('domcontentloaded');
      // Small wait for initial rendering
      await this.page.waitForTimeout(1000);
      await this.handleCookieConsent();
    } catch (error) {
      console.log(`Page initialization failed: ${(error as Error).message}`);
      throw error;
    }
  }
}