// Test Data Constants
export const TEST_DATA = {
  USERS: {
    VALID_USER: {
      username: 'test.user@capgemini.com',
      password: 'ValidPassword123!',
      firstName: 'Test',
      lastName: 'User',
    },
    INVALID_USER: {
      username: 'invalid@test.com',
      password: 'wrongpassword',
    },
    ADMIN_USER: {
      username: 'admin.user@capgemini.com',
      password: 'AdminPassword123!',
      role: 'admin',
    },
  },
  
  FORM_DATA: {
    CONTACT_FORM: {
      firstName: 'John',
      lastName: 'Doe', 
      email: 'john.doe@example.com',
      company: 'Test Company',
      message: 'This is a test message for automation',
    },
    NEWSLETTER: {
      email: 'newsletter@test.com',
    },
  },
  
  SEARCH_TERMS: {
    VALID: ['digital transformation', 'cloud services', 'consulting'],
    INVALID: ['xyzabc123', '!!!@@@', ''],
    SPECIAL_CHARS: ['test@company.com', 'search-term', 'search term'],
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  INVALID_LOGIN: 'Invalid username or password',
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  NETWORK_ERROR: 'Network error occurred',
} as const;