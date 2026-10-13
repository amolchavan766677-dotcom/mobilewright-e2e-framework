import type { Locator, Screen } from 'mobilewright';
import { ElementUtil } from '../utils/ElementUtil';
import { byAutomationId } from '../utils/locators';
import { AppConstants } from '../constants/AppConstants';


export class LoginPage {
    //page locators/objects/OR(Object Repository)
    readonly screen: Screen;
    private readonly eleUtil: ElementUtil;
    private readonly loginTab: Locator;
    private readonly loginScreen: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly invalidEmailMessage: Locator;
    private readonly shortPasswordMessage: Locator;
    private readonly successMessage: Locator;
    private readonly alertOkButton: Locator;


    //page class constructor
    constructor(screen: Screen) {
        this.screen = screen;
        this.eleUtil = new ElementUtil(screen);
        this.loginTab = screen.getByRole('button', { name: 'Login' });
        this.loginScreen = byAutomationId(screen, 'Login-screen');
        this.emailInput = byAutomationId(screen, 'input-email');
        this.passwordInput = byAutomationId(screen, 'input-password');
        this.loginButton = byAutomationId(screen, 'button-LOGIN');
        // Exception to the one-match rule: on iOS each validation text is a StaticText nested inside a
        // StaticText with the same label and identical bounds, so these match 2 nodes (1 on Android).
        // Both are the same on-screen text, and Mobilewright acts on the first match.
        this.invalidEmailMessage = screen.getByText(AppConstants.INVALID_EMAIL_MESSAGE);
        this.shortPasswordMessage = screen.getByText(AppConstants.SHORT_PASSWORD_MESSAGE);
        this.successMessage = screen.getByText(AppConstants.LOGIN_SUCCESS_MESSAGE);
        this.alertOkButton = screen.getByRole('button', { name: 'OK' });
    }

    //page actions/methods/Behavior of the page
    /**
     * This method will open the Login screen from the bottom tab bar
     */
    public async goToLoginScreen(): Promise<void> {
        await this.eleUtil.tap(this.loginTab);
    }

    /**
     * This method will check the Login screen is visible
     * @returns
     */
    public async isLoginScreenVisible(): Promise<boolean> {
        return await this.eleUtil.waitForVisible(this.loginScreen);
    }

    /**
     * This method will fill the login form and tap LOGIN
     * @param email
     * @param password
     */
    public async doLogin(email: string, password: string): Promise<void> {
        await this.eleUtil.fill(this.emailInput, email);
        await this.eleUtil.fill(this.passwordInput, password);
        await this.eleUtil.tap(this.loginButton);
    }

    /**
     * This method will get the invalid email validation message
     * @returns
     */
    public async getInvalidEmailMessage(): Promise<string> {
        return await this.eleUtil.getText(this.invalidEmailMessage);
    }

    /**
     * This method will get the short password validation message
     * @returns
     */
    public async getShortPasswordMessage(): Promise<string> {
        return await this.eleUtil.getText(this.shortPasswordMessage);
    }

    /**
     * This method will get the message of the success alert shown after login
     * @returns
     */
    public async getSuccessMessage(): Promise<string> {
        return await this.eleUtil.getText(this.successMessage);
    }

    /**
     * This method will tap OK on the success alert and check it closed
     * @returns
     */
    public async acceptSuccessAlert(): Promise<boolean> {
        await this.eleUtil.tap(this.alertOkButton);
        return await this.eleUtil.waitForHidden(this.successMessage);
    }

}
