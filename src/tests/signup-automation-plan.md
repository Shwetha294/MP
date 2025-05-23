# Skysecure Signup Automation Plan

## Overview
This document outlines a modular, reusable, and scalable approach for automating the signup flow of the Skysecure Next.js application using Playwright MCP. The strategy is designed to support both targeted signup tests and future end-to-end (E2E) scenarios across the application.

---

## Goals
- Ensure robust, maintainable, and CI-friendly automation for the signup flow.
- Enable code and logic reuse for broader E2E coverage (login, onboarding, etc.).
- Follow best practices for Playwright, Next.js, and modern test architecture.

---

## Directory & File Structure

```
/src
  /tests
    signup.spec.ts         # Signup flow E2E tests
    /helpers
      userData.ts         # Dummy data generators
      selectors.ts        # Centralized selectors for auth pages
      actions.ts          # Reusable Playwright actions (e.g., fillSignupForm)
    signup-automation-plan.md  # This plan
```

---

## Test Architecture Principles
- **Modularization:** Extract selectors, data, and actions into helpers for reuse.
- **Type Safety:** Use TypeScript for all test and helper files.
- **Fixtures:** Use Playwright fixtures for setup/teardown and shared context.
- **CI/CD Ready:** All tests run headless, deterministic, and without manual intervention.
- **Accessibility & UX:** Validate visible text, ARIA roles, and focus management where relevant.
- **Documentation:** All helpers and actions are documented with TSDoc/JSDoc.

---

## Core Reusable Components

### 1. **Selectors Helper (`selectors.ts`)
- Centralizes all CSS/XPath selectors for the signup and auth pages.
- Example:
  ```ts
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
  ```

### 2. **Dummy Data Generator (`userData.ts`)
- Generates unique, valid dummy data for each test run.
- Example:
  ```ts
  export function generateUser() {
    const id = Date.now();
    return {
      firstName: `Test${id}`,
      lastName: 'User',
      email: `testuser${id}@example.com`,
      password: 'Test@1234',
      phone: `90000${id.toString().slice(-6)}`,
      countryCode: '+91',
    };
  }
  ```

### 3. **Reusable Actions (`actions.ts`)
- Encapsulates common Playwright flows (e.g., fillSignupForm, submitForm, assertToast).
- Example:
  ```ts
  import { Page } from '@playwright/test';
  import { signupSelectors } from './selectors';
  import { generateUser } from './userData';

  export async function fillSignupForm(page: Page, user: ReturnType<typeof generateUser>) {
    await page.fill(signupSelectors.firstName, user.firstName);
    await page.fill(signupSelectors.lastName, user.lastName);
    await page.fill(signupSelectors.email, user.email);
    await page.fill(signupSelectors.password, user.password);
    await page.selectOption(signupSelectors.countryCode, user.countryCode);
    await page.fill(signupSelectors.phone, user.phone);
    await page.check(signupSelectors.agreeToTerms);
  }
  ```

---

## Test Case Structure
- Each test case imports and uses helpers/actions for clarity and reuse.
- Example (signup.spec.ts):
  ```ts
  import { test, expect } from '@playwright/test';
  import { fillSignupForm } from './helpers/actions';
  import { generateUser } from './helpers/userData';
  import { signupSelectors } from './helpers/selectors';

  test('User can sign up with valid data', async ({ page }) => {
    const user = generateUser();
    await page.goto('http://139.84.135.32:3001/auth/signup');
    await fillSignupForm(page, user);
    await page.click(signupSelectors.continueButton);
    await expect(page.locator(signupSelectors.toast)).toContainText('OTP sent');
  });
  ```

---

## CI/CD Integration
- Tests run in headless mode by default.
- Add test step to CI pipeline: `npx playwright test`
- Artifacts (screenshots, videos) are saved for failed runs.

---

## Future E2E Expansion
- The same helpers/actions can be reused for login, onboarding, and other flows.
- Add more actions/selectors as new flows are automated.

---

## Maintenance
- Update selectors and actions as UI evolves.
- Keep dummy data logic up to date with backend validation rules.
- Document all helpers and actions for team onboarding.

---

_Last updated: 2025-_ 