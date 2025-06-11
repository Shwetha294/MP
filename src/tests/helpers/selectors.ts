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
  captchaImage: 'img[alt="captcha"]',
  emailVerifyButton: 'button[data-testid="email-verify"]',
  emailOtpInput: 'input[data-testid="email-otp"]',
  phoneVerifyButton: 'button[data-testid="phone-verify"]',
  phoneOtpInput: 'input[data-testid="phone-otp"]',
  otpSubmitButton: 'button[data-testid="otp-submit"]',
};

export const signinSelectors = {
  emailOrPhone: 'input#emailOrPhone',
  password: 'input[type="password"]',
  sendOtpButton: 'button:has-text("Send OTP")',
}; 