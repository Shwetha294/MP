import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    headless: false, // always headed
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'http://localhost:3000', // update if needed
  },
  workers: 1, // run tests sequentially
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
  ],
});
