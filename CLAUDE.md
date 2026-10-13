# Project: Mobilewright mobile test framework

## Stack
- Language: TypeScript, Node (LTS)
- Tool: Mobilewright (mobilewright.dev), NOT Appium or WebdriverIO
- Pattern: Page Object Model + fixtures + ElementUtil wrapper + JSON test data + constants

## Reference
- ../Playwright is my web framework. Mirror its structure and naming style.

## Rules
- Use ONLY APIs verified from the mobilewright.dev docs or the installed package type definitions. Never guess an API.
- No hardcoded credentials. Use a .env file and commit a .env.example.
- One config file with ENV switching, not separate config files per environment.
- Tag tests with @smoke, @regression, @e2e.

## Way of working
- Work in small steps. After each step, stop, show what changed, and wait for my "Next".
- Always run the test and show me the real output before saying a step is done.
- Explain WHY briefly for each design decision.