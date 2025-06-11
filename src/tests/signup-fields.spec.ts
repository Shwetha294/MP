import { test, expect } from '@playwright/test';
import { signupSelectors } from './helpers/selectors';

test.describe('Sign Up Page Field Presence', () => {
  test('should load the Sign-Up page and display all required fields', async ({ page }) => {
    await page.goto('https://devshop.skysecure.ai/auth/signup');

    // Check all required fields and buttons are visible
    await expect(page.locator(signupSelectors.firstName)).toBeVisible();
    await expect(page.locator(signupSelectors.lastName)).toBeVisible();
    await expect(page.locator(signupSelectors.email)).toBeVisible();
    await expect(page.locator(signupSelectors.emailVerifyButton)).toBeVisible();
    await expect(page.locator(signupSelectors.password)).toBeVisible();
    await expect(page.locator(signupSelectors.countryCode)).toBeVisible();
    await expect(page.locator(signupSelectors.phone)).toBeVisible();
    await expect(page.locator(signupSelectors.phoneVerifyButton)).toBeVisible();
    await expect(page.locator(signupSelectors.agreeToTerms)).toBeVisible();
    await expect(page.locator(signupSelectors.continueButton)).toBeVisible();
    // Optionally, check for the Login link
    await expect(page.locator('a:has-text("Login")')).toBeVisible();
  });
}); 