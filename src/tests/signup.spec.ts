import { test, expect } from '@playwright/test';
import { fillSignupForm } from './helpers/actions';
import { generateUser } from './helpers/userData';
import { signupSelectors } from './helpers/selectors';

// 1. Navigate to Sign Up screen
// 2. Verify unregistered phone/email (should allow signup with new data)
// 3. Display a toast message: "This phone number/email ID is not registered."
test.describe('Signup Flow', () => {
  test('should display the signup screen', async ({ page }) => {
    await page.goto('http://139.84.135.32:3001/auth/signup');
    await expect(page.locator('h2')).toHaveText(/create your account/i);
  });

  // SIGNUP-001: Verify checkbox for Terms and Conditions is present
  // Test ID: SIGNUP-001
  // @signup
  // @signup-001
  // Checks that the checkbox for agreeing to terms is rendered
  test('SIGNUP-001: should display checkbox for Terms and Conditions', async ({ page }) => {
    await page.goto('http://139.84.135.32:3001/auth/signup');
    await expect(page.locator(signupSelectors.agreeToTerms)).toBeVisible();
  });

  // SIGNUP-002: 'Accept and Continue' button enabled only when checkbox is selected
  // Test ID: SIGNUP-002
  // @signup
  // @signup-002
  // Checks that the button is enabled only when the checkbox is checked
  test('SIGNUP-002: should enable Accept and Continue button only when checkbox is selected', async ({ page }) => {
    await page.goto('http://139.84.135.32:3001/auth/signup');
    // Fill required fields except checkbox
    const user = generateUser();
    await page.fill(signupSelectors.firstName, user.firstName);
    await page.fill(signupSelectors.lastName, user.lastName);
    await page.fill(signupSelectors.email, user.email);
    await page.fill(signupSelectors.password, user.password);
    await page.selectOption(signupSelectors.countryCode, user.countryCode);
    await page.fill(signupSelectors.phone, user.phone);
    // Checkbox not checked yet
    await expect(page.locator(signupSelectors.continueButton)).toBeDisabled();
    // Check the checkbox
    await page.check(signupSelectors.agreeToTerms);
    await expect(page.locator(signupSelectors.continueButton)).toBeEnabled();
  });

  // SIGNUP-003: If checkbox not selected, prompt user to accept Terms and Conditions
  // Test ID: SIGNUP-003
  // @signup
  // @signup-003
  // Checks that a prompt appears if user tries to continue without checking the checkbox
  test('SIGNUP-003: should prompt user to accept Terms and Conditions if checkbox not selected', async ({ page }) => {
    await page.goto('http://139.84.135.32:3001/auth/signup');
    const user = generateUser();
    // Fill all required fields except the checkbox
    await page.fill(signupSelectors.firstName, user.firstName);
    await page.fill(signupSelectors.lastName, user.lastName);
    await page.fill(signupSelectors.email, user.email);
    await page.fill(signupSelectors.password, user.password);
    await page.selectOption(signupSelectors.countryCode, user.countryCode);
    await page.fill(signupSelectors.phone, user.phone);
    // Do not check the checkbox
    await page.click(signupSelectors.continueButton);
    // Expect the specific toast message
    await expect(page.locator(signupSelectors.toast)).toContainText('Please agree to the Terms of Service and Privacy Policy');
  });
}); 