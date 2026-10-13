import { test, expect } from "../fixtures/baseFixtures";
import testData from "../data/testData.json";
import { AppConstants } from "../constants/AppConstants";

test("@smoke verify Login screen opens from the Login tab", async ({ loginPage }) => {
    await loginPage.goToLoginScreen();
    expect(await loginPage.isLoginScreenVisible()).toBeTruthy();
});

test("@regression verify invalid email shows validation message", async ({ openLoginPage }) => {
    await openLoginPage.doLogin(testData.loginData.invalidEmail.email, testData.loginData.invalidEmail.password);
    expect(await openLoginPage.getInvalidEmailMessage()).toBe(AppConstants.INVALID_EMAIL_MESSAGE);
});

test("@e2e verify valid login shows success alert", async ({ openLoginPage }) => {
    await openLoginPage.doLogin(testData.loginData.valid.email, testData.loginData.valid.password);
    expect(await openLoginPage.getSuccessMessage()).toBe(AppConstants.LOGIN_SUCCESS_MESSAGE);
    expect(await openLoginPage.acceptSuccessAlert()).toBeTruthy();
});
