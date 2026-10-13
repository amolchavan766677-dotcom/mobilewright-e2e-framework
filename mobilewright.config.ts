import { defineConfig } from 'mobilewright';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable "${name}". Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  // top-level only: viewTree is not accepted inside a project's `use`
  viewTree: 'on-failure',
  // one worker per device: the device pool uses `workers` as its number of device slots
  workers: 2,
  use: {
    // fail a stuck device allocation after 1 min instead of the 15 min default
    allocationTimeout: 60000,
  },
  projects: [
    {
      name: 'ios',
      use: {
        platform: 'ios',
        bundleId: requireEnv('IOS_BUNDLE_ID'),
        deviceName: new RegExp(requireEnv('IOS_DEVICE_NAME')),
      },
    },
    {
      name: 'android',
      use: {
        platform: 'android',
        bundleId: requireEnv('ANDROID_BUNDLE_ID'),
        deviceName: /.*/,
        deviceId: requireEnv('ANDROID_DEVICE_ID'),
      },
    },
  ],
  // outputFolder matches the folder `npx mobilewright show-report` opens by default
  reporter: [['html', { open: 'never', outputFolder: 'mobilewright-report' }]],
  fullyParallel: false,
});
