export function isValidUrl(string: string): boolean {
    try {
        const url = new URL(string)
        // Check if the URL's protocol is either HTTP or HTTPS
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            return false
        }
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
