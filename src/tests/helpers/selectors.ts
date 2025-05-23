// Centralized selectors for the signup and authentication pages
// Update as UI evolves

export const signupSelectors = {
  firstName: 'input[name="firstName"]',
  lastName: 'input[name="lastName"]',
  email: 'input[name="email"]',
  password: 'input[name="password"]',
  phone: 'input[name="phoneNumber"]',
  countryCode: 'select[name="countryCode"]',
  agreeToTerms: 'input[name="agreeToTerms"]',
  continueButton: 'button[type="submit"]',
  toast: '[role="alert"]',
}; 