
import type { Locator, Screen } from 'mobilewright';

type SwipeDirection = Parameters<Locator['swipe']>[0]['direction'];
type ScrollOptions = Parameters<Locator['scrollIntoViewIfNeeded']>[0];
type ScreenSwipeOptions = Parameters<Screen['swipe']>[1];

export class ElementUtil {

    private screen: Screen;
    // 10s, below the 30s test timeout, so a missing element fails with a clear locator error first
    private defaultTimeOut: number = 10000;


    constructor(screen: Screen, timeOut: number = 10000) {
        this.screen = screen;
        this.defaultTimeOut = timeOut;
    }

    /**
     * this method returns the element at the given index (0 is valid), else the locator as it is.
     * Mobilewright acts on the first match by default, so no .first() is needed.
     * @param locator
     * @param index
     * @returns
     */
    private getLocator(locator: Locator, index?: number): Locator {
        return index !== undefined ? locator.nth(index) : locator;
    }

    /**
     * Tap on an element
     * @param locator
     * @param options
     * @param index
     */
    async tap(locator: Locator, options?: { timeout?: number }, index?: number): Promise<void> {
        await this.getLocator(locator, index).tap({
            timeout: options?.timeout ?? this.defaultTimeOut
        });
    }

    /**
     * Double tap on an element
     * @param locator
     * @param index
     */
    async doubleTap(locator: Locator, index?: number): Promise<void> {
        await this.getLocator(locator, index).doubleTap({ timeout: this.defaultTimeOut });
    }

    /**
     * Long press on an element (duration in ms, driver default if omitted)
     * @param locator
     * @param duration
     * @param index
     */
    async longPress(locator: Locator, duration?: number, index?: number): Promise<void> {
        await this.getLocator(locator, index).longPress({ timeout: this.defaultTimeOut, duration });
    }

    /**
     * Fill text into an input field (clears it first)
     * @param locator
     * @param text
     * @param index
     */
    async fill(locator: Locator, text: string, index?: number): Promise<void> {
        await this.getLocator(locator, index).fill(text, { timeout: this.defaultTimeOut });
    }

    /**
     * Clear an input field
     * @param locator
     * @param index
     */
    async clear(locator: Locator, index?: number): Promise<void> {
        await this.getLocator(locator, index).clear({ timeout: this.defaultTimeOut });
    }

    /**
     * Get text of an element (text, else label, else value)
     * @param locator
     * @param index
     */
    async getText(locator: Locator, index?: number): Promise<string> {
        return await this.getLocator(locator, index).getText({ timeout: this.defaultTimeOut });
    }

    /**
     * Get the current value of an input field
     * @param locator
     * @param index
     */
    async getValue(locator: Locator, index?: number): Promise<string> {
        return await this.getLocator(locator, index).getValue({ timeout: this.defaultTimeOut });
    }



    //============================ Element Visibility & State Check ================//

    /**
     * check element is visible right now (does not wait, use waitForVisible to wait)
     * @param locator
     * @param index
     */
    async isVisible(locator: Locator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isVisible();
    }

    /**
     * check element is enabled right now (false if not found)
     * @param locator
     * @param index
     */
    async isEnabled(locator: Locator, index?: number): Promise<boolean> {
        return await this.getLocator(locator, index).isEnabled();
    }


    //====================wait utils===========//

    /**
     * wait for element to be visible, returns false on timeout instead of throwing
     * @param locator
     * @param timeout
     * @param index
     */
    async waitForVisible(locator: Locator, timeout: number = 5000, index?: number): Promise<boolean> {
        try {
            await this.getLocator(locator, index).waitFor({ state: 'visible', timeout });
            return true;
        }
        catch {
            return false;
        }
    }

    /**
     * wait for element to be hidden or gone, returns false on timeout instead of throwing
     * @param locator
     * @param timeout
     * @param index
     */
    async waitForHidden(locator: Locator, timeout: number = 5000, index?: number): Promise<boolean> {
        try {
            await this.getLocator(locator, index).waitFor({ state: 'hidden', timeout });
            return true;
        }
        catch {
            return false;
        }
    }


    //====================swipe & scroll utils===========//

    /**
     * Swipe on an element in the given direction ('up' | 'down' | 'left' | 'right')
     * @param locator
     * @param direction
     * @param index
     */
    async swipe(locator: Locator, direction: SwipeDirection, index?: number): Promise<void> {
        await this.getLocator(locator, index).swipe({ direction, timeout: this.defaultTimeOut });
    }

    /**
     * Swipe until the element is inside the viewport (default: up to 10 swipes)
     * @param locator
     * @param options
     * @param index
     */
    async scrollIntoView(locator: Locator, options?: ScrollOptions, index?: number): Promise<void> {
        await this.getLocator(locator, index).scrollIntoViewIfNeeded(options);
    }

    /**
     * Swipe on the whole screen, not on an element (no auto-wait)
     * @param direction
     * @param options
     */
    async swipeScreen(direction: SwipeDirection, options?: ScreenSwipeOptions): Promise<void> {
        await this.screen.swipe(direction, options);
    }

}
