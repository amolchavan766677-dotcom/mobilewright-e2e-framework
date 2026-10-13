import type { Locator, Screen } from 'mobilewright';

/**
 * Find an element by the app's automation ID on both platforms.
 * The app sets one ID per element, but iOS reports it as the identifier (getByTestId)
 * and Android as the content-desc (getByLabel), so exactly one side matches on each platform.
 * @param screen
 * @param id
 * @returns
 */
export function byAutomationId(screen: Screen, id: string): Locator {
    return screen.getByTestId(id).or(screen.getByLabel(id));
}
