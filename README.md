# Mobilewright TypeScript Framework

A mobile end-to-end automation framework built with [Mobilewright](https://mobilewright.dev/) and [TypeScript](https://www.typescriptlang.org/). It tests the [WebdriverIO native demo app](https://github.com/webdriverio/native-demo-app) on iOS and Android with **one shared set of page objects and tests**, following the **Page Object Model (POM)** with **Custom Fixtures**, like our Playwright web framework.

## 🚀 Features

- **Language**: TypeScript (strict, checked with `npm run typecheck`)
- **Tool**: Mobilewright `0.0.65` (pinned), no Appium server
- **Platforms**: iOS simulator and real Android device, as two projects (`ios`, `android`) in one config
- **Design Pattern**: Page Object Model (POM)
- **Fixtures**: Custom fixtures that create page objects and open screens
- **Cross-platform locators**: `byAutomationId()` finds an element by the app's automation ID on both platforms
- **Data-Driven Testing**: Fake test data in JSON
- **Constants**: Expected app messages in one place
- **Configuration**: Devices and bundle IDs come from `.env` (no hardcoded values)
- **Reporting**: HTML report with screenshot (and view tree) on failure

## 📂 Project Structure

```text
├── constants/              # Expected app messages
│   └── AppConstants.ts
├── data/                   # Fake, non-secret test data
│   └── testData.json
├── fixtures/               # Custom fixtures (loginPage, openLoginPage)
│   └── baseFixtures.ts
├── pages/                  # Page Object classes
│   └── 01-LoginPage.ts
├── tests/                  # Test scripts
│   └── 01-login.spec.ts
├── utils/
│   ├── ElementUtil.ts      # Wrapper for taps, fills, waits, swipes
│   └── locators.ts         # byAutomationId() helper
├── mobilewright.config.ts  # One config: ios + android projects
├── .env.example            # Template for your local .env
└── tsconfig.json
```

## 🛠️ Prerequisites

- macOS (iOS simulators need macOS and Xcode)
- [Node.js](https://nodejs.org/) 24 (LTS)
- Xcode with an **iPhone 17 Pro** simulator, booted
- Android SDK with `ANDROID_HOME` set and `adb` on the `PATH`, plus a JDK
- A real Android device connected over USB with USB debugging enabled
- The WebdriverIO demo app installed on both devices, from its [releases page](https://github.com/webdriverio/native-demo-app/releases):
  - iOS bundle ID: `org.wdiodemoapp`
  - Android package: `com.wdiodemoapp`

## 📥 Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your `.env` from the template and fill in your device values:
   ```bash
   cp .env.example .env
   ```
   `ANDROID_DEVICE_ID` is your device serial from `adb devices`. `IOS_DEVICE_NAME` is a regex, e.g. `^iPhone 17 Pro$`.

3. Check your environment and devices:
   ```bash
   npx mobilewright doctor
   ```

## 🧪 Running Tests

```bash
# Both platforms
npm test

# One platform
npm run test:ios
npm run test:android

# By tag (both platforms)
npm run test:smoke
npm run test:regression
npm run test:e2e

# Tag on one platform
npm run test:ios -- --grep @smoke

# Type check
npm run typecheck
```

## 📊 Reports

The HTML report is written to `mobilewright-report/`. To open it:
```bash
npx mobilewright show-report
```

## ⚠️ Known Issue

In Mobilewright `0.0.65` the device pool uses `workers` as its number of device slots, and it does not free an idle slot for the other platform. That's why the config sets `workers: 2`, one per platform.

**Never run both projects with `--workers=1`.** The second platform waits for a device that never comes free, and fails after the 60s `allocationTimeout`. Running one project with `--workers=1` is fine.
