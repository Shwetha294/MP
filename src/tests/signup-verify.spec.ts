import { test, expect } from '@playwright/test';
import { fillSignupForm } from './helpers/actions';
import { generateUser } from './helpers/userData';
import { signupSelectors } from './helpers/selectors';

test('Verify email and phone number, then click continue', async ({ page }) => {
  await page.goto('https://devshop.skysecure.ai/auth/signup');

  // Fill the signup form with unique user data
  const user = generateUser();
  await fillSignupForm(page, user);

  // Verify email
  await page.click(signupSelectors.emailVerifyButton);
  await page.waitForSelector(signupSelectors.emailOtpInput, { timeout: 5000 });
  await page.fill(signupSelectors.emailOtpInput, '123456'); // Use the correct OTP if different
  await page.click(signupSelectors.otpSubmitButton);

  // Verify phone
  await page.click(signupSelectors.phoneVerifyButton);
  await page.waitForSelector(signupSelectors.phoneOtpInput, { timeout: 5000 });
  await page.fill(signupSelectors.phoneOtpInput, '123456'); // Use the correct OTP if different
  await page.click(signupSelectors.otpSubmitButton);

  // Click on continue button
  await page.click(signupSelectors.continueButton);

  // Optionally, assert that you have moved to the next step (e.g., captcha or success message)
  // await expect(page.locator(signupSelectors.captchaImage)).toBeVisible();
}); 