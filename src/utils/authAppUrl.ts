export function getAuthAppUrl(): string {
    const authAppUrl = import.meta.env.VITE_AUTH_APP_URL || ''

    if (!authAppUrl) {
        throw new Error('Auth app URL is not configured')
    }
    return authAppUrl
}
