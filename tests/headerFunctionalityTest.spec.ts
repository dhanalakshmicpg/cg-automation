import { test, expect } from '../src/basePage/BasePage';
import { HeaderFunctionality } from '../src/pages/HeaderFunctionality';

test.describe('Header Functionality Tests', () => {
  let headerPage: HeaderFunctionality;

  test.beforeAll(async ({ sharedPage }) => {
    headerPage = new HeaderFunctionality(sharedPage);
    await headerPage.initializePage();
  });

  test('Verify Header Logo is Visible', async () => {
    const logoResult = await headerPage.verifyLogoVisibility();
    expect(logoResult.isVisible).toBe(true);
  });

  test('Verify All Header Menus are Visible', async () => {
    const menuResult = await headerPage.verifyMenusVisibility();
    expect(menuResult.totalVisible).toBeGreaterThan(0);
  });

});