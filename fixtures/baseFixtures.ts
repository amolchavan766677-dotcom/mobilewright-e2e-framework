import { test as base, expect } from "@mobilewright/test";
import { LoginPage } from "../pages/01-LoginPage";

type MyFixtures = {
    loginPage: LoginPage;
    openLoginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ screen }, use) => {
        const loginPage = new LoginPage(screen);
        await use(loginPage);
    },

    openLoginPage: async ({ screen }, use) => {
        const loginPage = new LoginPage(screen);
        await loginPage.goToLoginScreen();
        expect(await loginPage.isLoginScreenVisible()).toBeTruthy();
        await use(loginPage);
    }
});

export { expect };
