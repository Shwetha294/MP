// Reusable Playwright actions for signup/auth flows
// Encapsulates common flows for modular E2E tests
import { Page } from '@playwright/test';
import { signupSelectors } from './selectors';

export async function fillSignupForm(page: Page, user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  countryCode: string;
}) {
  await page.fill(signupSelectors.firstName, user.firstName);
  await page.fill(signupSelectors.lastName, user.lastName);
  await page.fill(signupSelectors.email, user.email);
  await page.fill(signupSelectors.password, user.password);
  await page.selectOption(signupSelectors.countryCode, user.countryCode);
  await page.fill(signupSelectors.phone, user.phone);
  await page.check(signupSelectors.agreeToTerms);
} 