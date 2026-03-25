// MarcommSite Specific Locators
// This file contains all selectors used across the application

export const MarcommSiteLocators = {
  // Cookie Consent
  AllowAllCookies: 'button#truste-consent-button',
  
  // Header Logo Selectors
  HomePageHeaderLogo: 'img.logo-light[alt="Capgemini"]',
  LogoSelectors: [
    'img.logo-light[alt="Capgemini"]',
    'img[alt="Capgemini"]:visible',
    'a[href="https://qa.ucwe.capgemini.com"] img',
    'img[src*="capgeminiBlue.svg"]',
    'div[role=\'banner\'] a[role=\'link\'] img:nth-child(2)',
    '.logo',
    'header .logo',
    'a.logo',
    '[class*="logo"]',
    'img[alt*="logo"]',
    'img[alt*="Logo"]'
  ],
  
  // Menu Item Selectors
  MenuSelectors: {
    Insights: ['a[href*="insights"]', 'nav a:has-text("Insights")', '[aria-label*="Insights"]'],
    Industries: ['a[href*="industries"]', 'nav a:has-text("Industries")', '[aria-label*="Industries"]'],
    Services: ['a[href*="services"]', 'nav a:has-text("Services")', '[aria-label*="Services"]'],
    Careers: ['a[href*="careers"]', 'nav a:has-text("Careers")', '[aria-label*="Careers"]'],
    News: ['a[href*="news"]', 'nav a:has-text("News")', '[aria-label*="News"]'],
    About: ['a[href*="about"]', 'nav a:has-text("About")', '[aria-label*="About"]']
  },
  
  // Generic Navigation Selectors
  NavigationSelectors: [
    'nav a',
    'header a',
    '.navigation a',
    '.menu a',
    '[role="navigation"] a',
    'ul.menu li a'
  ],
  
  // Right Corner Links  
  ContactUsRightCorner: 'a[href="/contact-us"], a[href*="contact"]',
  InvestorsRightCorner: 'a[href*="investors.capgemini.com"], a[href*="investors"]',
  GlobalRightCorner: '.header-lang-open, .country-selector, .locale-selector',
  
  // Popups and Modals
  SelectYourLocation: '.header_lang_menu, .country-menu, .location-popup',
  YourLocationClose: '.close, button[aria-label="Close"], .modal-close',
  
  // Theme Toggle
  DarkModeToggle: '#darkModeCheckboxDesktop, .dark-mode-toggle, .theme-toggle',
  BodyTag: 'body',
  
  // Search
  SearchHeaderOption: 'button.header-search-button.header-search-open, .search-btn, [data-testid="search-button"]',
  Search_close: '.close, button[aria-label="Close"], .search-close',
  
  // Navigation Menus - using xpath and css combined
  MainMenuSelector: "#menu-main-menu-1 li a, nav.header-nav li a",
  
  // Submenu arrows and dropdowns
  MenuArrowDown: 'button.menu-arrow-down, .menu-arrow, .submenu-toggle',
  SubmenuContent: '.menu-submenu, .submenu-content, .dropdown-menu'
} as const;