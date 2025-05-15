/**
 * Returns the configured authentication app URL from environment variables.
 * @throws {Error} If the authentication app URL is not configured
 * @returns {string} The authentication app URL
 */
export function getAuthAppUrl(): string {
    const authAppUrl = import.meta.env.VITE_AUTH_APP_URL || ''

    if (!authAppUrl) {
        throw new Error('Auth app URL is not configured')
    }
    return authAppUrl
}

/**
 * Returns the sign-in URL by combining the authentication app's base URL
 * with the current page's URL as a redirect query parameter.
 *
 * @throws {Error} If the authentication app URL is not configured
 * @returns {string} The sign in URL
 */
export function getSignInUrl(): string {
    const authAppUrl = getAuthAppUrl()

    const current = encodeURIComponent(window.location.href)
    const signInUrl = `${authAppUrl}/sign-in?redirectTo=${current}`

    return signInUrl
}
