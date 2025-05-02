import { ERROR_TYPES } from '../constants'
import { ErrorInfo } from '../types/errors'

// contexts/logs/utils/error.ts
export const getReadableError = (error: string): ErrorInfo => {
    // Check for internal errors first (highest severity)
    if (error.includes('InternalError')) {
        return {
            text: ERROR_TYPES.MEETING_ERRORS['InternalError'],
            type: 'error',
        }
    }

    // Check for webhook errors (warning level)
    for (const [key, value] of Object.entries(ERROR_TYPES.WEBHOOK_ERRORS)) {
        if (error.toLowerCase().includes(key.toLowerCase())) {
            return { text: value, type: 'warning' }
        }
    }

    // Check for HTTP status codes
    const statusMatch = error.match(/Status: (\d{3})/)
    if (statusMatch) {
        const statusCode = statusMatch[1]
        const statusMessage =
            ERROR_TYPES.HTTP_STATUS[
                statusCode as keyof typeof ERROR_TYPES.HTTP_STATUS
            ]
        if (statusMessage) {
            // 500+ errors are server errors (high severity)
            if (parseInt(statusCode) >= 500) {
                return {
                    text: `HTTP ${statusCode}: ${statusMessage}`,
                    type: 'error',
                }
            }
            // 400-level errors are client errors (warning level)
            return {
                text: `HTTP ${statusCode}: ${statusMessage}`,
                type: 'warning',
            }
        }
    }

    // Check for other meeting errors (high severity)
    for (const [key, value] of Object.entries(ERROR_TYPES.MEETING_ERRORS)) {
        if (error.includes(key)) {
            return { text: value, type: 'error' }
        }
    }

    // If no specific error type found, treat as warning by default
    return {
        text: error.length > 50 ? `${error.slice(0, 50)}...` : error,
        type: 'warning',
    }
}
