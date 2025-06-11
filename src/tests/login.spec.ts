import { test, expect } from '@playwright/test';
import { signinSelectors } from './helpers/selectors';

test.describe('Login Page', () => {
  test('should allow user to enter email/phone and click Send OTP', async ({ page }) => {
    await page.goto('https://devshop.skysecure.ai/auth/login');
    await page.fill(signinSelectors.emailOrPhone, 'testuser@example.com');
    await page.click(signinSelectors.sendOtpButton);
    // Optionally, check for a toast or next step
    // await expect(page.locator('[role="alert"]')).toContainText('OTP sent');
  });

  test('should show toast if password is missing when trying to sign in', async ({ page }) => {
    await page.goto('https://devshop.skysecure.ai/auth/login');
    await page.fill(signinSelectors.emailOrPhone, 'testuser@example.com');
    // Do not fill password
    await page.click(signinSelectors.sendOtpButton);
    await expect(page.locator('[role="alert"]')).toContainText('Please enter your password');
  });
}); 