import { test, expect } from '@playwright/test';
import { signinSelectors } from './helpers/selectors';

test.describe('Sign In Page', () => {
  // Test Case 1: Password field should be cleared when email is cleared and re-entered
  test('should clear password field when email is cleared and re-entered', async ({ page }) => {
    await page.goto('https://devshop.skysecure.ai/auth/login');
    await page.fill(signinSelectors.emailOrPhone, 'testuser@example.com');
    await page.waitForTimeout(2000); // Wait 2 seconds

    await page.fill(signinSelectors.password, 'TestPassword123!');
    await page.waitForTimeout(2000); // Wait 2 seconds

    // Clear the email field
    await page.fill(signinSelectors.emailOrPhone, '');
    await page.waitForTimeout(2000); // Wait 2 seconds

    // Re-enter a valid email address
    await page.fill(signinSelectors.emailOrPhone, 'testuser@example.com');
    await page.waitForTimeout(2000); // Wait 2 seconds

    // Check that the password field is cleared
    const passwordValue = await page.inputValue(signinSelectors.password);
    expect(passwordValue).toBe('');
    await page.waitForTimeout(2000); // Wait 2 seconds to observe the result
  });

  // Test Case 2: Cursor should not move to password field when typing .com in email
  test('should not move cursor to password field when typing .com in email', async ({ page }) => {
    await page.goto('https://devshop.skysecure.ai/auth/login');
    const emailInput = page.locator(signinSelectors.emailOrPhone);

    // Focus the email field and type an email ending with .com
    await emailInput.click();
    await emailInput.type('testuser@example.com');

    // Wait a moment to observe
    await page.waitForTimeout(2000);

    // Check that the email field is still focused
    const isFocused = await emailInput.evaluate((el) => document.activeElement === el);
    expect(isFocused).toBe(true);

    // Optionally, check that the password field is not focused
    const passwordInput = page.locator(signinSelectors.password);
    const passwordIsFocused = await passwordInput.evaluate((el) => document.activeElement === el);
    expect(passwordIsFocused).toBe(false);

    await page.waitForTimeout(2000); // Wait to observe
  });

  // Test Case 3: Show toast if password is missing when trying to sign in
  test('should show toast if password is missing when trying to sign in', async ({ page }) => {
    await page.goto('https://devshop.skysecure.ai/auth/login');
    await page.fill(signinSelectors.emailOrPhone, 'testuser@example.com');
    await page.waitForTimeout(2000); // Wait 2 seconds to observe

    // Do not fill password
    await page.click(signinSelectors.sendOtpButton);
    await page.waitForTimeout(2000); // Wait 2 seconds to observe

    await expect(page.locator('[role="alert"]')).toContainText('Please enter your password');
    await page.waitForTimeout(2000); // Wait 2 seconds to observe
  });
});
