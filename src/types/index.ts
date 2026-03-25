// User types
export interface User {
  username: string;
  password: string;
  email?: string;
  role?: 'admin' | 'user' | 'guest';
}

// Test environment types
export interface Environment {
  name: 'development' | 'staging' | 'production';
  baseUrl: string;
  apiUrl: string;
  timeout: number;
  headless: boolean;
}

// Browser types
export type BrowserType = 'chromium' | 'firefox' | 'webkit';

// Test data types
export interface TestData {
  users: User[];
  forms: FormData;
  countries: Country[];
}

export interface FormData {
  contact: ContactForm;
  search: SearchForm;
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export interface SearchForm {
  query: string;
  filters?: string[];
}

export interface Country {
  code: string;
  name: string;
  language: string;
  url: string;
}

// Page object types
export interface PageActions {
  navigate(url?: string): Promise<void>;
  waitForLoad(): Promise<void>;
  takeScreenshot(name?: string): Promise<void>;
}

// Selector types
export interface Selector {
  primary: string;
  fallback?: string[];
  timeout?: number;
}

export interface SelectorGroup {
  [key: string]: string | Selector;
}

// Test result types
export interface TestResult {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: string;
  screenshots?: string[];
}

// Configuration types
export interface PlaywrightConfig {
  browser: BrowserType;
  headless: boolean;
  timeout: number;
  retries: number;
  workers: number;
}

// API types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
}

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];